'use client';
import { blogPosts, projects } from '@/data/projects';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { lerp } from '@/utils/lerp';
import Canvas from './_components/canvas';
import VideoComponent from './_components/videoComponent';
import ProjectSlider from './_components/projects-slider';
import StartsCanvas from './_components/start-canvas';

const MainPage = () => {
	const mainRef = useRef<HTMLElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const videoSectionRef = useRef<HTMLElement | null>(null);
	const headerLeftRef = useRef<HTMLHeadingElement | null>(null);
	const headerRightRef = useRef<HTMLHeadingElement | null>(null);
	const projectsStickyRef = useRef<HTMLDivElement | null>(null);
	const projectsSliderRef = useRef<HTMLDivElement | null>(null);
	const blogSectionRef = useRef<HTMLElement | null>(null);
	const blogPostsRefs = useRef<Array<HTMLDivElement>>([]);

	const circleSectionRef = useRef<HTMLElement | null>(null);
	const circleRef = useRef<HTMLDivElement | null>(null);
	const dContainerRef = useRef<HTMLDivElement | null>(null);
	const leftTextRef = useRef<HTMLParagraphElement | null>(null);
	const rightTextRef = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		const main = mainRef.current;

		const textReveals = [...document.querySelectorAll('.text__reveal')];
		let callback = (entries: any[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log(entry);
					[...entry.target.querySelectorAll('span')].forEach((span, idx) => {
						setTimeout(() => {
							span.style.transform = `translateY(0)`;
						}, (idx + 1) * 50);
					});
				}
			});
		};
		let options = {
			rootMargin: '0px',
			threshold: 1.0,
		};
		let observer = new IntersectionObserver(callback, options);
		textReveals.forEach((text) => {
			let string = (text as HTMLElement).innerText;
			let html = '';
			for (let i = 0; i < string.length; i++) {
				html += `<span>${string[i]}</span>`;
			}
			text.innerHTML = html;
			observer.observe(text);
		});
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
			if (headerLeft) headerLeft.style.transform = `translateX(${-textTrans}px)`;
			if (headerRight) headerRight.style.transform = `translateX(${textTrans}px)`;
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
			if (!projectsSticky || !projectsSticky.parentElement || !main || !projectSlider) return;
			let offsetTop = projectsSticky.parentElement.offsetTop;
			let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100;
			percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
			projectTargetX = percentage;
			projectCurrentX = lerp(projectCurrentX, projectTargetX, 0.1);
			projectSlider.style.transform = `translate3d(${-projectCurrentX}vw, 0 , 0)`;
		};
		// const animateProjects = () => {
		// 	const projectsSticky = projectsStickyRef.current;
		// 	const projectSlider = projectsSliderRef.current;
		// 	if (
		// 		!projectsSticky ||
		// 		!projectsSticky.parentElement ||
		// 		!main ||
		// 		!projectSlider
		// 	)
		// 		return;

		// 	// Get the total scrollable height of the page
		// 	const scrollHeight = main.scrollHeight - window.innerHeight;
		// 	// Get the current scroll position as a percentage
		// 	let scrollPosition = main.scrollTop / scrollHeight;

		// 	// Get the full width of the slider (considering the number of projects)
		// 	const totalSliderWidth = projectSlider.scrollWidth;
		// 	const viewportWidth = window.innerWidth;

		// 	// Calculate how far we need to translate the slider (we map the scroll to slider width)
		// 	let translateX = scrollPosition * (totalSliderWidth - viewportWidth);

		// 	// Apply the translation (move the slider based on the calculated translateX)
		// 	projectSlider.style.transform = `translate3d(${-translateX}px, 0 , 0)`;
		// };

		const scrollBlogPosts = () => {
			const blogSection = blogSectionRef.current;
			const blogPosts = blogPostsRefs.current;
			if (!blogSection || !blogPosts) return;
			let blogSectionTop = blogSection?.getBoundingClientRect().top ?? 0;

			for (let i = 0; i < blogPosts.length; i++) {
				const parentElement = blogPosts[i].parentElement;
				if (parentElement!.getBoundingClientRect().top <= 1) {
					let offset = (blogSectionTop + window.innerHeight * (i + 1)) * 0.0005;
					offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;
					if (i === 1) console.log(offset); // Assuming you want to log the offset for the second post
					blogPosts[i].style.transform = `scale(${1 + offset})`;
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
		let animationFrameId: number;
		function animate() {
			animateProjects();
			// requestAnimationFrame(animate);
			animationFrameId = requestAnimationFrame(animate);
		}
		animate();
		if (!main) return;
		main.addEventListener('scroll', () => {
			animateVideo();
			scrollCircle();
			scrollDiscover();
		});
		window.addEventListener('resize', setLimit);
		return () => {
			main.removeEventListener('scroll', () => {
				animateVideo();
				scrollBlogPosts();

				scrollCircle();
				scrollDiscover();
			});
			window.removeEventListener('resize', setLimit);
			cancelAnimationFrame(animationFrameId);
		};
		``;
	}, []);

	return (
		<>
			{/* <div className="line__container">
				<div className="separator"></div>
				<div className="separator"></div>
				<div className="separator"></div>
			</div> */}
			<main className="relative" ref={mainRef}>
				<div className="scroll__container">
					<section id="hero">
						<Canvas />
						<div className="hero__container ">
							<div className="hero__title select-none bg-[#000000] rounded-lg backdrop-blur-sm">
								<h1 className="hero__title__header text__reveal ">ZOCK</h1>
							</div>
							<div className="hero__cta select-none flex flex-col items-center">
								<h2 className="text-center leading-8 inline-block bg-[#000000] rounded-lg backdrop-blur-sm">
									STUDIO
								</h2>
								<p className="bg-[#000000] rounded-lg backdrop-blur-sm">
									We enable rapid growth through digital creation
								</p>
							</div>
						</div>
					</section>

					<section id="video" ref={videoSectionRef}>
						<div className="shim"></div>
						<div className="video__sticky">
							<StartsCanvas />
							{/* <video
								ref={videoRef}
								className="main__video"
								autoPlay
								muted
								loop
								playsInline
								src="https://framerusercontent.com/modules/assets/BcIElVBzSD9P1ht5PhehnVyzTA~0iRDOKjSaNyoXJfsXAcSsdeEYSbJ8aAp3MvS5ts7LL0.mp4"></video> */}
							<div className="video__text__overlay">
								<h2 ref={headerLeftRef} className="text__header__left">
									PRO
								</h2>
								<h2 ref={headerRightRef} className="text__header__right">
									JECT
								</h2>
							</div>
						</div>
					</section>
					<ProjectSlider />
					<section id="projects">
						<div ref={projectsStickyRef} className="projects__sticky">
							<div className="slider__container">
								<div ref={projectsSliderRef} className="projects__slider">
									{projects.map((project, index) => (
										<div key={index} className={`project ${project.pos}`}>
											<div className="image__container">
												{project.image && (
													<Image
														src={project.image}
														alt={project.name}
														fill
														style={{ objectFit: 'contain' }}
													/>
													// <>
													// 	<VideoComponent
													// 		// video={project.video}
													// 		image={project.image}
													// 	/>
													// </>
												)}
											</div>
											{/* <div className="project__details">
												<p className="project__title">{project.name}</p>
												<p className="project__type">{project.type}</p>
											</div> */}
										</div>
									))}
								</div>
							</div>
						</div>
					</section>

					{/* <section ref={blogSectionRef} id="blog">
						<div className="blog__hero">
							<h2 className="text__reveal">BLOG</h2>
						</div>
						{blogPosts.map((post, index) => (
							<div className="blog__post" key={index}>
								<div
									ref={(element) => {
										if (element !== null) {
											blogPostsRefs.current[index] = element;
										}
									}}
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
					</section> */}

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
								THIS SITE WAS DESIGNED BY HAMID FATTAHI
							</p>
							<p ref={rightTextRef} className="text__right">
								EXCLUSIVE FOR THE ZOCK TEAM AND THE BRAND
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
						<div className="footer__container h-96">
							<div className="footer__title">
								<span className="flex items-center  leading-none text-black text-[clamp(2rem,30cqi,20rem)]">
									Z
									<div className="letter-o mr-2 -translate-y-2">
										<div className="counter-o"></div>
									</div>
									CK
								</span>
							</div>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default MainPage;
