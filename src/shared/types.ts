export type Settings = {
    sessionLimit: number; // in minutes
    dailyLimit: number; // in minutes
    maxSessionVideoCount: number;
    maxDailyVideoCount: number;
    fixedChallengeCount: number;
    maxRandomChallengeCount: number;
    extendTime: number; // in minutes
};

export type State = {
    sessionStartTimestamp: number | null;
    accumulatedWatchTime: number; // in milliseconds
    videosWatchedCount: number;
    lastResetDate: string; // "YYYY-MM-DD"
    activeUnlockGrant: UnlockGrant | null;
};

export type BlockDecision = {
    allowed: boolean;
    reason?: 'session_limit' | 'daily_limit' | 'video_count';
    remainingMs?: number;
};

export type UnlockGrant = {
    until: number; // Date.now() timestamp
    scope: 'session' | 'day';
};