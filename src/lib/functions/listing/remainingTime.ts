import type { RemainingTime } from "$lib/types/types.ts";

export function calculateRemainingTime(endTime: number, opposite: boolean = false) {
    let difference: number = endTime - new Date().getTime();

    if (opposite) difference *= -1;
    
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(difference % (1000 * 60) / 1000)
    } 
}

export function formatRemainingTime(remainingTime: RemainingTime, format: "default" | "short" | "other" = "default") {
    const { days, hours, minutes, seconds } = remainingTime;

    const addS = (value: number, unit: string) => (value === 1 ? `${value} ${unit}` : `${value} ${unit}s`);

    switch (format) {
        case "short":
            return days > 0
                ? addS(days, "day")
                : hours > 0
                ? `${hours}h`
                : minutes > 0
                ? `${minutes}m`
                : `${seconds}h`;

        case "other":
            return days > 0
                ? addS(days, "day")
                : hours > 0
                ? addS(hours, "hour")
                : minutes > 0
                ? addS(minutes, "minute")
                : addS(seconds, "second");

        default:
            return days > 0
                ? `${days}d ${hours}h ${minutes}m ${seconds}s`
                : hours > 0
                ? `${hours}h ${minutes}m ${seconds}s`
                : minutes > 0
                ? `${minutes}m ${seconds}s`
                : `${seconds}s`;
    }
}