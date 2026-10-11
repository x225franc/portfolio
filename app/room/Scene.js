"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, Html, Sparkles, useTexture, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { skillGroups } from "../data";
import {
	nightSky,
	neonSign,
	diploma,
	phoneScreen,
	keyboardTop,
	bookSpine,
	codeScreen,
} from "./textures";

// Camera position + look-at target for the overview and each clickable object.
export const SHOTS = {
	overview: { pos: [3.6, 2.7, 2.6], target: [-0.4, 1.15, -2.0] },
	overviewMobile: { pos: [4.2, 4.6, 7.2], target: [-0.2, 1.1, -1.9] },
	projects: { pos: [0.15, 1.42, -0.55], target: [0, 1.22, -2.62] },
	skills: { pos: [-1.6, 1.45, -0.9], target: [-3.65, 1.25, -1.2] },
	journey: { pos: [-1.55, 2.05, -1.55], target: [-1.55, 2.05, -3] },
	about: { pos: [1.9, 1.85, -0.75], target: [2.3, 1.85, -3] },
	cv: { pos: [1.0, 1.55, -1.45], target: [1.0, 0.78, -2.0] },
	contact: { pos: [-0.62, 1.3, -1.45], target: [-0.62, 0.78, -2.0] },
};

const ACCENT = "#c6f36b";

const BOOK_COLORS = {
	PHP: "#777bb3",
	Symfony: "#1a1a1a",
	NodeJS: "#3c873a",
	Python: "#3776ab",
	MySQL: "#00758f",
	React: "#149eca",
	VueJS: "#42b883",
	JavaScript: "#c9a400",
	TypeScript: "#3178c6",
	HTML5: "#e34f26",
	CSS3: "#1572b6",
	Bootstrap: "#7952b3",
	Git: "#f05032",
	Figma: "#a259ff",
	"Agile / Scrum": "#475569",
	"Migration legacy": "#7c2d12",
};

// Wraps an object so it highlights on hover, shows a label, and focuses the camera on click.
function Hotspot({ id, label, onSelect, active, labelOffset = [0, 0.3, 0], children }) {
	const [hovered, setHovered] = useState(false);
	const glow = useRef();

	useEffect(() => {
		document.body.style.cursor = hovered ? "pointer" : "";
	}, [hovered]);

	useFrame((_, dt) => {
		const target = hovered && !active ? 3 : 0;
		glow.current.intensity += (target - glow.current.intensity) * Math.min(dt * 8, 1);
	});

	const [lx, ly, lz] = labelOffset;
	return (
		<group
			onPointerOver={(e) => {
				e.stopPropagation();
				setHovered(true);
			}}
			onPointerOut={() => setHovered(false)}
			onClick={(e) => {
				e.stopPropagation();
				setHovered(false);
				onSelect(id);
			}}
		>
			{children}
			<pointLight ref={glow} position={[lx, ly - 0.25, lz + 0.35]} color={ACCENT} intensity={0} distance={1.6} />
			{!active && (
				<Html position={labelOffset} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
					<div className={`room-label${hovered ? " show" : ""}`}>{label}</div>
				</Html>
			)}
		</group>
	);
}

function Room() {
	const sky = useMemo(nightSky, []);
	const neon = useMemo(neonSign, []);
	return (
		<group>
			{/* floor */}
			<mesh rotation-x={-Math.PI / 2} receiveShadow>
				<planeGeometry args={[14, 14]} />
				<meshStandardMaterial color='#17161d' roughness={0.9} />
			</mesh>
			{/* rug */}
			<mesh rotation-x={-Math.PI / 2} position={[0, 0.005, -1.4]} receiveShadow>
				<circleGeometry args={[1.5, 48]} />
				<meshStandardMaterial color='#2b2540' roughness={1} />
			</mesh>
			{/* back wall */}
			<mesh position={[0, 2.5, -3.05]} receiveShadow>
				<boxGeometry args={[10, 5, 0.1]} />
				<meshStandardMaterial color='#24232d' roughness={0.95} />
			</mesh>
			{/* left wall */}
			<mesh position={[-4.05, 2.5, 0]} receiveShadow>
				<boxGeometry args={[0.1, 5, 10]} />
				<meshStandardMaterial color='#1f1e27' roughness={0.95} />
			</mesh>
			{/* skirting accent strip */}
			<mesh position={[-0.5, 0.04, -2.99]}>
				<boxGeometry args={[7, 0.015, 0.015]} />
				<meshBasicMaterial color={[0.5, 0.65, 0.25]} toneMapped={false} />
			</mesh>
			{/* neon sign */}
			<mesh position={[0.15, 2.55, -2.98]}>
				<planeGeometry args={[1.9, 0.48]} />
				<meshBasicMaterial map={neon} transparent toneMapped={false} color={[2.2, 2.4, 1.6]} />
			</mesh>
			<pointLight position={[0.15, 2.5, -2.6]} color={ACCENT} intensity={1.6} distance={3} />
			{/* window */}
			<group position={[2.3, 1.85, -2.99]}>
				<mesh>
					<planeGeometry args={[1.7, 1.25]} />
					<meshBasicMaterial map={sky} toneMapped={false} />
				</mesh>
				{[
					[0, 0.65, 1.8, 0.06],
					[0, -0.65, 1.8, 0.06],
					[-0.87, 0, 0.06, 1.36],
					[0.87, 0, 0.06, 1.36],
					[0, 0, 0.04, 1.3],
				].map(([x, y, w, h], i) => (
					<mesh key={i} position={[x, y, 0.03]}>
						<boxGeometry args={[w, h, 0.06]} />
						<meshStandardMaterial color='#3a3946' />
					</mesh>
				))}
				<mesh position={[0, -0.7, 0.1]}>
					<boxGeometry args={[1.9, 0.05, 0.22]} />
					<meshStandardMaterial color='#3a3946' />
				</mesh>
			</group>
			<directionalLight position={[3, 3.5, -5]} intensity={0.35} color='#9db4ff' />
		</group>
	);
}

function Desk() {
	return (
		<group>
			<mesh position={[0, 0.75, -2.3]} castShadow receiveShadow>
				<boxGeometry args={[2.9, 0.06, 1.15]} />
				<meshStandardMaterial color='#3b2f2a' roughness={0.6} />
			</mesh>
			{[
				[-1.38, -2.82],
				[1.38, -2.82],
				[-1.38, -1.78],
				[1.38, -1.78],
			].map(([x, z], i) => (
				<mesh key={i} position={[x, 0.36, z]} castShadow>
					<boxGeometry args={[0.06, 0.72, 0.06]} />
					<meshStandardMaterial color='#111114' metalness={0.6} roughness={0.4} />
				</mesh>
			))}
			{/* LED strip under the desk */}
			<mesh position={[0, 0.715, -1.74]}>
				<boxGeometry args={[2.8, 0.01, 0.01]} />
				<meshBasicMaterial color={[1.2, 0.6, 2.4]} toneMapped={false} />
			</mesh>
			{/* chair */}
			<group position={[-0.8, 0, -1.45]} rotation-y={1.0}>
				<mesh position={[0, 0.48, 0]} castShadow>
					<boxGeometry args={[0.55, 0.08, 0.55]} />
					<meshStandardMaterial color='#2a2a33' roughness={0.7} />
				</mesh>
				<mesh position={[0, 0.95, 0.26]} castShadow>
					<boxGeometry args={[0.52, 0.85, 0.07]} />
					<meshStandardMaterial color='#2a2a33' roughness={0.7} />
				</mesh>
				<mesh position={[0, 0.24, 0]}>
					<cylinderGeometry args={[0.03, 0.03, 0.42]} />
					<meshStandardMaterial color='#333' metalness={0.8} />
				</mesh>
				<mesh position={[0, 0.04, 0]}>
					<cylinderGeometry args={[0.3, 0.3, 0.04, 5]} />
					<meshStandardMaterial color='#222' />
				</mesh>
			</group>
		</group>
	);
}

function Monitor() {
	const { texture, tick } = useMemo(codeScreen, []);
	const kb = useMemo(keyboardTop, []);
	useFrame(({ clock }) => tick(clock.elapsedTime));
	return (
		<group>
			<mesh position={[0, 1.3, -2.66]} castShadow>
				<boxGeometry args={[1.5, 0.88, 0.05]} />
				<meshStandardMaterial color='#0b0b0e' metalness={0.4} roughness={0.4} />
			</mesh>
			<mesh position={[0, 1.3, -2.633]}>
				<planeGeometry args={[1.42, 0.8]} />
				<meshBasicMaterial map={texture} toneMapped={false} />
			</mesh>
			<pointLight position={[0, 1.3, -2.2]} color='#7dd3fc' intensity={1.2} distance={2.2} />
			<mesh position={[0, 0.95, -2.72]}>
				<boxGeometry args={[0.08, 0.36, 0.05]} />
				<meshStandardMaterial color='#1c1c22' metalness={0.7} />
			</mesh>
			<mesh position={[0, 0.79, -2.68]} castShadow>
				<boxGeometry args={[0.45, 0.02, 0.25]} />
				<meshStandardMaterial color='#1c1c22' metalness={0.7} />
			</mesh>
			{/* keyboard + mouse */}
			<mesh position={[-0.05, 0.795, -2.05]} castShadow>
				<boxGeometry args={[0.85, 0.03, 0.27]} />
				<meshStandardMaterial color='#18181d' />
			</mesh>
			<mesh position={[-0.05, 0.811, -2.05]} rotation-x={-Math.PI / 2}>
				<planeGeometry args={[0.83, 0.25]} />
				<meshStandardMaterial map={kb} emissiveMap={kb} emissive='#ffffff' emissiveIntensity={0.08} />
			</mesh>
			<mesh position={[0.55, 0.8, -2.03]} scale={[1, 0.5, 1.4]} castShadow>
				<sphereGeometry args={[0.05, 20, 12]} />
				<meshStandardMaterial color='#18181d' />
			</mesh>
		</group>
	);
}

function Mug() {
	const steam = useRef([]);
	useFrame(({ clock }) => {
		steam.current.forEach((m, i) => {
			if (!m) return;
			const t = (clock.elapsedTime * 0.35 + i / 8) % 1;
			m.position.y = 0.94 + t * 0.32;
			m.position.x = Math.sin((t * 2 + i) * 4) * 0.025;
			m.material.opacity = 0.07 * Math.sin(t * Math.PI);
			m.scale.setScalar(0.4 + t * 1.2);
		});
	});
	return (
		<group position={[0.82, 0, -2.25]}>
			<mesh position={[0, 0.86, 0]} castShadow>
				<cylinderGeometry args={[0.06, 0.055, 0.15, 24]} />
				<meshStandardMaterial color='#e8e2d4' />
			</mesh>
			<mesh position={[0.065, 0.86, 0]} rotation-z={Math.PI / 2}>
				<torusGeometry args={[0.035, 0.012, 8, 16]} />
				<meshStandardMaterial color='#e8e2d4' />
			</mesh>
			{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
				<mesh key={i} ref={(m) => (steam.current[i] = m)}>
					<sphereGeometry args={[0.025, 10, 10]} />
					<meshBasicMaterial color='#ffffff' transparent depthWrite={false} />
				</mesh>
			))}
		</group>
	);
}

function Lamp() {
	const target = useMemo(() => new THREE.Object3D(), []);
	return (
		<group position={[-1.25, 0.78, -2.6]}>
			<primitive object={target} position={[0.9, -0.1, 0.5]} />
			<mesh castShadow>
				<cylinderGeometry args={[0.12, 0.14, 0.03, 24]} />
				<meshStandardMaterial color='#111' metalness={0.6} />
			</mesh>
			<mesh position={[0.1, 0.32, 0.05]} rotation-z={-0.4}>
				<cylinderGeometry args={[0.012, 0.012, 0.7]} />
				<meshStandardMaterial color='#111' metalness={0.6} />
			</mesh>
			<mesh position={[0.28, 0.6, 0.12]} rotation-z={-2.3}>
				<coneGeometry args={[0.12, 0.2, 24, 1, true]} />
				<meshStandardMaterial color='#111' side={THREE.DoubleSide} />
			</mesh>
			<mesh position={[0.32, 0.56, 0.12]}>
				<sphereGeometry args={[0.04, 16, 16]} />
				<meshBasicMaterial color={[4, 3, 1.6]} toneMapped={false} />
			</mesh>
			<spotLight
				position={[0.32, 0.56, 0.12]}
				target={target}
				angle={0.9}
				penumbra={0.8}
				intensity={6}
				distance={4}
				color='#ffcf8a'
				castShadow
				shadow-mapSize={[1024, 1024]}
				shadow-bias={-0.0005}
			/>
		</group>
	);
}

function Plant() {
	const leaves = useMemo(
		() => Array.from({ length: 9 }, (_, i) => ({ r: (i / 9) * Math.PI * 2, tilt: 0.4 + (i % 3) * 0.2, h: 0.28 + (i % 4) * 0.06 })),
		[],
	);
	const ref = useRef();
	useFrame(({ clock }) => {
		ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.03;
	});
	return (
		<group position={[1.25, 0.78, -2.62]}>
			<mesh position={[0, 0.1, 0]} castShadow>
				<cylinderGeometry args={[0.11, 0.08, 0.2, 20]} />
				<meshStandardMaterial color='#c2734a' roughness={0.8} />
			</mesh>
			<group ref={ref} position={[0, 0.2, 0]}>
				{leaves.map((l, i) => (
					<mesh key={i} rotation={[l.tilt * Math.cos(l.r), l.r, l.tilt * Math.sin(l.r)]} position={[0, l.h / 2, 0]} castShadow>
						<coneGeometry args={[0.035, l.h, 4]} />
						<meshStandardMaterial color={i % 2 ? "#3f8f4a" : "#2f7a3b"} flatShading />
					</mesh>
				))}
			</group>
		</group>
	);
}

function Phone() {
	const tex = useMemo(phoneScreen, []);
	const ref = useRef();
	useFrame(({ clock }) => {
		// A little buzz every few seconds, like an incoming message.
		const t = clock.elapsedTime % 4;
		ref.current.rotation.y = 0.35 + (t < 0.4 ? Math.sin(t * 90) * 0.04 : 0);
	});
	return (
		<group ref={ref} position={[-0.62, 0.79, -2.0]} rotation-y={0.35}>
			<mesh castShadow>
				<boxGeometry args={[0.15, 0.015, 0.3]} />
				<meshStandardMaterial color='#0b0b0e' metalness={0.6} roughness={0.3} />
			</mesh>
			<mesh position={[0, 0.0085, 0]} rotation-x={-Math.PI / 2}>
				<planeGeometry args={[0.135, 0.28]} />
				<meshBasicMaterial map={tex} toneMapped={false} />
			</mesh>
		</group>
	);
}

function CvPaper() {
	const tex = useTexture("/uploads/CV.png");
	tex.colorSpace = THREE.SRGBColorSpace;
	return (
		<group position={[1.0, 0.785, -2.0]} rotation-y={-0.2}>
			<mesh position={[0.02, -0.002, 0.02]} rotation-x={-Math.PI / 2} rotation-z={0.08}>
				<planeGeometry args={[0.34, 0.48]} />
				<meshStandardMaterial color='#d9d4c7' />
			</mesh>
			<mesh rotation-x={-Math.PI / 2} receiveShadow>
				<planeGeometry args={[0.34, 0.48]} />
				<meshStandardMaterial map={tex} roughness={0.9} emissiveMap={tex} emissive='#ffffff' emissiveIntensity={0.15} />
			</mesh>
		</group>
	);
}

function Diploma() {
	const tex = useMemo(diploma, []);
	return (
		<group position={[-1.55, 2.05, -2.98]}>
			<mesh castShadow>
				<boxGeometry args={[0.95, 0.72, 0.04]} />
				<meshStandardMaterial color='#6b4f2a' metalness={0.3} roughness={0.5} />
			</mesh>
			<mesh position={[0, 0, 0.022]}>
				<planeGeometry args={[0.84, 0.6]} />
				<meshStandardMaterial map={tex} emissiveMap={tex} emissive='#ffffff' emissiveIntensity={0.2} />
			</mesh>
			<pointLight position={[0, 0.5, 0.4]} intensity={0.6} distance={1.4} color='#ffe6b0' />
		</group>
	);
}

function Bookshelf() {
	const books = useMemo(() => {
		const all = skillGroups.flatMap((g) => g.items.map((s) => s.name));
		const out = [];
		const shelves = [0.55, 1.05, 1.55];
		let shelf = 0;
		let z = -1.75;
		all.forEach((name, i) => {
			const width = 0.07 + ((i * 37) % 5) * 0.012;
			if (z + width > -1.0) {
				shelf++;
				z = -1.75;
			}
			const h = 0.3 + ((i * 53) % 4) * 0.03;
			out.push({ name, z: z + width / 2, y: shelves[shelf % 3] + h / 2, w: width, h, tex: bookSpine(BOOK_COLORS[name] || "#555", name) });
			z += width + 0.006;
		});
		return out;
	}, []);
	return (
		<group position={[-3.8, 0, 0]}>
			{/* frame */}
			<mesh position={[0.02, 1.05, -1.2]} receiveShadow>
				<boxGeometry args={[0.04, 2.1, 1.25]} />
				<meshStandardMaterial color='#2a2420' />
			</mesh>
			{[-1.81, -0.59].map((z) => (
				<mesh key={z} position={[0.2, 1.05, z]} castShadow receiveShadow>
					<boxGeometry args={[0.4, 2.1, 0.04]} />
					<meshStandardMaterial color='#2a2420' />
				</mesh>
			))}
			{[0.53, 1.03, 1.53, 2.03].map((y) => (
				<mesh key={y} position={[0.2, y, -1.2]} receiveShadow castShadow>
					<boxGeometry args={[0.4, 0.03, 1.22]} />
					<meshStandardMaterial color='#4a3b30' />
				</mesh>
			))}
			{/* LED under the top shelf */}
			<mesh position={[0.36, 2.01, -1.2]}>
				<boxGeometry args={[0.01, 0.01, 1.2]} />
				<meshBasicMaterial color={[2, 1.6, 0.8]} toneMapped={false} />
			</mesh>
			<pointLight position={[0.6, 1.6, -1.2]} intensity={0.8} distance={2} color='#ffcf8a' />
			{books.map((b) => (
				<mesh key={b.name} position={[0.2, b.y, b.z]} castShadow>
					<boxGeometry args={[0.26, b.h, b.w]} />
					<meshStandardMaterial attach='material-0' map={b.tex} />
					<meshStandardMaterial attach='material-1' color='#e9e4d6' />
					<meshStandardMaterial attach='material-2' color='#e9e4d6' />
					<meshStandardMaterial attach='material-3' color='#e9e4d6' />
					<meshStandardMaterial attach='material-4' color={BOOK_COLORS[b.name] || "#555"} />
					<meshStandardMaterial attach='material-5' color={BOOK_COLORS[b.name] || "#555"} />
				</mesh>
			))}
		</group>
	);
}

function Rig({ focus, intro }) {
	const controls = useRef();
	const [mobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 760);

	useEffect(() => {
		const c = controls.current;
		if (!c) return;
		const shot = focus ? SHOTS[focus] : mobile ? SHOTS.overviewMobile : SHOTS.overview;
		const overview = !focus;
		c.minDistance = overview ? 2.5 : 0;
		c.maxDistance = overview ? 12 : Infinity;
		c.minPolarAngle = overview ? 0.5 : 0;
		c.maxPolarAngle = overview ? Math.PI / 2 - 0.08 : Math.PI;
		c.minAzimuthAngle = overview ? -0.35 : -Infinity;
		c.maxAzimuthAngle = overview ? 1.45 : Infinity;
		c.smoothTime = intro ? 1.6 : 0.6;
		c.setLookAt(...shot.pos, ...shot.target, true);
	}, [focus, mobile, intro]);

	return (
		<CameraControls
			ref={controls}
			makeDefault
			dollySpeed={0.4}
			truckSpeed={0}
		/>
	);
}

export default function Scene({ focus, onSelect, introDone }) {
	const is = (id) => focus === id;
	return (
		<Canvas
			shadows
			dpr={[1, 1.75]}
			camera={{ position: [9, 7, 9], fov: 42, near: 0.05, far: 60 }}
			gl={{ antialias: true }}
			onPointerMissed={() => focus && onSelect(null)}
		>
			<color attach='background' args={["#0b0a10"]} />
			<fog attach='fog' args={["#0b0a10", 9, 20]} />
			<ambientLight intensity={0.22} color='#8f8cff' />
			<hemisphereLight intensity={0.25} color='#b8b5ff' groundColor='#1a1020' />

			<Room />
			<Desk />
			<Mug />
			<Lamp />
			<Plant />

			<Hotspot id='projects' label='💻 Projets' onSelect={onSelect} active={is("projects")} labelOffset={[0, 1.85, -2.66]}>
				<Monitor />
			</Hotspot>
			<Hotspot id='skills' label='📚 Stack' onSelect={onSelect} active={is("skills")} labelOffset={[-3.5, 2.3, -1.2]}>
				<Bookshelf />
			</Hotspot>
			<Hotspot id='journey' label='🎓 Parcours' onSelect={onSelect} active={is("journey")} labelOffset={[-1.55, 2.55, -2.95]}>
				<Diploma />
			</Hotspot>
			<Hotspot id='about' label='🌙 À propos' onSelect={onSelect} active={is("about")} labelOffset={[2.3, 2.65, -2.95]}>
				<group position={[2.3, 1.85, -2.97]}>
					<mesh>
						<planeGeometry args={[1.7, 1.25]} />
						<meshBasicMaterial transparent opacity={0} depthWrite={false} />
					</mesh>
				</group>
			</Hotspot>
			<Hotspot id='cv' label='📄 CV' onSelect={onSelect} active={is("cv")} labelOffset={[1.0, 1.05, -2.0]}>
				<Suspense fallback={null}>
					<CvPaper />
				</Suspense>
			</Hotspot>
			<Hotspot id='contact' label='📱 Contact' onSelect={onSelect} active={is("contact")} labelOffset={[-0.62, 1.05, -2.0]}>
				<Phone />
			</Hotspot>

			{!focus && (
				<Sparkles count={40} scale={[6, 2.5, 3]} position={[-0.5, 1.6, -1.8]} size={2.2} speed={0.25} color={ACCENT} opacity={0.6} />
			)}
			<ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={10} blur={2.5} far={3} />

			<Rig focus={focus} intro={!introDone} />

			<EffectComposer disableNormalPass>
				<Bloom mipmapBlur luminanceThreshold={1} intensity={0.9} radius={0.7} />
				<Vignette eskil={false} offset={0.2} darkness={0.75} />
			</EffectComposer>
		</Canvas>
	);
}
