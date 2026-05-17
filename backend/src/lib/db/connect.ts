import mongoose from "mongoose";

function getMongoUri(): string | undefined {
  return process.env.MONGODB_URI?.trim();
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/** Encode @ and other special chars in the password segment of a MongoDB URI. */
export function normalizeMongoUri(uri: string): string {
  const trimmed = uri.trim();
  const schemeMatch = trimmed.match(/^(mongodb(?:\+srv)?:\/\/)/);
  if (!schemeMatch) return trimmed;

  const rest = trimmed.slice(schemeMatch[0].length);
  const atIndex = rest.lastIndexOf("@");
  if (atIndex === -1) return trimmed;

  const credentials = rest.slice(0, atIndex);
  const hostAndOptions = rest.slice(atIndex + 1);
  const colonIndex = credentials.indexOf(":");
  if (colonIndex === -1) return trimmed;

  const username = credentials.slice(0, colonIndex);
  const password = credentials.slice(colonIndex + 1);

  let encodedPassword = password;
  try {
    encodedPassword = encodeURIComponent(decodeURIComponent(password));
  } catch {
    encodedPassword = encodeURIComponent(password);
  }

  if (encodedPassword === password) return trimmed;
  return `${schemeMatch[0]}${username}:${encodedPassword}@${hostAndOptions}`;
}

export function isDbConfigured(): boolean {
  return Boolean(getMongoUri());
}

function resetCache() {
  cached.conn = null;
  cached.promise = null;
}

export async function connectDB(): Promise<typeof mongoose> {
  const mongoUri = getMongoUri();
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set. Add it to backend/.env.local to use the database.");
  }
  if (cached.conn) return cached.conn;

  const uri = normalizeMongoUri(mongoUri);

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 15_000,
      })
      .then((conn) => {
        cached.conn = conn;
        return conn;
      })
      .catch((err) => {
        resetCache();
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    resetCache();
    throw err;
  }
}
