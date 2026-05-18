import "./loadEnv";
import { createApp } from "./app";

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");
const app = createApp();

app.listen(port, host, () => {
  console.log(`API listening on http://${host}:${port}`);
});
