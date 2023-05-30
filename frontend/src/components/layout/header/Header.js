
const Header = () => {
    return (
        <nav className="nav">
            <h1 className="website-name"><a className="link text" href="/">Smoothies Point</a></h1>
            <ul className="list">
                {/* <li className='list-item'>Welcome,</li> */}
                <li className='list-item'><a className="link text" href="/logout">Log out</a></li>
                <li className='list-item'><a className="link text" href="/login">Log in</a></li>
                <li className='list-item'><a className="link text btn" href="/signup">Sign up</a></li>
            </ul>
        </nav>
    );
}

export default Header;