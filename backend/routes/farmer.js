const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Crop = require('../models/Crop');
const Payment = require('../models/Payment');
const Media = require('../models/Media');
const { protect, isFarmer } = require('../middleware/auth');

const router = express.Router();

// @desc    Get farmer dashboard
// @route   GET /api/farmer/dashboard
// @access  Private (Farmer)
router.get('/dashboard', protect, isFarmer, async (req, res) => {
  try {
    const farmer = req.user;

    // Get assigned agent
    const agent = await User.findById(farmer.assignedAgent)
      .select('name email phone expertise rating');

    // Get farmer's crops
    const crops = await Crop.find({ farmer: farmer._id })
      .sort({ createdAt: -1 })
      .limit(10);

    // Get recent payments
    const payments = await Payment.find({ farmer: farmer._id })
      .populate('agent', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get recent media uploads
    const media = await Media.find({ farmer: farmer._id })
      .populate('agent', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get statistics
    const totalCrops = await Crop.countDocuments({ farmer: farmer._id });
    const approvedCrops = await Crop.countDocuments({ farmer: farmer._id, isApproved: true });
    const totalPayments = await Payment.countDocuments({ farmer: farmer._id });
    const completedPayments = await Payment.countDocuments({ farmer: farmer._id, status: 'completed' });
    const totalMediaRequests = await Media.countDocuments({ farmer: farmer._id });
    const pendingMediaRequests = await Media.countDocuments({ farmer: farmer._id, status: 'pending' });

    // Calculate total payment amount
    const paymentStats = await Payment.aggregate([
      { $match: { farmer: farmer._id, status: 'completed' } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      data: {
        farmer: farmer.getPublicProfile(),
        agent,
        stats: {
          totalCrops,
          approvedCrops,
          totalPayments,
          completedPayments,
          totalMediaRequests,
          pendingMediaRequests,
          totalPaymentAmount: paymentStats[0]?.totalAmount || 0
        },
        recentCrops: crops,
        recentPayments: payments,
        recentMedia: media
      }
    });
  } catch (error) {
    console.error('Get farmer dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Register new crop
// @route   POST /api/farmer/crops
// @access  Private (Farmer)
router.post('/crops', [
  protect,
  isFarmer,
  body('name').isIn(['rice', 'wheat', 'maize', 'cotton', 'sugarcane', 'pulses', 'vegetables', 'fruits']).withMessage('Valid crop name is required'),
  body('variety').notEmpty().withMessage('Crop variety is required'),
  body('area').isNumeric({ min: 0.1 }).withMessage('Valid area is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('expectedHarvestDate').isISO8601().withMessage('Valid harvest date is required'),
  body('expectedYield').isNumeric({ min: 0 }).withMessage('Valid expected yield is required'),
  body('expectedPrice').isNumeric({ min: 0 }).withMessage('Valid expected price is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const farmer = req.user;

    // Check if farmer has assigned agent
    if (!farmer.assignedAgent) {
      return res.status(400).json({
        success: false,
        message: 'No agent assigned to you. Please contact administrator.'
      });
    }

    const {
      name,
      variety,
      area,
      unit = 'acres',
      startDate,
      expectedHarvestDate,
      expectedYield,
      yieldUnit = 'quintals',
      expectedPrice,
      irrigationType = 'rainfed',
      notes
    } = req.body;

    const crop = await Crop.create({
      farmer: farmer._id,
      agent: farmer.assignedAgent,
      name,
      variety,
      area,
      unit,
      startDate,
      expectedHarvestDate,
      expectedYield,
      yieldUnit,
      expectedPrice,
      irrigationType,
      notes,
      status: 'planted',
      isApproved: false
    });

    // Add crop to farmer's crops array
    farmer.crops.push(crop._id);
    await farmer.save();

    res.status(201).json({
      success: true,
      message: 'Crop registered successfully',
      data: {
        crop
      }
    });
  } catch (error) {
    console.error('Register crop error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get farmer's crops
// @route   GET /api/farmer/crops
// @access  Private (Farmer)
router.get('/crops', protect, isFarmer, async (req, res) => {
  try {
    const { status, isApproved, page = 1, limit = 10 } = req.query;
    let query = { farmer: req.user._id };

    if (status) {
      query.status = status;
    }
    if (isApproved !== undefined) {
      query.isApproved = isApproved === 'true';
    }

    const skip = (page - 1) * limit;
    const crops = await Crop.find(query)
      .populate('agent', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Crop.countDocuments(query);

    res.json({
      success: true,
      data: {
        crops,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalCrops: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get farmer crops error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Update crop
// @route   PUT /api/farmer/crops/:id
// @access  Private (Farmer)
router.put('/crops/:id', [
  protect,
  isFarmer,
  body('status').optional().isIn(['planted', 'growing', 'ready_for_harvest', 'harvested', 'sold']),
  body('actualYield').optional().isNumeric({ min: 0 }),
  body('actualPrice').optional().isNumeric({ min: 0 }),
  body('notes').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, actualYield, actualPrice, notes } = req.body;
    const updateData = {};

    if (status) updateData.status = status;
    if (actualYield !== undefined) updateData.actualYield = actualYield;
    if (actualPrice !== undefined) updateData.actualPrice = actualPrice;
    if (notes) updateData.notes = notes;

    const crop = await Crop.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user._id },
      updateData,
      { new: true, runValidators: true }
    ).populate('agent', 'name email phone');

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    res.json({
      success: true,
      message: 'Crop updated successfully',
      data: {
        crop
      }
    });
  } catch (error) {
    console.error('Update crop error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get farmer's payments
// @route   GET /api/farmer/payments
// @access  Private (Farmer)
router.get('/payments', protect, isFarmer, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query = { farmer: req.user._id };

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const payments = await Payment.find(query)
      .populate('agent', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Payment.countDocuments(query);

    res.json({
      success: true,
      data: {
        payments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalPayments: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get farmer payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get farmer's media
// @route   GET /api/farmer/media
// @access  Private (Farmer)
router.get('/media', protect, isFarmer, async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    let query = { farmer: req.user._id };

    if (status) {
      query.status = status;
    }
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    const media = await Media.find(query)
      .populate('agent', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Media.countDocuments(query);

    res.json({
      success: true,
      data: {
        media,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalMedia: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get farmer media error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Update farmer profile
// @route   PUT /api/farmer/profile
// @access  Private (Farmer)
router.put('/profile', [
  protect,
  isFarmer,
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('phone').optional().matches(/^[0-9]{10}$/),
  body('address').optional().isObject(),
  body('farmSize').optional().isNumeric({ min: 0 }),
  body('farmLocation').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, phone, address, farmSize, farmLocation } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (farmSize !== undefined) updateData.farmSize = farmSize;
    if (farmLocation) updateData.farmLocation = farmLocation;

    const farmer = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        farmer
      }
    });
  } catch (error) {
    console.error('Update farmer profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 