/* ==========================================================================
   SPRAJTECH - Main JavaScript (FIXED)
   Author: SPRAJTECH
   Description: Main JavaScript file for SPRAJTECH Website
   ========================================================================== */

"use strict";

/* ==========================================================================
   1. Preloader - FIXED (Runs Immediately)
   ========================================================================== */

// Hide preloader immediately when called
(function () {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    // Method 1: Hide on window load
    window.addEventListener("load", function () {
      hidePreloader();
    });

    // Method 2: Fallback - Hide after 3 seconds max (in case load event fails)
    setTimeout(function () {
      hidePreloader();
    }, 3000);

    // Method 3: Hide when DOM is ready (faster)
    if (document.readyState === "complete") {
      hidePreloader();
    }
  }

  function hidePreloader() {
    if (preloader && !preloader.classList.contains("hidden")) {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      preloader.classList.add("hidden");

      setTimeout(function () {
        if (preloader.parentNode) {
          preloader.remove();
        }
      }, 500);

      document.body.style.overflow = "";
    }
  }
})();

/* ==========================================================================
   2. DOM Content Loaded
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functions
  initNavbar();
  initMobileMenu();
  initBackToTop();
  initScrollReveal();
  initCounters();
  initGalleryFilter();
  initLightbox();
  initFAQ();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   3. Navbar Scroll Effect
   ========================================================================== */

function initNavbar() {
  const navbar = document.getElementById("navbar");

  if (navbar) {
    const scrollThreshold = 100;

    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Initial check
    handleScroll();

    // On scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
}

/* ==========================================================================
   4. Mobile Menu Toggle
   ========================================================================== */

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    let isOpen = false;

    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      isOpen = !isOpen;
      toggleMenu();
    });

    function toggleMenu() {
      if (isOpen) {
        mobileMenu.classList.remove("hidden");
        mobileMenuBtn.innerHTML = `
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                `;
      } else {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.innerHTML = `
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                `;
      }
    }

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        isOpen = false;
        toggleMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        isOpen &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        isOpen = false;
        toggleMenu();
      }
    });
  }
}

/* ==========================================================================
   5. Back to Top Button
   ========================================================================== */

function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    function handleScroll() {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.remove("opacity-0", "invisible");
        backToTopBtn.classList.add("opacity-100", "visible");
      } else {
        backToTopBtn.classList.add("opacity-0", "invisible");
        backToTopBtn.classList.remove("opacity-100", "visible");
      }
    }

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

/* ==========================================================================
   6. Scroll Reveal Animations
   ========================================================================== */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  if (revealElements.length > 0) {
    function revealOnScroll() {
      revealElements.forEach(function (element) {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("revealed");
        }
      });
    }

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener("scroll", revealOnScroll, { passive: true });
  }
}

/* ==========================================================================
   7. Counter Animation
   ========================================================================== */

function initCounters() {
  const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {
    function animateCounter(counter) {
      const target = parseInt(counter.getAttribute("data-target")) || 0;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      function updateCounter() {
        current += step;

        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
          counter.classList.add("counted");
        }
      }

      updateCounter();
    }

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (
              entry.isIntersecting &&
              !entry.target.classList.contains("counted")
            ) {
              animateCounter(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach(function (counter) {
        counterObserver.observe(counter);
      });
    } else {
      // Fallback for older browsers
      counters.forEach(function (counter) {
        animateCounter(counter);
      });
    }
  }
}

/* ==========================================================================
   8. Gallery Filter
   ========================================================================== */

function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".gallery-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        // Update active button
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active", "bg-primary", "text-white");
          btn.classList.add("bg-gray-100", "text-gray-700");
        });

        this.classList.add("active", "bg-primary", "text-white");
        this.classList.remove("bg-gray-100", "text-gray-700");

        // Filter items
        galleryItems.forEach(function (item) {
          const category = item.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            item.classList.remove("hidden");
            item.style.display = "";
            setTimeout(function () {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 50);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(function () {
              item.classList.add("hidden");
            }, 300);
          }
        });
      });
    });
  }

  // Load More Button
  const loadMoreBtn = document.getElementById("load-more-btn");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      const btn = this;
      btn.innerHTML = `
                <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
            `;

      setTimeout(function () {
        btn.innerHTML = `
                    All Images Loaded
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                `;
        btn.classList.add("bg-green-500");
        btn.classList.remove("bg-secondary", "hover:bg-primary");
        btn.disabled = true;
      }, 1500);
    });
  }
}

/* ==========================================================================
   9. Lightbox
   ========================================================================== */

let currentLightboxIndex = 0;
let lightboxImages = [];

function initLightbox() {
  const lightbox = document.getElementById("lightbox");

  if (lightbox) {
    lightboxImages = Array.from(document.querySelectorAll(".gallery-item"));

    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.classList.contains("active")) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navigateLightbox(-1);
        if (e.key === "ArrowRight") navigateLightbox(1);
      }
    });

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", function () {
        navigateLightbox(-1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", function () {
        navigateLightbox(1);
      });
    }
  }
}

function openLightbox(element) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");

  if (lightbox && lightboxImage) {
    const img = element.querySelector("img");
    const title = element.querySelector("h4");
    const description = element.querySelector("p");

    const galleryItem = element.closest(".gallery-item");
    currentLightboxIndex = lightboxImages.indexOf(galleryItem);

    lightboxImage.src = img ? img.src : "";
    lightboxImage.alt = img ? img.alt : "";

    if (lightboxCaption) {
      const captionTitle = lightboxCaption.querySelector("h4");
      const captionDesc = lightboxCaption.querySelector("p");
      if (captionTitle && title) captionTitle.textContent = title.textContent;
      if (captionDesc && description)
        captionDesc.textContent = description.textContent;
    }

    lightbox.classList.remove("hidden");
    lightbox.classList.add("active");
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");

  if (lightbox) {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("active");
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }
}

function navigateLightbox(direction) {
  const visibleImages = lightboxImages.filter(function (item) {
    return !item.classList.contains("hidden");
  });

  if (visibleImages.length === 0) return;

  const currentItem = lightboxImages[currentLightboxIndex];
  let currentVisibleIndex = visibleImages.indexOf(currentItem);

  currentVisibleIndex += direction;

  if (currentVisibleIndex < 0) {
    currentVisibleIndex = visibleImages.length - 1;
  } else if (currentVisibleIndex >= visibleImages.length) {
    currentVisibleIndex = 0;
  }

  const newItem = visibleImages[currentVisibleIndex];
  currentLightboxIndex = lightboxImages.indexOf(newItem);

  const container = newItem.querySelector("[onclick]");
  if (container) {
    const img = container.querySelector("img");
    const title = container.querySelector("h4");
    const description = container.querySelector("p");

    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");

    if (lightboxImage && img) {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
    }

    if (lightboxCaption) {
      const captionTitle = lightboxCaption.querySelector("h4");
      const captionDesc = lightboxCaption.querySelector("p");
      if (captionTitle && title) captionTitle.textContent = title.textContent;
      if (captionDesc && description)
        captionDesc.textContent = description.textContent;
    }
  }
}

// Make openLightbox available globally
window.openLightbox = openLightbox;

/* ==========================================================================
   10. FAQ Accordion
   ========================================================================== */

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach(function (item) {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      if (question && answer) {
        question.addEventListener("click", function () {
          const isActive = item.classList.contains("active");

          // Close all items
          faqItems.forEach(function (otherItem) {
            otherItem.classList.remove("active");
            const otherAnswer = otherItem.querySelector(".faq-answer");
            if (otherAnswer) {
              otherAnswer.classList.add("hidden");
            }
          });

          // Toggle current item
          if (!isActive) {
            item.classList.add("active");
            answer.classList.remove("hidden");
          }
        });
      }
    });
  }
}

/* ==========================================================================
   11. Contact Form
   ========================================================================== */

function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      let isValid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("border-red-500");
        } else {
          field.classList.remove("border-red-500");
        }
      });

      const emailField = contactForm.querySelector("#email");
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.classList.add("border-red-500");
        }
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
                    <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                `;
        submitBtn.disabled = true;

        setTimeout(function () {
          if (formSuccess) {
            formSuccess.classList.remove("hidden");
          }

          contactForm.reset();
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;

          setTimeout(function () {
            if (formSuccess) {
              formSuccess.classList.add("hidden");
            }
          }, 5000);

          console.log("Form submitted:", data);
        }, 2000);
      }
    });

    const formInputs = contactForm.querySelectorAll("input, textarea, select");
    formInputs.forEach(function (input) {
      input.addEventListener("input", function () {
        this.classList.remove("border-red-500");
      });
    });
  }
}

/* ==========================================================================
   12. Smooth Scroll
   ========================================================================== */

function initSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#" && href.length > 1) {
        const targetElement = document.querySelector(href);

        if (targetElement) {
          e.preventDefault();

          const navbar = document.getElementById("navbar");
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

/* ==========================================================================
   13. Window Resize Handler
   ========================================================================== */

window.addEventListener("resize", function () {
  // Close mobile menu on resize to desktop
  if (window.innerWidth >= 1024) {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  }
});

/* ==========================================================================
   END OF JAVASCRIPT
   ========================================================================== */
