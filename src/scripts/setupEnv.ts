import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "../../");

const envPath = path.join(rootDir, ".env");
const examplePath = path.join(rootDir, ".env.example");

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(examplePath)) {
    const exampleContent = fs.readFileSync(examplePath, "utf8");
    fs.writeFileSync(envPath, exampleContent);
    console.log("[setupEnv] .env created from .env.example");
  } else {
    console.error("[setupEnv] .env.example not found!");
  }
} else {
  console.log("[setupEnv] .env already exists");
}
