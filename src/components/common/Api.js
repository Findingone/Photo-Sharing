import axios from "axios";
import { properties } from "./Properties";

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
        return axios.get(properties.apiUrl + `/users/${name}${properties.dataUrls[content]}`, {
            params: {
                "client_id": process.env.REACT_APP_ACCESS_NAME,
                "page": page
            }
        })
    }


    likePhotos(photo_id, liked) {
        if (!liked) {
            return axios.post(properties.apiUrl + `${properties.dataUrls["photos"]}/${photo_id}${properties.like}`, {}, {
                headers: {
                    "Authorization": this.getAuthToken()
                },
                params: {
                    "client_id": process.env.REACT_APP_ACCESS_NAME,
                }
            });
        } else {
            return axios.delete(properties.apiUrl + `${properties.dataUrls["photos"]}/${photo_id}${properties.like}`, {
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
        return axios.get(properties.apiUrl + properties.dataUrls["photos"], {
            params: {
                "client_id": process.env.REACT_APP_ACCESS_NAME
            }
        });
    }

    getUserProfile() {
        return axios.get(properties.apiUrl + `${properties.self}`, {
            headers: {
                "Authorization": this.getAuthToken()
            }
        });
    }

    updateUserProfile(data) {
        return axios.put(properties.apiUrl + `${properties.self}`,
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

    getPhoto(photo_id) {
        return axios.get(properties.apiUrl + `${properties.dataUrls["getPhotos"]}/${photo_id}`, {
            headers: {
                "Authorization": sessionStorage.getItem("auth-code")
            }
        });
    }

    updatePhoto(photo_id, data) {
        axios.put(properties.apiUrl + `${properties.dataUrls.photos}/` + photo_id, data, {
            headers: {
                "Authorization": this.getAuthToken()
            },
            params: {
                "client_id": process.env.REACT_APP_ACCESS_NAME
            },
        })
    }

}