export const convertRemToPx = (rem: number): number => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const convertMinuteToHourMinute = (minute: number): string => {
    return `${Math.floor(minute / 60)}h ${minute % 60}m`
};
