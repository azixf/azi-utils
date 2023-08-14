function copyText(value, callback) {
  if ("execCommand" in document) {
    const input = document.createElement("input");
    input.value = value;
    input.style.position = "absolute";
    input.style.top = "-9999px";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    callback(value);
    document.body.removeChild(input);
  } else {
    window.navigator.clipboard.writeText(value).then(() => {
      callback(value);
    });
  }
}

export const vCopy = {
  mounted: (el: HTMLElement, { value: cb }) => {
    const content = el.textContent;
    const callback = typeof cb === "function" ? cb : () => {};
    copyText(content, callback);
  },
};
