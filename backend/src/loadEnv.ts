import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// Monorepo root fallback (if env lives at project root)
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });
