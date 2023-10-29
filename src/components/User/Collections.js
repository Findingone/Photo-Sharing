import { useEffect, useState } from "react";
import ApiCalls from "../common/Api";
import { useSearchParams } from "react-router-dom";
import './Photos.css';
import SidebarPrivate from "./SidebarPrivate";
const UserCollections = () => {
    const [UserCollections, setUserCollections] = useState(null);
    const [params, setParams] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "collections").then((res) => {
            setUserCollections(res.data);
        }).catch(err => {
            alert(err);
        });
    }, []);


    const lastPage = () => {
        let page = parseInt(params.get("page"));
        if (page > 1) {
            setParams(params => {
                params.set("user_name", params.get("user_name"));
                params.set("page", page - 1);
                return params;
            });
        }
    }
    const nextPage = () => {
        let page = parseInt(params.get("page"));
        setParams(params => {
            params.set("user_name", params.get("user_name"));
            params.set("page", page + 1);
            return params;
        });
    }

    return (<div className="master-container">
        <div className="left-block">
            <SidebarPrivate />
        </div>

        {(UserCollections == null || UserCollections.length == 0) ? <div className="right-block">No collections for this user</div> :
            <div className="right-block">
                <div className="collection-container">
                    {
                        UserCollections.map((collection) => {
                            return <div className="collection-individual">
                                <img className="cover-images" src={collection.cover_photo.urls.regular} />
                                <h4>{collection.title}</h4>
                                <p className="text-muted">{collection.description}</p>
                                <p className="text-muted"> {collection.total_photos} photos </p>
                            </div>
                        })
                    }
                </div>

                <button onClick={lastPage}>Previous</button>
                <button onClick={nextPage}>next</button>
            </div >
        }
    </div >)
}

export default UserCollections;