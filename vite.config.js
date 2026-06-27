import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow ngrok tunnel hosts (and other external hosts) to access the dev server
    allowedHosts: ['.ngrok-free.app', '.ngrok.io', '.ngrok.app'],
  },
});
