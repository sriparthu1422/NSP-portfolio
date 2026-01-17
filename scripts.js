document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Initialize AOS (Animate On Scroll)
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

  // Close menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
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
  // Typing Effect
  // =========================
  const nameElement = document.getElementById("typing-name");
  const contentElement = document.getElementById("typing-content");
  const resumeButton = document.getElementById("resume-button");

  const nameText = "Hi, I'm Sri Parthu";
  const contentText = "Passionate Frontend Developer creating modern, responsive, and interactive web experiences.";
  
  const startDelay = 500;

  async function typeWriter(text, element, speed = 50) {
    if (!element) return;
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      element.textContent += text.charAt(i);
      await new Promise(r => setTimeout(r, speed));
    }
  }

  async function startTyping() {
    await new Promise(r => setTimeout(r, startDelay));
    if (nameElement) await typeWriter(nameText, nameElement, 100);
    if (contentElement) await typeWriter(contentText, contentElement, 30);
    
    if (resumeButton) {
      resumeButton.style.display = "block";
      // Force flow for transition
      void resumeButton.offsetWidth;
      resumeButton.style.opacity = "1";
    }
  }

  startTyping();

  // =========================
  // Load More Projects
  // =========================
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      // Correctly targeting the wrapper now
      const hiddenProjects = document.querySelectorAll(".project-hidden");
      
      hiddenProjects.forEach((projectWrapper, index) => {
        // Remove !important class
        projectWrapper.classList.remove("project-hidden");
        
        // Add animation class if needed or just let CSS transition handle it
        // We can manually trigger AOS refresh
        setTimeout(() => {
            if (window.AOS) AOS.refresh();
        }, 100);
      });
      
      this.style.display = "none";
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
    
    setTimeout(() => {
      formMessageEl.classList.add("hidden");
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
