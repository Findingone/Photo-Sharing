import { useSearchParams } from "react-router-dom";
import ApiCalls from "../common/Api";
import { useEffect, useState } from "react";
import SidebarCommon from "../common/Sidebar";
import "./UserPhotos.css";
const PublicPhotos = () => {
    const [params, setParams] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    const [PublicPhotos, setUserPhotos] = useState(null);
    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "photos", params.get("page")).then((res) => {
            setUserPhotos(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, [params.get("page"), apiService]);

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
        {(PublicPhotos == null || PublicPhotos.length === 0) ? <div className="right-block">No photos for this user</div> :
            <div className="right-block">

                {
                    PublicPhotos.map((image) => {
                        return (<div className="image-container" key={image.urls.regular}>
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
export default PublicPhotos;