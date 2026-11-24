// 1. Reusable Toast Notification Function (Activity 5)
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  // Auto-remove notification after 5 seconds
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// 2. Smooth Scrolling (Activity 5) & Live Booking Summary (Activity 7)
document.addEventListener("DOMContentLoaded", () => {
  const bookingSection = document.getElementById("Book Tickets");
  const matchSelect = document.getElementById("match");
  const standSelect = document.getElementById("stand");
  const ticketsInput = document.getElementById("tickets");

  const summaryMatch = document.getElementById("summary-match");
  const summaryStand = document.getElementById("summary-stand");
  const summaryPrice = document.getElementById("summary-price");
  const summaryQty = document.getElementById("summary-qty");
  const summaryTotal = document.getElementById("summary-total");

  const matchPrices = {
    "MI vs CSK": { General: 2500, Premium: 5500, VIP: 23000 },
    "MI vs RCB": { General: 1500, Premium: 2000, VIP: 7500 }
  };

  function updateSummary(notify = true) {
    if (!matchSelect || !standSelect || !ticketsInput) return;

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const qty = Math.max(1, Number(ticketsInput.value) || 1);
    const price = matchPrices[selectedMatch]?.[selectedStand] || 0;
    const total = price * qty;

    if (summaryMatch) summaryMatch.textContent = selectedMatch;
    if (summaryStand) summaryStand.textContent = selectedStand;
    if (summaryPrice) summaryPrice.textContent = price.toLocaleString("en-IN");
    if (summaryQty) summaryQty.textContent = qty;
    if (summaryTotal) summaryTotal.textContent = total.toLocaleString("en-IN");

    if (notify) {
      showToast("Booking summary updated!");
    }
  }

  // Listen for form control changes (Activity 7)
  if (matchSelect) matchSelect.addEventListener("change", () => updateSummary(true));
  if (standSelect) standSelect.addEventListener("change", () => updateSummary(true));
  if (ticketsInput) {
    ticketsInput.addEventListener("change", () => updateSummary(true));
    ticketsInput.addEventListener("input", () => updateSummary(true));
  }

  // Smooth scroll from hero .book-btn and table Book buttons (Activity 5)
  const bookButtons = document.querySelectorAll(".book-btn, #Matches tbody button");

  bookButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      // Auto-select the match if clicked from a schedule table row
      const row = button.closest("tr");
      if (row && matchSelect) {
        const matchName = row.cells[1]?.textContent.trim();
        if (matchName) {
          matchSelect.value = matchName;
          updateSummary(false);
        }
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
        showToast("Scrolling to booking form...");
      }
    });
  });

  updateSummary(false);
});