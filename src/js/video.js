"use strict";

document.addEventListener(`DOMContentLoaded`, function () { //wait for document load

	// YouTube IFrame Player API

	// 2. This code loads the IFrame Player API code asynchronously.
	let tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	// document.body.insertAdjacentElement('beforeend', tag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	const advantagesVideo = document.getElementById(`advantages-video`);
	const advantagesPlay = document.querySelector(`.advantages__play`);
	const advantagesControls = document.querySelector(`.advantages__controls`);
	const advantagesSwitcher = document.querySelector(`.advantages__play-pause`);
	const advantagesTimeTotal = document.querySelector(`.advantages__time--total`);
	const advantagesThumb = document.querySelector(`.advantages__thumb`);
	const advantagesProgressNow = document.querySelector(`.advantages__progress-now`);
	let advantagesTimeNow = document.querySelector(`.advantages__time--now`);
	let timerInterval, thumbInterval;
	let player;

	advantagesPlay.onclick = onYouTubeIframeAPIReady;
	// advantagesSwitcher.addEventListener(`click`, onYouTubeIframeAPIReady, {once: true});

	function onYouTubeIframeAPIReady() {
		// advantagesSwitcher.removeEventListener(`click`, onYouTubeIframeAPIReady, {once: true});
		advantagesControls.style.top = `-5px`;
		player = new YT.Player('advantages-video', {
			width: '621',
			height: '349',
			videoId: 'COwlqqErDbY',
			// videoId: 'jwywG820naw',
			playerVars: {
				// 'autoplay': 0,
				// 'controls': 0
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange,
			}
		});
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		showPause();

		advantagesSwitcher.onclick = playPauseSwitcher;

		showTime(advantagesTimeTotal, event.target.getDuration());

		event.target.setVolume(5);
		event.target.playVideo();

		startTimer();
		thumbMover(event);
	}

	function onPlayerStateChange(event) {
		if (event.data === YT.PlayerState.PLAYING) {
			showPause();
			startTimer();
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
			startTimer();
		}

		if 	(advantagesSwitcher.classList.contains(`video__play-pause--pause`)) {
			showPlay();
			player.pauseVideo();
			clearInterval(timerInterval);
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
		advantagesSwitcher.classList.add(`video__play-pause--pause`);
	}

	function showReplay() {
		advantagesSwitcher.classList.remove(`video__play-pause--play`);
		advantagesSwitcher.classList.add(`video__play-pause--replay`);

	}

	function showTime(elem, time) {
		elem.innerHTML = ``;
		elem.innerHTML += Math.floor(time / 60);
		elem.innerHTML += `:`;
		elem.innerHTML += (`0` + (time - Math.floor(time / 60) * 60)).slice(-2) ;
	}

	function startTimer () {
		timerInterval = setInterval(() => {
			console.log(`timer`);
			advantagesTimeNow.innerHTML = ``;
			advantagesTimeNow.innerHTML += Math.floor(Math.round(player.getCurrentTime()) / 60);
			advantagesTimeNow.innerHTML += `:`;
			advantagesTimeNow.innerHTML += (`0` + (Math.ceil(player.getCurrentTime()) - Math.floor(player.getCurrentTime() / 60) * 60)).slice(-2);
		}, 1000);
	}

	function thumbMover (event) {
		thumbInterval = setInterval(() => {
			console.log(`thumbMover`);
			advantagesProgressNow.style.width = `${(player.getCurrentTime() / player.getDuration() * 100 * 0.61)}%`;
			advantagesThumb.style.left = 8.7 + Math.floor(player.getCurrentTime() / player.getDuration() * 100 * 0.6) + `%`;

	// 8.8 - 0
	// 67.8 - 100
		}, 50);

	}
});

