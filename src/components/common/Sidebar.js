import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { userPublic } from "./Commondata"
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const SidebarCommon = () => {
    const links = userPublic;
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    return (
        <List>
            {
                links.map((key) => {
                    return (
                        <ListItem disablePadding key={key.path}>
                            {/* <Link to={key.path}> */}
                            <ListItemButton onClick={() => {
                                navigate({
                                    pathname: key.path,
                                    search: createSearchParams({
                                        user_name: params.get("user_name"),
                                        page: 1
                                    }).toString()
                                });
                            }}>
                                <ListItemText primary={key.name} />
                            </ListItemButton>
                            {/* </Link> */}

                        </ListItem>
                    );
                })
            }
            {/* <div className="list-group">
            {
                links.map((key) => {
                    return <button type="button" className="list-group-item list-group-item-action" aria-current="true" onClick={() => { console.log(key.path) }}>{key["name"]}</button>
                })
            }
        </div> */}
        </List>

    )
}

export default SidebarCommon;