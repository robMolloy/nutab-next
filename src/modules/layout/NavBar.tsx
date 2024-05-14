import { ThemeSelector } from "../themeSelector";

export const NavBar = (p: { onToggleClick: () => void }) => {
  return (
    <div className="navbar bg-base-200 sticky top-0 border-b z-[99]">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={p.onToggleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="hidden md:block">
        <a className="btn btn-ghost text-xl">NuTab</a>
      </div>
      <div className="flex-1" />
      <div className="flex gap-4 pr-4">
        <div className="btn btn-ghost">hello</div>
        <div className="btn btn-ghost">world</div>

        <div className="dropdown dropdown-end dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <div>Themes &#x25BC;</div>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content mt-1 z-[1] p-2 shadow bg-neutral"
          >
            <div className="h-[75vh] overflow-y-scroll">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
