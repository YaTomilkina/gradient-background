export function drawGradient(ctx, size, color, cfg, hues, random) {
    let gradient;
    if (cfg.type === 'radial') {
        const {centerX, centerY} = generateCenterCoordinates(random, size);

        const innerRadius = size * (0.05 + random() * 0.1);
        const outerRadius = size * (0.8 + random() * 0.3);

        gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);

        hues.forEach((h, i) => {
            gradient.addColorStop(i / (hues.length - 1), color(h));
        })
    } else {
        gradient = ctx.createLinearGradient(0, 0, size, size);
    }

    if (hues.length === 2) {
        gradient.addColorStop(0, color(hues[0]));
        gradient.addColorStop(1, color(hues[1]));
    } else {
        hues.forEach((h, i) => gradient.addColorStop(i / (hues.length - 1), color(h)));
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
}

export function generateCenterCoordinates(random, size) {
    const edge = Math.floor(random() * 4);

    let centerX = size * (0.1 + random() * 1.0);
    let centerY = size * (0.1 + random() * 1.0);

    const offset = size * (0.1 + random() * 0.15);

    if (edge === 0) centerX = -offset;
    else if (edge === 1) centerX = size + offset;
    else if (edge === 2) centerY = -offset;
    else if (edge === 3) centerY = size + offset;

    return {centerX, centerY};
}

