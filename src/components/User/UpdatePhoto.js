import { useEffect, useState } from "react";
import './updatePhotos.css';
import { useNavigate } from "react-router-dom";
import ApiCalls from "../common/Api";
const UpdatePhoto = () => {
    const navigate = useNavigate();
    const photo_id = new URL(window.location).searchParams.get('photo_id');
    const [photo, setPhoto] = useState(null);
    var data = { location: {}, exif: {} };
    const apiService = ApiCalls.getInstance();

    useEffect(() => {
        if (photo_id != null) {
            apiService.getPhoto(photo_id).then((res) => {
                setPhoto(res.data);
            })
        }
    }, []);

    const postForm = () => {
        apiService.updatePhoto(photo_id, data);
        navigate("/home");
    };

    function handleChange(e) {
        switch (e.target.id) {
            case ('longitude'):
                data.location.longitude = e.target.value
                break;
            case ('latitude'):
                data.location.latitude = e.target.value
                break;
            case ('name'):
                data.location.name = e.target.value
                break;
            case ('city'):
                data.location.city = e.target.value
                break;
            case ('country'):
                data.location.country = e.target.value
                break;

            case ('make'):
                data.exif.make = e.target.value
                break;
            case ('model'):
                data.exif.model = e.target.value
                break;
            case ('exposure'):
                data.exif.exposure_time = e.target.value
                break;
            case ('aperture'):
                data.exif.aperture_value = e.target.value
                break;
            case ('focal'):
                data.exif.focal_length = e.target.value
                break;
            case ('iso'):
                data.exif.iso_speed_ratings = e.target.value
                break;
            default:
                data[e.target.id] = e.target.value

        }
    }




    return (<div>
        {photo == null ? <div>Loading</div> :
            <div id="update-photo-container">
                <img id="complete-photo" src={photo.urls.full} />
                <div id="details" >
                    <form>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="description" onChange={handleChange} defaultValue={photo.description} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Show on profile</label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="show_on_profile" onChange={handleChange} defaultValue={photo.show_on_profile} />
                                </div>
                            </div>


                            <div className="col">
                                <label className="col-sm-2 col-form-label">Location (latitude): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="latitude" onChange={handleChange} defaultValue={photo.location.position.latitude} />
                                </div>
                            </div>

                            <div className="col">
                                <label className="col-sm-2 col-form-label">Location (longitude): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="longitude" onChange={handleChange} defaultValue={photo.location.position.longitude} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Location (name): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="name" onChange={handleChange} defaultValue={photo.location.name} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Location (City): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="city" onChange={handleChange} defaultValue={photo.location.city} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Location (Country): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="country" onChange={handleChange} defaultValue={photo.location.country} />
                                </div>
                            </div>


                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Exif (make): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="make" onChange={handleChange} defaultValue={photo.exif.make} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Exif (model): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="model" onChange={handleChange} defaultValue={photo.exif.model} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Exif (exposure_time): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="exposure" onChange={handleChange} defaultValue={photo.exif.exposure_time} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Exif (aperture value): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="aperture" onChange={handleChange} defaultValue={photo.exif.aperture} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Exif (focal length): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="focal" onChange={handleChange} defaultValue={photo.exif.focal_length} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Exif (iso speed ratings): </label>
                                <div className="col-sm-10">
                                    <input type="text-area" className="form-control" id="iso" onChange={handleChange} defaultValue={photo.exif.iso} />
                                </div>
                            </div>



                        </div>
                    </form>
                    <br />
                    <button onClick={postForm} className="btn btn-secondary">Save changes</button>

                </div>
            </div>
        }
    </div>);
}

export default UpdatePhoto;