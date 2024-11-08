import { Sprite } from 'pixi.js';

const FRICTION = 0.86;
const MOVE_SPEED = 0.1;

export class Particle {
	constructor(pos, texture) {
		this.sprite = new Sprite(texture);
		this.sprite.scale.set(0.2);
		this.sprite.tint = 0x22ff22;

		this.savedX = pos.x;
		this.savedY = pos.y;
		this.x = pos.x;
		this.y = pos.y;
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.vx = 0;
		this.vy = 0;
		this.radius = 10;
	}
	draw() {
		this.x += (this.savedX - this.x) * MOVE_SPEED;
		this.y += (this.savedY - this.y) * MOVE_SPEED;

		this.vx *= FRICTION;
		this.vy *= FRICTION;

		this.x += this.vx;
		this.y += this.vy;

		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}
