import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import ApiCalls from "../common/Api";

const ViewCollection = () => {
    const [params, setParams] = useSearchParams();
    const [collectionData, setCollectionData] = useState();
    const [collectionPhotos, setCollectionPhotos] = useState();
    const [collection_id, setCollectionId] = useState();
    const apiService = ApiCalls.getInstance();
    const navigate = useNavigate();
    useEffect(() => {
        setCollectionId(params.get("collection_id"))
        apiService.getCollectionPhotos(params.get("collection_id")).then((res) => {
            setCollectionPhotos(res.data);
        }).catch((err) => {
            alert(err);
        });

        apiService.getCollectionData(params.get("collection_id")).then((res) => {
            setCollectionData(res.data);
        }).catch((err) => {
            alert(err);
        });

    }, [params, apiService])
    const removeImage = (photo_id) => {
        apiService.removeImageFromCollection(collection_id, photo_id);
    }
    const deletecollection = () => {
        apiService.deleteCollection(collection_id);
        navigate({
            pathname: "/collections",
            search: createSearchParams({
                user_name: params.get("user_name"),
                page: 1
            }).toString()
        });
    }


    return (<div className="master-container">
        <div className="left-block">
            {collectionData == null ? <div></div> : <div>
                Id: {collectionData.id}
                <br />
                Title: {collectionData.title}
                <br />
                Total photos: {collectionData.total_photos}
                <br />


                {collectionData.description}
                <br />
                Published at: {collectionData.published_at}
                <br />
                Updated at: {collectionData.updated_at}
                <br />
                Share key: {collectionData.share_key}
            </div>}

            <br />
            <button className="btn btn-danger" onClick={() => { deletecollection() }}>Remove collection</button>
        </div>


        {(collectionPhotos == null || collectionPhotos.length === 0) ? <div className="right-block">No photos for this user</div> :
            <div className="right-block">

                {
                    collectionPhotos.map((image) => {
                        return (<div className="image-container" key={image.urls.regular}>
                            <img src={image.urls.regular} className="cover-images" />
                            <span>{image.description}<br /> Likes:{image.likes} </span>
                            <br />
                            <button className="btn btn-danger" onClick={() => { removeImage(image.id) }}>Remove from collection</button>
                        </div>
                        )
                    })
                }
            </div>
        }
    </div>
    )
}

export default ViewCollection;