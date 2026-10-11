"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "./room/room.css";
import { profile, highlights, experiences, education, skillGroups, projects } from "./data";

const Scene = dynamic(() => import("./room/Scene"), { ssr: false });

const SPOTS = [
	{ id: "about", label: "À propos", emoji: "🌙" },
	{ id: "projects", label: "Projets", emoji: "💻" },
	{ id: "skills", label: "Stack", emoji: "📚" },
	{ id: "journey", label: "Parcours", emoji: "🎓" },
	{ id: "cv", label: "CV", emoji: "📄" },
	{ id: "contact", label: "Contact", emoji: "📱" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Timeline({ items }) {
	return (
		<ol className='p-timeline'>
			{items.map((it) => (
				<li key={it.role}>
					<span className='p-period'>{it.period}</span>
					<h4>{it.role}</h4>
					<p className='p-muted'>
						{it.org} · {it.place} — {it.kind}
					</p>
					{it.desc && <p>{it.desc}</p>}
				</li>
			))}
		</ol>
	);
}

function ContactForm() {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState("");
	const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

	const submit = async (e) => {
		e.preventDefault();
		setError("");
		if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return setError("Merci de remplir tous les champs.");
		if (!EMAIL_RE.test(form.email)) return setError("Cette adresse email ne semble pas valide.");
		setStatus("sending");
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (res.ok) return setStatus("sent");
			setError(data.error || "Erreur lors de l'envoi.");
		} catch {
			setError("Impossible de contacter le serveur.");
		}
		setStatus("idle");
	};

	if (status === "sent")
		return <p className='p-success'>✓ Message envoyé — merci {form.name.split(" ")[0]}, je vous réponds très vite.</p>;

	return (
		<form className='p-form' onSubmit={submit} noValidate>
			<input aria-label='Nom' placeholder='Votre nom' autoComplete='name' value={form.name} onChange={update("name")} />
			<input aria-label='Email' type='email' placeholder='Votre email' autoComplete='email' value={form.email} onChange={update("email")} />
			<textarea aria-label='Message' rows={4} placeholder='Bonjour Malick…' value={form.message} onChange={update("message")} />
			{error && <p className='p-error'>{error}</p>}
			<button className='p-btn' disabled={status === "sending"}>
				{status === "sending" ? "Envoi…" : "Envoyer"}
			</button>
		</form>
	);
}

function PanelContent({ id }) {
	switch (id) {
		case "about":
			return (
				<>
					<h2>Bonsoir 👋</h2>
					<p className='p-lead'>
						Moi c'est <b>Malick</b>, développeur fullstack à Paris, fraîchement diplômé d'un Master
						Ingénierie du Web à l'ESGI.
					</p>
					<p>
						Deux alternances — chez AvenirSup puis à la RATP, où j'ai migré des applications legacy — m'ont
						appris à livrer du code fiable pour de vrais utilisateurs. J'aime le back-end solide, les
						interfaces soignées et les problèmes pas encore résolus.
					</p>
					<div className='p-stats'>
						{highlights.map((h) => (
							<div key={h.label}>
								<b>{h.value}</b>
								<span>{h.label}</span>
							</div>
						))}
					</div>
					<p className='p-muted'>Hors du code : natation, jeux de stratégie et veille techno — souvent à cette fenêtre, la nuit.</p>
				</>
			);
		case "projects":
			return (
				<>
					<h2>Projets</h2>
					<div className='p-projects'>
						{projects.map((p) => {
							const Tag = p.url ? "a" : "div";
							return (
								<Tag key={p.title} className='p-project' {...(p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {})}>
									<div className='p-project-head'>
										<h4>{p.title}</h4>
										<span>{p.url ? "↗" : "interne"}</span>
									</div>
									<p>{p.desc}</p>
									<div className='p-tags'>
										{p.tags.map((t) => (
											<span key={t}>{t}</span>
										))}
									</div>
								</Tag>
							);
						})}
					</div>
				</>
			);
		case "skills":
			return (
				<>
					<h2>Ma bibliothèque</h2>
					<p className='p-muted'>Chaque livre sur l'étagère est une techno que j'utilise.</p>
					{skillGroups.map((g) => (
						<div key={g.title} className='p-skill-group'>
							<h4>{g.title}</h4>
							<div className='p-skills'>
								{g.items.map((s) => (
									<span key={s.name}>
										{s.icon && <img src={s.icon} alt='' width='18' height='18' className={s.invert ? "p-invert" : ""} />}
										{s.name}
									</span>
								))}
							</div>
						</div>
					))}
				</>
			);
		case "journey":
			return (
				<>
					<h2>Parcours</h2>
					<h3 className='p-sub'>Expérience</h3>
					<Timeline items={experiences} />
					<h3 className='p-sub'>Formation</h3>
					<Timeline items={education} />
				</>
			);
		case "cv":
			return (
				<>
					<h2>Mon CV</h2>
					<a href='/uploads/CV.pdf' target='_blank' rel='noopener noreferrer' className='p-cv'>
						<img src='/uploads/CV.png' alt='Aperçu du CV' />
					</a>
					<div className='p-actions'>
						<a className='p-btn' href='/uploads/CV.pdf' download='CV_Alpha_Malick_Diawara.pdf'>
							Télécharger
						</a>
						<a className='p-btn ghost' href='/uploads/CV.pdf' target='_blank' rel='noopener noreferrer'>
							Ouvrir
						</a>
					</div>
				</>
			);
		case "contact":
			return (
				<>
					<h2>On se parle ?</h2>
					<p className='p-muted'>Un poste, un projet ou juste envie d'échanger — je réponds sous 24 h.</p>
					<ul className='p-contact'>
						<li>
							<a href={`mailto:${profile.email}`}>✉️ {profile.email}</a>
						</li>
						<li>
							<a href={profile.phoneHref}>📞 {profile.phone}</a>
						</li>
						<li>
							<a href={profile.linkedin} target='_blank' rel='noopener noreferrer'>
								in LinkedIn
							</a>
							{" · "}
							<a href={profile.github} target='_blank' rel='noopener noreferrer'>
								GitHub
							</a>
						</li>
					</ul>
					<ContactForm />
				</>
			);
		default:
			return null;
	}
}

export default function Home() {
	const [focus, setFocus] = useState(null);
	const [introDone, setIntroDone] = useState(false);
	const [webgl, setWebgl] = useState(true);

	useEffect(() => {
		try {
			const c = document.createElement("canvas");
			setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
		} catch {
			setWebgl(false);
		}
		const t = setTimeout(() => setIntroDone(true), 2200);
		const onKey = (e) => e.key === "Escape" && setFocus(null);
		window.addEventListener("keydown", onKey);
		return () => {
			clearTimeout(t);
			window.removeEventListener("keydown", onKey);
		};
	}, []);

	const current = SPOTS.find((s) => s.id === focus);

	return (
		<div className={`room${focus ? " focused" : ""}`}>
			<div className='room-canvas'>
				{webgl ? (
					<Scene focus={focus} onSelect={setFocus} introDone={introDone} />
				) : (
					<div className='room-nowebgl'>
						<p>Votre navigateur ne supporte pas la 3D.</p>
						<Link href='/classic'>Voir la version classique →</Link>
					</div>
				)}
			</div>

			<div className={`room-intro${introDone ? " gone" : ""}`} aria-hidden={introDone}>
				<p className='room-intro-name'>Alpha Malick Diawara</p>
				<p className='room-intro-sub'>allumage du bureau…</p>
				<div className='room-intro-bar' />
			</div>

			<header className='room-top'>
				<div>
					<h1>
						Alpha Malick Diawara<span>.</span>
					</h1>
					<p>
						<i className='room-dot' /> Développeur Fullstack · Paris · disponible
					</p>
				</div>
				<Link href='/classic' className='room-classic'>
					Version classique
				</Link>
			</header>

			{!focus && <p className='room-hint'>Glissez pour regarder autour · cliquez sur un objet</p>}

			<nav className='room-nav' aria-label='Sections'>
				{SPOTS.map((s) => (
					<button key={s.id} className={focus === s.id ? "on" : ""} onClick={() => setFocus(focus === s.id ? null : s.id)}>
						<span aria-hidden='true'>{s.emoji}</span> {s.label}
					</button>
				))}
			</nav>

			<aside className={`room-panel${focus ? " open" : ""}`} aria-hidden={!focus} aria-label={current?.label}>
				<button className='room-back' onClick={() => setFocus(null)}>
					← Retour au bureau <kbd>Esc</kbd>
				</button>
				<div className='room-panel-body' key={focus}>
					{focus && <PanelContent id={focus} />}
				</div>
			</aside>
		</div>
	);
}
