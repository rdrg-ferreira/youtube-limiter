import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

// Chrome reads a manifest.json at the extension root. WXT does not use a
// hand-written public/manifest.json — it generates one at build time from
// this `manifest` object plus your entrypoints (background, content, popup).
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
    // version is taken from package.json unless you set it here.
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
