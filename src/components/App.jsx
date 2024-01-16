import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Items from "./Items";
import ItemDetail from "./ItemDetail";
// Images/data:
import lovebirdsData from "../data/LovebirdsData.json";
import lovebird from "../data/lovebird.svg";
import ImageSlider from "./ImageSlider";
import Images from "../data/imageData";
// Captura de pantalla:
/* import html2canvas from "html2canvas";
import { saveAs } from "file-saver"; */

function App() {
	const [bodyParts, setBodyParts] = useState(lovebirdsData);
	const [paletteVisible, setPaletteVisible] = useState(false);
	const [CameraClicked, setCameraClicked] = useState(false)

	const unsorted = [8, 7, 4, 6, 5, 0, 1, 2, 3];
	const unsortedBodyParts = unsorted.map((i) => bodyParts[i]);

	// eslint-disable-next-line no-unused-vars
	const handleItemClick = (bodyIndex, indexClicked, itemName) => {
		const newLovebirdData = bodyParts.map((bodyPart, index) => {
			if (bodyIndex === index) {
				const items = bodyPart.items.map((item, itemIndex) => {
					if (indexClicked === itemIndex) {
						return item.bool ? item : { ...item, bool: true };
					} else {
						return item.bool ? { ...item, bool: false } : item;
					}
				});

				return { ...bodyPart, items };
			} else {
				return bodyPart;
			}
		});

		setBodyParts(newLovebirdData);
	};

	const handlePaintClick = (event) => {
		event.stopPropagation();
		setPaletteVisible(!paletteVisible);
	};

	const handleColorClick = (newColor, itemName) => {
		const newColorLovebirdData = bodyParts.map((bodyPart) => {
			const items = bodyPart.items.map((item) => {
				if (item.itemName === itemName) {
					item.selectedColor = newColor;
				} else {
					return item;
				}
			});
			return { ...bodyPart, items };
		});

		setBodyParts(newColorLovebirdData);
	};

	const handleCameraClick = () => {
		setCameraClicked(!CameraClicked);
	}

	const handleCameraRelease = () => {
		setCameraClicked(false);
	}

	/* const handleScreenshot = () => {
		const input = document.getElementById('my-node');
		html2canvas(input)
			.then((canvas) => {
				const imgData = canvas.toDataURL('image/png');
				saveAs(imgData, 'screenshot.png');
			});
	} */

	const slides = [{ title: "head" }, { title: "body" }, { title: "ready!" }];

	return (
		<>
			<div className="container">
				
					<header className="header">
						<img className="imgTitle" src={Images.title} alt="Avie Bird" />
						<h2 className="subTitle">Make your lovebird!</h2>
					</header>
					<section className="creator">
						<nav className="nav">
							{/* --- MENÚ / NAV --- */}
						<ImageSlider slides={slides} />
					</nav>

					<Routes>
						{/* --- RUTAS --- */}
						{bodyParts.map((bodyPart) => (
							<React.Fragment key={bodyPart.idNo}>
								<Route
									path="/"
									element={
										<Navigate
											to={`/${bodyParts[0].category}/${bodyParts[0].name}`}
											replace
										/>
									}
									index
								/>
								<Route
									path={`${bodyPart.category}`}
									element={<Items bodyParts={bodyParts} />}
								>
									<Route
										index
										element={<Navigate to={`/${bodyPart.category}/${bodyPart.name}`} replace />}
									/>
									{bodyPart.items.map((item) => (
										<Route
											key={item.itemId}
											path={`:${item.name}`}
											element={
												<ItemDetail
													bodyParts={bodyParts}
													handleItemClick={handleItemClick}
													handlePaintClick={handlePaintClick}
													paletteVisible={paletteVisible}
													handleColorClick={handleColorClick}
												/>
											}
										/>
									))}
								</Route>
							</React.Fragment>
							))}
							<Route
								key={"Ready"}
								path={"/Ready!"}
								element={
									<>
										<h3 className="subPagesActived" >Take a photo!</h3>
										<div className="container-ready">
											<div className="ProvisionalFlex">
													<span className="camera-icon"
														onMouseDown={handleCameraClick}
														onMouseUp={handleCameraRelease}>
													</span>
													{/* <button onClick={handleScreenshot}>
														Descargar captura de pantalla
													</button> */}
													<ul className="readyTitles">
														<li>Download</li>
														<li>Share</li>
													</ul>
											</div>
											<p className="warning">
												*Download and share images are not available at this moment. Sorry!
											</p>
											<a  className="warningDetail" href="https://github.com/dianaString" 
												target="_blank" rel="noopener noreferrer">
												Further details in the github repository
											</a>
											
											<div className={`frame ${ CameraClicked ? 'flash' : ''}`}>
												<p className="frameTitle">say seeds!</p>
												<span className="borderFrame"></span>
											</div>
										</div>
									</>
								}
							/>
						</Routes>
					</section>
				

				{/* <JenaroSVG /> */}
				<main className="main" >
					<div className="container-lovebird">
						{unsortedBodyParts.map((bodyPart) =>
							bodyPart.items.map((item) => (
								<React.Fragment key={item.itemId}>
									<svg
										className={`svg ${item.bool ? "" : "hidden"} ${item.itemName
											}`}
										style={{ color: item.selectedColor }}
										width={item.width}
										height={item.height}
									>
										<use xlinkHref={`${lovebird}#${item.itemName}`}></use>
									</svg>
								</React.Fragment>
							))
						)}
						<div id="my-node">
							<svg className="svg nose" width="45" height="30">
								<use xlinkHref={`${lovebird}#nose`}></use>
							</svg>
							<svg className="svg eyeBorder" width="38" height="46">
								<use xlinkHref={`${lovebird}#eyeBorder`}></use>
							</svg>
							<img className="heart" src={Images.heart} alt="heart" />
						</div>
					</div>
				</main>
				<footer className="footer">
					<a  className="credits" href="https://github.com/dianaString"
					target="_blank" rel="noopener noreferrer">
					@dianastring</a>
				</footer>
			</div>
		</>
	);
}

export default App;
