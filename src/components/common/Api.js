import axios from "axios";
import { apiUrl, dataUrls } from "./Commondata";

export default class ApiCalls {
    static instance = null;
    static getInstance() {
        if (this.instance == null) {
            this.instance = new ApiCalls();
        }
        return this.instance;
    }
    privateUserName = null;
    auth_code = null;
    getAuthToken() {
        if (this.auth_code != null) {
            return this.auth_code;
        }
        try {
            this.auth_code = sessionStorage.getItem("auth-code")
            return this.auth_code;
        } catch (err) {
            alert("Some error occured please login again");
        }
    }

    getCommonData(name, content = 'profile', page = 1) {
        return axios.get(apiUrl + `/users/${name}${dataUrls[content]}`, {
            params: {
                "client_id": process.env.REACT_APP_ACCESS_NAME,
                "page": page
            }
        })
    }


    likePhotos(photo_id, liked) {
        if (!liked) {
            return axios.post(apiUrl + `${dataUrls["photos"]}/${photo_id}/like`, {}, {
                headers: {
                    "Authorization": this.getAuthToken()
                },
                params: {
                    "client_id": process.env.REACT_APP_ACCESS_NAME,
                }
            });
        } else {
            return axios.delete(apiUrl + `${dataUrls["photos"]}/${photo_id}/like`, {
                headers: {
                    "Authorization": this.getAuthToken()
                },
                params: {
                    "client_id": process.env.REACT_APP_ACCESS_NAME,
                }
            });
        }
    }

    getHomePage() {
        return axios.get(apiUrl + dataUrls["photos"], {
            params: {
                "client_id": process.env.REACT_APP_ACCESS_NAME
            }
        });
    }

    getUserProfile() {
        return axios.get(apiUrl + "/me", {
            headers: {
                "Authorization": this.getAuthToken()
            }
        });
    }

    updateUserProfile(data) {
        return axios.put(apiUrl + "/me",
            data
            , {
                headers: {
                    "Authorization": this.getAuthToken()
                },
                params: {
                    "client_id": process.env.REACT_APP_ACCESS_NAME
                },
            }
        );
    }

}