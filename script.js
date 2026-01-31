// Detect if mobile for performance adjustments

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

/* --- Fireworks Logic --- */
function startFireworks() {
  const container = document.querySelector(".fireworks-container");
  const colors = ["#ff1744", "#00e5ff", "#ffea00", "#e040fb", "#76ff03"];

  // Reduce frequency on mobile
  const fireworkInterval = isMobile ? 1200 : 600;
  const maxBursts = isMobile ? 1 : 3;

  setInterval(() => {
    if (document.body.classList.contains("not-loaded")) return; // Don't run if locked

    const bursts = 1 + Math.floor(Math.random() * maxBursts);
    for (let i = 0; i < bursts; i++) {
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight;
      const targetY =
        window.innerHeight * 0.1 +
        Math.random() * (window.innerHeight * 0.4);
      const color = colors[Math.floor(Math.random() * colors.length)];

      setTimeout(() => {
        launchFirework(x, y, targetY, color, container);
      }, i * 200);
    }
  }, fireworkInterval);
}

function launchFirework(x, y, targetY, color, container) {
  const projectile = document.createElement("div");
  projectile.classList.add("firework-projectile");
  projectile.style.left = x + "px";
  projectile.style.top = y + "px";
  projectile.style.background = color;
  projectile.style.boxShadow = `0 0 10px 2px ${color}`;

  container.appendChild(projectile);

  requestAnimationFrame(() => {
    projectile.style.transform = `translateY(-${y - targetY}px)`;
    projectile.style.transition = "transform 1s ease-out";
  });

  setTimeout(() => {
    projectile.remove();
    createExplosion(x, targetY, color, container);
  }, 1000);
}

function createExplosion(x, y, color, container) {
  const particleCount = isMobile ? 30 : 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("firework-particle");
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.background = color;
    particle.style.boxShadow = `0 0 6px ${color}`;

    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 150;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1500);
  }
}

/* --- Twinkling Stars Logic --- */
function createStars() {
  const starContainer = document.querySelector(".stars-container");
  if (!starContainer) return;

  const starCount = isMobile ? 80 : 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const x = Math.random() * 100;
    const y = Math.random() * 80;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty("--duration", `${duration}s`);
    star.style.setProperty("--delay", `${delay}s`);

    starContainer.appendChild(star);
  }
}

/* --- PASSWORD LOGIC --- */
function checkPassword(event) {
  event.preventDefault(); // Stop form submission

  const passwordInput = document.getElementById("passwordInput");
  const password = passwordInput.value;
  const errorMsg = document.getElementById("error-msg");
  const loginOverlay = document.getElementById("login-overlay");
  const music = document.getElementById("bgMusic");

  // VALID PASSWORDS HERE
  if (password === "3187" || password === "JESS102205") {
    // 1. Hide the login screen
    loginOverlay.classList.add("hidden");
    setTimeout(() => {
      loginOverlay.style.display = "none";
    }, 800);

    // 2. Enable animations
    document.body.classList.remove("not-loaded");

    // 3. Start specific JS animations
    createStars();
    startFireworks();

    // 4. Play Music
    if (music) {
      music.play().catch((e) => console.log("Audio play failed:", e));
    }
  } else {
    // Show error
    errorMsg.style.display = "block";
    passwordInput.value = "";
    passwordInput.focus();
  }
}

// Initialize but don't start animations yet
window.onload = () => {
  // Just focus the input
  const input = document.getElementById("passwordInput");
  if (input) input.focus();

};
