import { useState } from "react";
import { useNavigate } from "react-router";
import '../../../node_modules/bootstrap/js/dist/dropdown';
import { Link, createSearchParams } from "react-router-dom";
import './Navbar.css';
const CustomNavbar = () => {
    const navigate = useNavigate();
    const auth = sessionStorage.getItem("auth-code");
    const [userName, setUserName] = useState('');
    const logout = () => {
        sessionStorage.removeItem("auth-code");
        navigate('/home');
    }
    const getPublicUser = () => {
        navigate({
            pathname: "public/profile",
            search: createSearchParams({
                user_name: userName
            }).toString()
        });
    };
    return (
        <div className='custom-nav'>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand" href='/home'>Home</a>
                <span>
                    <input className="mr-sm-2 margin-right" type="search" placeholder="Search for a username" aria-label="Search" value={userName} onInput={e => { setUserName(e.target.value); }} />
                    <button className="btn btn-outline-success my-2 my-sm-0 margin-right" onClick={() => { getPublicUser() }}>Search</button>
                </span>
                <div className="dropdown" >
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        User
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {auth == null && <li><a className="dropdown-item" href={"https://unsplash.com/oauth/authorize?client_id=" + process.env.REACT_APP_ACCESS_NAME + "&scope=public+read_user+write_user+read_photos+write_photos+write_likes+read_collections&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1:3000%2Flogin"}>Login</a></li>}
                        {auth != null && <li><Link className="dropdown-item" to="/profile">Profile</Link></li>}
                        {auth != null && <li onClick={logout} className="dropdown-item">Logout</li>}
                    </ul>
                </div>

            </nav >
        </div >
    );
}

export default CustomNavbar;