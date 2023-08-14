function pointerHandler(e: MouseEvent, el: any) {
  const cb = el.__cb;
  if (el.contains(e.target as HTMLElement)) {
    if (typeof cb === "function") {
      cb(false);
    }
  } else {
    if (typeof cb === "function") {
      cb(true);
    }
  }
}

export const vClickOutside = {
  mounted: (el: HTMLElement, { value: cb }) => {
    (e: MouseEvent) => {
      (el as any).__cb = cb;
      document.addEventListener("pointerdown", (e: MouseEvent) =>
        pointerHandler(e, el)
      );
    };
  },
  unmounted: (el: HTMLElement) => {
    document.removeEventListener("pointerdown", (e: MouseEvent) =>
      pointerHandler(e, el)
    );
  },
};
