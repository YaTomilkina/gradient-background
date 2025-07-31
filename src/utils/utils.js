export function generateRandom(seed) {
    return () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
}

export function colorFactory(config) {
    return (hue, alpha = 1) =>
        `hsla(${hue % 360}, ${config.colors.saturation}%, ${config.colors.lightness}%, ${alpha})`;
}

export function generateHues(random, shapeCount, useShapes = true) {
    if (useShapes) {
        const firstHue = random() * 360;
        const lastHue = (firstHue + 180) % 360;
        return Array.from({ length: shapeCount + 1 }, (_, i) => {
            const t = i / shapeCount;
            return (firstHue + t * ((lastHue - firstHue + 360) % 360)) % 360;
        });
    } else {
        const firstHue = random() * 360;
        const secondHue = (firstHue + 180) % 360;
        return [firstHue, secondHue];
    }
}

export function calculateShapeAmount(random, shapesConfig) {
    if (!shapesConfig) return 0;
    return Math.floor(random() * (shapesConfig.maxCount - shapesConfig.minCount + 1)) + shapesConfig.minCount;
}

