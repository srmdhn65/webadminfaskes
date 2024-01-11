import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SubmenuType from "../../interface/submenutype_interface";

interface SidebarSubmenuProps {
  submenu: SubmenuType[];
  name: string;
  icon: JSX.Element;
  path: string;
  index: number;
}

function SidebarSubmenu({
  submenu,
  name,
  icon,
  path,
  index,
}: SidebarSubmenuProps) {
  const isActive = window.location.pathname.startsWith(
    `/${name.toLowerCase()}`
  );
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  /** Open Submenu list if path found in routes, this is for directly loading submenu routes first time */
  useEffect(() => {
    if (submenu.filter((m) => m.path === location.pathname)[0])
      setIsExpanded(true);
  }, [location.pathname, submenu]);

  return (
    <>
      <div
        className={`nav-link ${isActive ? "" : "collapsed"}`}
        onClick={() => setIsExpanded(!isExpanded)}
        data-toggle="collapse"
        data-target={`#${name.toLowerCase().replace(/\s/g, "-")}`}
        aria-expanded={isExpanded}
        aria-controls={name.toLowerCase().replace(/\s/g, "-")}
      >
        {icon}
        <i className="menu-icon"></i>
        <span className="menu-title">{name}</span>
        <i className="menu-arrow" />
      </div>
      <div
        className={`collapse ${isExpanded ? "show" : ""}`}
        id={name.toLowerCase().replace(/\s/g, "-")}
      >
        <ul className="nav flex-column sub-menu">
          {submenu.map((m, subIndex) => (
            <li key={subIndex} className="nav-item">
              <Link to={m.path} className="nav-link">
                {m.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SidebarSubmenu;
