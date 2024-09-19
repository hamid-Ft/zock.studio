import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectSlider = () => {
	// Data for slider and thumbnails
	const slides = [
		{
			id: 1,
			image: "/desna-png.png",
			alt: "desna",
			author: "ZOCK TEAM",
			title: "Company",
			topic: "DESNA",
			description:
				"desna is a software development company that specializes in b2b applications and solutuins for the food ketrine industry.Our team of experts is dedicated to providing high-quality software solutions for CEO. We are committed to delivering innovative solutions that meet the needs of our clients and help them achieve their business goals. also desna was one of companies that we controbuted and worked with in the past.",
			link: "https://desna.ir",
			color: "#f1683a",
		},
		{
			id: 2,
			image: "/royljeans.png",
			alt: "royljeans",
			author: "ZOCK TEAM",
			title: "Eccommerce",
			topic: "ROYAL JEANS",
			description:
				"RoyalJeans company is a leading eCommerce company in Iran. We offer a wide range of products and services to meet the needs of our customers. Our team of experts is dedicated to providing high-quality solutions that meet the needs of our clients and help them achieve their business goals. They have large B2B sales and customer base and needs special admin panel to have full control over their business.",
			link: "https://royljeans.ir",
			color: "#007BEC",
		},
		{
			id: 3,
			image: "/shabakedooni.png",
			alt: "shabakedooni",
			author: "ZOCK TEAM",
			title: "PORTFOLIO",
			topic: "SHABAKE DOONI",
			description:
				"This site was designed to be inovative for IT professionals. It is a portfolio of my co worker in hardware and devops field. He needs to run his brand and expand his business. So we collaborated to create this site. We have a lot of experience in this field and we are confident that we can help him achieve his goals.",
			link: "https://shabakedooni.ir",
			color: "rgb(90, 0, 226)",
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState("");
	const [isAnimating, setIsAnimating] = useState(false);

	const handleNext = () => {
		if (!isAnimating) {
			setIsAnimating(true);
			setDirection("next"); // Set the animation direction
			setCurrentIndex((prevIndex) =>
				prevIndex === slides.length - 1 ? 0 : prevIndex + 1
			);
			resetAnimation();
		}
	};

	const handlePrev = () => {
		if (!isAnimating) {
			setIsAnimating(true);
			setDirection("prev"); // Set the animation direction
			setCurrentIndex((prevIndex) =>
				prevIndex === 0 ? slides.length - 1 : prevIndex - 1
			);
			resetAnimation();
		}
	};

	const resetAnimation = () => {
		// After the animation duration, reset isAnimating and remove direction class
		setTimeout(() => {
			setIsAnimating(false);
			setDirection(""); // Clear the animation class
		}, 300); // Match the CSS animation duration
	};

	const getThumbnailOrder = (index: number) => {
		const order = [];
		for (let i = 0; i < slides.length; i++) {
			order.push(slides[(index + i) % slides.length]);
		}
		return order;
	};

	const orderedThumbnails = getThumbnailOrder(currentIndex);

	return (
		<section className={`carousel ${direction}`}>
			{/* Main Slider */}
			<div className="list">
				{slides.map((slide, index) => (
					<div
						className={`item ${index === currentIndex ? "active" : "hidden"}`}
						key={slide.id}>
						<Image
							src={slide.image}
							alt={slide.alt}
							fill
							style={{
								objectFit: "cover",
								filter: "blur(2px)",
								borderImage: "fill 0 linear-gradient(#0003,#000)",
							}}
						/>
						<div className="content bg-[#000000bb] p-4 rounded-lg backdrop-blur-sm">
							<div className="author">{slide.author}</div>
							<div className="title">{slide.title}</div>
							<div className={`topic`} style={{ color: slide.color }}>
								{slide.topic}
							</div>
							<p className="des">{slide.description}</p>
							<div className="buttons">
								<button
									style={{ backgroundColor: slide.color }}
									className={`border-none font-bold transition-all duration-100 ease-in-out`}>
									<Link
										href={slide.link}
										target="_blank"
										rel="noopener noreferrer">
										See Website
									</Link>
								</button>
								<button
									className={`!hover:bg-${slide.color} bg-transparent border-[1px] border-[${slide.color}] !hover:text-white`}>
									<Link
										href={"mailto:hamidfattahi.a@gmail.com"}
										target="_blank"
										className="font-black">
										Hire Us Now
									</Link>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Thumbnail */}
			<div className="thumbnail">
				{orderedThumbnails.map((slide, index) => (
					<div
						className={`item ${index === currentIndex ? "active" : ""}`}
						key={slide.id}>
						<Image
							src={slide.image}
							alt={slide.alt}
							fill
							style={{ objectFit: "cover" }}
						/>
						<div className="content">
							<h3 className="title text-center font-black bg-[#000000] backdrop-blur-lg rounded-lg p-2">
								{slide.title}
							</h3>
						</div>
					</div>
				))}
			</div>

			{/* Arrows */}
			<div className="arrows bg-[#000000bb]  flex justify-evenly bg-[#000000] backdrop-blur-lg rounded-lg p-2">
				<button id="prev" onClick={handlePrev}>
					{"<"}
				</button>
				check out
				<button id="next" onClick={handleNext}>
					{">"}
				</button>
			</div>
		</section>
	);
};

export default ProjectSlider;
