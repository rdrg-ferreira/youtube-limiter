import type { UsageTickMessage } from "@/shared/messages";

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],

  main(ctx) {
    let tickInterval: number | null = null;

    function isVideoPage() {
      const path = window.location.pathname;
      return path === '/watch' || path.startsWith('/shorts/');
    }

    function checkAndTrack() {
      if (!isVideoPage()) {
        if (tickInterval) {
          clearInterval(tickInterval);
          tickInterval = null;
        }
        return;
      }

      if (!tickInterval) {
        tickInterval = window.setInterval(async () => {
          const video = document.querySelector("video");

          if (video && !video.paused && !video.ended && video.readyState >= 2) {
            const response = await browser.runtime.sendMessage<UsageTickMessage>({
              type: 'USAGE_TICK',
              payload: { videoTimeSeconds: 1 } // TODO: send video id to get video count
            });

            if (response && !response.allowed) {
              // stop video and show overlay
              video.pause();
            }
          }
        }, 1000);
      }
    }

    // this event triggers when the user swtiches pages
    window.addEventListener('yt-navigate-finish', checkAndTrack);
    checkAndTrack();
  },
});
