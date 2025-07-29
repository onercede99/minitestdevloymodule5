import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // SỬA DÒNG NÀY CHO CHÍNH XÁC VỚI TÊN REPO CỦA BẠN
  base: "/minitestdevloymodule5/",
});
