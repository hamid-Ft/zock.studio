// // particles.js

// import React, { useEffect, useRef } from 'react';
// import { Sprite, Application, useApp } from '@inlet/react-pixi-fiber';

// export type ParticleProps = {
// 	x: number;
// 	y: number;
// 	vx: number;
// 	vy: number;
// };

// const Particle = ({ x = 100, y = 100, vx = 0, vy = 0 }: ParticleProps) => {
// 	const spriteRef = useRef(null);
// 	console.log(spriteRef);
// 	const app = useApp();

// 	useEffect(() => {
// 		if (!spriteRef.current) return;

// 		const particle = spriteRef.current;

// 		// Set initial position
// 		particle.position.set(x, y);

// 		// Set velocity
// 		particle.vx = vx || 0;
// 		particle.vy = vy || 0;

// 		// Add update function
// 		app.stage.addChild(particle);
// 		app.ticker.add(() => {
// 			particle.position.x += particle.vx;
// 			particle.position.y += particle.vy;
// 		});

// 		return () => {
// 			app.stage.removeChild(particle);
// 			app.ticker.remove();
// 		};
// 	}, [app]);

// 	return (
// 		<Sprite
// 			ref={spriteRef}
// 			image="path/to/your/image.png"
// 			anchor={{ x: 0.5, y: 0.5 }}
// 			scale={[0.2, 0.2]}
// 			tint={0x22ff22}
// 		/>
// 	);
// };

// export default Particle;
