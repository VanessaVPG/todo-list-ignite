import style from './Header.module.css';
import Logo from '../assets/logo.svg';

export function Header() {
  return (
    <header className={style.header}>
      <img src={Logo} />
    </header>
  )
}