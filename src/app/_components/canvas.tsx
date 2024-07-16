import React, { useEffect, useRef, useState } from "react";

export interface ParticleProps {
	x: number;
	y: number;
	effect: EffectProps;
	mouse: Mouse;
}
export interface EffectProps {
	width: number;
	height: number;
	ctx: CanvasRenderingContext2D;
	mouse: Mouse;
}
export type Mouse = {
	x: number;
	y: number;
	radius: number;
};

export function debounce(
	func: Function,
	wait: number,
	immediate: boolean = false
) {
	let timeout: NodeJS.Timeout | undefined;
	return function (this: any, ...args: any[]) {
		const context = this;
		const later = function () {
			timeout = undefined;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && timeout === undefined;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

const CanvasComponent = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		// const debouncedHandleResize = debounce(() => {
		setDimensions({
			width: window.innerWidth, // * window.devicePixelRatio,
			height: window.innerHeight, // * window.devicePixelRatio,
		});
		// }, 250); // Adjust the delay as needed

		// window.addEventListener("resize", debouncedHandleResize);
		// debouncedHandleResize();

		// return () => window.removeEventListener("resize", debouncedHandleResize);
	}, []);

	useEffect(() => {
		let canvas = canvasRef.current;
		if (canvas === null) return;
		let ctx = canvas.getContext("2d");
		let animationFrameId: number | undefined;
		if (!canvas || !ctx) return;

		canvas.width = dimensions.width;
		canvas.height = dimensions.height;
		canvas.style.width = `${dimensions.width}px`;
		canvas.style.height = `${dimensions.height}px`;

		class Particle implements ParticleProps {
			originX: number;
			originY: number;
			effect: EffectProps;
			x: number;
			y: number;
			ctx: CanvasRenderingContext2D;
			vx: number;
			vy: number;
			ease: number;
			friction: number;
			dx: number;
			dy: number;
			distance: number;
			force: number;
			angle: number;
			size: number;
			mouse: Mouse;
			constructor({ x, y, effect }: ParticleProps) {
				this.originX = x;
				this.originY = y;
				this.effect = effect;
				this.x = Math.floor(x);
				this.y = Math.floor(y);
				this.ctx = this.effect.ctx;
				this.ctx.fillStyle = "white";
				this.vx = 0;
				this.vy = 0;
				this.ease = 0.2;
				this.friction = 0.95;
				this.dx = 0;
				this.dy = 0;
				this.distance = 0;
				this.force = 0;
				this.angle = 0;
				this.size = Math.floor(Math.random() * 5);
				this.mouse = effect.mouse;
				this.draw();
			}

			draw() {
				this.ctx.beginPath();
				this.ctx.fillRect(this.x, this.y, this.size, this.size);
			}

			update() {
				this.dx = this.effect.mouse.x - this.x;
				this.dy = this.effect.mouse.y - this.y;
				this.distance = this.dx * this.dx + this.dy * this.dy;
				this.force = (-this.effect.mouse.radius / this.distance) * 8;

				if (this.distance < this.effect.mouse.radius) {
					this.angle = Math.atan2(this.dy, this.dx);
					this.vx += this.force * Math.cos(this.angle);
					this.vy += this.force * Math.sin(this.angle);
				}

				this.x +=
					(this.vx *= this.friction) + (this.originX - this.x) * this.ease;
				this.y +=
					(this.vy *= this.friction) + (this.originY - this.y) * this.ease;
				this.draw();
			}
		}

		class Effect implements EffectProps {
			ctx: CanvasRenderingContext2D;
			mouse: Mouse;
			width: number;
			height: number;
			particlesArray: Particle[];
			gap: number;
			constructor(
				width: number,
				height: number,
				ctx: CanvasRenderingContext2D
			) {
				this.width = width;
				this.height = height;
				this.ctx = ctx;
				this.particlesArray = [];
				this.gap = 20;
				this.mouse = {
					x: 0,
					y: 0,
					radius: 2000,
				};

				window.addEventListener("mousemove", (e) => {
					this.mouse.x = e.clientX; //* window.devicePixelRatio;
					this.mouse.y = e.pageY; //* window.devicePixelRatio;
				});

				window.addEventListener("resize", () => {
					if (canvas === null) return;
					canvas.width = window.innerWidth; //* window.devicePixelRatio;
					canvas.height = window.innerHeight; //* window.devicePixelRatio;
					this.width = canvas.width;
					this.height = canvas.height;
					canvas.style.width = `${window.innerWidth}px`;
					canvas.style.height = `${window.innerHeight}px`;

					this.particlesArray = [];
					this.init();
				});

				this.init();
			}

			init() {
				for (let x = 0; x < this.width; x += this.gap) {
					for (let y = 0; y < this.height; y += this.gap) {
						this.particlesArray.push(
							new Particle({
								x,
								y,
								effect: this,
								mouse: {
									x: this.mouse.x,
									y: this.mouse.y,
									radius: this.mouse.radius,
								},
							})
						);
					}
				}
			}

			update() {
				this.ctx.clearRect(0, 0, this.width, this.height);
				for (let i = 0; i < this.particlesArray.length; i++) {
					this.particlesArray[i].update();
				}
			}
		}

		let effect = new Effect(dimensions.width, dimensions.height, ctx);

		function animate(): void {
			effect.update();
			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
		return () => {
			if (animationFrameId !== undefined) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, [dimensions]);

	return <canvas ref={canvasRef} className="absolute  inset-0"></canvas>;
};

export default CanvasComponent;
