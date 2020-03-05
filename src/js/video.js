"use strict";

document.addEventListener(`DOMContentLoaded`, function () { //wait for document load

	const advantagesPlay = document.querySelector(`.advantages__play`);
	const advantagesControls = document.querySelector(`.advantages__controls`);
	const advantagesSwitcher = document.querySelector(`.advantages__play-pause`);
	const advantagesTimeTotalMin = document.querySelector(`.advantages__time--total-min`);
	const advantagesTimeTotalSec = document.querySelector(`.advantages__time--total-sec`);
	const advantagesThumb = document.querySelector(`.advantages__thumb`);
	const advantagesProgressNow = document.querySelector(`.advantages__progress-now`);
	let advantagesTimeNowMin = document.querySelector(`.advantages__time--now-min`);
	let advantagesTimeNowSec = document.querySelector(`.advantages__time--now-sec`);
	let timerInterval, thumbInterval;
	let player;

	// YouTube IFrame Player API

	// 2. This code loads the IFrame Player API code asynchronously.
	let tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	advantagesPlay.onclick = onYouTubeIframeAPIReady;
	// advantagesSwitcher.addEventListener(`click`, onYouTubeIframeAPIReady, {once: true});

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	function onYouTubeIframeAPIReady() {
		// advantagesSwitcher.removeEventListener(`click`, onYouTubeIframeAPIReady, {once: true});
		advantagesControls.style.top = `-5px`;
		player = new YT.Player('advantages-video', {
			width: '621',
			height: '349',
			videoId: 'COwlqqErDbY',
			// videoId: 'jwywG820naw',
			playerVars: {
				'controls': 0
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange,
			}
		});
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		showTotalTime();

		advantagesSwitcher.onclick = playPauseSwitcher;

		event.target.setVolume(5);
		showPause();
		event.target.playVideo();

		timeStarter();
		thumbMover();
	}

	function onPlayerStateChange(event) {
		// console.log(event.data);
		if (event.data === YT.PlayerState.PLAYING) {
			showPause();
			timeStarter();
			thumbMover();
		}

		if (event.data === YT.PlayerState.PAUSED) {
			showPlay();
			clearInterval(timerInterval);
			clearInterval(thumbInterval);
		}

		if (event.data === YT.PlayerState.ENDED) {
			showReplay();
			clearInterval(timerInterval);
			clearInterval(thumbInterval);
		}
	}

	function playPauseSwitcher () {
		if (advantagesSwitcher.classList.contains(`video__play-pause--play`)) {
			showPause();
			player.playVideo();
			timeStarter();
		}

		if (advantagesSwitcher.classList.contains(`video__play-pause--pause`)) {
			showPlay();
			player.pauseVideo();
			clearInterval(timerInterval);
			clearInterval(thumbInterval);
		}

		if (advantagesSwitcher.classList.contains(`video__play-pause--replay`)) {
			showPause();
			player.seekTo(0, false);
			player.playVideo();
		}
	}

	function showPlay() {
		advantagesSwitcher.classList.remove(`video__play-pause--pause`);
		advantagesSwitcher.classList.remove(`video__play-pause--replay`);
		advantagesSwitcher.classList.add(`video__play-pause--play`);
	}

	function showPause() {
		advantagesSwitcher.classList.remove(`video__play-pause--play`);
		advantagesSwitcher.classList.remove(`video__play-pause--replay`);
		advantagesSwitcher.classList.add(`video__play-pause--pause`);
	}

	function showReplay() {
		advantagesSwitcher.classList.remove(`video__play-pause--play`);
		advantagesSwitcher.classList.remove(`video__play-pause--pause`);
		advantagesSwitcher.classList.add(`video__play-pause--replay`);
	}

	function showTotalTime() {
		advantagesTimeTotalMin.innerHTML = Math.floor(player.getDuration() / 60);
		advantagesTimeTotalSec.innerHTML = (`0` + (player.getDuration() - Math.floor(player.getDuration() / 60) * 60)).slice(-2);
	}

	function timeStarter () {
		timerInterval = setInterval(() => {
			console.log(`timer: `, timerInterval);
			advantagesTimeNowMin.innerHTML = Math.floor(Math.round(player.getCurrentTime()) / 60);
			advantagesTimeNowSec.innerHTML = (`0` + (Math.ceil(player.getCurrentTime())
																												- Math.floor(player.getCurrentTime() / 60) * 60)).slice(-2);
		}, 1000);
	}

	function thumbMover () {
		thumbInterval = setInterval(() => {
			console.log(`thumbMover: ` + thumbInterval);
			advantagesProgressNow.style.width = `${(player.getCurrentTime() / player.getDuration() * 100 * 0.61)}%`;
			advantagesThumb.style.left = 8.7 + Math.floor(player.getCurrentTime() / player.getDuration() * 100 * 0.6) + `%`;

	// 8.8 - 0
	// 67.8 - 100
		}, 1000);

	}
});

