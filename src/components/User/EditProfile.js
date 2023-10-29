import { useEffect, useState } from "react";
import ApiCalls from "../common/Api";
import Profile from "../Public/Profile";
import { useSearchParams } from "react-router-dom";
import ViewProfile from "./ViewProfile";
import SidebarPrivate from "./SidebarPrivate";

const EditProfile = () => {
    const [userData, setUserData] = useState(null);
    const [params, setParams] = useSearchParams();
    var data = {};
    const apiService = ApiCalls.getInstance();
    useEffect(() => {
        apiService.getUserProfile().then((res) => {
            setUserData(res.data);
            setParams(params => {
                params.set("user_name", res.data.username);
                return params;
            })
        }).catch((err) => { alert("Login first"); });
    }, [])

    function handleChange(e) {
        data[e.target.id] = e.target.value;
    }
    const postForm = () => {
        apiService.updateUserProfile(data).then((res) => {
            alert("Changes Made Successfully");
        });
    };

    return (
        <div className="master-container">
            <div className="left-block">
                <SidebarPrivate />
            </div>
            <div className="right-block">
                {userData == null ? <div>Loading</div> :
                    <div className="container" >
                        <ViewProfile />
                        <form>
                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 col-form-label">User name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="username" onChange={handleChange} defaultValue={userData.username} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label className="col-sm-2 col-form-label">First name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="first_name" onChange={handleChange} defaultValue={userData.first_name} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label className="col-sm-2 col-form-label">Last name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="last_name" onChange={handleChange} defaultValue={userData.last_name} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control" id="email" onChange={handleChange} defaultValue={userData.email} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 col-form-label">Portfolio Uri</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="url" onChange={handleChange} defaultValue={userData.url} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 col-form-label">location</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="location" onChange={handleChange} defaultValue={userData.location} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 col-form-label">Instagram Username</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="instagram_username" onChange={handleChange} defaultValue={userData.instagram_username} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="col-sm-2 col-form-label">About you</label>
                                    <div className="col-sm-10">
                                        <textarea type="text-area" className="form-control" id="bio" onChange={handleChange} defaultValue={userData.bio} />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <br />
                        <button onClick={postForm} className="btn btn-secondary">Save changes</button>
                    </div>
                }
            </div>
        </div>
    );

}

export default EditProfile;