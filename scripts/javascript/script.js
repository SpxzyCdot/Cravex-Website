console.log("scripts.js loaded");

const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

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
    "a, button, .feature-card, .stat-card, .hero-img, .logo, .footer-logo, .social-link"
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

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const heroImg = document.querySelector(".hero-img");
if (heroImg) {
  let lastMove = 0;
  const throttleDelay = 16;

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastMove < throttleDelay) return;
    lastMove = now;

    const rect = heroImg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const maxRotate = 20;
    const rotateY = (mouseX / (rect.width / 2)) * maxRotate;
    const rotateX = -(mouseY / (rect.height / 2)) * maxRotate;

    const currentRotateX = parseFloat(heroImg.style.getPropertyValue('--rotate-x') || 0);
    const currentRotateY = parseFloat(heroImg.style.getPropertyValue('--rotate-y') || 0);
    const dampedRotateX = currentRotateX + (rotateX - currentRotateX) * 0.1;
    const dampedRotateY = currentRotateY + (rotateY - currentRotateY) * 0.1;

    heroImg.style.setProperty("--rotate-x", `${dampedRotateX}deg`);
    heroImg.style.setProperty("--rotate-y", `${dampedRotateY}deg`);
  });

  document.addEventListener("mouseleave", () => {
    heroImg.style.setProperty("--rotate-x", "0deg");
    heroImg.style.setProperty("--rotate-y", "0deg");
  });
} else {
  console.error("Hero image not found");
}

async function fetchGitHubDownloadCount() {
  const repoOwner = "getcravex";
  const repoName = "Cravex";
  let totalDownloads = 0;
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/releases?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const releases = await response.json();

      if (releases.length === 0) {
        break;
      }

      for (const release of releases) {
        for (const asset of release.assets) {
          totalDownloads += asset.download_count;
        }
      }

      page++;
    }

    const downloadCountElement = document.getElementById("github-download-count");
    downloadCountElement.textContent = totalDownloads.toLocaleString() + "+";
  } catch (error) {
    console.error("Error fetching GitHub download count:", error);
    document.getElementById("github-download-count").textContent = "Error";
  }
}

fetchGitHubDownloadCount();

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

document.addEventListener("DOMContentLoaded", () => {
  fetchGitHubDownloadCount();

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
