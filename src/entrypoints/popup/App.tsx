import { useEffect, useState } from 'react';
import { getUsageState, STORAGE_KEYS } from '@/shared/storage';
import type { UsageState } from '@/shared/types';

function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function App() {
  const [usage, setUsage] = useState<UsageState | null>(null);

  useEffect(() => {
      getUsageState().then(setUsage);

      const handleStorageChange = (
        changes: Record<string, Browser.storage.StorageChange>,
        areaName: string,
      ) => {
        if (areaName === "local" && changes[STORAGE_KEYS.USAGE_STATE]) {
          setUsage(
            changes[STORAGE_KEYS.USAGE_STATE]?.newValue as UsageState,
          );
        }
      };

      browser.storage.onChanged.addListener(handleStorageChange);

      return () => {
        browser.storage.onChanged.removeListener(handleStorageChange);
      };
  }, []);

  return (
    <div className="w-80 p-4">
      <h1 className="text-lg font-semibold text-zinc-900">YouTube Limiter</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Popup is using Tailwind CSS. Settings and usage status will live here.
      </p>
    </div>
  );
}

export default App;
