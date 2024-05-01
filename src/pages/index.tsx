import { Flash, useFlash } from "@/modules";

const Parent = () => {
  const { flash, flashSignal } = useFlash();

  return (
    <main className={`min-h-screen`}>
      <button onClick={flash}>add flash asdxfrom parent</button>
      <div style={{ height: "37vh", width: `${(37 * 6) / 4}vh` }}>
        <Flash flashSignal={flashSignal} />
      </div>
    </main>
  );
};

export default Parent;
