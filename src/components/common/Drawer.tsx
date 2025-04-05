import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Drawer = (): JSX.Element => {
  const navigate = useNavigate();

  const closeDrawer = useCallback(
    (path: string) => {
      const drawerToggle = document.getElementById("side-menu") as HTMLInputElement;
      if (drawerToggle) drawerToggle.checked = false;
      navigate(path);
    },
    [navigate]
  );

  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
        <li>
          <button
            onClick={() => closeDrawer("/fashion")}
            className="!text-gray-700 active:!text-white dark:!text-white"
          >
            패션
          </button>
        </li>
        <li>
          <button
            onClick={() => closeDrawer("/accessory")}
            className="!text-gray-700 active:!text-white dark:!text-white"
          >
            액세서리
          </button>
        </li>
        <li>
          <button
            onClick={() => closeDrawer("/digital")}
            className="!text-gray-700 active:!text-white dark:!text-white"
          >
            디지털
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
