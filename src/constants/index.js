import {
	mobile,
	backend,
	creator,
	web,
	javascript,
	typescript,
	html,
	css,
	reactjs,
	redux,
	tailwind,
	nodejs,
	mongodb,
	git,
	figma,
	docker,
	meta,
	starbucks,
	BS,
	Gurutech,
	Livease,
	tesla,
	shopify,
	carrent,
	jobit,
	tripguide,
	threejs,
	Rocketbank,
	Lambocard,
	Ecourse,
} from "../assets";

export const navLinks = [
	{
		id: "about",
		title: "About",
	},
	{
		id: "work",
		title: "Work",
	},
	{
		id: "contact",
		title: "Contact",
	},
];

const services = [
	{
		title: "Web Developer",
		icon: web,
	},
	{
		title: "Frontend Developer",
		icon: mobile,
	},
	{
		title: "Backend Developer",
		icon: backend,
	},
	{
		title: "Product Manager",
		icon: creator,
	},
];

const technologies = [
	{
		name: "HTML 5",
		icon: html,
	},
	{
		name: "CSS 3",
		icon: css,
	},
	{
		name: "JavaScript",
		icon: javascript,
	},
	{
		name: "TypeScript",
		icon: typescript,
	},
	{
		name: "React JS",
		icon: reactjs,
	},
	{
		name: "Redux Toolkit",
		icon: redux,
	},
	{
		name: "Tailwind CSS",
		icon: tailwind,
	},
	{
		name: "Node JS",
		icon: nodejs,
	},
	{
		name: "MongoDB",
		icon: mongodb,
	},
	{
		name: "Three JS",
		icon: threejs,
	},
	{
		name: "git",
		icon: git,
	},
	{
		name: "figma",
		icon: figma,
	},
	{
		name: "docker",
		icon: docker,
	},
];

const experiences = [
	{
		title: "Senior Software Engineer",
		company_name: "LIVEASE",
		icon: Livease,
		iconBg: "#E6DEDD",
		date: "Oct 2023 - May 2024",
		points: [
			"Refactored/changed legacy code for the ERP system, introducing modern development practices and reducing codebase size by 75%, which reduced the average bug resolution time from 2 weeks to a week",
			"Conducted daily meetings and weekly code reviews, enhancing the team skills in modern software development practices, leading to a 10% increase in team efficiency and a 50% reduction in onboarding new hires",
		],
	},
	{
		title: "Back-end Developer",
		company_name: "Gurutechnology",
		icon: Gurutech,
		iconBg: "#383E56",
		date: "April 2023 - June 2023",
		points: [
			"Developing and maintaining web applications using Laravel and PHP other related technologies.",
			"Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
			"Streamlined backend database structure through efficient design and optimization, resulting in a 40% reduction in query response time and improved system performance.",
			"Participating in code reviews and providing constructive feedback to other developers.",
		],
	},
	{
		title: "Software Engineeer",
		company_name: "Business Master Software Solutions",
		icon: BS,
		iconBg: "#E6DEDD",
		date: "Dec 2022 - Feb 2023",
		points: [
			"Mastered PHP, Laravel, and MySQL in line with job requirements, yielding a 40% improvement in development efficiency. Also, refactored Laravel codebases, reducing bugs by 25%.",
			"Demonstrated versatility as a full-stack developer, with hands-on experience in both backend (PHP, Laravel) and frontend (React, JavaScript, HTML5, CSS3) development, aligning with the job's technology stack",
			"Successfully integrated RESTful API gateway payment solutions, including PayPal and Stripe, resulting in a 20% increase in transaction efficiency and a 15% boost in user satisfaction.",
		],
	},
];

const projects = [
	{
		name: "Rocket Bank",
		description:
			"A simple fictitious banking application API. That let's you Deposit, Withdraw, and transfer money",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "mongodb",
				color: "green-text-gradient",
			},
			{
				name: "Bootstrap",
				color: "pink-text-gradient",
			},
		],
		image: Rocketbank,
		source_code_link: "https://github.com/IamLiam09/Rocketbank",
	},
	{
		name: "E-courses",
		description:
			"An Ecommerce site to buy courses with api integration, user authentication and authorization",
		tags: [
			{
				name: "Laravel",
				color: "blue-text-gradient",
			},
			{
				name: "MySql",
				color: "green-text-gradient",
			},
			{
				name: "Bootstrap",
				color: "pink-text-gradient",
			},
		],
		image: Ecourse,
		source_code_link: "https://github.com/IamLiam09/Online_library/tree/master",
	},
	{
		name: "Lambo Card",
		description:
			"A card game built to check one's retentiveness, added with audio and animation",
		tags: [
			{
				name: "React",
				color: "blue-text-gradient",
			},
			{
				name: "GIT",
				color: "green-text-gradient",
			},
			{
				name: "SCSS",
				color: "pink-text-gradient",
			},
		],
		image: Lambocard,
		source_code_link: "https://github.com/IamLiam09/Memory-card",
	},
];

export { services, technologies, experiences, projects };
