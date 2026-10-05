import type { Settings, UsageState, BlockDecision } from "@/shared/types";

export default function evaluateLimits(
    settings: Settings,
    usage: UsageState,
    now: any // TODO: change to actual type
): BlockDecision {
    return { allowed: true };
}
