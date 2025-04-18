const targetDate = new Date(2025, 7, 7, 14, 30, 0).getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  if (distance < 0) {
    document.querySelector(".countdown__time").innerHTML = "Событие наступило!";
    clearInterval(interval);
    return;
  }
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const pad = (num) => num.toString().padStart(2, "0");
  document.querySelector(".countdown__time").innerHTML = `${days} : ${pad(
    hours
  )} : ${pad(minutes)} : ${pad(seconds)}`;
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();
