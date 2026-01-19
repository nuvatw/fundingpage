import mongoose, { Schema, Document, Model } from 'mongoose';

// Contact status type
export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

// Contact source type
export type ContactSource = 'restaurant' | 'general' | 'brand';

// Contact document interface
export interface IContact extends Document {
  name: string;
  email: string;
  question: string;
  status: ContactStatus;
  source?: ContactSource;
  repliedAt?: Date;
  repliedBy?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    question: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
      index: true,
    },
    source: {
      type: String,
      enum: ['restaurant', 'general', 'brand'],
    },
    repliedAt: { type: Date },
    repliedBy: { type: String },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: 'contacts',
  }
);

// Indexes for common queries
ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1, createdAt: -1 });
ContactSchema.index({ createdAt: -1 });

// Export model (with Next.js hot reload protection)
export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
