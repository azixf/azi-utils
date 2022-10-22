export const vClickOutside = {
  mounted: (el: HTMLElement, { value }) => {
    (e: MouseEvent) => {
      document.addEventListener('click', (e: MouseEvent) => {
        if (el.contains(e.target as HTMLElement)) {
          if (typeof value === 'function') {
            value('inside')
          }
        } else {
          if (typeof value === 'function') {
            value('outside')
          }
        }
      })
    }
  }
};
