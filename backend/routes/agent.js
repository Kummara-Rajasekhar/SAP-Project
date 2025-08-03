const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Crop = require('../models/Crop');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all agents
// @route   GET /api/agent/all
// @access  Private
router.get('/all', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10, expertise, search } = req.query;

    const query = { role: 'agent', isActive: true };

    // Filter by expertise
    if (expertise) {
      query.expertise = { $in: [expertise] };
    }

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const agents = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1, experience: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        agents,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Update agent profile
// @route   PUT /api/agent/profile
// @access  Private/Agent
router.put('/profile', protect, authorize('agent'), [
  body('expertise')
    .optional()
    .isArray()
    .withMessage('Expertise must be an array'),
  body('experience')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Experience must be a positive integer'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Please enter a valid 10-digit phone number')
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

    const updateFields = {};
    const allowedFields = ['name', 'phone', 'address', 'expertise', 'experience'];

    // Only update allowed fields
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const agent = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        agent: agent.getPublicProfile()
      }
    });
  } catch (error) {
    console.error('Update agent profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Rate an agent
// @route   POST /api/agent/:id/rate
// @access  Private/Farmer
router.post('/:id/rate', protect, authorize('farmer'), [
  body('rating')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters')
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

    const { rating, comment } = req.body;
    const agentId = req.params.id;

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'agent') {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    // Update agent rating
    const newTotalRatings = agent.totalRatings + 1;
    const newRating = ((agent.rating * agent.totalRatings) + rating) / newTotalRatings;

    agent.rating = newRating;
    agent.totalRatings = newTotalRatings;
    await agent.save();

    res.json({
      success: true,
      message: 'Rating submitted successfully',
      data: {
        agent: agent.getPublicProfile()
      }
    });
  } catch (error) {
    console.error('Rate agent error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get agent profile
// @route   GET /api/agent/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const agent = await User.findById(req.params.id)
      .select('-password')
      .populate('crops');

    if (!agent || agent.role !== 'agent') {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    res.json({
      success: true,
      data: { agent }
    });
  } catch (error) {
    console.error('Get agent profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get agent's assigned crops
// @route   GET /api/agent/assigned-crops
// @access  Private/Agent
router.get('/assigned-crops', protect, authorize('agent'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { approvedBy: req.user._id };

    if (status) {
      query.status = status;
    }

    const crops = await Crop.find(query)
      .populate('farmer', 'name email phone')
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
    console.error('Get assigned crops error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get agent statistics
// @route   GET /api/agent/stats
// @access  Private/Agent
router.get('/stats', protect, authorize('agent'), async (req, res) => {
  try {
    const totalCrops = await Crop.countDocuments({ approvedBy: req.user._id });
    const pendingCrops = await Crop.countDocuments({ 
      approvedBy: req.user._id, 
      status: { $in: ['planted', 'growing'] } 
    });
    const completedCrops = await Crop.countDocuments({ 
      approvedBy: req.user._id, 
      status: 'harvested' 
    });

    // Calculate average rating
    const agent = await User.findById(req.user._id);
    const avgRating = agent.rating || 0;

    res.json({
      success: true,
      data: {
        totalCrops,
        pendingCrops,
        completedCrops,
        avgRating,
        totalRatings: agent.totalRatings
      }
    });
  } catch (error) {
    console.error('Get agent stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get farmers assigned to agent
// @route   GET /api/agent/assigned-farmers
// @access  Private/Agent
router.get('/assigned-farmers', protect, authorize('agent'), async (req, res) => {
  try {
    // Get unique farmers from approved crops
    const farmers = await Crop.aggregate([
      {
        $match: { approvedBy: req.user._id }
      },
      {
        $group: {
          _id: '$farmer',
          totalCrops: { $sum: 1 },
          lastCropDate: { $max: '$createdAt' }
        }
      },
      {
        $sort: { lastCropDate: -1 }
      }
    ]);

    // Populate farmer details
    const farmersWithDetails = await Promise.all(
      farmers.map(async (farmer) => {
        const farmerDetails = await User.findById(farmer._id).select('name email phone profileImage');
        return {
          ...farmer,
          farmer: farmerDetails
        };
      })
    );

    res.json({
      success: true,
      data: { farmers: farmersWithDetails }
    });
  } catch (error) {
    console.error('Get assigned farmers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 