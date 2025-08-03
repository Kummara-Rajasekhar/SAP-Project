const express = require('express');
const User = require('../models/User');
const Crop = require('../models/Crop');
const Message = require('../models/Message');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
router.get('/dashboard', protect, async (req, res) => {
  try {
    let analytics = {};

    if (req.user.role === 'farmer') {
      // Farmer analytics
      const totalCrops = await Crop.countDocuments({ farmer: req.user._id });
      const activeCrops = await Crop.countDocuments({ 
        farmer: req.user._id, 
        status: { $in: ['planted', 'growing', 'ready_for_harvest'] } 
      });
      const harvestedCrops = await Crop.countDocuments({ 
        farmer: req.user._id, 
        status: 'harvested' 
      });

      // Calculate total expected revenue
      const crops = await Crop.find({ farmer: req.user._id });
      const totalExpectedRevenue = crops.reduce((sum, crop) => {
        return sum + (crop.expectedYield * crop.expectedPrice);
      }, 0);

      analytics = {
        totalCrops,
        activeCrops,
        harvestedCrops,
        totalExpectedRevenue,
        recentCrops: await Crop.find({ farmer: req.user._id })
          .sort({ createdAt: -1 })
          .limit(5)
      };
    } else if (req.user.role === 'agent') {
      // Agent analytics
      const totalAssignedCrops = await Crop.countDocuments({ approvedBy: req.user._id });
      const pendingCrops = await Crop.countDocuments({ 
        approvedBy: req.user._id, 
        status: { $in: ['planted', 'growing'] } 
      });
      const completedCrops = await Crop.countDocuments({ 
        approvedBy: req.user._id, 
        status: 'harvested' 
      });

      analytics = {
        totalAssignedCrops,
        pendingCrops,
        completedCrops,
        avgRating: req.user.rating || 0,
        totalRatings: req.user.totalRatings || 0,
        recentCrops: await Crop.find({ approvedBy: req.user._id })
          .populate('farmer', 'name')
          .sort({ createdAt: -1 })
          .limit(5)
      };
    } else if (req.user.role === 'admin') {
      // Admin analytics
      const totalUsers = await User.countDocuments();
      const totalFarmers = await User.countDocuments({ role: 'farmer' });
      const totalAgents = await User.countDocuments({ role: 'agent' });
      const totalCrops = await Crop.countDocuments();
      const pendingCrops = await Crop.countDocuments({ isApproved: false });
      const totalMessages = await Message.countDocuments();

      // Get recent activities
      const recentUsers = await User.find()
        .select('name role createdAt')
        .sort({ createdAt: -1 })
        .limit(5);

      const recentCrops = await Crop.find()
        .populate('farmer', 'name')
        .sort({ createdAt: -1 })
        .limit(5);

      analytics = {
        totalUsers,
        totalFarmers,
        totalAgents,
        totalCrops,
        pendingCrops,
        totalMessages,
        recentUsers,
        recentCrops
      };
    }

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get crop statistics
// @route   GET /api/analytics/crop-stats
// @access  Private
router.get('/crop-stats', protect, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'farmer') {
      query.farmer = req.user._id;
    } else if (req.user.role === 'agent') {
      query.approvedBy = req.user._id;
    }

    const crops = await Crop.find(query);

    // Calculate statistics
    const cropStats = crops.reduce((stats, crop) => {
      const cropName = crop.name;
      if (!stats[cropName]) {
        stats[cropName] = {
          count: 0,
          totalArea: 0,
          totalExpectedYield: 0,
          totalExpectedRevenue: 0
        };
      }

      stats[cropName].count++;
      stats[cropName].totalArea += crop.area;
      stats[cropName].totalExpectedYield += crop.expectedYield;
      stats[cropName].totalExpectedRevenue += (crop.expectedYield * crop.expectedPrice);

      return stats;
    }, {});

    res.json({
      success: true,
      data: cropStats
    });
  } catch (error) {
    console.error('Get crop stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get user statistics (Admin only)
// @route   GET /api/analytics/user-stats
// @access  Private/Admin
router.get('/user-stats', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalAgents = await User.countDocuments({ role: 'agent' });
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isVerified: true });

    // Get user registration trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get top agents by rating
    const topAgents = await User.find({ role: 'agent' })
      .select('name rating totalRatings experience')
      .sort({ rating: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalFarmers,
        totalAgents,
        activeUsers,
        verifiedUsers,
        recentUsers,
        topAgents
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get revenue analytics (Admin only)
// @route   GET /api/analytics/revenue
// @access  Private/Admin
router.get('/revenue', protect, authorize('admin'), async (req, res) => {
  try {
    const crops = await Crop.find();

    // Calculate total expected revenue
    const totalExpectedRevenue = crops.reduce((sum, crop) => {
      return sum + (crop.expectedYield * crop.expectedPrice);
    }, 0);

    // Calculate total actual revenue
    const totalActualRevenue = crops.reduce((sum, crop) => {
      return sum + (crop.actualYield * crop.actualPrice);
    }, 0);

    // Get revenue by crop type
    const revenueByCrop = crops.reduce((stats, crop) => {
      const cropName = crop.name;
      if (!stats[cropName]) {
        stats[cropName] = {
          expectedRevenue: 0,
          actualRevenue: 0
        };
      }

      stats[cropName].expectedRevenue += (crop.expectedYield * crop.expectedPrice);
      stats[cropName].actualRevenue += (crop.actualYield * crop.actualPrice);

      return stats;
    }, {});

    res.json({
      success: true,
      data: {
        totalExpectedRevenue,
        totalActualRevenue,
        revenueByCrop
      }
    });
  } catch (error) {
    console.error('Get revenue analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get message analytics
// @route   GET /api/analytics/messages
// @access  Private
router.get('/messages', protect, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'farmer') {
      query.$or = [
        { sender: req.user._id },
        { receiver: req.user._id }
      ];
    } else if (req.user.role === 'agent') {
      query.$or = [
        { sender: req.user._id },
        { receiver: req.user._id }
      ];
    }

    const totalMessages = await Message.countDocuments(query);
    const unreadMessages = await Message.countDocuments({
      receiver: req.user._id,
      isRead: false
    });

    // Get recent messages
    const recentMessages = await Message.find(query)
      .populate('sender', 'name profileImage')
      .populate('receiver', 'name profileImage')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        totalMessages,
        unreadMessages,
        recentMessages
      }
    });
  } catch (error) {
    console.error('Get message analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 