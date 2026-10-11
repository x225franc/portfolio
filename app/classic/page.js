"use client";
import { useState, useEffect } from "react";
import {
	profile,
	navLinks,
	highlights,
	experiences,
	education,
	skillGroups,
	projects,
} from "../data";

const Icon = ({ d, size = 18, fill = false, children }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill={fill ? "currentColor" : "none"}
		stroke={fill ? "none" : "currentColor"}
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
	>
		{d ? <path d={d} /> : children}
	</svg>
);

const icons = {
	arrow: "M7 17L17 7M8 7h9v9",
	down: "M12 5v14M5 12l7 7 7-7",
	sun: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
	moon: "M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z",
	mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6",
	phone: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z",
	pin: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z",
	download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
	github:
		"M12 2C6.48 2 2 6.48 2 12.02c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0112 6.84c.85 0 1.71.12 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10.02 10.02 0 0022 12.02C22 6.48 17.52 2 12 2z",
	linkedin:
		"M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SectionHead({ index, tag, title }) {
	return (
		<header className='section-head reveal'>
			<span className='section-tag'>
				<span className='section-index'>{index}</span> {tag}
			</span>
			<h2 className='section-title'>{title}</h2>
		</header>
	);
}

function Timeline({ items }) {
	return (
		<ol className='timeline'>
			{items.map((it) => (
				<li key={it.role} className='timeline-item reveal'>
					<span className='timeline-period'>{it.period}</span>
					<div className='timeline-body'>
						<h4>{it.role}</h4>
						<p className='timeline-org'>
							{it.org} · {it.place}
							<span className='timeline-kind'>{it.kind}</span>
						</p>
						{it.desc && <p className='timeline-desc'>{it.desc}</p>}
						{it.tags.length > 0 && (
							<div className='tags'>
								{it.tags.map((t) => (
									<span key={t} className='tag'>
										{t}
									</span>
								))}
							</div>
						)}
					</div>
				</li>
			))}
		</ol>
	);
}

export default function Home() {
	const [activeSection, setActiveSection] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [theme, setTheme] = useState("dark");
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [status, setStatus] = useState("idle"); // idle | sending | sent
	const [toast, setToast] = useState(null);

	const showToast = (msg, type) => {
		setToast({ msg, type });
		setTimeout(() => setToast(null), 4000);
	};

	useEffect(() => {
		setTheme(document.documentElement.dataset.theme || "dark");

		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		const sectionObserver = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		document
			.querySelectorAll("section[id]")
			.forEach((el) => sectionObserver.observe(el));

		const revealObserver = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("visible");
						revealObserver.unobserve(e.target);
					}
				}),
			{ threshold: 0.12 },
		);
		document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

		return () => {
			window.removeEventListener("scroll", onScroll);
			sectionObserver.disconnect();
			revealObserver.disconnect();
		};
	}, []);

	const toggleTheme = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem("theme", next);
		} catch {}
	};

	const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, message } = form;
		if (!name.trim() || !email.trim() || !message.trim()) {
			showToast("Merci de remplir tous les champs.", "error");
			return;
		}
		if (!EMAIL_RE.test(email)) {
			showToast("Cette adresse email ne semble pas valide.", "error");
			return;
		}
		setStatus("sending");
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (res.ok) {
				setStatus("sent");
				showToast("Message envoyé, merci !", "success");
				return;
			}
			showToast(data.error || "Erreur lors de l'envoi.", "error");
		} catch {
			showToast("Impossible de contacter le serveur.", "error");
		}
		setStatus("idle");
	};

	return (
		<>
			{/* <a href='#main' className='skip-link'>
				Aller au contenu
			</a> */}

			<header className={`nav${scrolled ? " scrolled" : ""}${menuOpen ? " open" : ""}`}>
				<div className='container nav-inner'>
					<a href='#top' className='nav-logo' onClick={() => setMenuOpen(false)}>
						AMD<span className='accent'>.</span>
					</a>
					<nav className='nav-links' aria-label='Navigation principale'>
						{navLinks.map((link) => (
							<a
								key={link.id}
								href={`#${link.id}`}
								className={activeSection === link.id ? "active" : ""}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</a>
						))}
					</nav>
					<div className='nav-actions'>
						<a href='/' className='btn btn-ghost nav-3d'>
							Version 3D
						</a>
						<button
							className='icon-btn'
							onClick={toggleTheme}
							aria-label={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
						>
							<Icon d={theme === "dark" ? icons.sun : icons.moon} />
						</button>
						<button
							className='icon-btn nav-burger'
							onClick={() => setMenuOpen(!menuOpen)}
							aria-label='Menu'
							aria-expanded={menuOpen}
						>
							<span />
							<span />
						</button>
					</div>
				</div>
			</header>

			<main id='main'>
				{/* HERO */}
				<section className='hero' id='top'>
					<div className='container'>
						<p className='badge reveal'>
							<span className='badge-dot' />
							Diplômé · Ouvert aux opportunités en CDI
						</p>
						<h1 className='hero-name reveal'>
							{profile.firstName}
							<br />
							<span className='hero-last'>{profile.lastName}</span>
						</h1>
						<p className='hero-lead reveal'>
							<strong>{profile.role}</strong> basé à Paris. Je conçois des
							applications web robustes et soignées, du back-end jusqu'à
							l'interface — et j'aime autant moderniser l'existant que créer
							from scratch.
						</p>
						<div className='hero-ctas reveal'>
							<a href='#projects' className='btn btn-primary'>
								Voir mes projets
							</a>
							<a href='/uploads/CV.pdf' target='_blank' rel='noopener noreferrer' className='btn btn-ghost'>
								<Icon d={icons.download} size={16} />
								Mon CV
							</a>
						</div>
						<dl className='hero-stats reveal'>
							{highlights.map((h) => (
								<div key={h.label}>
									<dt>{h.value}</dt>
									<dd>{h.label}</dd>
								</div>
							))}
						</dl>
					</div>
					<a href='#about' className='scroll-hint' aria-label='Défiler vers la suite'>
						<Icon d={icons.down} size={16} />
					</a>
				</section>

				{/* ABOUT */}
				<section id='about' className='section'>
					<div className='container'>
						<SectionHead index='01' tag='À propos' title='Qui suis-je ?' />
						<div className='about-grid'>
							<div className='about-text reveal'>
								<p className='about-intro'>
									Bonjour, moi c'est Malick. Développeur fullstack fraîchement
									diplômé d'un <em>Master Ingénierie du Web</em> à l'ESGI.
								</p>
								<p>
									Depuis mes débuts à l'EPSI Lyon, j'ai développé une vraie
									passion pour le web, côté serveur comme côté interface. Mes
									deux alternances — chez <strong>AvenirSup</strong> puis à la{" "}
									<strong>RATP</strong>, où j'ai migré des applications legacy
									— m'ont appris à livrer du code fiable dans des contextes
									réels, avec de vrais utilisateurs.
								</p>
								<p>
									Autonome, curieux et organisé, j'aime relever des défis
									techniques sans perdre de vue le produit. Mon objectif :
									évoluer vers un rôle de Lead Dev Fullstack. En dehors du code :
									natation, jeux de stratégie et veille technologique.
								</p>
							</div>
							<ul className='info-card card reveal'>
								<li>
									<span>Localisation</span>
									{profile.location}
								</li>
								<li>
									<span>Diplôme</span>
									Bac+5 — RNCP niveau 7
								</li>
								<li>
									<span>Langues</span>
									Français (natif) · Anglais (B2)
								</li>
								<li>
									<span>Disponibilité</span>
									<b className='accent'>Immédiate</b>
								</li>
								<li>
									<span>GitHub</span>
									<a href={profile.github} target='_blank' rel='noopener noreferrer'>
										@{profile.githubHandle}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* JOURNEY */}
				<section id='journey' className='section'>
					<div className='container'>
						<SectionHead index='02' tag='Parcours' title='Expérience & formation' />
						<div className='journey-grid'>
							<div>
								<h3 className='col-title reveal'>Expérience</h3>
								<Timeline items={experiences} />
							</div>
							<div>
								<h3 className='col-title reveal'>Formation</h3>
								<Timeline items={education} />
							</div>
						</div>
					</div>
				</section>

				{/* SKILLS */}
				<section id='skills' className='section'>
					<div className='container'>
						<SectionHead index='03' tag='Compétences' title='Stack technique' />
						<div className='skills-grid'>
							{skillGroups.map((g) => (
								<div key={g.title} className='card skill-group reveal'>
									<h3>{g.title}</h3>
									<ul>
										{g.items.map((s) => (
											<li key={s.name} className='skill'>
												{s.icon ? (
													<img
														src={s.icon}
														alt=''
														width='22'
														height='22'
														loading='lazy'
														className={s.invert ? "invert-dark" : ""}
													/>
												) : (
													<span className='skill-dot' />
												)}
												{s.name}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* PROJECTS */}
				<section id='projects' className='section'>
					<div className='container'>
						<SectionHead index='04' tag='Projets' title='Ce que j’ai construit' />
						<div className='projects-grid'>
							{projects.map((p, i) => {
								const Tag = p.url ? "a" : "div";
								const linkProps = p.url
									? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
									: {};
								return (
									<Tag
										key={p.title}
										className={`card project reveal${p.url ? " is-link" : ""}`}
										{...linkProps}
									>
										<div className='project-top'>
											<span className='project-num'>
												{String(i + 1).padStart(2, "0")}
											</span>
											{p.url ? (
												<span className='project-arrow'>
													<Icon d={icons.arrow} size={18} />
												</span>
											) : (
												<span className='project-private'>Projet interne</span>
											)}
										</div>
										<h3>{p.title}</h3>
										<p>{p.desc}</p>
										<div className='tags'>
											{p.tags.map((t) => (
												<span key={t} className='tag'>
													{t}
												</span>
											))}
										</div>
									</Tag>
								);
							})}
						</div>
					</div>
				</section>

				{/* CV */}
				<section className='section section-tight'>
					<div className='container'>
						<div className='cv-banner card reveal'>
							<a href='/uploads/CV.pdf' target='_blank' rel='noopener noreferrer' className='cv-thumb'>
								<img src='/uploads/CV.png' alt='Aperçu du CV' loading='lazy' />
							</a>
							<div className='cv-text'>
								<span className='section-tag'>Curriculum vitæ</span>
								<h3>Tout mon parcours sur une page.</h3>
								<p>Formation, expériences et compétences, au format PDF.</p>
								<div className='hero-ctas'>
									<a href='/uploads/CV.pdf' download='CV_Alpha_Malick_Diawara.pdf' className='btn btn-primary'>
										<Icon d={icons.download} size={16} />
										Télécharger
									</a>
									<a href='/uploads/CV.pdf' target='_blank' rel='noopener noreferrer' className='btn btn-ghost'>
										Voir en ligne
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CONTACT */}
				<section id='contact' className='section'>
					<div className='container'>
						<SectionHead index='05' tag='Contact' title='Travaillons ensemble' />
						<div className='contact-grid'>
							<div className='contact-info reveal'>
								<p className='about-intro'>
									Un poste, un projet ou simplement envie d'échanger ? Écrivez-moi,
									je réponds sous 24 h.
								</p>
								<a href={`mailto:${profile.email}`} className='contact-row'>
									<span className='contact-icon'>
										<Icon d={icons.mail} />
									</span>
									{profile.email}
								</a>
								<a href={profile.phoneHref} className='contact-row'>
									<span className='contact-icon'>
										<Icon d={icons.phone} />
									</span>
									{profile.phone}
								</a>
								<div className='contact-row'>
									<span className='contact-icon'>
										<Icon d={icons.pin} />
									</span>
									{profile.location}
								</div>
								<div className='socials'>
									<a href={profile.linkedin} target='_blank' rel='noopener noreferrer' className='icon-btn' aria-label='LinkedIn'>
										<Icon d={icons.linkedin} fill />
									</a>
									<a href={profile.github} target='_blank' rel='noopener noreferrer' className='icon-btn' aria-label='GitHub'>
										<Icon d={icons.github} fill />
									</a>
								</div>
							</div>

							<div className='card contact-form reveal'>
								{status === "sent" ? (
									<div className='form-success'>
										<span className='success-check'>✓</span>
										<h3>Message envoyé !</h3>
										<p>Merci {form.name.split(" ")[0]}, je vous réponds très vite.</p>
									</div>
								) : (
									<form onSubmit={handleSubmit} noValidate>
										<div className='field'>
											<label htmlFor='f-name'>Nom</label>
											<input id='f-name' type='text' autoComplete='name' placeholder='Jean Dupont' value={form.name} onChange={update("name")} />
										</div>
										<div className='field'>
											<label htmlFor='f-email'>Email</label>
											<input id='f-email' type='email' autoComplete='email' placeholder='jean@exemple.fr' value={form.email} onChange={update("email")} />
										</div>
										<div className='field'>
											<label htmlFor='f-msg'>Message</label>
											<textarea id='f-msg' rows={5} placeholder='Bonjour Malick…' value={form.message} onChange={update("message")} />
										</div>
										<button type='submit' className='btn btn-primary btn-full' disabled={status === "sending"}>
											{status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
										</button>
									</form>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className='footer'>
				<div className='container footer-inner'>
					<span>
						© {new Date().getFullYear()} {profile.firstName} {profile.lastName}
					</span>
					<a href='#top'>Retour en haut ↑</a>
				</div>
			</footer>

			{toast && (
				<div className={`toast ${toast.type}`} role='status'>
					{toast.msg}
				</div>
			)}
		</>
	);
}
