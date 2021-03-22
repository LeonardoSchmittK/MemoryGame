(() => {
   const gameInterface = document.querySelector(".game__interface");
   const btnStart = document.querySelector(".game__header__button-start");
   const btnReset = document.querySelector(".game__header__button-reset");
   const numberInput = document.querySelector(".game__header__number-input");
   let points = document.querySelector(".game__points");
   let pairsSet = [];
   let clickedCards = [];
   let cardsHistory = [];
   let validated = [];
   btnStart.onclick = () => makePairs();
   btnReset.onclick = () => resetGame();

   function resetGame() {
      btnReset.disabled = true;
      btnStart.disabled = false;
      cardsHistory.length = 0;
      validated.length = 0;
      clickedCards.length = 0;
      document.querySelectorAll(".game__card").forEach((card) => gameInterface.removeChild(card));
      // gameInterface.style.animation = "stretch-up linear forwards .5s ";
   }

   function makePairs() {
      document.querySelectorAll(".game__card").forEach((card) => gameInterface.removeChild(card));
      const firstPartOfPairs = [];
      const secondPartOfPairs = [];
      const symbols = [];

      let i = 0;
      let max = numberInput.value ? numberInput.value : 4;
      for (i; i <= max; ++i) {
         firstPartOfPairs.push(i);
         secondPartOfPairs.push(i);
      }

      symbols.push(firstPartOfPairs);
      symbols.push(secondPartOfPairs);
      pairsSet = symbols.flat();

      tossNumbers(pairsSet);
   }

   function tossNumbers(arr) {
      arr.sort(() => 0.5 - Math.random());
      printPairs(arr);
   }

   function printPairs(arr) {
      let i = 0;
      let max = arr.length - 1;
      for (i; i <= max; ++i) {
         const card = document.createElement("div");
         card.className = "game__card";
         card.dataset.cardId = `card-${arr[i]}`;
         card.innerHTML = `<div class="flip-card-inner">
    <div class="flip-card-front">
    </div>
    <div class="flip-card-back">
      <h1>${arr[i]}</h1> 
    </div>
  </div>`;
         card.onclick = () => gameExecution(card);
         console.log(arr[i]);
         // gameInterface.style.animation = "stretch linear forwards .5s";
         btnStart.disabled = true;
         btnReset.disabled = false;
         // gameInterface.onanimationend = () => (gameInterface.style.animation = "");
         gameInterface.appendChild(card);
      }
   }

   function gameExecution(card) {
      card.className = "game__card --active";
      clickedCards.push(card.dataset.cardId);
      cardsHistory.push(card);
      let y = [...new Set(clickedCards)];

      // [...document.getElementsByClassName("game__card")].map((i) => (i.onclick = () => true));
      if (clickedCards.length >= 2) {
         if (y.length === 1) {
            validated.push(cardsHistory[cardsHistory.length - 1]);
            validated.push(cardsHistory[cardsHistory.length - 2]);
            clickedCards = [];
            checkGameFinish();

            // validated.map((i) => (i.className = "game__card --active"));
            // cardsHistory.map((i) => (i.className = "game__card --active"));
         } else {
            setTimeout(() => {
               clickedCards = [];
               cardsHistory.reverse();
               cardsHistory.length = 2;
               cardsHistory.reverse();
               let x = cardsHistory.filter((i) => i.className === "game__card --active");
               x.map((i) => (i.className = "game__card"));
               // [...document.getElementsByClassName("game__card")].map(
               //    (i) => (i.onclick = () => null)
               // );
               [...document.getElementsByClassName("game__card")].map(
                  (i) => (i.style.pointerEvents = "auto")
               );
               cardsHistory = [];
            }, 500);

            setTimeout(() => {
               [...document.getElementsByClassName("game__card")].map(
                  (i) => (i.style.pointerEvents = "none")
               );
            }, 100);
         }
      }

      console.log(clickedCards);
      console.log(cardsHistory);
   }

   let count = 1;
   points.innerHTML = count;

   function checkGameFinish() {
      const cards = [...document.getElementsByClassName("game__card --active")];

      if (cards.length >= pairsSet.length) {
         countPoints(++count);
         resetGame();
      }
   }

   numberInput.oninput = () => validateNumber();

   function validateNumber(value) {
      numberInput.value =
         numberInput.value % 2 === 0 ? numberInput.value : Number(numberInput.value) + 1;
      numberInput.value > 10 ? (numberInput.value = 2) : numberInput.value;
   }

   function countPoints(count) {
      points.innerHTML = count;
      points.style.animation = "pop .5s linear";
      points.onanimationend = () => (points.style.animation = "");
   }
})();
