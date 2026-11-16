import { hexToString, removeColorClasses } from "./colors.js";

function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;

  const carouselEl = document.querySelector(".carousel");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const sectionTitle = carouselEl.querySelector(".carousel__title");
  const carouselCardEl = carouselEl.querySelector(".carousel__card");
  const cardTextEl = carouselEl.querySelector(".carousel__card-text");
  const cardFlipBtn = carouselEl.querySelector(".carousel__btn_type_flip");

  removeColorClasses(carouselCardEl);
  const color = hexToString(deck.color);
  carouselCardEl.classList.add(`carousel__card_color_${color}`);

  function getDeckNameAndCount(deck, currentIndex) {
    const deckName = deck.name;
    return `${deckName} · ${currentIndex + 1}/${deck.cards.length}`;
  }

  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    sectionTitle.textContent = getDeckNameAndCount(deck, currentIndex);
    cardTextEl.textContent = showingQuestion
      ? currentCard.question
      : currentCard.answer;

    carouselCardEl.classList.toggle(
      "carousel__card_color_white",
      !showingQuestion,
    );

    // if (showingQuestion) {
    //   cardTextEl.textContent = currentCard.question;
    //   carouselCardEl.classList.remove("carousel__card_color_white");
    //   carouselCardEl.classList.add(`carousel__card_color_${color}`);
    // } else {
    //   cardTextEl.textContent = currentCard.answer;
    //   carouselCardEl.classList.add("carousel__card_color_white");
    //   carouselCardEl.classList.remove(`carousel__card_color_${color}`);
    // }

    updateArrows();
  }

  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  cardFlipBtn.addEventListener("click", () => {
    //Negate showingQuestion
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  updateDisplay();
}

export { renderCarouselView };
