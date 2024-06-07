"use client";
// /components/MainPage.tsx
import HeroSection from "./_components/hero-section";
import AboutSection from "./_components/about-section";
import VideoSection from "./_components/video-section";
import { blogPosts, projects } from "@/data/projects";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { lerp } from "@/utils/lerp";

const MainPage = () => {
	const mainRef = useRef<HTMLElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const videoSectionRef = useRef<HTMLElement | null>(null);
	const headerLeftRef = useRef<HTMLHeadingElement | null>(null);
	const headerRightRef = useRef<HTMLHeadingElement | null>(null);
	const projectsStickyRef = useRef<HTMLDivElement | null>(null);
	const projectsSliderRef = useRef<HTMLDivElement | null>(null);
	const blogSectionRef = useRef<HTMLElement | null>(null);
	const blogPostsRefs = useRef<(HTMLDivElement | null)[]>([]);
	const setBlogPostRef = useCallback(
		(index: number, element: HTMLDivElement | null) => {
			blogPostsRefs.current[index] = element;
		},
		[]
	);
	const circleSectionRef = useRef<HTMLElement | null>(null);
	const circleRef = useRef<HTMLDivElement | null>(null);
	const dContainerRef = useRef<HTMLDivElement | null>(null);
	const leftTextRef = useRef<HTMLParagraphElement | null>(null);
	const rightTextRef = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		const animateVideo = () => {
			const videoSection = videoSectionRef.current;
			const headerLeft = headerLeftRef.current;
			const headerRight = headerRightRef.current;
			const video = videoRef.current;
			if (!videoSection) return;
			let { bottom } = videoSection.getBoundingClientRect();
			let scale = 1 - (bottom - window.innerHeight) * 0.0005;
			scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale;
			if (video) video.style.transform = `scale(${scale})`;

			// Text transformation
			let textTrans = bottom - window.innerHeight;
			textTrans = textTrans < 0 ? 0 : textTrans;
			if (headerLeft)
				headerLeft.style.transform = `translateX(${-textTrans}px)`;
			if (headerRight)
				headerRight.style.transform = `translateX(${textTrans}px)`;
		};

		let projectTargetX = 0;
		let projectCurrentX = 0;

		let percentages = {
			small: 700,
			medium: 300,
			large: 100,
		};

		let limit =
			window.innerWidth <= 600
				? percentages.small
				: window.innerWidth <= 1100
					? percentages.medium
					: percentages.large;

		const setLimit = () => {
			limit =
				window.innerWidth <= 600
					? percentages.small
					: window.innerWidth <= 1100
						? percentages.medium
						: percentages.large;
		};

		const animateProjects = () => {
			const projectsSticky = projectsStickyRef.current;
			const projectSlider = projectsSliderRef.current;
			if (
				!projectsSticky ||
				!projectsSticky.parentElement ||
				!main ||
				!projectSlider
			)
				return;
			let offsetTop = projectsSticky.parentElement.offsetTop;
			let percentage =
				((main.scrollTop - offsetTop) / window.innerHeight) * 100;
			percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
			projectTargetX = percentage;
			projectCurrentX = lerp(projectCurrentX, projectTargetX, 0.1);
			projectSlider.style.transform = `translate3d(${-projectCurrentX}vw, 0 , 0)`;
		};
		const animateBlogPosts = () => {
			const blogSection = blogSectionRef.current;
			const blogPosts = blogPostsRefs.current;
			if (!blogSection || !blogPosts) return;
			let blogSectionTop = blogSection?.getBoundingClientRect().top ?? 0;

			for (let i = 0; i < blogPosts.length; i++) {
				if (blogPosts[i] && blogPosts[i].parentElement) {
					const parentElement = blogPosts[i].parentElement;
					if (parentElement.getBoundingClientRect().top <= 1) {
						let offset =
							(blogSectionTop + window.innerHeight * (i + 1)) * 0.0005;
						offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;
						if (i === 1) console.log(offset); // Assuming you want to log the offset for the second post
						blogPosts[i].style.transform = `scale(${1 + offset})`;
					}
				}
			}
		};
		const scrollCircle = () => {
			const circleSection = circleSectionRef.current;
			const circle = circleRef.current;
			if (!circleSection || !circle) return;
			let { top } = circleSection.getBoundingClientRect();
			let scaleTop = Math.abs(top);
			let scale = scaleTop / window.innerHeight;
			scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
			if (top <= 0) {
				circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
			} else {
				circle.style.transform = `translate(-50%, -50%) scale(${0})`;
			}
		};
		const scrollDiscover = () => {
			const dContainer = dContainerRef.current;
			const leftText = leftTextRef.current;
			const rightText = rightTextRef.current;
			if (!dContainer || !leftText || !rightText) return;
			let { bottom } = dContainer.getBoundingClientRect();
			let textTrans = bottom - window.innerHeight;
			textTrans = textTrans < 0 ? 0 : textTrans;
			leftText.style.transform = `translateX(${-textTrans}px)`;
			rightText.style.transform = `translateX(${textTrans}px)`;
		};

		const main = mainRef.current;
		if (!main) return;
		main.addEventListener("scroll", () => {
			animateVideo();
			scrollCircle();
			scrollDiscover();
		});
		window.addEventListener("resize", setLimit);
		return () => {
			main.removeEventListener("scroll", () => {
				animateVideo();
				scrollCircle();
				scrollDiscover();
			});
			window.removeEventListener("resize", setLimit);
		};
		``;
	}, []);

	return (
		<>
			<div className="line__container">
				<div className="separator"></div>
				<div className="separator"></div>
				<div className="separator"></div>
			</div>

			<main ref={mainRef}>
				<div className="scroll__container">
					<section id="hero">
						<div className="hero__container">
							<div className="hero__title">
								<h1 className="hero__title__header text__reveal">ZOCK</h1>
							</div>
							<div className="hero__cta">
								<h4>STUDIO</h4>
							</div>
						</div>
					</section>

					<section id="about">
						<div className="about__container">
							<div className="about__text">
								<p>We enable rapid growth through digital creation</p>
							</div>
						</div>
					</section>

					<section id="video" ref={videoSectionRef}>
						<div className="shim"></div>
						<div className="video__sticky">
							<video
								ref={videoRef}
								className="main__video"
								autoPlay
								muted
								loop
								playsInline
								src="https://framerusercontent.com/modules/assets/BcIElVBzSD9P1ht5PhehnVyzTA~0iRDOKjSaNyoXJfsXAcSsdeEYSbJ8aAp3MvS5ts7LL0.mp4"></video>
							<div className="video__text__overlay">
								<h2 ref={headerLeftRef} className="text__header__left">
									ZOCK
								</h2>
								<h2 ref={headerRightRef} className="text__header__right">
									STUDIO
								</h2>
							</div>
						</div>
					</section>

					<section id="projects">
						<div ref={projectsStickyRef} className="projects__sticky">
							<div className="slider__container">
								<div ref={projectsSliderRef} className="projects__slider">
									{projects.map((project, index) => (
										<div key={index} className={`project ${project.pos}`}>
											<div className="image__container">
												<Image
													className="project__image"
													alt="project"
													src={project.image}
													width={300}
													height={250}
												/>
											</div>
											<div className="project__details">
												<p className="project__title">{project.name}</p>
												<p className="project__type">{project.type}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</section>

					<section ref={blogSectionRef} id="blog">
						<div className="blog__hero">
							<h2 className="text__reveal">BLOG</h2>
						</div>
						{blogPosts.map((post, index) => (
							<div className="blog__post" key={index}>
								<div
									ref={(element) => setBlogPostRef(index, element)}
									className="post">
									<div className="post__image__container">
										<Image
											width={300}
											height={250}
											className="blog__post__img"
											src={post.image}
											alt={post.title}
										/>
									</div>
									<div className="post__details">
										<p>{post.title}</p>
										<p>{post.time}</p>
									</div>
								</div>
							</div>
						))}
					</section>

					<section ref={circleSectionRef} id="circle__section">
						<div className="circle__sticky">
							<h2>ABOUT</h2>
							<div className="circle__container">
								<div ref={circleRef} className="circle"></div>
							</div>
						</div>
					</section>

					<section id="discover">
						<div ref={dContainerRef} className="discover__container">
							<p ref={leftTextRef} className="text__left">
								THIS SITE WAS DESIGNED BY OUR CREATIVE TEAM
							</p>
							<p ref={rightTextRef} className="text__right">
								EXCLUSIVE FOR THE BRAND ZOCK
							</p>
						</div>
					</section>

					<section id="end__video">
						<div className="shim"></div>
						<div className="end__video__container">
							<video
								className="end__video"
								autoPlay
								muted
								loop
								playsInline
								src="https://framerusercontent.com/assets/sagu9WJMRc7UvZaZc4N2cUQ68Z4.mp4"></video>
						</div>
					</section>

					<section id="footer">
						<div className="footer__container">
							<div className="footer__title">
								<h2 className="text__reveal">ZOCK</h2>
							</div>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default MainPage;
