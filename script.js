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

const dresscodeGallery = document.querySelector(".dresscode__gallery");

let autoScrollActive = false;

function autoScroll() {
  if (!autoScrollActive) return;
  dresscodeGallery.scrollLeft += 1;
  if (
    dresscodeGallery.scrollLeft >=
    dresscodeGallery.scrollWidth - dresscodeGallery.clientWidth
  ) {
    dresscodeGallery.scrollLeft = 0;
  }
  requestAnimationFrame(autoScroll);
}

const dresscodeColors = document.querySelectorAll(".dresscode__colors-block");
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const target = entry.target;

      if (entry.isIntersecting) {
        // Анимация появления секций
        if (target.tagName === "SECTION") {
          target.classList.add("visible");
          observer.unobserve(target);
        }

        // Dresscode блок с автоскроллом
        if (target === dresscodeGallery) {
          autoScrollActive = true;
          requestAnimationFrame(autoScroll);
        }

        // Анимация dresscode цветов
        if (target.classList.contains("dresscode__colors-block")) {
          target.classList.remove("no-animation");
          target.addEventListener(
            "animationend",
            () => {
              target.style.opacity = 1;
            },
            { once: true }
          );
          observer.unobserve(target);
        }
      } else {
        if (target === dresscodeGallery) {
          autoScrollActive = false;
        }
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((el) => observer.observe(el));
dresscodeColors.forEach((el) => observer.observe(el));
observer.observe(dresscodeGallery);
