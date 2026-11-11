
let tarotCards = [];

// Load tarot cards from our JSON file
async function loadCards() {
  try {
    const response = await fetch("data/cards.json");

    if (!response.ok) {
      throw new Error("Could not load tarot cards");
    }

    tarotCards = await response.json();
  } catch (error) {
    console.error(error);
    document.getElementById("card-result").textContent =
      "The oracle is unavailable. Try again later.";
  }
}

// Draw a random tarot card
function drawCard() {
  const result = document.getElementById("card-result");

  if (tarotCards.length === 0) {
    result.textContent = "The cards are not ready yet.";
    return;
  }

  const randomIndex = Math.floor(
    Math.random() * tarotCards.length
  );

  const card = tarotCards[randomIndex];

  // Clear the previous reading
  result.replaceChildren();

  const title = document.createElement("h3");
  title.textContent = card.name;

  const meaning = document.createElement("p");
  meaning.textContent = card.meaning;

  result.append(title, meaning);
}

// Connect the button to the function
document.getElementById("draw-card")
  .addEventListener("click", drawCard);

loadCards();
