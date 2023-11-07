import { useEffect, useState } from "react";
import ApiCalls from "../common/Api";
import { useSearchParams } from "react-router-dom";
import SidebarCommon from "../common/Sidebar";
import './UserPhotos.css';
const PublicCollections = () => {
    const [PublicCollections, setUserCollections] = useState(null);
    const [params, setParams] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "collections", params.get("page")).then((res) => {
            setUserCollections(res.data);
        }).catch(err => {
            alert(err);
        });
    }, [params.get("page")]);

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

        {(PublicCollections == null || PublicCollections.length == 0) ? <div className="right-block">No collections for this user</div> :
            <div className="right-block">
                <div className="collection-container">
                    {
                        PublicCollections.map((collection) => {
                            return <div className="collection-individual" key={collection.cover_photo.urls.regular}>
                                <img className="cover-images" src={collection.cover_photo.urls.regular} key={collection.cover_photo.urls.regular} />
                                <h4>{collection.title}</h4>
                                <p className="text-muted">{collection.description}</p>
                                <p className="text-muted"> {collection.total_photos} photos </p>
                            </div>
                        })
                    }
                </div>
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
            </div >
        }
    </div >)
}

export default PublicCollections;