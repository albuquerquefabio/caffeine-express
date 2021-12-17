import { model, Schema } from 'mongoose'
import { IExampleDocument } from '../../types/example.type'

const ExampleSchema: Schema<IExampleDocument> = new Schema(
  {
    title: { type: String, required: [true, 'Title is required!'], trim: true },
    description: { type: String, default: '', trim: true },
    status: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

ExampleSchema.index({
  title: 'text',
  description: 'text'
})

export default model('Example', ExampleSchema)
