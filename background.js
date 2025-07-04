const sky = document.querySelector(".sky");
const canvas = document.querySelector("#background-canvas");
let starInterval = null;
let sec = 0;

const background = () => {
  sec++;
  // console.log(sec);

  if (sec === 33) {
    // 스타 생성 시작
    if (!starInterval) {
      starInterval = setInterval(createStar, 50);
    }
  } else if (sec === 59) {
    // 스타 생성 중지
    if (starInterval) {
      clearInterval(starInterval);
      starInterval = null;
    }
  }

  if (sec >= 60) sec = 0;

  // 부드러운 전환 (필요하면 조절)
  sky.style.transition = "background 0.4s";
};

const createStar = () => {
  const star = document.createElement("span");
  star.classList.add("star");
  star.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
  star.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;

  sky.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 5000);
};

setInterval(background, 1000);

const context = canvas.getContext("2d");

const w = 30;
const h = 30;
const gap = 10;
let x, y;
for (let i = 0; i < 15; i++) {
  for (let j = 0; j < 5; j++) {
    x = 100 + (w + gap) * i;
    y = 100 + (h + gap) * j;

    context.lineWidth = 3;
    context.strokeStyle = "rgba(255,255,255,0.4";
    context.beginPath();
    context.stroke();
    if (Math.random() > 0.7) {
      context.beginPath();
      context.rect(x, y, w, h);
      context.fillStyle = "rgba(255,255,255,0.4";
      context.fillRect(x + 4, y + 4, w - 8, h - 8);
      context.stroke();
    }
  }
}
