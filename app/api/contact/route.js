import nodemailer from "nodemailer";

export async function POST(req) {
	try {
		const { name, email, message } = await req.json();

		if (!name || !email || !message) {
			return Response.json({ error: "Champs manquants" }, { status: 400 });
		}

		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			secure: false,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		await transporter.sendMail({
			from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
			to: "diawaraalphamalick225@gmail.com",
			replyTo: email,
			subject: `📬 Nouveau message de ${name}`,
			html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050a14; color: #e2e8f0; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #38bdf8, #818cf8); padding: 32px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; color: #050a14; font-weight: 800;">Nouveau message reçu</h1>
                <p style="margin: 8px 0 0; color: #050a14; opacity: 0.7; font-size: 14px;">Depuis ton portfolio</p>
            </div>
            <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; width: 100px;">Nom</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #e2e8f0; font-size: 15px;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #38bdf8; font-size: 15px;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; color: #94a3b8; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top; padding-top: 16px;">Message</td>
                    <td style="padding: 12px 0; padding-top: 16px; color: #e2e8f0; font-size: 15px; line-height: 1.7;">${message.replace(/\n/g, "<br/>")}</td>
                </tr>
                </table>
                <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #38bdf8, #818cf8); color: #050a14; text-decoration: none; padding: 12px 28px; border-radius: 100px; font-weight: 700; font-size: 14px;">
                    Répondre à ${name} →
                </a>
                </div>
            </div>
            </div>
        `,
            });

		return Response.json({ success: true });
	} catch (err) {
		console.error("Mail error:", err);
		return Response.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
	}
}
