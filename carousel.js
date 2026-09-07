document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".epbr-gallery, .hardware-gallery").forEach((track, galleryIndex) => {
    const slides = Array.from(track.querySelectorAll(":scope > figure"));
    if (slides.length < 2) return;

    const shell = document.createElement("div");
    shell.className = "carousel-shell";
    track.parentNode.insertBefore(shell, track);
    shell.appendChild(track);
    track.setAttribute("role", "region");
    track.setAttribute("aria-roledescription", "carousel");
    track.setAttribute("aria-label", `Project gallery ${galleryIndex + 1}`);

    slides.forEach((slide, index) => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
    });

    const controls = document.createElement("div");
    controls.className = "carousel-controls";
    controls.innerHTML = `<div class="carousel-buttons"><button class="carousel-button carousel-prev" type="button" aria-label="Previous image">&#8592;</button><button class="carousel-button carousel-next" type="button" aria-label="Next image">&#8594;</button></div><div class="carousel-dots" aria-label="Choose image"></div><span class="carousel-status" aria-live="polite"></span>`;
    shell.appendChild(controls);

    const previous = controls.querySelector(".carousel-prev");
    const next = controls.querySelector(".carousel-next");
    const dots = controls.querySelector(".carousel-dots");
    const status = controls.querySelector(".carousel-status");
    let active = 0;

    const update = (index) => {
      active = Math.max(0, Math.min(index, slides.length - 1));
      previous.disabled = active === 0;
      next.disabled = active === slides.length - 1;
      status.textContent = `${String(active + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      dots.querySelectorAll(".carousel-dot").forEach((dot, i) => dot.setAttribute("aria-current", i === active ? "true" : "false"));
    };
    const goTo = (index) => {
      const target = slides[Math.max(0, Math.min(index, slides.length - 1))];
      track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    };

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Show image ${index + 1}`);
      dot.addEventListener("click", () => goTo(index));
      dots.appendChild(dot);
    });
    previous.addEventListener("click", () => goTo(active - 1));
    next.addEventListener("click", () => goTo(active + 1));
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") goTo(active - 1);
      if (event.key === "ArrowRight") goTo(active + 1);
    });
    track.tabIndex = 0;

    let frame;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nearest = slides.reduce((best, slide, index) => Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft) ? index : best, 0);
        update(nearest);
      });
    }, { passive: true });
    update(0);
  });
});
