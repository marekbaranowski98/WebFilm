export const convertRemToPx = (rem: number): number => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
