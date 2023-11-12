import type { RemainingTime } from "$lib/types/types.ts";

export function calculateRemainingTime(endTime: number) {
    const difference: number = endTime - new Date().getTime();
    
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(difference % (1000 * 60) / 1000)
    } 
}

export function formatRemainingTime(remainingTime: RemainingTime, format: string = "default") {
    const { days, hours, minutes, seconds } = remainingTime;
    
    return days > 0
        ? (format === "default" ? `${days}d ${hours}h ${minutes}m ${seconds}s` : `${days} days`)
        : hours > 0
        ? (format === "default" ? `${hours}h ${minutes}m ${seconds}s` : `${hours} hours`)
        : minutes > 0
        ? (format === "default" ? `${minutes}m ${seconds}s` : `${minutes} minutes`)
        : (format === "default" ? `${seconds}s` : `${seconds} seconds`);
}