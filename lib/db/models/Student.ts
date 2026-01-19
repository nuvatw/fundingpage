import mongoose, { Schema, Document, Model } from 'mongoose';

// Course progress interface
export interface ICourseProgress {
  courseId: string;
  courseTitle: string;
  startedAt?: Date;
  completedAt?: Date;
  progress: number; // 0-100
  lastAccessedAt?: Date;
}

// Active plan interface
export interface IActivePlan {
  planId: string;
  planTitle: string;
  purchasedAt: Date;
  expiresAt?: Date;
  orderId: string;
}

// Student document interface
export interface IStudent extends Document {
  email: string;
  name: string;
  phone: string;
  // Linked orders
  orderIds: string[];
  // Active plans
  activePlans: IActivePlan[];
  // Course progress (future)
  courseProgress: ICourseProgress[];
  // Metadata
  registeredAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseProgressSchema = new Schema<ICourseProgress>(
  {
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    startedAt: { type: Date },
    completedAt: { type: Date },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    lastAccessedAt: { type: Date },
  },
  { _id: false }
);

const ActivePlanSchema = new Schema<IActivePlan>(
  {
    planId: { type: String, required: true },
    planTitle: { type: String, required: true },
    purchasedAt: { type: Date, required: true },
    expiresAt: { type: Date },
    orderId: { type: String, required: true },
  },
  { _id: false }
);

const StudentSchema = new Schema<IStudent>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    orderIds: [{ type: String }],
    activePlans: [ActivePlanSchema],
    courseProgress: [CourseProgressSchema],
    registeredAt: { type: Date, default: Date.now },
    lastLoginAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'students',
  }
);

// Indexes
StudentSchema.index({ 'activePlans.planId': 1 });
StudentSchema.index({ isActive: 1 });

// Export model (with Next.js hot reload protection)
export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
