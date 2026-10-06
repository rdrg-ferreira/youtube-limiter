import type { ExtensionMessage } from '@/shared/messages';
import { evaluateLimits } from '@/domain/limits/evaluate';
import { getSettings, getUsageState, setUsageState } from "@/shared/storage";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener(async (message: ExtensionMessage, sender, sendResponse) => {
    switch (message.type) {
      case 'USAGE_TICK': {
        // update usage in browser local storage
        let currentUsage = await getUsageState();
        setUsageState({ accumulatedWatchTime: currentUsage.accumulatedWatchTime + message.payload.videoTimeSeconds});
        
        const settings = await getSettings();
        currentUsage = await getUsageState();

        const decision = evaluateLimits(settings, currentUsage);
        sendResponse(decision);
        break;
      }
      
      case 'GET_STATUS': {
        const settings = await getSettings();
        const currentUsage = await getUsageState();
        const decision = evaluateLimits(settings, currentUsage);

        sendResponse({ usage: currentUsage, decision: decision });
        break;
      }
    }

    return true;
  });
});
