// Grab modal elements
const pegboardModal = document.getElementById("pegboardModal");
const pegboardGrid = document.getElementById("pegboardGrid");
const closePegboardModal = document.getElementById("closePegboardModal");
const showAllBtn = document.getElementById("showAllPegboards");

// Open modal and populate pegboards
showAllBtn.addEventListener("click", () => {
  pegboardGrid.innerHTML = ""; // Clear previous
  owners.forEach((o, index) => {
    const item = document.createElement("div");
    item.className = "pegboard-grid-item";
    item.innerHTML = `
      <img src="${o.pegboardImg}" alt="Pegboard ${o.name}">
      <span>${o.name}</span>
    `;
    // Scroll carousel on click
    item.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
      pegboardModal.style.display = "none";
    });
    pegboardGrid.appendChild(item);
  });

  pegboardModal.style.display = "flex";
});

// Close modal
closePegboardModal.addEventListener("click", () => {
  pegboardModal.style.display = "none";
});
pegboardModal.addEventListener("click", e => {
  if (e.target === pegboardModal) pegboardModal.style.display = "none";
});
