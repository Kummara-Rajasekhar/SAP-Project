const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ['image', 'video', 'document'],
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'in_review'],
    default: 'pending'
  },
  category: {
    type: String,
    enum: ['crop_issue', 'soil_analysis', 'pest_problem', 'harvest_report', 'other'],
    default: 'other'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  agentResponse: {
    type: String
  },
  responseDate: {
    type: Date
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', mediaSchema); 