import { useSearchParams } from "react-router-dom";
import ApiCalls from "../common/Api";
import { useEffect, useState } from "react";
import SidebarCommon from "../common/Sidebar";
import "./UserPhotos.css";
const PublicPhotos = () => {
    const [params, setParmas] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    const [PublicPhotos, setUserPhotos] = useState(null);
    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "photos").then((res) => {
            setUserPhotos(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, [params.get("page"), apiService]);

    const nextPage = () => {
        let page = parseInt(params.get("page"));
        setParmas(params => {
            params.set("page", page + 1);
            return params;
        })
    }
    return (<div className="master-container">
        <div className="left-block">
            <SidebarCommon />
        </div>
        {(PublicPhotos == null || PublicPhotos.length === 0) ? <div className="right-block">No photos for this user</div> :
            <div className="right-block">

                {
                    PublicPhotos.map((image) => {
                        return (<div className="image-container">
                            <img src={image.urls.regular} className="cover-images" />
                            <span>{image.description}<br /> Likes:{image.likes} </span>

                        </div>
                        )
                    })
                }
                <button onClick={nextPage}>Change page</button>

            </div>
        }


    </div>)
}
export default PublicPhotos;