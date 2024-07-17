import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./newsletter-signup";

export default function MainNavbar() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              // end // NavLink의 end는 해당 경로와 정확히 일치할때만 active로 판단하는 속성이지만, "/"의 경우는 예외적으로 end가 필요없음
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}
