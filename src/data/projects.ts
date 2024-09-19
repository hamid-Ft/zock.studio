// Projects
export type tech = {
	name: string;
	type: string;
	pos: string;
	image?: string;
	url?: string;
};

export const projects: tech[] = [
	{
		name: "NextJS",
		type: "FrontEnd",
		pos: "start",
		image: "/next-js.svg",
	},
	{
		name: "PostGreSQL",
		type: "Database",
		pos: "mid",
		image: "/postqresql.svg",
	},
	{
		name: "Prisma",
		type: "BackEnd",
		pos: "end",
		image: "/prisma.svg",
	},
	{
		name: ".Net Core",
		type: "BackEnd",
		pos: "mid",
		image: "/net-core.svg",
	},
	{
		name: "ThreeJS",
		type: "3D Desing",
		pos: "start",
		image: "/three-js.svg",
	},
	{
		name: "Redis",
		type: "Database",
		pos: "mid",
		image: "/redis.svg",
	},
	{
		name: "Wordpress",
		type: "CMS fullstack",
		pos: "start",
		image: "/wordpress.svg",
	},
	{
		name: "TurboRepo",
		type: "LargeScake Deployment",
		pos: "end",
		image: "/turborepo.svg",
	},
	{
		name: "Nginx",
		type: "server ",
		pos: "mid",
		image: "/nginx.svg",
	},
	{
		name: "React",
		type: "FrontEnd",
		pos: "start",
		image: "/react.svg",
	},
	{
		name: "MongoDB",
		type: "database",
		pos: "mid",
		image: "/mongodb.svg",
	},
	{
		name: "Docker",
		type: "Containerization",
		pos: "end",
		image: "/docker.svg",
	},
];

//  const createProjects = () => {
// 	projects.forEach((project) => {
// 		let panel = document.createElement("div");
// 		panel.classList.add("project", `${project.pos}`);

// 		let imageContainer = document.createElement("div");
// 		imageContainer.className = `image__container`;

// 		let image = document.createElement("img");
// 		image.classList.add("project__image");
// 		image.src = project.image;

// 		let projectDetails = document.createElement("div");
// 		projectDetails.classList.add("project__details");

// 		let projectTitle = document.createElement("p");
// 		projectTitle.innerText = project.name;

// 		let projectType = document.createElement("p");
// 		projectType.innerText = project.type;

// 		projectDetails.append(projectTitle, projectType);

// 		imageContainer.appendChild(image);
// 		panel.append(imageContainer, projectDetails);

// 		document.querySelector(".projects__slider")!.appendChild(panel);
// 	});
// };

// Blog posts

export type BlogPost = {
	title: string;
	time: string;
	image: string;
};

export const blogPosts: BlogPost[] = [
	{
		title: "BLOG POST ONE",
		time: "3 MIN",
		image:
			"https://images.unsplash.com/photo-1561998338-13ad7883b20f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "BLOG POST TWO",
		time: "4 MIN",
		image:
			"https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "BLOG POST THREE",
		time: "5 MIN",
		image:
			"https://images.unsplash.com/photo-1454117096348-e4abbeba002c?auto=format&fit=crop&q=80&w=2602&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

// const createBlogposts = () => {
// 	blogPosts.forEach((post) => {
// 		let blogPostSection = document.createElement("div");
// 		blogPostSection.classList.add("blog__post");

// 		let postDiv = document.createElement("div");
// 		postDiv.classList.add("post");

// 		let imageContainer = document.createElement("div");
// 		imageContainer.classList.add("post__image__container");

// 		let image = document.createElement("img");
// 		image.classList.add("blog__post__img");
// 		image.src = post.image;

// 		let postDetails = document.createElement("div");
// 		postDetails.classList.add("post__details");

// 		let postTitle = document.createElement("p");
// 		postTitle.innerText = post.title;

// 		let postTime = document.createElement("p");
// 		postTime.innerText = post.time;

// 		imageContainer.appendChild(image);
// 		postDetails.append(postTitle, postTime);
// 		postDiv.append(imageContainer, postDetails);
// 		blogPostSection.appendChild(postDiv);

// 		document.getElementById("blog")!.appendChild(blogPostSection);
// 	});
// };

// export { createProjects, createBlogposts };
