import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="Header">
      <Link to="/">Home</Link>&nbsp;
      <Link to="/sobre">Sobre</Link>&nbsp;
      <Link to="/contato">Contato</Link>
      <hr/>
    </div>
  );
}

export default Header
