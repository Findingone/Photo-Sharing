import { useSearchParams } from "react-router-dom";
import ApiCalls from "../common/Api";
import { useEffect, useState } from "react";
import SidebarCommon from "../common/Sidebar";
import "./UserPhotos.css";
const PublicLikedPhotos = () => {
    const [params, setParams] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    const [PublicLikedPhotos, setUserPhotos] = useState(null);
    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "likedPhotos").then((res) => {
            setUserPhotos(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, [params, apiService]);

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
            <SidebarCommon />
        </div>
        {(PublicLikedPhotos == null || PublicLikedPhotos.length === 0) ? <div className="right-block">No photos for this user</div> :
            <div className="right-block">

                {
                    PublicLikedPhotos.map((image) => {
                        return (<div className="image-container">
                            <img src={image.urls.regular} className="cover-images" />
                            <span>{image.description}<br /> Likes:{image.likes} </span>

                        </div>
                        )
                    })
                }
                <button onClick={lastPage}>Previous</button>
                <button onClick={nextPage}>next</button>
            </div>
        }


    </div>)
}
export default PublicLikedPhotos;