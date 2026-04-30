"use client";
import { useState, useEffect } from "react";

export default function Home() {
	const [activeSection, setActiveSection] = useState("home");
	const [menuOpen, setMenuOpen] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [toast, setToast] = useState(null);

	const showToast = (msg, type) => {
		setToast({ msg, type });
		setTimeout(() => setToast(null), 3000);
	};

	const scrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		setMenuOpen(false);
	};

	useEffect(() => {
		const sections = ["home", "about", "skills", "projects", "contact"];
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) setActiveSection(e.target.id);
				});
			},
			{ threshold: 0.4 },
		);
		sections.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, []);

	const handleSubmit = () => {
		if (name && email && message) {
			setSubmitted(true);
			showToast("Votre message a bien été envoyé !", "success");
		} else {
			showToast("Veuillez remplir tous les champs !", "error");
		}
	};

	const skills = [
		{
			name: "PHP",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
		},
		{
			name: "Symfony",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg",
		},
		{
			name: "React",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
		},
		{
			name: "VueJS",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
		},
		{
			name: "NodeJS",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
		},
		{
			name: "JavaScript",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
		},
		{
			name: "MySQL",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
		},
		{
			name: "Git",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
		},
		{
			name: "Bootstrap",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
		},
		{
			name: "HTML5",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
		},
		{
			name: "CSS3",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
		},
		{
			name: "Python",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
		},
	];

	const projects = [
		{
			title: "JRAPay",
			desc: "Application web d'achat de cartes cadeaux",
			tags: ["VueJS", "NodeJS", "MySQL", "Bootstrap"],
			url: "https://www.jrapay.ci/",
			emoji: "💳",
			color: "#6366f1",
		},
		{
			title: "Dealo",
			desc: "Plateforme de petites annonces en ligne",
			tags: ["React", "NodeJS", "MySQL", "Bootstrap"],
			url: "https://www.dealo.ci/",
			emoji: "🛒",
			color: "#0ea5e9",
		},
		{
			title: "Betterplann",
			desc: "SaaS de gestion d'entreprise",
			tags: ["React", "TypeScript", "Symfony", "MySQL"],
			url: "https://betterplan.vercel.app/",
			emoji: "📊",
			color: "#10b981",
		},
		{
			title: "Safesecur",
			desc: "Refonte du site vitrine Safesecur",
			tags: ["Symfony", "PHP", "MySQL", "Bootstrap"],
			url: "https://www.safesecur.com",
			emoji: "🔒",
			color: "#f59e0b",
		},
		{
			title: "Gest-achat",
			desc: "Outil interne de gestion des demandes d'achat",
			tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
			url: "#",
			emoji: "🏭",
			color: "#ec4899",
		},
		{
			title: "Base de connaissances",
			desc: "Conception d'une base de connaissances (Projet G4)",
			tags: ["PHP", "MySQL", "JavaScript", "Figma"],
			url: "#",
			emoji: "📚",
			color: "#8b5cf6",
		},
	];

	const navLinks = [
		{ id: "home", label: "Accueil" },
		{ id: "about", label: "À propos" },
		{ id: "skills", label: "Compétences" },
		{ id: "projects", label: "Projets" },
		{ id: "contact", label: "Contact" },
	];

	return (
		<>
			{/* Animated Background */}
			<div className='bg-scene'>
				<div className='orb orb1' />
				<div className='orb orb2' />
				<div className='orb orb3' />
				<div className='grid-overlay' />
			</div>

			{/* Navigation */}
			<nav className={`portfolio-nav${menuOpen ? " open" : ""}`}>
				{navLinks.map((link) => (
					<button
						key={link.id}
						className={`nav-link${activeSection === link.id ? " active" : ""}`}
						onClick={() => scrollTo(link.id)}
					>
						{link.label}
					</button>
				))}
				<button
					className='nav-mobile-btn'
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? "✕" : "☰"}
				</button>
			</nav>

			<div className='page-wrap'>
				{/* ---- HOME ---- */}
				<section id='home' className='portfolio-section home-section'>
					<div className='portfolio-container home-container'>
						<div className='badge'>
							<span className='badge-dot' />
							Disponible pour de nouvelles opportunités
						</div>
						<h1 className='hero-name'>
							Alpha Malick
							<br />
							Diawara
						</h1>
						<p className='hero-sub'>Développeur Fullstack · Paris</p>
						<p className='hero-desc'>
							Passionné d'informatique et actuellement en Master Ingénierie du
							Web à l'ESGI Paris. Je conçois des solutions web modernes et
							performantes — du back-end robuste aux interfaces soignées. Mon
							objectif : devenir Lead Dev Fullstack dans 3 ans, à la tête de
							projets innovants.
						</p>
						<div className='hero-ctas'>
							<button
								className='btn-primary'
								onClick={() => scrollTo("projects")}
							>
								Voir mes projets
							</button>
							<button className='btn-ghost' onClick={() => scrollTo("contact")}>
								Me contacter
							</button>
						</div>
						<div className='scroll-hint'>
							<div className='scroll-line' />
							Scroll
						</div>
					</div>
				</section>

				<div className='portfolio-divider' />

				{/* ---- ABOUT ---- */}
				<section id='about' className='portfolio-section'>
					<div className='portfolio-container'>
						<p className='section-tag'>01 — À propos</p>
						<h2 className='section-title'>Qui suis-je ?</h2>
						<div className='section-line' />
						<div className='about-grid'>
							<div>
								<div className='glass about-card mb-about'>
									<p>
										Bonjour ! Moi c'est Malick. Depuis mes débuts à l'EPSI Lyon,
										j'ai développé une vraie passion pour le développement web
										full-stack — autant côté back-end que front-end.
									</p>
									<p>
										Autonome, curieux et organisé, j'aime relever des défis
										techniques tout en gardant une vision produit. Actuellement
										en alternance à la{" "}
										<strong className='accent-text'>RATP</strong> en tant que
										chargé de maintenance digitale, je migre des applications
										legacy et interviens sur le code existant.
									</p>
									<p>
										En dehors du code, je pratique la natation, les jeux de
										stratégie, et je reste constamment en veille technologique.
									</p>
								</div>
								<div className='glass about-card'>
									<ul className='info-list'>
										<li>
											<span className='info-label'>Localisation</span>
											<span className='info-val'>Paris, France</span>
										</li>
										<li>
											<span className='info-label'>Formation</span>
											<span className='info-val'>
												ESGI Paris — Ingénierie Web (Bac+5)
											</span>
										</li>
										<li>
											<span className='info-label'>Langues</span>
											<span className='info-val'>
												Français (natif) · Anglais (B2)
											</span>
										</li>
										<li>
											<span className='info-label'>GitHub</span>
											<span className='info-val'>
												<a
													href='https://github.com/x225franc'
													target='_blank'
													rel='noopener noreferrer'
												>
													x225franc
												</a>
											</span>
										</li>
										<li>
											<span className='info-label'>LinkedIn</span>
											<span className='info-val'>
												<a
													href='https://www.linkedin.com/in/alpha-malick-diawara-864551211/'
													target='_blank'
													rel='noopener noreferrer'
												>
													Voir le profil
												</a>
											</span>
										</li>
										<li>
											<span className='info-label'>Email</span>
											<span className='info-val'>
												<a href='mailto:diawaraalphamalick225@gmail.com'>
													diawaraalphamalick225@gmail.com
												</a>
											</span>
										</li>
									</ul>
								</div>
							</div>
							<div className='xp-cards'>
								<div className='glass xp-card'>
									<div className='xp-period'>Fév. 2025 — Nov. 2026</div>
									<div className='xp-role'>Chargé de Maintenance Digitale</div>
									<div className='xp-company'>RATP · Paris</div>
									<div className='xp-tags'>
										<span className='tag'>PHP</span>
										<span className='tag'>MySQL</span>
										<span className='tag'>JavaScript</span>
										<span className='tag'>Legacy</span>
									</div>
								</div>
								<div className='glass xp-card'>
									<div className='xp-period'>Nov. 2022 — Sept. 2023</div>
									<div className='xp-role'>
										Développeur Fullstack (Alternance)
									</div>
									<div className='xp-company'>AvenirSup · Lyon</div>
									<div className='xp-tags'>
										<span className='tag'>PHP</span>
										<span className='tag'>MySQL</span>
										<span className='tag'>JavaScript</span>
										<span className='tag'>Trello</span>
									</div>
								</div>
								<div className='glass xp-card'>
									<div className='xp-period'>2024 — 2026</div>
									<div className='xp-role'>Master Ingénierie du Web</div>
									<div className='xp-company'>
										ESGI · Paris — Titre RNCP Niveau 7
									</div>
									<div className='xp-tags'>
										<span className='tag'>NodeJS</span>
										<span className='tag'>VueJS</span>
										<span className='tag'>Agile</span>
										<span className='tag'>UX/UI</span>
									</div>
								</div>
								<div className='glass xp-card'>
									<div className='xp-period'>2022 — 2023</div>
									<div className='xp-role'>
										Concepteur Développeur d'Applications
									</div>
									<div className='xp-company'>
										Institut G4 · Lyon — Titre RNCP Niveau 6
									</div>
									<div className='xp-tags'>
										<span className='tag'>Symfony</span>
										<span className='tag'>PHP</span>
										<span className='tag'>Agile</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className='portfolio-divider' />

				{/* ---- SKILLS ---- */}
				<section id='skills' className='portfolio-section'>
					<div className='portfolio-container'>
						<p className='section-tag'>02 — Compétences</p>
						<h2 className='section-title'>Stack technique</h2>
						<div className='section-line' />
						<div className='skills-grid'>
							{skills.map((s) => (
								<div key={s.name} className='glass skill-card'>
									<img src={s.icon} alt={s.name} />
									<span>{s.name}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				<div className='portfolio-divider' />

				{/* ---- PROJECTS ---- */}
				<section id='projects' className='portfolio-section'>
					<div className='portfolio-container'>
						<p className='section-tag'>03 — Projets</p>
						<h2 className='section-title'>Ce que j'ai créé</h2>
						<div className='section-line' />
						<div className='projects-grid'>
							{projects.map((p) => (
								<div
									key={p.title}
									className='glass project-card'
									style={{ "--card-color": p.color }}
								>
									<span className='project-emoji'>{p.emoji}</span>
									<div className='project-title'>{p.title}</div>
									<div className='project-desc'>{p.desc}</div>
									<div className='project-tags'>
										{p.tags.map((t) => (
											<span key={t} className='tag'>
												{t}
											</span>
										))}
									</div>
									{p.url !== "#" ? (
										<a
											href={p.url}
											target='_blank'
											rel='noopener noreferrer'
											className='project-link'
										>
											Voir le projet →
										</a>
									) : (
										<span className='project-link disabled'>
											Projet interne
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				</section>

				<div className='portfolio-divider' />

				{/* ---- CONTACT ---- */}
				<section id='contact' className='portfolio-section'>
					<div className='portfolio-container'>
						<p className='section-tag'>04 — Contact</p>
						<h2 className='section-title'>Travaillons ensemble</h2>
						<div className='section-line' />
						<div className='contact-grid'>
							<div className='glass contact-info'>
								<h3>Bonjour 👋</h3>
								<p>
									Que ce soit pour une opportunité pro, un projet collaboratif
									ou juste pour échanger, n'hésitez pas à me contacter. Je
									réponds sous 24h !
								</p>
								<a href='tel:+33677060367' className='contact-item'>
									<div className='contact-icon'>📞</div>
									<span>+33 06 77 06 03 67</span>
								</a>
								<a
									href='mailto:diawaraalphamalick225@gmail.com'
									className='contact-item'
								>
									<div className='contact-icon'>✉️</div>
									<span>diawaraalphamalick225@gmail.com</span>
								</a>
								<div className='contact-item'>
									<div className='contact-icon'>📍</div>
									<span>Paris, France</span>
								</div>
								<div className='social-links'>
									<a
										href='https://www.linkedin.com/in/alpha-malick-diawara-864551211/'
										target='_blank'
										rel='noopener noreferrer'
										className='social-link'
										title='LinkedIn'
									>
										<svg
											width='18'
											height='18'
											viewBox='0 0 24 24'
											fill='currentColor'
										>
											<path d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' />
											<circle cx='4' cy='4' r='2' />
										</svg>
									</a>
									<a
										href='https://github.com/x225franc'
										target='_blank'
										rel='noopener noreferrer'
										className='social-link'
										title='GitHub'
									>
										<svg
											width='18'
											height='18'
											viewBox='0 0 24 24'
											fill='currentColor'
										>
											<path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
										</svg>
									</a>
									<a
										href='https://diawaraalphamalick.vercel.app/'
										target='_blank'
										rel='noopener noreferrer'
										className='social-link'
										title='Portfolio'
									>
										<svg
											width='18'
											height='18'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
										>
											<circle cx='12' cy='12' r='10' />
											<line x1='2' y1='12' x2='22' y2='12' />
											<path d='M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z' />
										</svg>
									</a>
								</div>
							</div>
							<div className='glass contact-form'>
								{submitted ? (
									<div className='submit-success'>
										<div className='success-icon'>✅</div>
										<div className='success-title'>Message envoyé !</div>
										<p className='success-msg'>
											Je vous répondrai dans les plus brefs délais.
										</p>
									</div>
								) : (
									<>
										<div className='form-group'>
											<label>Nom complet</label>
											<input
												type='text'
												placeholder='Jean Dupont'
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className='form-group'>
											<label>Email</label>
											<input
												type='email'
												placeholder='jean@exemple.fr'
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
										<div className='form-group'>
											<label>Message</label>
											<textarea
												rows={5}
												placeholder='Votre message...'
												value={message}
												onChange={(e) => setMessage(e.target.value)}
											/>
										</div>
										<button
											className='btn-primary btn-full'
											onClick={handleSubmit}
										>
											Envoyer le message →
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</section>

				<footer className='portfolio-footer'>
					<p>
						Made with ❤️ by{" "}
						<strong className='accent-text'>Alpha Malick Diawara</strong> — 2026
					</p>
				</footer>
			</div>

			{toast && (
				<div className={`portfolio-toast ${toast.type}`}>{toast.msg}</div>
			)}
		</>
	);
}
