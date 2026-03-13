document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".photo-item"));
  const lightbox = document.querySelector(".lightbox");
  const isPhone = window.matchMedia("(max-width: 640px)").matches;

  if (!items.length) return;

  // On phone: no lightbox, open the image directly in a new tab to avoid hanging.
  if (isPhone || !lightbox) {
    items.forEach((item) => {
      item.setAttribute("target", "_blank");
      item.setAttribute("rel", "noopener");
    });
    return;
  }

  const lbImg = lightbox.querySelector("img");
  const btnClose = lightbox.querySelector(".lb-close");
  const btnPrev = lightbox.querySelector(".lb-prev");
  const btnNext = lightbox.querySelector(".lb-next");

  let current = 0;

  function show(index){
    current = (index + items.length) % items.length;
    lbImg.src = items[current].getAttribute("href");
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeBox(){
    lightbox.classList.remove("show");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  items.forEach((item, idx) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      show(idx);
    });
  });

  btnClose?.addEventListener("click", closeBox);
  btnPrev?.addEventListener("click", () => show(current - 1));
  btnNext?.addEventListener("click", () => show(current + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeBox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    if (e.key === "Escape") closeBox();
    if (e.key === "ArrowLeft") show(current + 1);
    if (e.key === "ArrowRight") show(current - 1);
  });
});
