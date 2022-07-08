import { useLocation, Link } from 'react-router-dom';

export default function Header(props) {
  const {isLoggedIn, email} = props;
  const location = useLocation();
  return (
    <header className="header page__header"> 
      <a className="header__logo" href="#" title="Сервис Mesto"></a>
      { isLoggedIn && <span className="header__info">{email}</span>}
      { 
        isLoggedIn ? <Link onClick={() => props.onSignOut()} className="header__link" to="/signin">Выйти</Link> :
        (location.pathname === '/signin' ? 
          <Link className="header__link" to="/signup">Регистрация</Link> :
          <Link className="header__link" to="/signin">Войти</Link>)
      }
    </header> 
  );
}  