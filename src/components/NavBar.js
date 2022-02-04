import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'


const NavBar = () => {

  const style = {
    paddingRight: '50px',
  }

  const { logout, currentUser } = useAuth()

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/lobby" className="navbar-brand h3 mx-3">Game Lobby</Link>
        <ul className="navbar-nav" style={style}>
          <li className="nav-item px-2">
            <Link to="/login" className="nav-link h5" aria-current="page">login</Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/signup" className="nav-link h5">sign up</Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/login"a className="nav-link h5" onClick={()=>logout()}>log out</Link>
          </li>
        </ul>
        {currentUser && <p className='my-auto'>{currentUser.email}</p>}
        {currentUser && <img src={currentUser.imageURL} alt='profile' style={{height:"40px",width:"40px",objectFit:"cover",borderRadius:'50%'}}/>}
      </div>
    </nav>
  );
};
export default NavBar;