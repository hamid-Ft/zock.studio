'use client';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

export type TextFluidProps = {
	str: string;
	density: number;
	stageWidth: number;
	stageHeight: number;
};

const TextFluidCanvas = ({ str = 'ZOCK', density = 2, stageWidth = 300, stageHeight = 125 }: TextFluidProps) => {
	const textRef = useRef<HTMLCanvasElement>(null);
	const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		if (textRef.current) {
			const text = textRef.current;
			const ctx = text.getContext('2d');

			setCanvasContext(ctx);
		}
	}, []);

	useEffect(() => {
		if (canvasContext) {
			canvasContext.clearRect(0, 0, stageWidth, stageHeight);

			const fontWidth = 300;
			const fontSize = 74;
			const fontName = 'Hind';

			canvasContext.font = `${fontWidth} ${fontSize}px ${fontName}`;
			canvasContext.fillStyle = `rgba(0, 0, 0, 0.3)`;
			canvasContext.textBaseline = 'middle';
			const fontPos = canvasContext.measureText(str);
			canvasContext.fillText(
				str,
				(stageWidth - fontPos.width) / 2,
				fontPos.actualBoundingBoxAscent + fontPos.actualBoundingBoxDescent + (stageHeight - fontSize) / 2
			);

			const imageData = canvasContext.getImageData(0, 0, stageWidth, stageHeight).data;
			let particles = [];
			let i = 0;
			let width = 0;
			let pixel;

			for (let height = 0; height < stageHeight; height += density) {
				i++;
				const slide = i % 2 == 0;
				width = 0;
				if (slide) {
					width += 6;
				}
				for (width; width < stageWidth; width += density) {
					pixel = imageData[(height * stageWidth + width) * 4 - 1];
					if (pixel != 0 && width > 0 && width < stageWidth && height > 0 && height < stageHeight) {
						particles.push({ x: width });
					}
				}
			}
		}
	}, [canvasContext, density, stageHeight, stageWidth, str]);

	return <canvas ref={textRef} className="aboslute inset-0 border-2 border-red-800 bg-yellow-300 "></canvas>;
};

export default TextFluidCanvas;
