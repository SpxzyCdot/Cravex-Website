// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

function initializeCursor() {
  if (!cursor || !cursorFollower) return;

  // Only enable custom cursor on desktop
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      // Follower with delay
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }, 100);
    });

    // Hover effects
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

    // Click effect
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

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Hero image tilt effect
const heroImg = document.querySelector(".hero-img");
if (heroImg) {
  heroImg.addEventListener("mousemove", (e) => {
    const rect = heroImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    heroImg.style.setProperty("--rotate-x", `${rotateX}deg`);
    heroImg.style.setProperty("--rotate-y", `${rotateY}deg`);
  });

  heroImg.addEventListener("mouseleave", () => {
    heroImg.style.setProperty("--rotate-x", "0deg");
    heroImg.style.setProperty("--rotate-y", "0deg");
  });
}


// Fetch Discord member count
async function fetchMemberCount() {
  const inviteCode = "NPzzhqTMvq";
  try {
    const response = await fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`);
    const data = await response.json();
    return data.approximate_member_count || 0;
  } catch (error) {
    console.error('Error fetching member count:', error);
    return 0;
  }
}

// Audio control for staff profile
const audioToggle = document.getElementById("audio-toggle");
const backgroundAudio = document.getElementById("background-audio");

if (audioToggle && backgroundAudio) {
  // Autoplay audio
  backgroundAudio.play().catch((error) => {
    console.log("Autoplay prevented:", error);
  });

  // Toggle play/pause
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

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate hero elements
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

// Animate features
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

// Animate stats
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

// Animate staff cards
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

// Animate staff profile card
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

// Counter animation for stats
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

  // Smooth scrolling for anchor links
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
});