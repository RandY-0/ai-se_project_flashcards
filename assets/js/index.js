import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckContainerEl = document.querySelector(".decks__list");
const deckTemplateEl = document.querySelector("#deckTemplate");
const homeSection = document.querySelector("#decks");
const carousalSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const mainSection = document.querySelector(".page__main-content");

function renderHomeView() {
  homeSection.style.display = "block";
  notFoundSection.style.display = "none";
  carousalSection.style.display = "none";
  mainSection.classList.remove("page__main-content_location_carousel");

  function createDeckEl(item) {
    const cloneEl = deckTemplateEl.content.querySelector("li").cloneNode(true);

    const deckTitle = cloneEl.querySelector(".deck__title");
    deckTitle.textContent = item.name;

    const deleteBtn = cloneEl.querySelector(".deck__delete-btn");
    deleteBtn.addEventListener("click", () => {
      cloneEl.remove();
    });

    const color = hexToString(item.color);
    cloneEl.classList.add(`deck_color_${color}`);

    const deckCount = cloneEl.querySelector(".deck__count");
    deckCount.textContent = `${item.cards.length} cards`;

    const deckLink = cloneEl.querySelector(".deck__link");
    deckLink.href = `#carousel/${item.id}`;

    return cloneEl;
  }

  function renderDeckEl(item) {
    const deckEl = createDeckEl(item);
    deckContainerEl.prepend(deckEl);
  }

  decks.forEach(renderDeckEl);
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  notFoundSection.style.display = "flex";
  carousalSection.style.display = "none";
  mainSection.classList.remove("page__main-content_location_carousel");
}

function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "" || hash === "home") {
    renderHomeView();
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    const deck = getDeckByID(deckId);

    if (!deck) {
      renderNotFoundView();

      //guard clause -emergency stop button for the function-
      return;
    }

    homeSection.style.display = "none";
    notFoundSection.style.display = "none";
    carousalSection.style.display = "flex";
    mainSection.classList.add("page__main-content_location_carousel");
    renderCarouselView(deck);
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
