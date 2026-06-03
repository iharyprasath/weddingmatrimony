(function () {
  "use strict";

  var body = document.body;
  var search = document.querySelector(".pop-search");
  var sideMenu = document.querySelector(".menu-pop1");
  var expertMenu = document.querySelector(".menu-pop2");
  var mobileMenu = document.querySelector(".mobile_menu");

  function openPanel(panel) {
    if (!panel) return;
    panel.classList.add("active");
    panel.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
  }

  function closePanel(panel) {
    if (!panel) return;
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".active.pop-search, .active.menu-pop, .active.mob-me-all")) {
      body.classList.remove("no-scroll");
    }
  }

  function closeAll() {
    [search, sideMenu, expertMenu, mobileMenu].forEach(closePanel);
  }

  document.querySelectorAll(".ser-open").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      openPanel(search);
      var input = search && search.querySelector("input");
      if (input) input.focus();
    });
  });

  document.querySelectorAll(".desk-menu").forEach(function (button) {
    button.addEventListener("click", function () {
      openPanel(sideMenu);
    });
  });

  document.querySelectorAll(".mobile-exprt").forEach(function (button) {
    button.addEventListener("click", function () {
      openPanel(expertMenu);
    });
  });

  document.querySelectorAll(".mobile-menu").forEach(function (button) {
    button.addEventListener("click", function () {
      openPanel(mobileMenu);
    });
  });

  document.querySelectorAll(".ser-clo").forEach(function (button) {
    button.addEventListener("click", function () {
      closePanel(search);
    });
  });

  document.querySelectorAll(".menu-pop-clo").forEach(function (button) {
    button.addEventListener("click", function () {
      closePanel(button.closest(".menu-pop"));
    });
  });

  document.querySelectorAll(".mob-me-clo").forEach(function (button) {
    button.addEventListener("click", function () {
      closePanel(button.closest(".mob-me-all"));
    });
  });

  [search, sideMenu, expertMenu, mobileMenu].forEach(function (panel) {
    if (!panel) return;
    panel.addEventListener("click", function (event) {
      if (event.target === panel) closePanel(panel);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeAll();
  });

  document.querySelectorAll(".mob-me-all a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeAll();
    });
  });

  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      closePanel(search);
      document.querySelector("#profiles")?.scrollIntoView({ behavior: "smooth" });
    });
  });


  var year = document.getElementById("cry");
  if (year) year.textContent = new Date().getFullYear();


  var slidersStarted = false;

  function updateSliders() {
    [".hero-slider", ".access-slider", ".review-slider", ".couple-slider"].forEach(function (selector) {
      var slider = document.querySelector(selector);
      if (slider && slider.swiper) {
        slider.swiper.update();
      }
    });
  }

  function initSliders() {
    if (!window.Swiper) return;
    if (slidersStarted) {
      updateSliders();
      return;
    }
    slidersStarted = true;

    function slideCount(selector) {
      return document.querySelectorAll(selector + " .swiper-slide").length;
    }

    if (document.querySelector(".hero-slider")) {
      new Swiper(".hero-slider", {
      loop: slideCount(".hero-slider") > 1,
      speed: 900,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoplay: { delay: 3000, disableOnInteraction: false },
      pagination: { el: ".hero-slider .swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".hero-slider .swiper-button-next",
        prevEl: ".hero-slider .swiper-button-prev"
      }
    });
    }

    if (document.querySelector(".access-slider")) {
      new Swiper(".access-slider", {
      centeredSlides: true,
      loop: slideCount(".access-slider") > 3,
      flexshrink:0,
  grabCursor: true,
      speed: 700,
      slidesPerView: "auto",
      effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 220,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 2600,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".access-slider .swiper-pagination",
    clickable: true,
//   },
//   breakpoints: {
//     564: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     786: {
//       slidesPerView: 3,
//       spaceBetween: 20,
//     },
//     998: {
//       slidesPerView: 3,
//       spaceBetween: 20,
//     },
//     1200: {
//       slidesPerView: 4,
//       spaceBetween: 20,
//     },
//     1400: {
//       slidesPerView: 4,
//       spaceBetween: 20,
//     },
//     1640: {
//       slidesPerView: 5,
//       spaceBetween: 20,
//     },
  },
});
    }


    if (document.querySelector(".review-slider")) {
      new Swiper(".review-slider", {
      loop: slideCount(".review-slider") > 3,
      speed: 750,
      spaceBetween: 25,
      autoplay: { delay: 3000, disableOnInteraction: false },
      pagination: { el: ".review-slider .swiper-pagination", clickable: true },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
    }

    if (document.querySelector(".couple-slider")) {
      new Swiper(".couple-slider", {
      loop: slideCount(".couple-slider") > 4,
      speed: 750,
      spaceBetween: 0,
      autoplay: { delay: 2600, disableOnInteraction: false },
      pagination: { el: ".couple-slider .swiper-pagination", clickable: true },
      breakpoints: {
        0: { slidesPerView: 1 },
        650: { slidesPerView: 2 },
        992: { slidesPerView: 4 }
      }
    });
    }
  }

  document.addEventListener("matrimony:content-ready", initSliders);
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(initSliders, 800);
  }, { once: true });
})();
