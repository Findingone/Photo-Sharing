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
                "page": page,
                "per_page": 10
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

    getHomePage(page = 1) {
        return axios.get(properties.apiUrl + properties.dataUrls["photos"], {
            params: {
                "client_id": process.env.REACT_APP_ACCESS_NAME,
                "page": page
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
        return axios.get(properties.apiUrl + `${properties.dataUrls["photos"]}/${photo_id}`, {
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

    // Collection APIS
    getCollectionData(collection_id) {
        return axios.get(properties.apiUrl + `${properties.collections.collections}/${collection_id}`, {
            params: {
                "client_id": process.env.REACT_APP_ACCESS_NAME
            }
        })
    }

    getCollectionPhotos(collection_id) {
        return axios.get(properties.apiUrl + `${properties.collections.collections}/${collection_id}${properties.collections.photos}`, {
            params: {
                "client_id": process.env.REACT_APP_ACCESS_NAME
            }
        })
    }

    addImageToCollection(collection_id, photo_id) {
        return axios.post(properties.apiUrl + `${properties.collections.collections}/${collection_id}${properties.collections.add_photo}`, {}, {
            headers: {
                "Authorization": this.getAuthToken()
            },
            params: {
                "collection_id": collection_id,
                "photo_id": photo_id,
                "client_id": process.env.REACT_APP_ACCESS_NAME
            }
        })
    }

    removeImageFromCollection(collection_id, photo_id) {
        return axios.delete(properties.apiUrl + `${properties.collections.collections}/${collection_id}${properties.collections.remove_photo}`, {
            headers: {
                "Authorization": this.getAuthToken()
            },
            params: {
                "collection_id": collection_id,
                "photo_id": photo_id,
                "client_id": process.env.REACT_APP_ACCESS_NAME
            }
        })
    }

    createCollection(title, description = null) {
        var paras = {
            "title": title,
            "client_id": process.env.REACT_APP_ACCESS_NAME
        }
        if (description != null) {
            paras["description"] = description
        }
        return axios.post(properties.apiUrl + `${properties.collections.collections}`, {}, {
            headers: {
                "Authorization": this.getAuthToken()
            },
            params: paras
        })
    }
    deleteCollection(collection_id) {
        return axios.delete(properties.apiUrl + `${properties.collections.collections}/${collection_id}`, {
            headers: {
                "Authorization": this.getAuthToken()
            },
            params: {
                "collection_id": collection_id,
                "client_id": process.env.REACT_APP_ACCESS_NAME
            }
        })
    }
}