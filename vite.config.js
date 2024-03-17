import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve("../certs/fsportal.test/fsportal.test.key")
      ),
      cert: fs.readFileSync(
        path.resolve("../certs/fsportal.test/fsportal.test.crt")
      ),
    },
    host: "fsportal.test",
    port: 5173,
  },
});
