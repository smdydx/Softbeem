
import { Schema, model } from 'mongoose';

const ContentSchema = new Schema({
  section: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ContentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Content = model('Content', ContentSchema);
