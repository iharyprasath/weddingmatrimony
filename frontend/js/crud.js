function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function apiUrl(path) {
  const baseUrl = window.API_BASE_URL || "";
  return `${baseUrl}${path}`;
}

function imageUrl(value) {
  if (!value) return "";
  if (value.startsWith("/uploads/")) return apiUrl(value);
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return apiUrl(`/uploads/${value}`);
}

function firstValue() {
  for (const value of arguments) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return "";
}

async function loadHomepageData() {
  try {
    const response = await fetch(apiUrl("/heroes"));
    

    if (!response.ok) {
      throw new Error("Unable to load hero data");
    }

    const heroes = await response.json();
    const data = Array.isArray(heroes) ? heroes[0] : heroes;

    if (!data) return;

    const heroContent = document.getElementById("heroContent");
    if (heroContent) {
      heroContent.innerHTML = `
        <div class="ban-tit">
          <span>
            <i class="no1">#1</i>
            ${escapeHtml(data.title)}
          </span>
          <h1>${escapeHtml(data.subtitle)}</h1>
          <p>${escapeHtml(data.description)}</p>
        </div>
      `;
    }

    const bg = document.querySelector(".hom-head");
    const heroImage = imageUrl(data.image || data.banner_image);

    if (bg && heroImage) {
      bg.style.backgroundImage = `linear-gradient(90deg, rgba(36, 24, 39, 0.88), rgba(36, 24, 39, 0.32)), url("${heroImage}")`;
      bg.style.backgroundSize = "cover";
      bg.style.backgroundPosition = "center";
    }
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }
}

async function loadServices() {
  try {
    const response = await fetch(apiUrl("/services"));

    if (!response.ok) {
      throw new Error("Unable to load services data");
    }

    const services = await response.json();
    renderServices(Array.isArray(services) ? services : []);
  } catch (error) {
    console.error("Error loading services data:", error);
    renderServices([]);
  }
}

async function loadAboutSection() {
  try {
    const response = await fetch(apiUrl("/about-section"));

    if (!response.ok) {
      throw new Error("Unable to load about section data");
    }

    const data = await response.json();
    if (!data) return;

    renderAboutSection(data);
  } catch (error) {
    console.error("Error loading about section data:", error);
  }
}

async function loadBlogs() {
  try {
    const response = await fetch(apiUrl("/blogs"));

    if (!response.ok) {
      throw new Error("Unable to load blog data");
    }

    const blogs = await response.json();
    if (!Array.isArray(blogs) || blogs.length === 0) return;

    renderBlogs(blogs);
    renderLatestNews(blogs.slice(0, 3));
  } catch (error) {
    console.error("Error loading blog data:", error);
  }
}

function serviceTemplate(service) {
  const title = escapeHtml(service.title);
  const description = escapeHtml(service.description);
  const image = escapeHtml(imageUrl(service.image));
  const buttonText = escapeHtml(service.buttontext || "View more");

  return (
    '<li class="swiper-slide">' +
    '<a class="hacc" href="#services">' +
    '<div class="hacc-img">' +
    '<img src="' +
    image +
    '" alt="' +
    title +
    '" loading="lazy">' +
    "</div>" +
    '<div class="hacc-body">' +
    "<h4>" +
    title +
    "</h4>" +
    "<p>" +
    description +
    "</p>" +
    "<span>" +
    buttonText +
    "</span>" +
    "</div>" +
    "</a>" +
    "</li>"
  );
}

function aboutSectionTemplate(data) {
  const heading = escapeHtml(data.heading);
  const highlight = escapeHtml(data.highlight);
  const descriptionOne = escapeHtml(data.description_one);
  const ctaText = escapeHtml(data.cta_text || "Click here to");
  const ctaHref = escapeHtml(data.cta_href || "#register");
  const descriptionTwo = escapeHtml(data.description_two);
  const note = escapeHtml(data.note);
  const phoneLabel = escapeHtml(data.phone_label || "Enquiry");
  const phoneValue = escapeHtml(data.phone_value);
  const supportLabel = escapeHtml(data.support_label || "Get Support");
  const supportValue = escapeHtml(data.support_value);
  const imageOne = escapeHtml(imageUrl(data.image_one) || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=82");
  const imageTwo = escapeHtml(imageUrl(data.image_two) || "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=700&q=82");

  return `
    <div class="ab-wel-lhs">
      <img class="ab-wel-1" src="${imageOne}" alt="${heading}">
      <img class="ab-wel-2" src="${imageTwo}" alt="${highlight || heading}">
    </div>
    <div class="ab-wel-rhs">
      <h2>${heading}${highlight ? ` <em>${highlight}</em>` : ""}</h2>
      <p>${descriptionOne}</p>
      <p><a href="${ctaHref}">${ctaText}</a> ${descriptionTwo}</p>
      <div class="ab-note">${note}</div>
      <ul class="contact-cards">
        <li><i class="fa fa-phone"></i><h4>${phoneLabel} <em>${phoneValue}</em></h4></li>
        <li><i class="fa fa-envelope-o"></i><h4>${supportLabel} <em>${supportValue}</em></h4></li>
      </ul>
    </div>
  `;
}

function blogTemplate(blog) {
  const title = escapeHtml(blog.title);
  const category = escapeHtml(blog.category || "Blog");
  const description = escapeHtml(blog.description);
  const buttonText = escapeHtml(blog.buttontext || "Read more");
  const image = escapeHtml(imageUrl(blog.image) || "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=82");

  return (
    '<li>' +
    '<article class="blog-box">' +
    '<img src="' +
    image +
    '" alt="' +
    title +
    '" loading="lazy">' +
    "<span>" +
    category +
    "</span>" +
    "<h2>" +
    title +
    "</h2>" +
    "<p>" +
    description +
    "</p>" +
    '<a href="#!">' +
    buttonText +
    "</a>" +
    "</article>" +
    "</li>"
  );
}

function latestNewsTemplate(blog) {
  const title = escapeHtml(blog.title);
  const date = escapeHtml(blog.blogdate || blog.createdAt || "");
  const image = escapeHtml(imageUrl(blog.image) || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=180&q=80");

  return (
    "<li>" +
    '<img src="' +
    image +
    '" alt="' +
    title +
    '" loading="lazy">' +
    "<div><h5>" +
    title +
    '</h5><span class="ic-date">' +
    date +
    "</span></div>" +
    '<a href="#blog" class="fclick" aria-label="Read story"></a>' +
    "</li>"
  );
}

function renderServices(services) {
  const servicesList = document.querySelector(".hom-qui-acc-sli");
  if (!servicesList) return;

  servicesList.innerHTML = services.map(serviceTemplate).join("");
  document.dispatchEvent(new CustomEvent("matrimony:content-ready"));
}

function renderAboutSection(data) {
  const aboutGrid = document.querySelector("#about .ab-wel-grid");
  if (!aboutGrid) return;

  aboutGrid.innerHTML = aboutSectionTemplate(data);
}

function renderBlogs(blogs) {
  const blogList = document.querySelector(".hom-blog .blog ul");
  if (!blogList) return;

  blogList.innerHTML = blogs.map(blogTemplate).join("");
}

function renderLatestNews(blogs) {
  const newsList = document.querySelector(".late-news ul");
  if (!newsList) return;

  newsList.innerHTML = blogs.map(latestNewsTemplate).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadHomepageData();
  loadServices();
  loadAboutSection();
  loadBlogs();
});
async function loadtrusted() {
  try {
    const trustresponse = await fetch(apiUrl("/trusted"));

    if (!trustresponse.ok) {
      throw new Error("Unable to load trusted brand data");
    }

    const trusted = await trustresponse.json();

    rendertrusted(Array.isArray(trusted) ? trusted : []);
  } catch (error) {
    console.error("Error loading trusted brand data:", error);
    rendertrusted([]);
  }
}

function trustedTemplate(trusted) {
  const username = escapeHtml(firstValue(trusted.username, "Trusted couple"));
  const city = escapeHtml(firstValue(trusted.city, "Featured story"));
  const description = escapeHtml(firstValue(trusted.description, "Trusted by families and couples."));
  const trustedImage = escapeHtml(
    imageUrl(firstValue(trusted.trustedimage, trusted.image)) ||
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=82"
  );

  return (
    '<li class="swiper-slide">' +
    '<a class="hacc" href="#trusted">' +
    '<div class="hacc-img">' +
    '<img src="' +
    trustedImage +
    '" alt="' +
    username +
    '" loading="lazy">' +
    "</div>" +
    '<div class="hacc-body">' +
    "<h4>" +
    username +
    "</h4>" +
    "<p>" +
    city +
    "</p>" +
    "<span>" +
    description +
    "</span>" +
    "</div>" +
    "</a>" +
    "</li>"
  );
}

function rendertrusted(trusted) {
  const trustedList = document.querySelector(".hom-tru-acc-sli, .slider3");
  if (!trustedList) return;

  trustedList.innerHTML = trusted.map(trustedTemplate).join("");
  const slider = trustedList.closest(".swiper");
  if (slider && slider.swiper) {
    slider.swiper.update();
  }
  document.dispatchEvent(new CustomEvent("matrimony:content-ready"));
}

document.addEventListener("DOMContentLoaded", () => {
  loadtrusted();
});
