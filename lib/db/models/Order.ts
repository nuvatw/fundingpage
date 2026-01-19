import mongoose, { Schema, Document, Model } from 'mongoose';

// Type definitions
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
export type PaymentMethod = 'credit_card' | 'atm';
export type InvoiceType = 'personal' | 'company';
export type OrderSource = 'restaurant' | 'general';

// Buyer interface
export interface IBuyer {
  name: string;
  email: string;
  phone: string;
  invoiceType: InvoiceType;
  companyName?: string;
  taxId?: string;
}

// Student interface
export interface IStudent {
  name: string;
  email: string;
  phone: string;
}

// Order document interface
export interface IOrder extends Document {
  orderId: string;
  planId: string;
  planTitle: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
  buyer: IBuyer;
  students: IStudent[];
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  // Payment tracking
  paymentId?: string;
  paidAt?: Date;
  atmDeadline?: Date;
  atmBankCode?: string;
  atmAccountNumber?: string;
  // Metadata
  source?: OrderSource;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Buyer subdocument schema
const BuyerSchema = new Schema<IBuyer>(
  {
    name: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, match: /^09\d{8}$/ },
    invoiceType: { type: String, enum: ['personal', 'company'], required: true },
    companyName: { type: String },
    taxId: { type: String, match: /^\d{8}$/ },
  },
  { _id: false }
);

// Student subdocument schema
const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, match: /^09\d{8}$/ },
  },
  { _id: false }
);

// Main Order schema
const OrderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    planId: {
      type: String,
      required: true,
      enum: ['basic', 'accompany', 'founder', 'starter', 'explorer', 'master'],
    },
    planTitle: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1, max: 50 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    discountAmount: { type: Number, default: 0, min: 0 },
    buyer: { type: BuyerSchema, required: true },
    students: {
      type: [StudentSchema],
      required: true,
      validate: {
        validator: (val: IStudent[]) => val.length >= 1,
        message: '至少需要一位學員',
      },
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'atm'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'cancelled', 'refunded'],
      default: 'pending',
      index: true,
    },
    paymentId: { type: String },
    paidAt: { type: Date },
    atmDeadline: { type: Date },
    atmBankCode: { type: String },
    atmAccountNumber: { type: String },
    source: {
      type: String,
      enum: ['restaurant', 'general'],
    },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
);

// Indexes for common queries
OrderSchema.index({ 'buyer.email': 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ planId: 1, status: 1 });

// Virtual for order URL
OrderSchema.virtual('orderUrl').get(function () {
  return `/checkout/success?orderId=${this.orderId}`;
});

// Pre-save middleware for ATM deadline calculation
OrderSchema.pre('save', function () {
  if (this.isNew && this.paymentMethod === 'atm' && !this.atmDeadline) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    this.atmDeadline = deadline;
  }
});

// Ensure virtuals are included in JSON output
OrderSchema.set('toJSON', { virtuals: true });
OrderSchema.set('toObject', { virtuals: true });

// Export model (with Next.js hot reload protection)
export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
