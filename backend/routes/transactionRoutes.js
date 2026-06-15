import express from 'express'
import protect from '../middleware/authMiddleware.js'

import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transactionController.js'

const router = express.Router()

router.route('/')
  .post(protect, createTransaction)
  .get(protect, getTransactions)

router.route('/:id')
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction)

export default router