import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink className="nav__link" to={ROUTES.UNCONTROLLED}>
          Uncontrolled
        </NavLink>
        <NavLink className="nav__link" to={ROUTES.CONTROLLED}>
          Controlled
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
