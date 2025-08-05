const express = require('express');
const { body, validationResult } = require('express-validator');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { protect, isFarmer, isAgent } = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create payment order
// @route   POST /api/payment/create-order
// @access  Private (Farmer)
router.post('/create-order', [
  protect,
  isFarmer,
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('description').notEmpty().withMessage('Description is required')
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

    const { amount, description } = req.body;
    const farmer = req.user;

    // Find assigned agent
    const agent = await User.findById(farmer.assignedAgent);
    if (!agent) {
      return res.status(400).json({
        success: false,
        message: 'No agent assigned to you'
      });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: process.env.CURRENCY || 'INR',
      receipt: `payment_${Date.now()}`,
      notes: {
        farmer_id: farmer._id.toString(),
        agent_id: agent._id.toString(),
        description: description
      }
    };

    const order = await razorpay.orders.create(options);

    // Create payment record
    const payment = await Payment.create({
      farmer: farmer._id,
      agent: agent._id,
      amount: amount,
      description: description,
      razorpayOrderId: order.id,
      status: 'pending'
    });

    res.json({
      success: true,
      message: 'Payment order created successfully',
      data: {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        payment_id: payment._id
      }
    });
  } catch (error) {
    console.error('Create payment order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Verify payment
// @route   POST /api/payment/verify
// @access  Private (Farmer)
router.post('/verify', [
  protect,
  isFarmer,
  body('razorpay_order_id').notEmpty().withMessage('Order ID is required'),
  body('razorpay_payment_id').notEmpty().withMessage('Payment ID is required'),
  body('razorpay_signature').notEmpty().withMessage('Signature is required')
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

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Update payment status
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: 'completed',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        transactionDate: new Date()
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        payment: payment
      }
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get farmer payments
// @route   GET /api/payment/farmer
// @access  Private (Farmer)
router.get('/farmer', protect, isFarmer, async (req, res) => {
  try {
    const payments = await Payment.find({ farmer: req.user._id })
      .populate('agent', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        payments: payments
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

// @desc    Get agent payments
// @route   GET /api/payment/agent
// @access  Private (Agent)
router.get('/agent', protect, isAgent, async (req, res) => {
  try {
    const payments = await Payment.find({ agent: req.user._id })
      .populate('farmer', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        payments: payments
      }
    });
  } catch (error) {
    console.error('Get agent payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get payment statistics
// @route   GET /api/payment/stats
// @access  Private (Agent)
router.get('/stats', protect, isAgent, async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      { $match: { agent: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const totalPayments = await Payment.countDocuments({ agent: req.user._id });
    const completedPayments = await Payment.countDocuments({ 
      agent: req.user._id, 
      status: 'completed' 
    });
    const pendingPayments = await Payment.countDocuments({ 
      agent: req.user._id, 
      status: 'pending' 
    });

    res.json({
      success: true,
      data: {
        stats: stats,
        totalPayments,
        completedPayments,
        pendingPayments
      }
    });
  } catch (error) {
    console.error('Get payment stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 