const API_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2605-fsa-et-web-ft/events";

let parties = [];
let selectedParty = null;

async function fetchParties() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    parties = result.data;

    render();
  } catch (error) {
    console.error("Somethings not right, error");
  }
}

fetchParties();

async function fetchSingleParty(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();
    selectedParty = result.data;

    render();
  } catch (error) {
    console.error(`Error fetching ID ${id}:`, error);
  }
}

function partyDetailsComponent() {
  if (selectedParty === null) {
    return `<p class="placeholder-msg">Please select a party to view the details.</p>`;
  }

  return `
    <div class="party-card">
      <h2>${selectedParty.name}</h2>
      <p><strong>ID:</strong> ${selectedParty.id}</p>
      <p><strong>Date & Time:</strong> ${new Date(selectedParty.date).toLocaleString()}</p>
      <p><strong>Location:</strong> ${selectedParty.location}</p>
      <p><strong>Description:</strong> ${selectedParty.description}</p>
    </div>
  `;
}

function partyListComponent() {
  return parties
    .map(
      (party) =>
        `<li class="party-item" data-id="${party.id}">
        ${party.name}
      </li>
    `,
    )
    .join("");
}

function render() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <header>
      <h1> Party Planner Portal </h1>
    </header>

    <main class="container">
      <section class="list-column">
        <h2>Upcoming Events</h2>
        <ul id="party-list"><strong>
          ${partyListComponent()}</strong>
        </ul>
      </section>

      <section class="details-column">
        <h2>Event Details</h2>
        <div id="details-view">
          ${partyDetailsComponent()}
        </div>
      </section>
    </main>
  `;

  const partyList = document.querySelector("#party-list");

  if (partyList) {
    partyList.addEventListener("click", async function (event) {
      const clickedItem = event.target.closest(".party-item");

      if (clickedItem) {
        const partyId = clickedItem.getAttribute("data-id");

        await fetchSingleParty(partyId);
      }
    });
  }
}

render();
