import mongoose, { Schema } from 'mongoose'

const clientsSchema = new Schema({
  type: {
    type: Number
  },
  name: {
    type: String
  },
  createDate: {
    type: String
  },
  address: {
    type: String
  },
  INN: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

clientsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      type: this.type,
      name: this.name,
      createDate: this.createDate,
      address: this.address,
      INN: this.INN,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Clients', clientsSchema)

export const schema = model.schema
export default model
