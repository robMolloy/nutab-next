import { useRef } from "react";

import { Flash, FlashMethods } from "@/modules";

const Parent = () => {
  const childRef = useRef<FlashMethods>(null);

  const handleAddFlash = () => childRef.current?.addFlash();

  return (
    <main className={`min-h-screen`}>
      <button onClick={handleAddFlash}>add flash asdxfrom parent</button>
      <div
        style={{
          height: "37vh",
          width: `${(37 * 6) / 4}vh`,
        }}
      >
        <Flash ref={childRef} />
      </div>
    </main>
  );
};

export default Parent;
