import mongoose, { Schema } from 'mongoose'

const transactionsSchema = new Schema({
  outAccount: {
    type: String
  },
  inAccount: {
    type: String
  },
  amount: {
    type: Number
  },
  date: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

transactionsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      outAccount: this.outAccount,
      inAccount: this.inAccount,
      amount: this.amount,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Transactions', transactionsSchema)

export const schema = model.schema
export default model
