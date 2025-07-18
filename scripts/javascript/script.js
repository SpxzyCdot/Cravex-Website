const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

function initializeCursor() {
  if (!cursor || !cursorFollower) return;

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }, 100);
    });

    const hoverElements = document.querySelectorAll(
      "a, button, .feature-card, .stat-card, .staff-card, .staff-profile-card, .hero-img, .logo, .footer-logo, .social-link, #audio-toggle"
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
        cursorFollower.classList.add("active");
        el.style.cursor = "none";
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
        cursorFollower.classList.remove("active");
      });
    });

    document.addEventListener("mousedown", () => {
      cursor.classList.add("click");
      cursorFollower.classList.add("click");
    });

    document.addEventListener("mouseup", () => {
      cursor.classList.remove("click");
      cursorFollower.classList.remove("click");
    });
  }
}

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const audioToggle = document.getElementById("audio-toggle");
const backgroundAudio = document.getElementById("background-audio");

if (audioToggle && backgroundAudio) {
  backgroundAudio.play().catch((error) => {
    console.log("Autoplay prevented:", error);
  });

  audioToggle.addEventListener("click", () => {
    if (backgroundAudio.paused) {
      backgroundAudio.play();
      audioToggle.classList.add("playing");
    } else {
      backgroundAudio.pause();
      audioToggle.classList.remove("playing");
    }
  });
}

gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-badge", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 0.3,
});

gsap.from(".hero-title", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.5,
});

gsap.from(".hero-subtitle", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.7,
});

gsap.from(".hero-buttons", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.9,
});

gsap.from(".hero-image", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.6,
  ease: "back.out(1)",
});

gsap.utils.toArray(".feature-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 0.6,
    delay: i * 0.1,
    ease: "back.out(1)",
  });
});

gsap.utils.toArray(".stat-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 0.6,
    delay: i * 0.1,
    ease: "back.out(1)",
  });
});

gsap.utils.toArray(".staff-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 0.6,
    delay: i * 0.1,
    ease: "back.out(1)",
  });
});

gsap.from(".staff-profile-card", {
  scrollTrigger: {
    trigger: ".staff-profile-card",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: "back.out(1)",
});

async function fetchMemberCount() {
  return 48;
}

async function animateCounters() {
  const userCount = document.getElementById("user-count");
  const downloadCount = document.getElementById("download-count");

  if (userCount) {
    const memberCount = await fetchMemberCount();
    gsap.to(
      { num: 0 },
      {
        num: memberCount,
        duration: 2,
        scrollTrigger: {
          trigger: userCount,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          userCount.textContent =
            Math.floor(this.targets()[0].num).toLocaleString() + (memberCount > 0 ? "+" : "");
        },
        onComplete: function () {
          if (memberCount === 0) {
            userCount.textContent = "N/A";
          }
        },
      }
    );
  }

  if (downloadCount) {
    gsap.to(
      { num: 0 },
      {
        num: 52300,
        duration: 2,
        scrollTrigger: {
          trigger: downloadCount,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          downloadCount.textContent =
            Math.floor(this.targets()[0].num).toLocaleString() + "+";
        },
      }
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeCursor();
  animateCounters();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: {
            y: target,
            offsetY: 80,
          },
          ease: "power2.inOut",
        });
      }
    });
  });

  const downloadBtn = document.getElementById('download-btn');
  const tosModal = document.getElementById('tos-modal');
  const tosAccept = document.getElementById('tos-accept');
  const tosDecline = document.getElementById('tos-decline');

  if (downloadBtn && tosModal && tosAccept && tosDecline) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      tosModal.style.display = 'flex';
    });

    tosAccept.addEventListener('click', () => {
      window.location.href = 'https://github.com/SpxzyCdot/Cravex-Website/blob/main/README.md';
      tosModal.style.display = 'none';
    });

    tosDecline.addEventListener('click', () => {
      tosModal.style.display = 'none';
    });
  }
});
