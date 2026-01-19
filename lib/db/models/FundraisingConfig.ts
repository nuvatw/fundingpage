import mongoose, { Schema, Document, Model } from 'mongoose';

// FundraisingConfig document interface
export interface IFundraisingConfig extends Document {
  configId: string; // Always 'main' for singleton pattern
  targetDisplay: string;
  targetAmount: number;
  currentAmount: number;
  supporters: number;
  deadline: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Virtual properties
  percentage?: number;
  daysRemaining?: number;
  isExpired?: boolean;
}

const FundraisingConfigSchema = new Schema<IFundraisingConfig>(
  {
    configId: {
      type: String,
      required: true,
      unique: true,
      default: 'main',
    },
    targetDisplay: {
      type: String,
      required: true,
      default: '100 萬',
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 1000000,
    },
    currentAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    supporters: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    deadline: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'fundraising_config',
  }
);

// Virtual for calculating percentage
FundraisingConfigSchema.virtual('percentage').get(function () {
  if (this.targetAmount === 0) return 0;
  return Math.round((this.currentAmount / this.targetAmount) * 100);
});

// Virtual for days remaining
FundraisingConfigSchema.virtual('daysRemaining').get(function () {
  const now = new Date();
  const diff = this.deadline.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Virtual for expired status
FundraisingConfigSchema.virtual('isExpired').get(function () {
  return new Date() > this.deadline;
});

// Ensure virtuals are included in JSON
FundraisingConfigSchema.set('toJSON', { virtuals: true });
FundraisingConfigSchema.set('toObject', { virtuals: true });

// Export model (with Next.js hot reload protection)
export const FundraisingConfig: Model<IFundraisingConfig> =
  mongoose.models.FundraisingConfig ||
  mongoose.model<IFundraisingConfig>('FundraisingConfig', FundraisingConfigSchema);
