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

const observerGallery = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        autoScrollActive = true;
        requestAnimationFrame(autoScroll);
      } else {
        autoScrollActive = false;
      }
    });
  },
  {
    threshold: 0.5, // 50% блока должно быть видно, можешь подстроить });
  }
);
observerGallery.observe(dresscodeGallery);

const sections = document.querySelectorAll("section");

const observerSections = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerSections.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2, // 50% блока должно быть видно, можешь подстроить });
  }
);
sections.forEach((el) => {
  observerSections.observe(el);
});

const dresscodeColors = document.querySelectorAll(".dresscode__colors-block");

const dresscodeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dresscodeColors.forEach((item) => {
          item.classList.remove("no-animation");
          item.addEventListener("animationend", () => {
            item.style.opacity = 1;
          });
        });
      }
    });
  },
  {
    threshold: 0.2, // 50% блока должно быть видно, можешь подстроить });
  }
);
dresscodeColors.forEach((el) => {
  dresscodeObserver.observe(el);
});
