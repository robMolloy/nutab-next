import { Flash, FlashMethods } from "@/modules";
import { useRef } from "react";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const Parent = () => {
  const childRef = useRef<FlashMethods>(null);

  const handleAddFlash = () => {
    childRef.current?.addFlash();
  };

  return (
    <main className={`min-h-screen`}>
      <button onClick={handleAddFlash}>add flash from parent</button>
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
