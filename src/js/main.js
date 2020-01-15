"use strict";

document.addEventListener(`DOMContentLoaded`, function () { //wait for document load

	// header menu on/off
	const phoneBtn = document.querySelector(`.menu__button`),
		brandBlock = document.querySelector(`.brand`),
		communicationBlock = document.querySelector(`.communication`),
		phoneCloseBtn = document.querySelector(`.phone__close`);

	phoneBtn.onmousedown = function () {
		brandBlock.style.display = `none`;
		phoneBtn.style.display = `none`;
		communicationBlock.style.width = `0%`;
		communicationBlock.style.display = `block`;
		communicationBlock.style.width = `100%`;
		phoneCloseBtn.style.display = `block`;

		phoneCloseBtn.onmousedown = function () {
			phoneCloseBtn.style.display = `none`;
			communicationBlock.style.display = `none`;
			phoneBtn.style.display = `block`;
			brandBlock.style.display = `block`;
		}
	}
});