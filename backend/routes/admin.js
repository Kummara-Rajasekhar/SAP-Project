const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Crop = require('../models/Crop');
const Payment = require('../models/Payment');
const Media = require('../models/Media');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
router.get('/dashboard', protect, isAdmin, async (req, res) => {
  try {
    // Get user counts
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalAgents = await User.countDocuments({ role: 'agent' });
    const activeFarmers = await User.countDocuments({ role: 'farmer', isActive: true });
    const activeAgents = await User.countDocuments({ role: 'agent', isActive: true });

    // Get crop counts
    const totalCrops = await Crop.countDocuments();
    const approvedCrops = await Crop.countDocuments({ isApproved: true });

    // Get payment stats
    const totalPayments = await Payment.countDocuments();
    const completedPayments = await Payment.countDocuments({ status: 'completed' });
    const totalPaymentAmount = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Get media stats
    const totalMediaRequests = await Media.countDocuments();
    const pendingMediaRequests = await Media.countDocuments({ status: 'pending' });

    // Get recent activities
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt');

    const recentCrops = await Crop.find()
      .populate('farmer', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          totalFarmers,
          totalAgents,
          activeFarmers,
          activeAgents,
          totalCrops,
          approvedCrops,
          totalPayments,
          completedPayments,
          totalPaymentAmount: totalPaymentAmount[0]?.total || 0,
          totalMediaRequests,
          pendingMediaRequests
        },
        recentUsers,
        recentCrops
      }
    });
  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
router.get('/users', protect, isAdmin, async (req, res) => {
  try {
    const { role, status, page = 1, limit = 10 } = req.query;
    let query = {};

    if (role) {
      query.role = role;
    }
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalUsers: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get user details
// @route   GET /api/admin/users/:id
// @access  Private (Admin)
router.get('/users/:id', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('assignedAgent', 'name email phone')
      .populate('assignedFarmers', 'name email phone');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get additional data based on role
    let additionalData = {};
    if (user.role === 'farmer') {
      const crops = await Crop.find({ farmer: user._id });
      const payments = await Payment.find({ farmer: user._id });
      const media = await Media.find({ farmer: user._id });
      additionalData = { crops, payments, media };
    } else if (user.role === 'agent') {
      const assignedFarmers = await User.find({ assignedAgent: user._id });
      const crops = await Crop.find({ agent: user._id });
      const payments = await Payment.find({ agent: user._id });
      const media = await Media.find({ agent: user._id });
      additionalData = { assignedFarmers, crops, payments, media };
    }

    res.json({
      success: true,
      data: {
        user,
        additionalData
      }
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
router.put('/users/:id', [
  protect,
  isAdmin,
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('email').optional().isEmail(),
  body('phone').optional().matches(/^[0-9]{10}$/),
  body('isActive').optional().isBoolean(),
  body('status').optional().isIn(['active', 'inactive', 'pending']),
  body('assignedAgent').optional().isMongoId()
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

    const { name, email, phone, isActive, status, assignedAgent } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (status) updateData.status = status;
    if (assignedAgent) updateData.assignedAgent = assignedAgent;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
router.delete('/users/:id', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has associated data
    const hasCrops = await Crop.exists({ farmer: user._id });
    const hasPayments = await Payment.exists({ 
      $or: [{ farmer: user._id }, { agent: user._id }] 
    });
    const hasMedia = await Media.exists({ 
      $or: [{ farmer: user._id }, { agent: user._id }] 
    });

    if (hasCrops || hasPayments || hasMedia) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with associated data. Deactivate instead.'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Assign agent to farmer
// @route   POST /api/admin/assign-agent
// @access  Private (Admin)
router.post('/assign-agent', [
  protect,
  isAdmin,
  body('farmerId').isMongoId().withMessage('Valid farmer ID is required'),
  body('agentId').isMongoId().withMessage('Valid agent ID is required')
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

    const { farmerId, agentId } = req.body;

    // Check if users exist and have correct roles
    const farmer = await User.findById(farmerId);
    const agent = await User.findById(agentId);

    if (!farmer || farmer.role !== 'farmer') {
      return res.status(400).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    if (!agent || agent.role !== 'agent') {
      return res.status(400).json({
        success: false,
        message: 'Agent not found'
      });
    }

    // Update farmer's assigned agent
    farmer.assignedAgent = agentId;
    await farmer.save();

    // Add farmer to agent's assigned farmers list
    if (!agent.assignedFarmers.includes(farmerId)) {
      agent.assignedFarmers.push(farmerId);
      await agent.save();
    }

    res.json({
      success: true,
      message: 'Agent assigned successfully',
      data: {
        farmer: farmer.getPublicProfile(),
        agent: agent.getPublicProfile()
      }
    });
  } catch (error) {
    console.error('Assign agent error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get system analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin)
router.get('/analytics', protect, isAdmin, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    const now = new Date();
    let startDate;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // User registration trends
    const userTrends = await User.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Payment trends
    const paymentTrends = await Payment.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Crop statistics
    const cropStats = await Crop.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 },
          totalArea: { $sum: '$area' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        userTrends,
        paymentTrends,
        cropStats,
        period
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 