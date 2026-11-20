// 1. Reusable Toast Notification Function
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  // Auto-remove notification after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// 2. Smooth Scrolling from Book Button to Booking Form
document.addEventListener("DOMContentLoaded", () => {
  const bookButtons = document.querySelectorAll(".book-btn");
  const bookingSection = document.getElementById("booking");

  bookButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (bookingSection) {
        event.preventDefault();
        bookingSection.scrollIntoView({ behavior: "smooth" });
        showToast("Scrolling to booking form...");
      }
    });
  });
});