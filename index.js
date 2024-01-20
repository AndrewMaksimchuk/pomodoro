const audioShow = new Audio(window.indexAPI.audioShow);
const audioHide = new Audio(window.indexAPI.audioHide);
const imgPomodoro = document.getElementById("img-pomodoro");
const imgExercise = document.getElementById("img-exercise");

const toggleImages = () => {
  imgPomodoro?.classList.toggle("hide");
  imgExercise?.classList.toggle("hide");
};

let isViewExercise = false;
let isInBreak = false;

window.indexAPI.toggle((event, { value, exercise, volume }) => {
  audioShow.volume = volume;
  audioHide.volume = volume;

  if ("show" === value) {
    if (isInBreak) return;
    isInBreak = true;

    if (exercise) {
      isViewExercise = true;
      toggleImages();
      imgExercise?.setAttribute("src", exercise);
    }
    return audioShow.play();
  }

  if (isViewExercise) {
    isViewExercise = false;
    toggleImages();
  }

  isInBreak = false;
  audioShow.load();
  audioHide.play();
});
