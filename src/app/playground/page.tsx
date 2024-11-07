'use client';
import React, { useEffect, useState } from 'react';
import { Stage, Sprite, Container, ParticleContainer } from '@pixi/react';
// import { extensions, Application, InteractionManager } from 'pixi.js';
import { EventSystem } from '@pixi/events';
import { Text } from '@/components/designs/text-fluid/text';

const TextFluidVisual = () => {
	const [particles, setParticles] = useState<Array<any>>([]);

	useEffect(() => {
		const text = new Text();
		const particlesArray = text.setText('Z', 2, 500, 500);
		setParticles(particlesArray);
	}, []);
	// console.log(particles);
	return (
		<main className="bg-pink-400  flex flex-col items-centerjustify-center">
			<section className="w-[30rem] max-w-lg  my-14 relative">
				<Stage
					options={{
						antialias: true,
						resolution: 2,
						autoDensity: true,
						powerPreference: 'high-performance',
						backgroundColor: 0x000000,
					}}>
					<ParticleContainer
						maxSize={particles.length}
						properties={{
							vertices: false,
							position: true,
							rotation: false,
							scale: false,
							uvs: false,
							tint: false,
						}}>
						{particles.map((particle, i) => (
							<Sprite
								key={i}
								image="/particle.png"
								scale={{ x: 0.2, y: 0.2 }}
								tint={0x22ff22}
								x={particle.x}
								y={particle.y}
							/>
						))}
					</ParticleContainer>
				</Stage>
			</section>
		</main>
	);
};

export default TextFluidVisual;
