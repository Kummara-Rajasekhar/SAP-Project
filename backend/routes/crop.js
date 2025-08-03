const express = require('express');
const { body, validationResult } = require('express-validator');
const Crop = require('../models/Crop');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Register new crop
// @route   POST /api/crop/register
// @access  Private/Farmer
router.post('/register', protect, authorize('farmer'), [
  body('name')
    .isIn(['rice', 'wheat', 'maize', 'cotton', 'sugarcane', 'pulses', 'vegetables', 'fruits'])
    .withMessage('Please select a valid crop'),
  body('variety')
    .trim()
    .notEmpty()
    .withMessage('Crop variety is required'),
  body('area')
    .isFloat({ min: 0.1 })
    .withMessage('Area must be at least 0.1'),
  body('startDate')
    .isISO8601()
    .withMessage('Please enter a valid start date'),
  body('expectedHarvestDate')
    .isISO8601()
    .withMessage('Please enter a valid harvest date'),
  body('expectedYield')
    .isFloat({ min: 0 })
    .withMessage('Expected yield must be positive'),
  body('expectedPrice')
    .isFloat({ min: 0 })
    .withMessage('Expected price must be positive')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const cropData = {
      ...req.body,
      farmer: req.user._id
    };

    const crop = await Crop.create(cropData);

    // Add crop to user's crops array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { crops: crop._id } }
    );

    res.status(201).json({
      success: true,
      message: 'Crop registered successfully',
      data: { crop }
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
// @route   GET /api/crop/my-crops
// @access  Private/Farmer
router.get('/my-crops', protect, authorize('farmer'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { farmer: req.user._id };

    if (status) {
      query.status = status;
    }

    const crops = await Crop.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Crop.countDocuments(query);

    res.json({
      success: true,
      data: {
        crops,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    console.error('Get my crops error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get all crops (Agent/Admin)
// @route   GET /api/crop/all
// @access  Private/Agent/Admin
router.get('/all', protect, authorize('agent', 'admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, farmer } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (farmer) {
      query.farmer = farmer;
    }

    const crops = await Crop.find(query)
      .populate('farmer', 'name email phone')
      .populate('approvedBy', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Crop.countDocuments(query);

    res.json({
      success: true,
      data: {
        crops,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    console.error('Get all crops error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Approve crop (Agent/Admin)
// @route   PUT /api/crop/:id/approve
// @access  Private/Agent/Admin
router.put('/:id/approve', protect, authorize('agent', 'admin'), async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    crop.isApproved = true;
    crop.approvedBy = req.user._id;
    crop.approvedAt = new Date();

    await crop.save();

    res.json({
      success: true,
      message: 'Crop approved successfully',
      data: { crop }
    });
  } catch (error) {
    console.error('Approve crop error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Update crop
// @route   PUT /api/crop/:id
// @access  Private
router.put('/:id', protect, [
  body('status')
    .optional()
    .isIn(['planted', 'growing', 'ready_for_harvest', 'harvested', 'sold'])
    .withMessage('Invalid status'),
  body('actualYield')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Actual yield must be positive'),
  body('actualPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Actual price must be positive')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    // Check if user can update this crop
    if (crop.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this crop'
      });
    }

    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Crop updated successfully',
      data: { crop: updatedCrop }
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

// @desc    Delete crop
// @route   DELETE /api/crop/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    // Check if user can delete this crop
    if (crop.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this crop'
      });
    }

    await Crop.findByIdAndDelete(req.params.id);

    // Remove crop from user's crops array
    await User.findByIdAndUpdate(
      crop.farmer,
      { $pull: { crops: crop._id } }
    );

    res.json({
      success: true,
      message: 'Crop deleted successfully'
    });
  } catch (error) {
    console.error('Delete crop error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 