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

	// YouTube IFrame Player API
	const advantagesPlay = document.querySelector(`.advantages__play`);

	// 2. This code loads the IFrame Player API code asynchronously.
	let tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	// document.body.insertAdjacentElement('beforeend', tag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	let player;

	advantagesPlay.onmousedown = function onYouTubeIframeAPIReady() {
			player = new YT.Player('advantages-video', {
				height: '360',
				width: '640',
				videoId: 'jwywG820naw',
				events: {
					'onReady': onPlayerReady,
				}
			});
	};

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		event.target.setVolume(5),
		event.target.playVideo();
	}





});