const styles = `
body {
  filter: invert(1) hue-rotate(180deg);
}

body img {
  
  filter: invert(1) hue-rotate(180deg);
}

.no-dark-mode {
  filter: invert(1) hue-rotate(180deg);
}
`.replace(/\n/g, "").trim();

export default styles;
