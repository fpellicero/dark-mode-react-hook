# React Hook Dark Mode

This package contains a React custom hook that applies dark mode to your website. It uses `css filter` to transform light schemes into dark themes (and viceversa). I took the idea from [this post](https://dev.to/dip15739/dark-mode-with-only-1-css-property-17fl?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email) and extracted it into a single hook.

It works by injecting a global stylesheet with the following css:

```css
body {
  filter: invert(1) hue-rotate(180deg);
}

body img {
  
  filter: invert(1) hue-rotate(180deg);
}

.no-dark-mode {
  filter: invert(1) hue-rotate(180deg);
}
```
What this css is doing is inverting the colors in the `<body>` and then converting all colors to their complementaries. The final result is a dark variant (or light, if the original is dark) of the theme, while more-or-less keeping the main colors.

If there is an element that you do not wish to invert (for example, a dark modal background should probably not be bright under dark-mode), you can apply the `no-dark-mode` class to it.

## Installation

```sh
npm i --save react-hook-dark-mode
# or
yarn add react-hook-dark-mode
```

## Usage


```jsx
import useDarkMode from "react-hook-dark-mode";

function darkModeToggle() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? 🌙 : ☀️}
    </button>
  )
}
```
## Options

The hook accepts a configuration object with the following options:


| Name | Type | Description | Default |
| --- | --- | --- | --- |
| autoDetect | `boolean` | Use a `prefers-color-scheme` media query to detect user preferences and automatically set dark mode | `true` |
| defaultValue | `boolean` | Apply dark mode by default | `false` |
