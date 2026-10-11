import { useEffect } from "react";

/** Keep decorative motion outside React's render cycle. */
export function useMotion(paused = false) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      document.documentElement.classList.toggle("motion-paused", paused);
      if (preference.matches || paused) return;

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".section-heading, .overview-grid article, .track-card, .readiness, .venue, .speaker, .sponsor-row, .faq-layout, .final-inner",
        ),
      );
      const reveal = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            target.classList.add("is-visible");
            reveal.unobserve(target);
          });
        },
        { threshold: 0.08 },
      );
      elements.forEach((element) => {
        // Already visible content stays visible on refresh and deep links.
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("scroll-reveal");
        reveal.observe(element);
      });

      const animated = document.querySelectorAll(
        ".hero, .hero-art, .overview, .tracks, .speakers, .final-cta",
      );
      const visibility = new IntersectionObserver((entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("motion-active", entry.isIntersecting),
        );
      });
      animated.forEach((element) => visibility.observe(element));

      let frame = 0;
      const update = () => {
        const length =
          document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty(
          "--scroll-progress",
          String(length > 0 ? Math.min(1, window.scrollY / length) : 0),
        );
        document
          .querySelector(".header")
          ?.classList.toggle("is-scrolled", window.scrollY > 24);
        frame = 0;
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();
      dispose = () => {
        reveal.disconnect();
        visibility.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        elements.forEach((element) =>
          element.classList.remove("scroll-reveal", "is-visible"),
        );
        animated.forEach((element) =>
          element.classList.remove("motion-active"),
        );
        document.querySelector(".header")?.classList.remove("is-scrolled");
        document.documentElement.style.removeProperty("--scroll-progress");
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      dispose();
      document.documentElement.classList.remove("motion-paused");
      preference.removeEventListener("change", setup);
    };
  }, [paused]);
}
