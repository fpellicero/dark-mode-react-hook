import * as React from "react";

function useMatchMedia(media: string): boolean {
  const [matches, setMatches] = React.useState(typeof window !== "undefined" ? window.matchMedia(media).matches : false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(media);
    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    }
    mediaQuery.addListener(onChange);

    return () => {
      mediaQuery.removeListener(onChange);
    }
  }, [media]);

  return matches;
}

export default useMatchMedia;
