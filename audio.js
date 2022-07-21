export const audioZap= new Audio();

audioZap.src="music/bang.wav";
audioZap.volume = 0.05;

export const audioWarning= new Audio();

audioWarning.src="music/warning.wav";
audioWarning.volume = 0.2;

export const audioEnding= new Audio();

audioEnding.src="music/ending.mp3";
audioEnding.volume = 0.7;

export const bkMusic = document.getElementById("theme");

export function pauseAudio(sound) {
    sound.pause();
    sound.currentTime = 0
  }
