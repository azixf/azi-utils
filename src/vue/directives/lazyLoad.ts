export const vLazyLoad = {
  mounted: (el: HTMLElement, { value }) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLElement;
          const src = value || "";
          img.setAttribute("src", src);
          observer.unobserve(img);
        }
      });
    });

    if (value && !el.getAttribute("src")) {
      observer.observe(el);
    }
  },
};
