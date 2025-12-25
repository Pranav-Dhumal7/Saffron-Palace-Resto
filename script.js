const hamburger = document.getElementById("hamburger");
const primaryNav = document.getElementById("primary-nav");
const navLinks = document.querySelectorAll(".nav-link");
const reservationForm = document.getElementById("reservation-form");
const formFeedback = document.getElementById("form-feedback");
const menuCards = document.querySelectorAll(".menu-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const spiceToggle = document.getElementById("spice-toggle");
const festivalSelect = document.getElementById("festival-select");
const testimonialContent = document.getElementById("testimonial-content");
const journeySteps = document.querySelectorAll(".journey-step");
const journeyDetail = document.getElementById("journey-detail");
const newsletterForm = document.getElementById("newsletter");
const yearSpan = document.getElementById("year");

const testimonials = [
  {
    text: "The biryani arrives with a saffron mist and tabla serenade. Pure magic!",
    guest: "Priya & Kabir",
    spice: 5,
  },
  {
    text: "Masala dosa felt like a trip to Bengaluru's temple streets but plated like art.",
    guest: "Chef Alejandro",
    spice: 4,
  },
  {
    text: "Service team greeted us with 'Namaste' garlands & ensured every ritual was honored.",
    guest: "The Malhotra Family",
    spice: 5,
  },
  {
    text: "Catering brigade recreated a Punjabi haveli at our wedding. Guests still rave about it.",
    guest: "Aisha & Omar",
    spice: 5,
  },
];

const spiceJourneyData = [
  {
    title: "Kerala Pepper Coast",
    description:
      "Tellicherry peppercorns sun-dried along Malabar shores bring smoky heat to our grills.",
    pairing: "Paired with smoky tandoori platters and fermented dosa batter.",
  },
  {
    title: "Goan Kokum Bay",
    description:
      "Kokum fruit adds tart brilliance, balancing coconut curries and seafood stews.",
    pairing: "Spotlight in Coastal Malabar Curry and kokum spritz welcome drink.",
  },
  {
    title: "Hyderabadi Chilli Bazaar",
    description:
      "Byadgi chilies lend brick-red hue and gentle warmth to royal gravies.",
    pairing: "Defines the depth of our Nizami Dum Biryani aromatics.",
  },
  {
    title: "Kashmiri Saffron Valley",
    description:
      "Hand-plucked saffron threads steep overnight to perfume desserts and shorbas.",
    pairing: "Infuses our Cardamom Saffron Kulfi and shahi qormas.",
  },
];

let testimonialIndex = 0;
let testimonialInterval;

const renderTestimonial = () => {
  const { text, guest, spice } = testimonials[testimonialIndex];
  const peppers = "🌶".repeat(spice);
  testimonialContent.innerHTML = `
    <p class="testimonial-text">“${text}”</p>
    <p class="spice-stars" aria-label="${spice} spice rating">${peppers}</p>
    <p class="guest">— ${guest}</p>
  `;
};

const startCarousel = () => {
  testimonialInterval = setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  }, 6000);
};

const stopCarousel = () => clearInterval(testimonialInterval);

const toggleNav = () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  hamburger.classList.toggle("active");
  primaryNav.classList.toggle("open");
};

const handleSmoothScroll = (event) => {
  const targetId = event.currentTarget.getAttribute("href");
  if (!targetId.startsWith("#")) return;
  event.preventDefault();
  const target = document.querySelector(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth" });
  if (window.innerWidth < 768) {
    toggleNav();
  }
};

const filterMenu = (category) => {
  menuCards.forEach((card) => {
    const matches = category === "all" || card.dataset.category === category;
    card.style.display = matches ? "grid" : "none";
  });
};

const handleFilterClick = (event) => {
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");
  filterMenu(event.currentTarget.dataset.filter);
};

const handleSpiceToggle = (event) => {
  document.body.classList.toggle("show-spice", event.target.checked);
};

const handleJourneyClick = (event) => {
  const index = Number(event.currentTarget.dataset.step);
  journeySteps.forEach((btn) => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");
  const data = spiceJourneyData[index];
  journeyDetail.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.description}</p>
    <p><strong>Perfect Pairing:</strong> ${data.pairing}</p>
  `;
};

const validateReservation = (formData) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d()+\-\s]+$/;

  if (!formData.name.trim()) errors.push("We need a name for the aarti plate.");
  if (!emailRegex.test(formData.email)) errors.push("That email looks off-beat. Please recheck.");
  if (!phoneRegex.test(formData.phone)) errors.push("Share a valid phone so we can confirm with a Namaste call.");
  if (!formData.date) errors.push("Select a date to align the lunar calendar.");
  if (!formData.time) errors.push("Choose a time slot for the diya lighting.");
  if (!formData.guests) errors.push("Tell us how many guests share the thali.");
  if (!formData.occasion) errors.push("Pick the celebration we can elevate.");

  return errors;
};

const handleReservationSubmit = (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target));
  const errors = validateReservation(formData);

  if (errors.length) {
    formFeedback.textContent = errors[0];
    formFeedback.style.color = "#ffb703";
    return;
  }

  formFeedback.textContent = "Reservation request sent with incense and intent!";
  formFeedback.style.color = "#a7f3d0";
  console.table(formData);
  event.target.reset();
};

const handleFestivalChange = (event) => {
  document.body.setAttribute("data-festival", event.target.value);
};

const handleNewsletterSubmit = (event) => {
  event.preventDefault();
  const email = event.target.elements.newsletter.value.trim();
  if (!email) return;
  alert("Dhanyavaad! You are now part of the spice circle.");
  event.target.reset();
};

const handleResize = () => {
  if (window.innerWidth >= 768) {
    primaryNav.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
};

const initJourney = () => {
  journeyDetail.innerHTML = `
    <h3>${spiceJourneyData[0].title}</h3>
    <p>${spiceJourneyData[0].description}</p>
    <p><strong>Perfect Pairing:</strong> ${spiceJourneyData[0].pairing}</p>
  `;
};

const init = () => {
  renderTestimonial();
  startCarousel();
  initJourney();

  hamburger.addEventListener("click", toggleNav);
  navLinks.forEach((link) => link.addEventListener("click", handleSmoothScroll));
  filterButtons.forEach((btn) => btn.addEventListener("click", handleFilterClick));
  spiceToggle.addEventListener("change", handleSpiceToggle);
  journeySteps.forEach((btn) => btn.addEventListener("click", handleJourneyClick));
  reservationForm.addEventListener("submit", handleReservationSubmit);
  festivalSelect.addEventListener("change", handleFestivalChange);
  document.querySelector(".slider-btn.prev").addEventListener("click", () => {
    stopCarousel();
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
    startCarousel();
  });
  document.querySelector(".slider-btn.next").addEventListener("click", () => {
    stopCarousel();
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
    startCarousel();
  });

  newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  yearSpan.textContent = new Date().getFullYear();
};

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", handleResize);
