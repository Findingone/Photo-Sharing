import { useEffect, useState } from "react";
import './Homepage.css';
import ApiCalls from "../common/Api";
import { useSearchParams } from "react-router-dom";
import { Dialog } from "@mui/material";

const HomePage = () => {
    const [AllPhotos, setPhotos] = useState(null);
    const [params, setParams] = useSearchParams();
    const apiService = ApiCalls.getInstance();
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [collectionId, setCollectionId] = useState();
    const handleClickToOpen = (image_id) => {
        setSelectedImage(image_id);
        setOpen(true);
    };

    const handleToClose = () => {
        setCollectionId("");
        setOpen(false);
    };

    const addToCollection = () => {
        apiService.addImageToCollection(collectionId, selectedImage).catch((err) => {
            alert(err);
        })
        setOpen(false);
    }

    useEffect(() => {
        if (params.get("page") == null) {
            setParams(params => {
                params.set("page", 1);
                return params;
            })
        }
        apiService.getHomePage(params.get("page")).then((res) => {
            setPhotos(res.data);
        })
    }, [apiService, params.get("page")]);

    const likePhoto = (photo_id, liked) => {
        apiService.likePhotos(photo_id, liked).catch((err) => {
            alert(err);
        });
        setPhotos(AllPhotos.map(photo => {
            if (photo.id == photo_id) {
                photo.liked_by_user = !photo.liked_by_user;
            }
            return photo;
        }))
    }

    const lastPage = () => {
        let page = parseInt(params.get("page"));
        if (page > 1) {
            setParams(params => {
                params.set("page", page - 1);
                return params;
            });
        }
    }
    const nextPage = () => {
        let page = parseInt(params.get("page"));
        setParams(params => {
            params.set("page", page + 1);
            return params;
        });
    }
    return <div className="master-container">
        <Dialog open={open} onClose={handleToClose} >
            <div className="dialog">
                Enter the collection id to add this image: &nbsp;
                <input value={collectionId} onChange={(event) => { setCollectionId(event.target.value) }}></input>
                <button onClick={addToCollection}> Add to collection</button>
            </div>
        </Dialog>
        {AllPhotos == null ? <div>Loading</div> : <div className="total-container">
            <div>
                {
                    AllPhotos.map((image) => {
                        return (<div className="image-container" key={image.id} >
                            <img src={image.urls.regular} className="cover-images" />
                            {image.liked_by_user ? <div onClick={() => { likePhoto(image.id, image.liked_by_user) }}> Unlike</div> : <div onClick={() => { likePhoto(image.id, image.liked_by_user) }}> Like</div>}
                            <button onClick={() => { handleClickToOpen(image.id) }}>Add image to collection</button>
                            <br />
                            <span className="text-cover" > {image.description}<br /> Likes:{image.likes} </span>
                        </div>
                        )
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
        </div>
        }

    </div>
}

export default HomePage;