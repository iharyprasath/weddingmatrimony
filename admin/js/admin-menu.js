const menuButton = document.querySelector(".admin-menu-toggle");
const menuOverlay = document.querySelector(".sidebar-overlay");
const sidebarLinks = document.querySelectorAll(".sidebar a");
const closeButton = document.querySelector(".sidebar-close");

function closeAdminMenu() {
  document.body.classList.remove("sidebar-open");

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
  }
}

function toggleAdminMenu() {
  const isOpen = document.body.classList.toggle("sidebar-open");

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", isOpen);
  }


}

if (closeButton) {
  closeButton.addEventListener("click", closeAdminMenu);
}

if (menuButton) {
  menuButton.addEventListener("click", toggleAdminMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeAdminMenu);
}

sidebarLinks.forEach((link) => {
  link.addEventListener("click", closeAdminMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAdminMenu();
  }
});
