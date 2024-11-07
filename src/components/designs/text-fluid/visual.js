import { Text } from './text';
import { Particle } from './particles';
import { Texture, ParticleContainer } from 'pixi.js';
export class Visual {
	constructor() {
		this.text = new Text();
		this.texture = Texture.from('/particle.png');
		this.particle = [];
		this.mouse = {
			x: 0,
			y: 0,
			radius: 100,
		};
		document.addEventListener('pointermove', this.onMove.bind(this), false);
	}

	show(stageWidth, stageHeight, stage) {
		if (this.container) {
			stage.removeChild(this, stage);
		}
		this.pos = this.text.setText('ZOCK', 2, stageWidth, stageHeight);
		this.container = new ParticleContainer(this.pos.length, {
			vertices: false,
			position: true,
			rotation: false,
			scale: false,
			uvs: false,
			tint: false,
		});
		stage.addChild(this.container);

		this.particles = [];
		for (let i = 0; i < this.pos.length; i++) {
			const item = new Particle(this.pos[i], this.texture);
			this.container.addChild(item.sprite);
			this.particles.push(item);
		}
	}

	animate() {
		if (!Array.isArray(this.particles)) {
			console.warn('Particles array is not initialized');
			return;
		}
		for (let i = 0; i < this.particles.length; i++) {
			const item = this.particles[i];
			const dx = this.mouse.x - item.x;
			const dy = this.mouse.y - item.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const minDistance = item.radius + this.mouse.radius;
			if (distance < minDistance) {
				const angel = Math.atan2(dy, dx);
				const tx = item.x + Math.cos(angel) * minDistance;
				const ty = item.y + Math.sin(angel) * minDistance;
				const ax = tx - this.mouse.x;
				const ay = ty - this.mouse.y;
				item.vx -= ax; // /distance;
				item.vy -= ay; // /distance;
			}
			item.draw();
		}
	}

	onMove(e) {
		this.mouse.x = e.clientX;
		this.mouse.y = e.clientY;
	}
}
