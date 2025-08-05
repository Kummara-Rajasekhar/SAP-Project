const express = require('express');
const { body, validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const Media = require('../models/Media');
const User = require('../models/User');
const { protect, isFarmer, isAgent } = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// @desc    Upload media
// @route   POST /api/media/upload
// @access  Private (Farmer)
router.post('/upload', [
  protect,
  isFarmer,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('mediaType').isIn(['image', 'video', 'document']).withMessage('Invalid media type'),
  body('category').isIn(['crop_issue', 'soil_analysis', 'pest_problem', 'harvest_report', 'other']).withMessage('Invalid category')
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

    const { title, description, mediaType, category, priority, mediaUrl } = req.body;
    const farmer = req.user;

    // Find assigned agent
    const agent = await User.findById(farmer.assignedAgent);
    if (!agent) {
      return res.status(400).json({
        success: false,
        message: 'No agent assigned to you'
      });
    }

    // Upload to Cloudinary if mediaUrl is provided
    let cloudinaryId = null;
    let finalMediaUrl = mediaUrl;

    if (mediaUrl && mediaUrl.startsWith('data:')) {
      try {
        const result = await cloudinary.uploader.upload(mediaUrl, {
          folder: 'agriconnect',
          resource_type: mediaType === 'video' ? 'video' : 'image'
        });
        finalMediaUrl = result.secure_url;
        cloudinaryId = result.public_id;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(400).json({
          success: false,
          message: 'Failed to upload media to cloud'
        });
      }
    }

    // Create media record
    const media = await Media.create({
      farmer: farmer._id,
      agent: agent._id,
      title,
      description,
      mediaType,
      mediaUrl: finalMediaUrl,
      cloudinaryId,
      category,
      priority: priority || 'medium',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Media uploaded successfully',
      data: {
        media: media
      }
    });
  } catch (error) {
    console.error('Upload media error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get farmer media
// @route   GET /api/media/farmer
// @access  Private (Farmer)
router.get('/farmer', protect, isFarmer, async (req, res) => {
  try {
    const media = await Media.find({ farmer: req.user._id })
      .populate('agent', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        media: media
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

// @desc    Get agent media requests
// @route   GET /api/media/agent
// @access  Private (Agent)
router.get('/agent', protect, isAgent, async (req, res) => {
  try {
    const { status, category } = req.query;
    let query = { agent: req.user._id };

    if (status) {
      query.status = status;
    }
    if (category) {
      query.category = category;
    }

    const media = await Media.find(query)
      .populate('farmer', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        media: media
      }
    });
  } catch (error) {
    console.error('Get agent media error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Update media status (Agent response)
// @route   PUT /api/media/:id/respond
// @access  Private (Agent)
router.put('/:id/respond', [
  protect,
  isAgent,
  body('status').isIn(['approved', 'rejected', 'in_review']).withMessage('Invalid status'),
  body('agentResponse').notEmpty().withMessage('Response is required')
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

    const { status, agentResponse } = req.body;
    const mediaId = req.params.id;

    const media = await Media.findOneAndUpdate(
      { _id: mediaId, agent: req.user._id },
      {
        status,
        agentResponse,
        responseDate: new Date()
      },
      { new: true }
    ).populate('farmer', 'name email phone');

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media request not found'
      });
    }

    res.json({
      success: true,
      message: 'Media request updated successfully',
      data: {
        media: media
      }
    });
  } catch (error) {
    console.error('Update media status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get media statistics
// @route   GET /api/media/stats
// @access  Private (Agent)
router.get('/stats', protect, isAgent, async (req, res) => {
  try {
    const stats = await Media.aggregate([
      { $match: { agent: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Media.aggregate([
      { $match: { agent: req.user._id } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalRequests = await Media.countDocuments({ agent: req.user._id });
    const pendingRequests = await Media.countDocuments({ 
      agent: req.user._id, 
      status: 'pending' 
    });

    res.json({
      success: true,
      data: {
        stats: stats,
        categoryStats: categoryStats,
        totalRequests,
        pendingRequests
      }
    });
  } catch (error) {
    console.error('Get media stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private (Farmer)
router.delete('/:id', protect, isFarmer, async (req, res) => {
  try {
    const media = await Media.findOne({ _id: req.params.id, farmer: req.user._id });

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    // Delete from Cloudinary if exists
    if (media.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(media.cloudinaryId);
      } catch (error) {
        console.error('Cloudinary delete error:', error);
      }
    }

    await Media.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 