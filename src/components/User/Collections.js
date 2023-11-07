import { useEffect, useState } from "react";
import ApiCalls from "../common/Api";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import './Photos.css';
import SidebarPrivate from "./SidebarPrivate";
const UserCollections = () => {
    const [UserCollections, setUserCollections] = useState(null);
    const [params, setParams] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "collections", params.get("page")).then((res) => {
            setUserCollections(res.data);
        }).catch(err => {
            alert(err);
        });
    }, [params.get("page")]);

    const viewCollection = (collection_id) => {
        navigate({
            pathname: "/view/collection",
            search: createSearchParams({
                user_name: params.get("user_name"),
                collection_id: collection_id
            }).toString()
        });
    }

    const newCollection = () => {
        if (title.length == 0) {
            alert("Add title");
        } else {
            if (description.length == 0) {
                apiService.createCollection(title);
            } else {
                apiService.createCollection(title, description);
            }
        }
        navigate({
            pathname: "/photos",
            search: createSearchParams({
                user_name: params.get("user_name"),
            }).toString()
        });
    }
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

        {(UserCollections == null || UserCollections.length == 0) ? <div className="right-block">
            <div className="collection-individual"  >
                <img className="cover-images" src="https://img.freepik.com/premium-vector/plus-icon-flat-design-template-vector_109161-2903.jpg" />
                <h4>Add new collection</h4>
                <input className="mr-sm-2 margin-right" type="search" placeholder="Title" aria-label="Search" value={title} onInput={e => { setTitle(e.target.value); }} />
                <br />
                <input className="mr-sm-2 margin-right" type="search" placeholder="Description" value={description} onInput={e => { setDescription(e.target.value); }} />

            </div>
        </div> :
            <div className="right-block">

                <div className="collection-container">
                    <div className="collection-individual"  >
                        <img className="cover-images" src="https://img.freepik.com/premium-vector/plus-icon-flat-design-template-vector_109161-2903.jpg" />
                        <h4>Add new collection</h4>
                        <input className="mr-sm-2 collection-input" type="search" placeholder="Title" value={title} onInput={e => { setTitle(e.target.value); }} />
                        <br />
                        <input className="mr-sm-2 collection-input" type="search" placeholder="Description" value={description} onInput={e => { setDescription(e.target.value); }} />
                        <br />
                        <button className="btn btn-primary" onClick={() => { newCollection() }}>Create new collection</button>
                    </div>
                    {
                        UserCollections.map((collection) => {
                            return <div className="collection-individual" key={collection.description} >
                                {collection.cover_photo == null ? <img className="cover-images" src="https://img.freepik.com/premium-photo/abstract-luxury-blur-dark-grey-black-gradient_1258-22100.jpg" /> : <img className="cover-images" src={collection.cover_photo.urls.regular} />}
                                <h4>{collection.title}</h4>
                                <button onClick={() => {
                                    viewCollection(collection.id);
                                }}>View Collection</button>
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

export default UserCollections;