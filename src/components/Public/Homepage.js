import { useEffect, useState } from "react";
import './Homepage.css';
import ApiCalls from "../common/Api";

const HomePage = () => {
    const [AllPhotos, setPhotos] = useState(null);
    const apiService = ApiCalls.getInstance();
    useEffect(() => {
        apiService.getHomePage().then((res) => {
            setPhotos(res.data);
        })
    }, [apiService]);

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
    return <div className="master-container">
        {AllPhotos == null ? <div>Loading</div> : <div className="d-flex total-container">
            <div>
                {
                    AllPhotos.map((image) => {
                        return (<div className="image-container" key={image.id} >
                            <img src={image.urls.regular} className="cover-images" />
                            {image.liked_by_user ? <div onClick={() => { likePhoto(image.id, image.liked_by_user) }}> Unlike</div> : <div onClick={() => { likePhoto(image.id, image.liked_by_user) }}> Like</div>}
                            <span className="text-cover" > {image.description}<br /> Likes:{image.likes} </span>
                        </div>
                        )
                    })
                }
            </div>
        </div>
        }

    </div>
}

export default HomePage;