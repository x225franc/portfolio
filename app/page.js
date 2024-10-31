"use client";
import react, { useState, useEffect } from "react";
import Head from "next/head";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function Home() {
	const [disabled, setDisabled] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [submitted, setSubmitted] = useState(false);

	// const handleSubmit = async (e) => {
	//   e.preventDefault();

	//   if (!name || !email || !message) {
	//     alert('Veuillez remplir tous les champs !');
	//     return;
	//   }

	//   const formData = new FormData();
	//   formData.append('name', name);
	//   formData.append('email', email);
	//   formData.append('message', message);

	//   try {
	//     const response = await fetch('/api/contact', {
	//       method: 'POST',
	//       body: formData
	//     });

	//     if (response.ok) {
	//       alert('Votre message a bien été envoyé !');
	//       setName('');
	//       setEmail('');
	//       setMessage('');
	//       setSubmitted(true);
	//     } else {
	//       alert('Une erreur s\'est produite. Veuillez réessayer !');
	//     }
	//   } catch (error) {
	//     console.error('Erreur lors de l\'envoi du formulaire :', error);
	//     alert('Une erreur s\'est produite. Veuillez réessayer !');
	//   }
	// };

	return (
		<>
			<SnackbarProvider
				maxSnack={1}
				autoHideDuration={2000}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Head>
					<title>Diawara Alpha Malick</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<div id='fullpage'>
					<div id='home' className='section'>
						<div className='container'>
							<div className='row'>
								<div className='col-md-2'></div>
								<div className='col-md-8 wow fadeIn' data-wow-delay='0.9s'>
									<h2>Développeur Web Fullstack</h2>
									<h1 style={{ color: "red" }}>DIAWARA ALPHA MALICK</h1>
									<h2 className='rotate'>Bienvenue sur mon portfolio !</h2>
									<p style={{ color: "white" }}>
										Hello ! Je m'appelle Diawara Alpha Malick , développeur web
										fullstack. <br />
										J'ai au cours de mes années d'études pu acquérir des
										compétences en développement web <br />
										(HTML - CSS - PHP - SYMFONY - JS - REACT - MYSQL - GIT){" "}
										<br />
										Compétences que j'ai pu mettre en pratique dans divers
										projets. <br />
										Déterminé et surtout passionné par l'informatique ,<br /> je
										me documente constamment sur les avancées dans ce domaine!{" "}
										<br />
										Actuellement étudiant en formation , je me vois dans 5 ans
										comme développeur fullstack polyvalent.
									</p>
									<a
										href='#work'
										className='btn btn-default wow fadeInUp'
										data-wow-delay='1s'
										onClick={(event) => {
											event.preventDefault();
											document
												.querySelector("#work")
												.scrollIntoView({ behavior: "smooth" });
										}}
									>
										Découvrir
									</a>
								</div>
								<div className='col-md-2'></div>
							</div>
						</div>
					</div>

					<div id='work' className='section'>
						<div className='container'>
							<div className='row'>
								<div className='col-md-12 wow bounce'>
									<h2>ACTUELLEMENT</h2>
								</div>
							</div>

							<div className='row'>
								<div
									className='col-md-4 col-xs-11 wow fadeInUp'
									data-wow-delay='0.6s'
								>
									<div className='media'>
										<div className='media-object media-left'>
											<i className='fa fa-graduation-cap'></i>
										</div>
										<div className='media-body'>
											<h3 className='media-heading'>Étudiant</h3>
											<p>
												INGÉNIERIE WEB <br /> EXPERT EN INGÉNIERIE INFORMATIQUE
												(Bac +5) <br /> Préparation au Titre RNCP de niveau 7
											</p>
										</div>
									</div>
								</div>

								<div
									className='col-md-4 col-xs-11 wow fadeInUp'
									data-wow-delay='0.6s'
								>
									<div className='media'>
										<div className='media-object media-left'>
											<i className='fa fa-paper-plane'></i>
										</div>
										<div className='media-body'>
											<h3 className='media-heading'>Qualités</h3>
											<p>
												{" "}
												Autonome , Curieux , Organisé et ayant un très bon
												esprit d'équipe , j'arrive à mener tous mes projets à
												bien !
											</p>
										</div>
									</div>
								</div>

								<div
									className='col-md-4 col-xs-11 wow fadeInUp'
									data-wow-delay='0.6s'
								>
									<div className='media'>
										<div className='media-object media-left'>
											<i className='fa fa-laptop'></i>
										</div>
										<div className='media-body'>
											<h3 className='media-heading'>
												Développeur web fullstack
											</h3>
											<p>Fort de 2 années d'expériences dans le domaine.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div
						id='about'
						className='section'
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100vh",
							margin: "0", // Ensure no margin is affecting the centering
							padding: "0", // Ensure no padding is affecting the centering
							boxSizing: "border-box", // Include padding and border in the element's total width and height
						}}
					>
						<div className='container' style={{ textAlign: "center" }}>
							<div className='row'>
								<div>
									<h2>COMPÉTENCES</h2>
									<h4>DÉVELOPPEUR WEB</h4>
									<p>
										En constante évolution, on en apprend tous les jours dans ce
										domaine, d’autant plus en étant impliqué et curieux.
										<br />
									</p>
									<div>
										<a href='uploads/CV.pdf' target='_blank'>
											<img
												src='uploads/CV.png'
												alt=''
												style={{
													border: "1px solid black",
													maxWidth: "70%",
												}}
											/>{" "}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id='portfolio' className='section'>
						<div className='container'>
							<div className='row'>
								<div className='col-md-12'>
									<h2 className='wow bounce'>PROJETS</h2>
								</div>

								<p>
									Vous trouverez ci-dessous quelques projets sur lesquels j'ai
									travaillé :
								</p>

								<div>
									<div
										className='col-md-6 col-xs-6 wow fadeIn'
										data-wow-delay='0.6s'
									>
										<div className='portfolio-thumb'>
											<a target='_blank' href='https://www.dealo.re'>
												<img
													src='images/portfolio-img5.jpg'
													className='img-responsive'
													alt='portfolio img'
												/>
												<div className='portfolio-overlay'>
													<h4>Dealo</h4>
													<h5>
														Site web de post de petites annonces (Dealo) <br />
														REACT - NODEJS - BOOTSTRAP - MYSQL - JAVASCRIPT
													</h5>
												</div>
											</a>
										</div>
									</div>
									<div
										className='col-md-6 col-xs-6 wow fadeIn'
										data-wow-delay='0.6s'
									>
										<div className='portfolio-thumb'>
											<a target='_blank' href='https://betterplan.vercel.app/'>
												<img
													src='images/portfolio-img6.jpg'
													className='img-responsive'
													alt='portfolio img'
												/>
												<div className='portfolio-overlay'>
													<h4>Betterplann</h4>
													<h5>
														SAAS - gestion d'entreprise (Institut G4) <br />{" "}
														REACT- TYPESCRIPT - SYMFONY - MYSQL - HTML - CSS -
														TAILWIND
													</h5>
												</div>
											</a>
										</div>
									</div>
									<div
										className='col-md-6 col-xs-6 wow fadeIn'
										data-wow-delay='0.6s'
									>
										<div className='portfolio-thumb'>
											<a target='_blank' href='https://www.safesecur.com'>
												<img
													src='images/portfolio-img3.jpg'
													className='img-responsive'
													alt='portfolio img'
												/>
												<div className='portfolio-overlay'>
													<h4>Safesecur</h4>
													<h5>
														Refonte site web Vitrine Safesecur (Safesecur){" "}
														<br /> BOOTSTRAP - PHP - MYSQL - JAVASCRIPT
													</h5>
												</div>
											</a>
										</div>
									</div>
									<div
										className='col-md-6 col-xs-6 wow fadeIn'
										data-wow-delay='0.6s'
									>
										<div className='portfolio-thumb'>
											<a href='#'>
												<img
													src='images/portfolio-img4.jpg'
													className='img-responsive'
													alt='portfolio img'
												/>
												<div className='portfolio-overlay'>
													<h4>Portfolio</h4>
													<h5>
														Portfolio - sur lequel vous vous trouvez
														actuellement 😁 <br /> PHP - HTML - CSS
													</h5>
												</div>
											</a>
										</div>
									</div>
									<div
										className='col-md-6 col-xs-6 wow fadeIn'
										data-wow-delay='0.6s'
									>
										<div className='portfolio-thumb'>
											<img
												src='images/portfolio-img1.jpg'
												className='img-responsive'
												alt='portfolio img'
											/>
											<div className='portfolio-overlay'>
												<h4>Gest-achat</h4>
												<h5>
													Conception d'un outils interne de gestion de demandes
													(Abidjan Terminal) <br /> BOOTSTRAP - HTML - CSS - PHP
													- MYSQL - JAVASCRIPT{" "}
												</h5>
											</div>
										</div>
									</div>
									<div
										className='col-md-6 col-xs-6 wow fadeIn'
										data-wow-delay='0.6s'
									>
										<div className='portfolio-thumb'>
											<a href='#'>
												<img
													src='images/portfolio-img2.jpg'
													className='img-responsive'
													alt='portfolio img'
												/>
												<div className='portfolio-overlay'>
													<h4>Projet Base de connaissances</h4>
													<h5>
														Projet formation - conception d'une base de
														connaissance (Institut G4) <br /> HTML - CSS - PHP -
														MYSQL - JAVASCRIPT{" "}
													</h5>
												</div>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id='contact' className='section'>
						<div className='container'>
							<div className='row'>
								<div
									className='col-lg-5 col-lg-offset-1 col-md-6 wow fadeInUp'
									data-wow-delay='0.6s'
								>
									<address>
										<p className='contact-title'>CONTACTEZ MOI !</p>
										<p>
											<i className='fa fa-phone'></i>(+33) 06 77 06 03 67
										</p>
										<p>
											<i className='fa fa-map-marker'></i> 69009 Lyon , France
										</p>
										<p>
											<i className='fa fa-envelope-o'></i>{" "}
											diawaraalphamalick225@gmail.com
										</p>
									</address>
								</div>
								<div
									className='col-lg-6 col-md-6 col-xs-10 wow fadeInUp'
									data-wow-delay='0.6s'
								>
									<form
										role='form'
										// onSubmit={handleSubmit}
									>
										<input
											name='name'
											type='text'
											className='form-control'
											disabled={disabled}
											required
											value={name}
											onChange={(e) => setName(e.target.value)}
											placeholder='Votre nom'
										/>
										<input
											name='email'
											type='email'
											className='form-control'
											disabled={disabled}
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder='Votre email'
										/>
										<textarea
											name='message'
											rows='5'
											className='form-control'
											disabled={disabled}
											required
											value={message}
											onChange={(e) => setMessage(e.target.value)}
											placeholder='Votre message'
										></textarea>
										<input
											name='send'
											type='submit'
											className='form-control'
											disabled={disabled}
											onClick={(event) => {
												event.preventDefault();
												if (name && email && message) {
													setDisabled(true);
													enqueueSnackbar("Votre mail a bien été envoyé !", {
														variant: "success",
													});
												} else {
													enqueueSnackbar(
														"Veuillez remplir tout les champs !",
														{ variant: "error" }
													);
												}
											}}
											value='ENVOYER'
										/>
									</form>
								</div>
								<div className='col-md-1 col-sm-1'></div>
							</div>
						</div>
					</div>
				</div>

				<footer>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12 wow fadeIn' data-wow-delay='0.9s'>
								<p>Made with ❤️ by Diawara Alpha Malick.</p>
								<hr />
								<ul className='social-icon'>
									<li>
										<a
											href='https://www.linkedin.com/in/alpha-malick-diawara-864551211/'
											className='fa fa-linkedin'
										></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</footer>
			</SnackbarProvider>
		</>
	);
}
