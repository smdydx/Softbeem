
import { Schema, model } from 'mongoose';

const SiteSettingsSchema = new Schema({
  settingKey: {
    type: String,
    required: true,
    unique: true
  },
  settingValue: {
    type: Schema.Types.Mixed,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String,
    default: 'admin'
  }
});

SiteSettingsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const SiteSettings = model('SiteSettings', SiteSettingsSchema);
