
export function drawShapes(ctx, size, color, cfg, hues, random) {
    const shapeCount = hues.length - 1; // кольорів завжди на 1 більше

    for (let i = 0; i < shapeCount; i++) {
        const { centerX, centerY, baseRadius, points } = generateBlobCoordinates(size, random, cfg);
        const hueA = hues[i];
        const hueB = hues[i + 1];

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = size;
        tempCanvas.height = size;
        const tempCtx = tempCanvas.getContext('2d');

        drawBlob(tempCtx, points, centerX, centerY, baseRadius, hueA, hueB, random, color, cfg);

        ctx.filter = `blur(${cfg.blur}px)`;
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.filter = 'none';
    }
}


function generateBlobCoordinates(size, random, cfg) {
    const centerX = size * random();
    const centerY = size * random();
    const pointCount = Math.floor(random() * (cfg.maxPoints - cfg.minPoints + 1)) + cfg.minPoints;
    const baseRadius = size * (cfg.baseRadiusMin + random() * (cfg.baseRadiusMax - cfg.baseRadiusMin));
    const points = [];

    for (let j = 0; j < pointCount; j++) {
        const angle = (j / pointCount) * Math.PI * 2;
        const r = baseRadius * (0.5 + random() * cfg.radiusVariance);
        points.push({ x: centerX + Math.cos(angle) * r, y: centerY + Math.sin(angle) * r });
    }
    return { centerX, centerY, baseRadius, points };
}

function drawBlob(ctx, points, centerX, centerY, baseRadius, hueA, hueB, random, color, cfg) {
    const gradAngle = random() * 2 * Math.PI;
    const grad = ctx.createLinearGradient(
        centerX + Math.cos(gradAngle) * baseRadius,
        centerY + Math.sin(gradAngle) * baseRadius,
        centerX - Math.cos(gradAngle) * baseRadius,
        centerY - Math.sin(gradAngle) * baseRadius
    );
    grad.addColorStop(0, color(hueA, cfg.alpha));
    grad.addColorStop(1, color(hueB, cfg.alpha));

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let j = 1; j < points.length; j++) {
        const prev = points[j - 1];
        const curr = points[j];
        ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) / 2, (prev.y + curr.y) / 2);
    }

    const last = points[points.length - 1];
    const first = points[0];
    ctx.quadraticCurveTo(last.x, last.y, (last.x + first.x) / 2, (last.y + first.y) / 2);
    ctx.closePath();
    ctx.fill();
}
