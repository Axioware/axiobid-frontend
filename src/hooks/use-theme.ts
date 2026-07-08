import { useEffect, useState } from "react";

const THEME_KEY = "theme";

export function useTheme() {
  // Starts false to match the server-rendered markup; corrected on mount so
  // hydration never sees a mismatch against the inline anti-FOUC script.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => setIsDark(root.classList.contains("dark")));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const setTheme = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return { isDark, toggleTheme: () => setTheme(!isDark), setTheme };
}
