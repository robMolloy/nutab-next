export const SideMenu = (p: { show: boolean }) => {
  return (
    <div
      className={`bg-base-200 h-screen block border-r ${
        p.show ? "" : "hidden"
      }`}
    >
      <ul className="menu">
        <li>
          <a>Item 1 - more text and so on</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
  );
};
