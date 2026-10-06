import type { Settings, UsageState, BlockDecision } from "@/shared/types";

export function evaluateLimits(
    settings: Settings,
    usage: UsageState
): BlockDecision {
    return { allowed: true };
}
