import mongoose, { Schema } from 'mongoose'

const accountsSchema = new Schema({
  owner: {
    type: String
  },
  openDate: {
    type: String
  },
  balance: {
    type: Number
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

accountsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      owner: this.owner,
      openDate: this.openDate,
      balance: this.balance,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Accounts', accountsSchema)

export const schema = model.schema
export default model
