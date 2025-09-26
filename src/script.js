document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".progress-bar");
    bars.forEach(bar => {
      const value = bar.getAttribute("data-progress");
      setTimeout(() => {
        bar.style.width = value + "%";
      }, 500);
    });
  });