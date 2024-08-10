import image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";

export type VideoComponentProps = {
	video?: string;
	image?: string;
};

const VideoComponent: React.FC<VideoComponentProps> = ({
	video,
	image,
}: VideoComponentProps) => {
	const [isVideoReady, setIsVideoReady] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	useEffect(() => {
		const handleCanPlayThrough = () => {
			setIsVideoReady(true);
		};

		const handleMouseEnter = () => {
			if (videoRef.current) {
				videoRef.current.play();
			}
		};
		const handleMouseLeave = () => {
			if (videoRef.current) {
				videoRef.current.pause();
			}
		};
		const videoElement = videoRef.current;
		const videoContainer = document.querySelector(".video-component-container");

		if (videoElement) {
			videoElement.addEventListener("canplaythrough", handleCanPlayThrough);
		}

		if (videoContainer) {
			videoContainer.addEventListener("mouseenter", handleMouseEnter);
			videoContainer.addEventListener("mouseleave", handleMouseLeave);
		}
		return () => {
			if (videoContainer) {
				videoContainer.removeEventListener("mouseenter", handleMouseEnter);
				videoContainer.removeEventListener("mouseleave", handleMouseLeave);
			}
			if (videoElement) {
				videoElement.removeEventListener(
					"canplaythrough",
					handleCanPlayThrough
				);
			}
		};
	}, []);
	return (
		<>
			<video
				className="video-component-container"
				ref={videoRef}
				width={420}
				height={220}
				loop
				src={video}
				autoPlay
				poster={image}
			/>
		</>
	);
};

export default VideoComponent;
