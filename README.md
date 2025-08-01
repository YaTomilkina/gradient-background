# 🎨 Gradient Background Generator

A lightweight, seed-based gradient and blob shape generator for the browser or Node.js.  
It creates unique, reproducible gradient images from any input string.

---

## ✨ Features
- 🎯 Seed-based: same input → same output.
- 🌈 Customizable gradients: linear or radial gradients.
- 💧 Organic shapes (blobs): configurable count, blur, and alpha.
- 🎨 Color schemes: complementary colors with evenly spaced hues.
- 🔄 Deterministic randomness: colors and positions are reproducible.
- 🖼 Canvas-based: outputs data:image/png URLs ready for <img> tags or Node.js.

---

## 🚀 Installation

### Install from npm
npm install gradient-background

---

## 🔧 Usage

### Basic example

```bash
import { gradient } from 'gradient-background';
const img = document.createElement('img');
img.src = gradient('John Doe');
document.body.appendChild(img);
```

### With options
```bash
const imageDataUrl = gradient('John Doe', {
size: 512,
shapes: true,
theme: 'dark',
gradientType: 'radial'
});
```
---

## 📚 API

### gradient(seedString: string, options?: GradientOptions): string
Generates a base64 PNG image from the given seed.

#### Options:
- size (number, default: 256): Canvas size in pixels (width = height).
- shapes (boolean, default: true): Enable or disable organic blob shapes.
- theme (string): Predefined color scheme: dark, vibrant, pastel.
- gradientType (string, default: linear): Gradient type: linear or radial.

---

## 🎨 Example Output

![Example](https://raw.githubusercontent.com/yatomilkina/gradient-background/main/example/img.png)

---

## 🖥 Node.js
You can use node-canvas in Node.js:

```bash
import { createCanvas } from 'canvas';
import { gradient } from 'gradient-generator';

const imgData = gradient('Node Example', { size: 512 });
```