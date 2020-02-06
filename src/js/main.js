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
		communicationBlock.style.display = `block`;
		phoneCloseBtn.style.display = `block`;

		phoneCloseBtn.onmousedown = function () {
			phoneCloseBtn.style.display = `none`;
			communicationBlock.style.display = `none`;
			phoneBtn.style.display = `block`;
			brandBlock.style.display = `block`;
		}
	};

	// swiper options
	const swiper = new Swiper ('.swiper-container', {
		// Optional parameters
		initialSlide: 2,
		autoHeight: true,
		watchOverflow: true,
		spaceBetween: 0,

		// grabCursor: true,

		preventInteractionOnTransition: true,

		preloadImages: true, //When enabled Swiper will force to load all images

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	const swiperControl = document.querySelector(`.swiper__control`);

	swiperControl.onselectstart = () => {return false};

	swiperControlPositioning();
	window.onresize = swiperControlPositioning;

	function swiperControlPositioning() {
		swiperControl.style.left = swiper.width / 2 - swiperControl.getBoundingClientRect().width / 2 + `px`;
	}
});