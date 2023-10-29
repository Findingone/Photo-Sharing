import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiCalls from "../common/Api";
import SidebarCommon from "../common/Sidebar";

const PublicStats = () => {
    const [params, setParams] = useSearchParams();
    const [PublicStats, setUserStats] = useState(null);
    const apiService = ApiCalls.getInstance();
    useEffect(() => {
        apiService.getCommonData(params.get("user_name"), "stats").then((res) => {
            setUserStats(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, [apiService, params])

    return <div className="master-container">
        <div className="left-block">
            <SidebarCommon />
        </div>
        {PublicStats == null ? <div className="right-block">Error! enter username and reload</div> :
            <div className="right-block flex">
                <div className="card stat-container">
                    <h3>Downloads</h3>
                    <div className="d-flex">
                        <div className="px-3">
                            <p className="small text-muted mb-1">Total</p>
                            <p className="mb-0">{PublicStats.downloads.total}</p>
                        </div>
                        <div className="px-3">
                            <p className="small text-muted mb-1">Average</p>
                            <p className="mb-0">{PublicStats.downloads.historical.average}</p>
                        </div>                    <div className="px-3">
                            <p className="small text-muted mb-1">Change</p>
                            <p className="mb-0">{PublicStats.downloads.historical.change}</p>
                        </div>
                    </div>
                </div>

                <br />

                <div className="card stat-container">
                    <h3>Views</h3>
                    <div className="d-flex">
                        <div className="px-3">
                            <p className="small text-muted mb-1">Total</p>
                            <p className="mb-0">{PublicStats.views.total}</p>
                        </div>
                        <div className="px-3">
                            <p className="small text-muted mb-1">Average</p>
                            <p className="mb-0">{PublicStats.views.historical.average}</p>
                        </div>                    <div className="px-3">
                            <p className="small text-muted mb-1">Change</p>
                            <p className="mb-0">{PublicStats.views.historical.change}</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default PublicStats;