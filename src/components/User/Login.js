import axios from "axios";
import { useNavigate } from "react-router-dom";
import { properties } from '../common/Properties.js'
const baseUrl = properties.loginUrl;
const UserLogin = () => {
    const navigate = useNavigate();
    const code = new URL(window.location).searchParams.get('code');
    axios.post(baseUrl, {
        "grant_type": 'authorization_code',
        "client_id": process.env.REACT_APP_ACCESS_NAME,
        "client_secret": process.env.REACT_APP_SECRET_KEY,
        "redirect_uri": "http://127.0.0.1:3000/login",
        "code": code
    }).then((res) => {
        sessionStorage.setItem("auth-code", "Bearer " + res.data["access_token"]);
        navigate('/home');
    });
}
export default UserLogin;