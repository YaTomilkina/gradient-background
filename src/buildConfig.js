import { config } from './config/config.js';
import { themes } from './config/themes.js';

export function buildConfig({ theme, gradientType = 'linear', shapes = true, ...userConfig }) {
    const themeConfig = theme && themes[theme] ? themes[theme] : {};

    return {
        ...config,
        ...themeConfig,
        ...userConfig,
        type: gradientType,
        colors: {
            ...config.colors,
            ...(themeConfig.colors || {}),
            ...(userConfig.colors || {}),
        },
        shapes: shapes === true
            ? {
                ...config.shapes,
                ...(themeConfig.shapes || {}),
                ...(userConfig.shapes || {}),
            }
            : false,
    };
}
