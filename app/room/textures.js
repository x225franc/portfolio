import * as THREE from "three";

// Every texture in the room is drawn on a 2D canvas: no image assets to load.
export function canvasTexture(width, height, draw) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	draw(ctx, width, height);
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;
	return texture;
}

const rand = (seed) => {
	let s = seed;
	return () => ((s = (s * 16807) % 2147483647) / 2147483647);
};

export const nightSky = () =>
	canvasTexture(512, 384, (c, w, h) => {
		const sky = c.createLinearGradient(0, 0, 0, h);
		sky.addColorStop(0, "#050816");
		sky.addColorStop(0.7, "#14204a");
		sky.addColorStop(1, "#2a2350");
		c.fillStyle = sky;
		c.fillRect(0, 0, w, h);
		const r = rand(7);
		for (let i = 0; i < 120; i++) {
			c.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.7})`;
			c.fillRect(r() * w, r() * h * 0.6, 1.5, 1.5);
		}
		// Moon
		c.shadowColor = "#fff8d6";
		c.shadowBlur = 40;
		c.fillStyle = "#fff6d0";
		c.beginPath();
		c.arc(w * 0.72, h * 0.25, 30, 0, Math.PI * 2);
		c.fill();
		c.shadowBlur = 0;
		// City skyline with lit windows
		let x = 0;
		while (x < w) {
			const bw = 30 + r() * 50;
			const bh = 80 + r() * 170;
			c.fillStyle = "#0a0d1c";
			c.fillRect(x, h - bh, bw, bh);
			for (let wy = h - bh + 10; wy < h - 6; wy += 14) {
				for (let wx = x + 6; wx < x + bw - 6; wx += 10) {
					if (r() > 0.68) {
						c.fillStyle = r() > 0.2 ? "#ffd27a" : "#7dd3fc";
						c.fillRect(wx, wy, 4, 6);
					}
				}
			}
			x += bw + 4;
		}
		// Eiffel tower silhouette, we're in Paris after all
		c.strokeStyle = "#0a0d1c";
		c.fillStyle = "#0a0d1c";
		const ex = w * 0.3;
		const base = h;
		c.beginPath();
		c.moveTo(ex - 34, base);
		c.quadraticCurveTo(ex - 10, base - 90, ex - 3, base - 220);
		c.lineTo(ex + 3, base - 220);
		c.quadraticCurveTo(ex + 10, base - 90, ex + 34, base);
		c.closePath();
		c.fill();
		c.fillStyle = "#ffcf6e";
		c.fillRect(ex - 1, base - 232, 2, 12);
	});

export const neonSign = () =>
	canvasTexture(1024, 256, (c, w, h) => {
		c.clearRect(0, 0, w, h);
		c.font = "700 150px 'Space Grotesk', 'Segoe UI', sans-serif";
		c.textAlign = "center";
		c.textBaseline = "middle";
		c.shadowColor = "#c6f36b";
		c.shadowBlur = 30;
		c.fillStyle = "#e9ffb8";
		c.fillText("</> MALICK", w / 2, h / 2 + 6);
	});

export const diploma = () =>
	canvasTexture(640, 460, (c, w, h) => {
		c.fillStyle = "#f6f0e1";
		c.fillRect(0, 0, w, h);
		c.strokeStyle = "#b8963e";
		c.lineWidth = 6;
		c.strokeRect(18, 18, w - 36, h - 36);
		c.lineWidth = 1.5;
		c.strokeRect(30, 30, w - 60, h - 60);
		c.fillStyle = "#3b3220";
		c.textAlign = "center";
		c.font = "600 26px Georgia, serif";
		c.fillText("ESGI · PARIS", w / 2, 92);
		c.font = "700 46px Georgia, serif";
		c.fillText("Master", w / 2, 170);
		c.font = "italic 32px Georgia, serif";
		c.fillText("Ingénierie du Web", w / 2, 215);
		c.font = "22px Georgia, serif";
		c.fillText("décerné à", w / 2, 275);
		c.font = "700 34px Georgia, serif";
		c.fillText("Alpha Malick Diawara", w / 2, 320);
		c.font = "20px Georgia, serif";
		c.fillText("Titre RNCP niveau 7 — 2026", w / 2, 372);
		c.fillStyle = "#b8963e";
		c.beginPath();
		c.arc(w - 110, h - 95, 34, 0, Math.PI * 2);
		c.fill();
	});

export const phoneScreen = () =>
	canvasTexture(256, 512, (c, w, h) => {
		const g = c.createLinearGradient(0, 0, w, h);
		g.addColorStop(0, "#1e1b4b");
		g.addColorStop(1, "#0f766e");
		c.fillStyle = g;
		c.fillRect(0, 0, w, h);
		c.fillStyle = "#fff";
		c.textAlign = "center";
		c.font = "300 64px 'Segoe UI', sans-serif";
		c.fillText("21:42", w / 2, 120);
		c.font = "20px 'Segoe UI', sans-serif";
		c.fillText("1 nouveau message", w / 2, 160);
		c.fillStyle = "rgba(255,255,255,0.15)";
		c.beginPath();
		c.roundRect(20, 210, w - 40, 90, 18);
		c.fill();
		c.fillStyle = "#fff";
		c.textAlign = "left";
		c.font = "600 18px 'Segoe UI', sans-serif";
		c.fillText("Recruteur 👀", 38, 245);
		c.font = "16px 'Segoe UI', sans-serif";
		c.fillText("On se parle ?", 38, 275);
	});

export const keyboardTop = () =>
	canvasTexture(512, 160, (c, w, h) => {
		c.fillStyle = "#18181d";
		c.fillRect(0, 0, w, h);
		const rows = 5;
		const cols = 15;
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const kw = w / cols;
				const kh = h / rows;
				c.fillStyle = (x + y * 3) % 11 === 0 ? "#c6f36b" : "#2b2b33";
				c.fillRect(x * kw + 3, y * kh + 3, kw - 6, kh - 6);
			}
		}
	});

export const bookSpine = (color, label) =>
	canvasTexture(64, 256, (c, w, h) => {
		c.fillStyle = color;
		c.fillRect(0, 0, w, h);
		c.fillStyle = "rgba(255,255,255,0.18)";
		c.fillRect(0, 18, w, 4);
		c.fillRect(0, h - 22, w, 4);
		c.save();
		c.translate(w / 2, h / 2);
		c.rotate(-Math.PI / 2);
		c.fillStyle = "#fff";
		c.font = "700 22px 'Segoe UI', sans-serif";
		c.textAlign = "center";
		c.textBaseline = "middle";
		c.fillText(label, 0, 0);
		c.restore();
	});

// The monitor shows code being typed. Returns the texture and a tick(time) to animate it.
export function codeScreen() {
	const lines = [
		["// malick.js", "#6b7280"],
		["const malick = {", "#e5e7eb"],
		['  role: "Développeur Fullstack",', "#c6f36b"],
		['  city: "Paris",', "#c6f36b"],
		['  diploma: "Master Ingénierie du Web",', "#c6f36b"],
		['  stack: ["PHP", "Symfony", "React", "Vue", "Node"],', "#7dd3fc"],
		["  available: true,", "#f472b6"],
		["};", "#e5e7eb"],
		["", "#fff"],
		["hire(malick); // 🚀", "#facc15"],
	];
	const canvas = document.createElement("canvas");
	canvas.width = 1024;
	canvas.height = 580;
	const c = canvas.getContext("2d");
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	const total = lines.reduce((n, [l]) => n + l.length + 1, 0);
	let last = -1;

	const tick = (t) => {
		const typed = Math.floor((t * 22) % (total + 60));
		if (typed === last) return;
		last = typed;
		c.fillStyle = "#0d1117";
		c.fillRect(0, 0, canvas.width, canvas.height);
		c.fillStyle = "#161b22";
		c.fillRect(0, 0, canvas.width, 44);
		["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
			c.fillStyle = col;
			c.beginPath();
			c.arc(26 + i * 24, 22, 7, 0, Math.PI * 2);
			c.fill();
		});
		c.fillStyle = "#8b949e";
		c.font = "20px Consolas, monospace";
		c.fillText("malick.js — portfolio", 120, 29);
		c.font = "30px Consolas, 'Courier New', monospace";
		let left = typed;
		lines.forEach(([text, color], i) => {
			const y = 100 + i * 46;
			c.fillStyle = "#3b4252";
			c.fillText(String(i + 1).padStart(2, " "), 20, y);
			if (left <= 0) return;
			const part = text.slice(0, left);
			left -= text.length + 1;
			c.fillStyle = color;
			c.fillText(part, 80, y);
			if (left <= 0 && Math.floor(t * 2) % 2 === 0) {
				c.fillStyle = "#c6f36b";
				c.fillRect(80 + c.measureText(part).width + 2, y - 26, 14, 32);
			}
		});
		texture.needsUpdate = true;
	};
	tick(0);
	return { texture, tick };
}
