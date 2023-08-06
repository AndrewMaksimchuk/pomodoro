const audioShow = new Audio(window.indexAPI.audioShow);
const audioHide = new Audio(window.indexAPI.audioHide);

window.indexAPI.playAudio((event, value) => {
  if ('show' === value) {
    return audioShow.play();
  }

  audioShow.load();
  audioHide.play();
})

const imgPomodoro = document.getElementById('img-pomodoro');
const imgExercise = document.getElementById('img-exercise');
