import type { Settings, State } from './types';

export const STORAGE_KEYS = {
  SETTINGS: 'settings',
  USAGE_STATE: 'usage_state',
} as const;

// default settings
export const DEFAULT_SETTINGS: Settings = {
  sessionLimit: 30,
  dailyLimit: 120,
  maxSessionVideoCount: 5,
  maxDailyVideoCount: 20,
  fixedChallengeCount: 3,
  maxRandomChallengeCount: 2,
  extendTime: 15,
};

// Initial state for a fresh day/session
export const INITIAL_STATE: State = {
  sessionStartTimestamp: null,
  accumulatedWatchTime: 0,
  videosWatchedCount: 0,
  lastResetDate: new Date().toISOString().slice(0, 10), // "YYYY-MM-DD"
  activeUnlockGrant: null,
};

// retrieves settings from storage, merged with DEFAULT_SETTINGS
export async function getSettings(): Promise<Settings> {
  const result = await browser.storage.local.get(STORAGE_KEYS.SETTINGS);

  return {
    ...DEFAULT_SETTINGS,
    ...(result[STORAGE_KEYS.SETTINGS] as Partial<Settings> | undefined),
  };
}


// persists updated settings into storage
export async function setSettings(settings: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  await browser.storage.local.set({
    [STORAGE_KEYS.SETTINGS]: {
      ...current,
      ...settings,
    },
  });
}


// retrieves the current usage state, merged with INITIAL_STATE.
export async function getUsageState(): Promise<State> {
  const result = await browser.storage.local.get(STORAGE_KEYS.USAGE_STATE);

  return {
    ...INITIAL_STATE,
    ...(result[STORAGE_KEYS.USAGE_STATE] as Partial<State> | undefined),
  };
}

// updates usage state with partial changes.
export async function setUsageState(update: Partial<State>): Promise<void> {
  const current = await getUsageState();
  await browser.storage.local.set({
    [STORAGE_KEYS.USAGE_STATE]: {
      ...current,
      ...update,
    },
  });
}

// resets the usage counters
export async function resetDailyUsage(): Promise<void> {
  await setUsageState({
    accumulatedWatchTime: 0,
    videosWatchedCount: 0,
    lastResetDate: new Date().toISOString().slice(0, 10),
    activeUnlockGrant: null,
  });
}
