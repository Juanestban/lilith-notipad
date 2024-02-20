let timeout: number;

export const debounce = (fn: () => void) => {
  window.clearTimeout(timeout);
  timeout = window.setTimeout(fn, 500);
};
