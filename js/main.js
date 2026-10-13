(function () {
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  var navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(function (link) {
    if (link.getAttribute("aria-current") === "page") {
      link.classList.add("is-active");
    }
  });

  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Lightbox: click any img[data-zoom] for a larger preview. */
  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-label", "Image preview");
  lightbox.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close preview">&times;</button><img alt="" />';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector("img");

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox || event.target.closest(".lightbox-close")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  document.querySelectorAll("img[data-zoom]").forEach(function (img) {
    img.addEventListener("click", function () {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || "Preview";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
})();
