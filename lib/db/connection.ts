import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage in Vercel Serverless environment.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  // If we have a connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection is being established, wait for it
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      // Vercel Serverless optimization options
      maxPoolSize: 10, // Reduce pool size for serverless
      serverSelectionTimeoutMS: 5000, // Fail fast if can't connect
      socketTimeoutMS: 45000, // Close sockets after 45 seconds
      // Retry settings
      retryWrites: true,
      retryReads: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('MongoDB connected successfully');
      }
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

// Export mongoose instance for convenience
export { mongoose };
