import { useSearchParams } from "react-router-dom";
import ApiCalls from "../common/Api";
import { useEffect, useState } from "react";
import SidebarCommon from "../common/Sidebar";
import "./UserPhotos.css";
const PublicLikedPhotos = () => {
    const [params, setParmas] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    const [PublicLikedPhotos, setUserPhotos] = useState(null);
    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "likedPhotos").then((res) => {
            setUserPhotos(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, [params, apiService]);

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
            </div>
        }


    </div>)
}
export default PublicLikedPhotos;