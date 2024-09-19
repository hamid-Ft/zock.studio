import React, { useEffect, useRef } from "react";

const StarsCanvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Adjust canvas size
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Number of stars
		const numStars = 500;
		const stars: { x: number; y: number; z: number }[] = [];
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		// Create stars with random positions and speeds
		for (let i = 0; i < numStars; i++) {
			stars.push({
				x: Math.random() * canvas.width - centerX,
				y: Math.random() * canvas.height - centerY,
				z: Math.random() * canvas.width,
			});
		}

		const draw = () => {
			// Clear the canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw each star
			ctx.fillStyle = "white";
			for (let i = 0; i < stars.length; i++) {
				const star = stars[i];
				const x = centerX + (star.x / star.z) * canvas.width;
				const y = centerY + (star.y / star.z) * canvas.height;

				const size = 1.5 * (1 - star.z / canvas.width);
				ctx.beginPath();
				ctx.arc(x, y, size, 0, Math.PI * 2, false);
				ctx.fill();

				// Update the star's position
				star.z -= 2;

				// Reposition the star to the background when it moves out of view
				if (star.z <= 0) {
					star.z = canvas.width;
					star.x = Math.random() * canvas.width - centerX;
					star.y = Math.random() * canvas.height - centerY;
				}
			}

			// Continue drawing in the next frame
			requestAnimationFrame(draw);
		};

		// Start the animation
		draw();

		// Resize event handler to adjust canvas size
		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);

		// Cleanup on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return <canvas ref={canvasRef} id="miCanvas" className="block"></canvas>;
};

export default StarsCanvas;
