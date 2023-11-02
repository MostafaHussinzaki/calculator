const keyPad = document.querySelector(".key");
const screen = document.querySelector(".screen__numbers p");

const toggle = document.querySelector(".header__themes__changes__toggle__dot");

const fontColor = document.querySelectorAll(".fc");
const bgSecondry1 = document.querySelectorAll(".bg-sec-1");
const bgSecondry2 = document.querySelectorAll(".bg-sec-2");
const mainKey = document.querySelectorAll(".main-key");
const secondryKey = document.querySelectorAll(".secondry-key");
const thirdKey = document.querySelectorAll(".third-key");
const bgToggle = document.querySelector(".bg-toggle");

const changeTheme = function (themeNom = 1, prevTheme) {
	document.body.classList.remove(`theme${prevTheme}-bg-main`);
	document.body.classList.add(`theme${themeNom}-bg-main`);

	bgToggle.classList.remove(`bg-${prevTheme}`);
	bgToggle.classList.add(`bg-${themeNom}`);

	fontColor.forEach((el) => {
		el.classList.remove(`fc-theme${prevTheme}`);
		el.classList.add(`fc-theme${themeNom}`);
	});
	bgSecondry1.forEach((el) => {
		el.classList.remove(`theme${prevTheme}-bg-secondry-1`);
		el.classList.add(`theme${themeNom}-bg-secondry-1`);
	});
	bgSecondry2.forEach((el) => {
		el.classList.remove(`theme${prevTheme}-bg-secondry-2`);
		el.classList.add(`theme${themeNom}-bg-secondry-2`);
	});
	mainKey.forEach((el) => {
		el.classList.remove(`theme${prevTheme}-main-key`);
		el.classList.add(`theme${themeNom}-main-key`);
	});
	secondryKey.forEach((el) => {
		el.classList.remove(`theme${prevTheme}-secondry-key`);
		el.classList.add(`theme${themeNom}-secondry-key`);
	});
	thirdKey.forEach((el) => {
		el.classList.remove(`theme${prevTheme}-third-key`);
		el.classList.add(`theme${themeNom}-third-key`);
	});
};

changeTheme();

let percent = 0;

toggle.addEventListener("click", function () {
	// change dot position
	percent >= 80 ? (percent = 0) : (percent += 40);
	this.style.right = `-${percent}%`;

	// set the data-theme attribute
	if (percent === 0) this.dataset.theme = 1;
	if (percent === 40) this.dataset.theme = 2;
	if (percent === 80) this.dataset.theme = 3;

	// declare current theme
	let currtheme = this.dataset.theme;

	// declare previous theme
	let prevTheme = currtheme == 1 ? 3 : currtheme - 1;

	// change Theme
	changeTheme(currtheme, prevTheme);
});

keyPad.addEventListener("click", function (e) {
	// gaurd class
	if (!e.target.classList.contains("key__btns")) return;

	// adding values to screen
	if (
		e.target.innerText !== "DEL" &&
		e.target.innerText !== "RESET" &&
		e.target.innerText !== "="
	) {
		screen.innerText += e.target.innerText;
	}

	// Reset button
	if (e.target.innerText === "RESET") {
		screen.textContent = "";
	}

	// Delete button
	if (e.target.innerText === "DEL") {
        let arr = screen.textContent.split('');
        arr.pop()
		screen.textContent = arr.join('');
	}
	// equal button
	if (e.target.innerText === "=") {
		let result = eval(screen.textContent);
		if (result === result && result % 1 === 0) {
			screen.textContent = result;
		} else {
			screen.textContent = result.toFixed(2);
		}
	}
});
