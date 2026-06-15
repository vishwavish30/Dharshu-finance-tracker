import Transaction from '../models/Transaction.js'

export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      user: req.user.id,
      type: req.body.type,
      title: req.body.title,
      notes: req.body.notes,
      amount: req.body.amount,
      date: req.body.date,
    })

    res.status(201).json(transaction)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ createdAt: -1 })

    res.json(transactions)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(
      req.params.id
    )

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      })
    }

    await transaction.deleteOne()

    res.json({
      message: 'Transaction deleted',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(
      req.params.id
    )

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      })
    }

    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )

    res.json(updatedTransaction)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}