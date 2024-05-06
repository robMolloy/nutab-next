import { Button } from "@/components";
import { Flash, useFlash } from "@/modules";
import { useThemeStore } from "@/stores";
import React from "react";

const Parent = () => {
  const { flash, flashSignal } = useFlash();
  const themeStore = useThemeStore();

  return (
    <main className={`min-h-screen`}>
      <Button variant="neutral" onClick={() => themeStore.setRandomThemeName()}>
        toggleTheme
      </Button>
      {themeStore.themeName}
      <br />
      <button onClick={flash}>add flash asdxfrom parent</button>
      <div style={{ height: "37vh", width: `${(37 * 6) / 4}vh` }}>
        <Flash flashSignal={flashSignal} />
      </div>
    </main>
  );
};

export default Parent;
