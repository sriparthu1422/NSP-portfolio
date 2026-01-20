document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // =========================
  // Initialize AOS
  // =========================
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }

  // =========================
  // GSAP - Page Entrance Initial
  // =========================
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(".navigation", {
    y: -100,
    opacity: 0,
    duration: 1.2,
  })
  .from(".home-section-content", {
    y: 100,
    opacity: 0,
    duration: 1,
  }, "-=0.8")
  .from(".home-social-media .social-media-link", {
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
  }, "-=0.5");

  // =========================
  // GSAP - Typing Effect
  // =========================
  const nameElement = document.getElementById("typing-name");
  const contentElement = document.getElementById("typing-content");
  const resumeButton = document.getElementById("resume-button");

  if (nameElement && contentElement) {
    const nameText = "Hi, I'm Sri Parthu";
    const contentText = "Passionate Frontend Developer creating modern, responsive, and interactive web experiences.";

    gsap.to(nameElement, {
      duration: 2,
      text: nameText,
      delay: 1,
      ease: "none",
    });

    gsap.to(contentElement, {
      duration: 3,
      text: contentText,
      delay: 3,
      ease: "none",
      onComplete: () => {
        if (resumeButton) {
          resumeButton.style.display = "block";
          gsap.fromTo(resumeButton, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        }
      }
    });
  }

  // =========================
  // GSAP - Section Reveal Animations
  // =========================
  const sectionTitles = document.querySelectorAll(".head-sec, .projects-title, .contact-title, .load-more-container");
  sectionTitles.forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  const sectionsToReveal = [
    { selector: ".about-info", from: { x: -100, opacity: 0 } },
    { selector: ".about-skills", from: { x: 100, opacity: 0 } },
    { selector: ".contact-container", from: { scale: 0.8, opacity: 0 } }
  ];

  sectionsToReveal.forEach((item) => {
    const elements = document.querySelectorAll(item.selector);

    if (elements.length > 0) {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
          toggleActions: "play none none none"
        },
        ...item.from,
        duration: 1,
        ease: "power3.out"
      });
    }
  });

  // Dedicated Project Card Animation (Batch)
  // This ensures that even if layout shifts, each card triggers its own reveal
  const projectCards = document.querySelectorAll(".project-card-wrapper:not(.project-hidden)");
  if (projectCards.length > 0) {
    // Set initial state immediately
    gsap.set(projectCards, { y: 50, opacity: 0 });
    
    ScrollTrigger.batch(projectCards, {
      start: "top 85%",
      onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "power3.out",
        overwrite: true
      }),
      once: true
    });
  }

  // Refresh ScrollTrigger to ensure all positions are calculated correctly
  window.addEventListener('load', () => {
    // Small delay to ensure all layouts are settled
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
  });

  // =========================
  // GSAP - Magnetic Effect for Social Links
  // =========================
  const magneticElements = document.querySelectorAll(".social-media-link, .social-link, .resume-btn, .contact-btn, .load-more-btn");

  magneticElements.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });

  // =========================
  // Mobile Navigation Toggle
  // =========================
  const menuIcon = document.querySelector(".menu-icon");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  function toggleMenu() {
    navbar.classList.toggle("show");
  }

  function closeMenu() {
    navbar.classList.remove("show");
  }

  if (menuIcon) {
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (navbar.classList.contains("show") && !navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      closeMenu();
    }
  });

  // =========================
  // Active Link Highlighting on Scroll
  // =========================
  const sections = document.querySelectorAll("section");
  const navOptions = {
    threshold: 0.25, 
    rootMargin: "-100px 0px 0px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, navOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // =========================
  // Load More Projects
  // =========================
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      const hiddenProjects = document.querySelectorAll(".project-hidden");
      
      hiddenProjects.forEach((projectWrapper, index) => {
        projectWrapper.classList.remove("project-hidden");
        
        // GSAP Reveal for newly shown projects
        gsap.from(projectWrapper, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)"
        });
      });
      
      this.style.display = "none";
      setTimeout(() => {
        if (window.AOS) AOS.refresh();
        ScrollTrigger.refresh();
      }, 100);
    });
  }

  // =========================
  // EmailJS Integration
  // =========================
  (function initEmailJS() {
    const PUBLIC_KEY = "pGffREMUo0ReUy7jM"; 
    if (window.emailjs) {
      emailjs.init(PUBLIC_KEY);
    }
  })();

  const contactForm = document.getElementById("contact-form");
  const formMessageEl = document.getElementById("form-message");

  function showMessage(msg, type) {
    if (!formMessageEl) return;
    formMessageEl.textContent = msg;
    formMessageEl.className = `success-message ${type === "error" ? "error" : ""}`;
    formMessageEl.classList.remove("hidden");
    
    // GSAP notification reveal
    gsap.fromTo(formMessageEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    
    setTimeout(() => {
      gsap.to(formMessageEl, { opacity: 0, y: -20, duration: 0.5, onComplete: () => formMessageEl.classList.add("hidden") });
    }, 5000);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const btn = contactForm.querySelector("button[type='submit']");
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      const params = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      emailjs.send("service_3z2lewp", "template_18s2cvr", params)
        .then(() => {
          showMessage("Message sent successfully! I'll get back to you soon.", "success");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          showMessage("Failed to send message. Please try again.", "error");
        })
        .finally(() => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        });
    });
  }
});
