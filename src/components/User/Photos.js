import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Photos.css";
import SidebarPrivate from "./SidebarPrivate";
import ApiCalls from "../common/Api";
const UserPhotos = () => {
    const [params, setParams] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    const navigate = useNavigate();
    const [UserPhotos, setUserPhotos] = useState(null);
    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "photos").then((res) => {
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

    const updatePhotoPage = (photoid) => {
        navigate({
            pathname: "/update_photo",
            search: createSearchParams({
                photo_id: photoid
            }).toString()
        });
    }
    return (<div className="master-container">
        <div className="left-block">
            <SidebarPrivate />
        </div>
        {(UserPhotos == null || UserPhotos.length === 0) ? <div className="right-block">No photos for this user</div> :
            <div className="right-block">

                {
                    UserPhotos.map((image) => {
                        return (<div className="image-container" onClick={() => {
                            updatePhotoPage(image.id)
                        }} key={image.urls.regular}>
                            <img src={image.urls.regular} className="cover-images" />
                            <span>{image.description}<br /> Likes:{image.likes} </span>

                        </div>
                        )
                    })
                }
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <span class="page-link" aria-label="Previous" onClick={lastPage}>
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </span>
                        </li>
                        <li class="page-item"><span class="page-link" >{params.get("page")}</span></li>
                        <li class="page-item">
                            <span class="page-link" onClick={nextPage} aria-label="Next">
                                <span class="sr-only">Next</span>
                                <span aria-hidden="true">&raquo;</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        }


    </div>)
}
export default UserPhotos;