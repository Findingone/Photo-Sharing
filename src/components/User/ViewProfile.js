import { useEffect, useState } from "react";
import ApiCalls from "../common/Api";

const ViewProfile = () => {
    const [profileContent, setProfileContent] = useState(null);
    const apiService = ApiCalls.getInstance();
    useEffect(() => {
        apiService.getUserProfile().then((res) => {
            setProfileContent(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, [apiService])
    const numericalData = {
        Photos: "total_photos",
        Likes: "total_likes",
        Collections: "total_collections",
        Followers: "followers_count",
        Downloads: "downloads"
    }

    return (<div>{profileContent == null ? <div>Loading</div> :
        <div className='card profile-container'>
            <p></p>
            <div className="d-flex pt-1">
                <img className='profile-image' src={profileContent.profile_image.large} />
                <div>
                    <h3>{profileContent.name}</h3>
                    <p>Username: {profileContent.username}</p>
                    {profileContent.for_hire && <div> <p className="small text-muted mb-1">For hire</p> </div>}
                    <p>{profileContent.bio}</p>
                </div>
            </div>
            <div className="d-flex pt-1">
                {
                    Object.keys(numericalData).map((key) => {
                        return (<div className="px-3">
                            <p className="small text-muted mb-1">{key}</p>
                            <p className="mb-0">{profileContent[numericalData[key]]}</p>
                        </div>)
                    })
                }

            </div>
            <br />
            <div className="d-flex pt-1">

                <div className="px-3">
                    <p className="small text-muted mb-1">Instagram</p>
                    {profileContent.instagram_username == null ? <p className="small text-muted mb-0">None</p> : <p className="mb-0">{profileContent.instagram_username}</p>}
                </div>
                <div className="px-3">
                    <p className="small text-muted mb-1">Twitter</p>
                    {profileContent.twitter_username == null ? <p className="small text-muted mb-0">None</p> : <p className="mb-0">{profileContent.twitter_username}</p>}
                </div>
            </div>
        </div >
    }
    </div >);
}

export default ViewProfile;