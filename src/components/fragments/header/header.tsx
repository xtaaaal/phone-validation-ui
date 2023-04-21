import { useMemo } from "react";
import styles from "./header.module.css";
import { useTheme } from "next-themes";
import Button from "@/components/elements/button";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Header = (): JSX.Element => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const ToggleButtonIcon = useMemo(
    () => (theme === "light" ? MoonIcon : SunIcon),
    [currentTheme]
  );

  return (
    <header className={styles.header}>
      <div className={styles.themeButton}>
        <Button
          onClick={() => {
            console.log("toggle");
            setTheme(currentTheme === "light" ? "dark" : "light");
          }}
        >
          <div className={styles.buttonContainer}>
            <ToggleButtonIcon className={styles.icon} />
            Toggle to {currentTheme === "light" ? "Dark" : "Light"}
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Header;
