import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: '',
    },

    amount: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Transaction = mongoose.model(
  'Transaction',
  transactionSchema
)

export default Transaction