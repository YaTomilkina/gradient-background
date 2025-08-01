import { buildConfig } from './buildConfig.js';
import {generateRandom, colorFactory, generateHues, calculateShapeAmount} from './utils/utils.js';
import { drawGradient } from './draw/drawGradient.js';
import { drawShapes } from './draw/drawShapes.js';

export function gradient(seedString, options = {}) {
    const { size = 256 } = options;

    const config = buildConfig(options);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const seed = Array.from(seedString).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = generateRandom(seed);
    const color = colorFactory(config);

    const shapeCount = calculateShapeAmount(random, config.shapes);

    const hues = generateHues(random, shapeCount, Boolean(config.shapes));

    if (!config.shapes) {
        drawGradient(ctx, size, color, config, hues, random);
    } else {
        drawGradient(ctx, size, color, config, hues, random);
        drawShapes(ctx, size, color, config.shapes, hues, random);
    }

    return canvas.toDataURL();
}
