const devicon = (name, variant = "original") =>
	`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

export const profile = {
	firstName: "Alpha Malick",
	lastName: "Diawara",
	role: "Développeur Fullstack",
	location: "Paris, France",
	email: "diawaraalphamalick225@gmail.com",
	phone: "+33 6 77 06 03 67",
	phoneHref: "tel:+33677060367",
	github: "https://github.com/x225franc",
	githubHandle: "x225franc",
	linkedin: "https://www.linkedin.com/in/alpha-malick-diawara-864551211/",
};

export const navLinks = [
	{ id: "about", label: "À propos" },
	{ id: "journey", label: "Parcours" },
	{ id: "projects", label: "Projets" },
	{ id: "skills", label: "Stack" },
	{ id: "contact", label: "Contact" },
];

export const highlights = [
	{ value: "Bac+5", label: "Master Ingénierie du Web" },
	{ value: "2", label: "alternances réalisées" },
	{ value: "6", label: "projets livrés" },
];

export const experiences = [
	{
		period: "2025 — 2026",
		role: "Chargé de Maintenance Digitale",
		org: "RATP",
		place: "Paris",
		kind: "Alternance",
		desc: "Migration d'applications legacy vers des stacks modernes, maintenance corrective et évolutive du code existant.",
		tags: ["PHP", "MySQL", "JavaScript", "Legacy"],
	},
	{
		period: "2022 — 2023",
		role: "Développeur Fullstack",
		org: "AvenirSup",
		place: "Lyon",
		kind: "Alternance",
		desc: "Développement de fonctionnalités full-stack, de la base de données à l'interface, en méthode agile.",
		tags: ["PHP", "MySQL", "JavaScript", "Trello"],
	},
];

export const education = [
	{
		period: "2024 — 2026",
		role: "Master Ingénierie du Web",
		org: "ESGI",
		place: "Paris",
		kind: "Titre RNCP niveau 7 — Diplômé",
		tags: ["NodeJS", "VueJS", "Agile", "UX/UI"],
	},
	{
		period: "2022 — 2023",
		role: "Concepteur Développeur d'Applications",
		org: "Institut G4",
		place: "Lyon",
		kind: "Titre RNCP niveau 6",
		tags: ["Symfony", "PHP", "Agile"],
	},
	{
		period: "Avant 2022",
		role: "Premiers pas en informatique",
		org: "EPSI",
		place: "Lyon",
		kind: "Là où tout a commencé",
		tags: [],
	},
];

export const skillGroups = [
	{
		title: "Back-end",
		items: [
			{ name: "PHP", icon: devicon("php") },
			{ name: "Symfony", icon: devicon("symfony"), invert: true },
			{ name: "NodeJS", icon: devicon("nodejs") },
			{ name: "Python", icon: devicon("python") },
			{ name: "MySQL", icon: devicon("mysql") },
		],
	},
	{
		title: "Front-end",
		items: [
			{ name: "React", icon: devicon("react") },
			{ name: "VueJS", icon: devicon("vuejs") },
			{ name: "JavaScript", icon: devicon("javascript") },
			{ name: "TypeScript", icon: devicon("typescript") },
			{ name: "HTML5", icon: devicon("html5") },
			{ name: "CSS3", icon: devicon("css3") },
			{ name: "Bootstrap", icon: devicon("bootstrap") },
		],
	},
	{
		title: "Outils & méthodes",
		items: [
			{ name: "Git", icon: devicon("git") },
			{ name: "Figma", icon: devicon("figma") },
			{ name: "Agile / Scrum" },
			{ name: "Migration legacy" },
		],
	},
];

export const projects = [
	{
		title: "JRAPay",
		desc: "Application web d'achat de cartes cadeaux, du parcours client jusqu'au paiement.",
		tags: ["VueJS", "NodeJS", "MySQL", "Bootstrap"],
		url: "https://www.jrapay.ci/",
	},
	{
		title: "Dealo",
		desc: "Plateforme de petites annonces en ligne : publication, recherche et mise en relation.",
		tags: ["React", "NodeJS", "MySQL", "Bootstrap"],
		url: "https://www.dealo.ci/",
	},
	{
		title: "Betterplann",
		desc: "SaaS de gestion d'entreprise pour centraliser planning, équipes et activité.",
		tags: ["React", "TypeScript", "Symfony", "MySQL"],
		url: "https://betterplan.vercel.app/",
	},
	{
		title: "Safesecur",
		desc: "Refonte complète du site vitrine de Safesecur.",
		tags: ["Symfony", "PHP", "MySQL", "Bootstrap"],
		url: "https://www.safesecur.com",
	},
	{
		title: "Gest-achat",
		desc: "Outil interne de gestion et de suivi des demandes d'achat.",
		tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
	},
	{
		title: "Base de connaissances",
		desc: "Conception d'une base de connaissances collaborative (projet Institut G4).",
		tags: ["PHP", "MySQL", "JavaScript", "Figma"],
	},
];
