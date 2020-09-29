import * as React from "react"
import useMatchMedia from "./useMatchMedia";
import styles from "./styles";

interface IUseDarkModeProps {
  autodetect?: boolean;
  defaultValue?: boolean;

}

function useDarkMode(options: IUseDarkModeProps = {}): [boolean, (darkMode: boolean) => void] {
    const {
      autodetect = true,
      defaultValue = false,
    } = options;

    const prefersDarkTheme = useMatchMedia("(prefers-color-scheme: dark)");
    const [darkMode, setDarkMode] = React.useState(defaultValue);
    
    const setDarkThemeCallback = React.useCallback((t: boolean) => {
        setDarkMode(t);
        try {
            localStorage.setItem("theme", JSON.stringify(t))
        } catch (e) {
            console.error(e)
        }
    }, [setDarkMode]);

    // Autodetect theme
    React.useEffect(() => {
        if (!autodetect) {
          return;
        }
        setDarkMode(prefersDarkTheme);
    }, [prefersDarkTheme]);

    // Try get stored preferences
    React.useEffect(() => {
        try {
            const preference = localStorage.getItem("theme");
            if (!preference) {
              return;
            }

            setDarkMode(preference === "true");
        } catch (e) {
            
        }
    }, []);

    // Apply theme changes
    React.useEffect(() => {
      if (typeof window === "undefined" || !darkMode) {
        return;
      }

      try {
        const stylesheet = document.createElement("style");
        stylesheet.setAttribute("type", "text/css");
        stylesheet.innerHTML = styles;
        stylesheet.id = "react-hook-dark-mode-stylesheet";

        document.head.append(stylesheet);

        return () => {
          stylesheet.remove();
        }
      } catch (e) { }
    }, [darkMode])

    return [darkMode, setDarkThemeCallback]
}

export default useDarkMode
