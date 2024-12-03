import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ['favicon.ico', "apple-touch-icon.png", "favicon-96x96.png" ],
  manifest: {
    name: "Weather app",
    short_name: "Weather app",
    description: "An app that can show the weather forecast for your city.",
    icons: [
      {
        src: 'favicon.svg', // Укажите путь к вашей SVG-иконке
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: 'favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};


export default defineConfig({
  plugins: [react(), 
    VitePWA(manifestForPlugin)
  ],
  server: {
    port: 3000, // Замените 3000 на желаемый порт
  },
});
