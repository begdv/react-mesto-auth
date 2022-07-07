import { useLocation, Link } from 'react-router-dom';

export default function Header(props) {
  const {email} = props;
  const location = useLocation();
  console.log(email); 
  console.log(location);
  return (
    <header className="header page__header"> 
      <a className="header__logo" href="#" title="Сервис Mesto"></a>
      { email && <span class="header__info">{email}</span>}
      { 
        email ? <Link className="header__link" to="/signin">Выйти</Link> :
        (location.pathname === '/signin' ? 
          <Link className="header__link" to="/signup">Регистрация</Link> :
          <Link className="header__link" to="/signin">Войти</Link>)
      }
    </header> 
  );
}  