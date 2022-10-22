export const vLazyLoad = {
  mounted: (el: HTMLElement) => {
    const images = el.querySelectorAll("img");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLElement;
          const src = img.dataset.src || "";
          img.setAttribute("src", src);
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((image) => {
      observer.observe(image);
    });
  },
};
