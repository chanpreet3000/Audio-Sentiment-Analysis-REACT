import './Navbar.styles.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='main-nav'>
            <div className='main-nav__items'>
                <div className='main-nav__brand'><Link to='/'>Sentivibe</Link></div>
                <div className='main-nav__links'>
                    <Link to={"about"} className='main-nav__link'>
                        What is Sentivibe?
                    </Link>
                    <a className='main-nav__link developers' href='#main-footer'>
                        Developers
                    </a>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;