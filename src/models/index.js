var documentElement = document.documentElement;

export function openFullscreen() {
  if (documentElement.requestFullscreen) {
    documentElement.requestFullscreen();
  } else if (documentElement.mozRequestFullScreen) { /* Firefox */
    documentElement.mozRequestFullScreen();
  } else if (documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    documentElement.webkitRequestFullscreen();
  } else if (documentElement.msRequestFullscreen) { /* IE/Edge */
    documentElement.msRequestFullscreen();
  }
}