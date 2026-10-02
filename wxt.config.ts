import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'YouTube Limiter',
    description:
      'Limit YouTube usage by session time, time of day, video count, and optional unlock challenges.',
    // version is taken from package.json unless it's set here.
    permissions: ['storage', 'alarms'],
    host_permissions: ['*://*.youtube.com/*'],
    action: {
      default_title: 'YouTube Limiter',
    },
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      96: 'icon/96.png',
      128: 'icon/128.png',
    },
  },
});
