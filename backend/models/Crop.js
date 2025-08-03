const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Crop name is required'],
    trim: true,
    enum: ['rice', 'wheat', 'maize', 'cotton', 'sugarcane', 'pulses', 'vegetables', 'fruits']
  },
  variety: {
    type: String,
    required: [true, 'Crop variety is required'],
    trim: true
  },
  area: {
    type: Number,
    required: [true, 'Crop area is required'],
    min: [0.1, 'Area must be at least 0.1 acres']
  },
  unit: {
    type: String,
    enum: ['acres', 'hectares'],
    default: 'acres'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  expectedHarvestDate: {
    type: Date,
    required: [true, 'Expected harvest date is required']
  },
  status: {
    type: String,
    enum: ['planted', 'growing', 'ready_for_harvest', 'harvested', 'sold'],
    default: 'planted'
  },
  expectedYield: {
    type: Number,
    required: [true, 'Expected yield is required'],
    min: [0, 'Expected yield must be positive']
  },
  yieldUnit: {
    type: String,
    enum: ['quintals', 'tons', 'kg'],
    default: 'quintals'
  },
  expectedPrice: {
    type: Number,
    required: [true, 'Expected price is required'],
    min: [0, 'Expected price must be positive']
  },
  actualYield: {
    type: Number,
    default: 0
  },
  actualPrice: {
    type: Number,
    default: 0
  },
  irrigationType: {
    type: String,
    enum: ['drip', 'sprinkler', 'flood', 'rainfed'],
    default: 'rainfed'
  },
  fertilizerUsed: [{
    name: String,
    quantity: Number,
    unit: String,
    date: Date
  }],
  pesticidesUsed: [{
    name: String,
    quantity: Number,
    unit: String,
    date: Date
  }],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  images: [{
    type: String,
    default: []
  }],
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
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

// Calculate crop duration
cropSchema.virtual('duration').get(function() {
  if (this.startDate && this.expectedHarvestDate) {
    const duration = this.expectedHarvestDate - this.startDate;
    return Math.ceil(duration / (1000 * 60 * 60 * 24)); // days
  }
  return 0;
});

// Calculate profit/loss
cropSchema.virtual('profit').get(function() {
  if (this.actualYield && this.actualPrice && this.expectedPrice) {
    const actualRevenue = this.actualYield * this.actualPrice;
    const expectedRevenue = this.expectedYield * this.expectedPrice;
    return actualRevenue - expectedRevenue;
  }
  return 0;
});

// Ensure virtual fields are serialized
cropSchema.set('toJSON', { virtuals: true });
cropSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Crop', cropSchema); 