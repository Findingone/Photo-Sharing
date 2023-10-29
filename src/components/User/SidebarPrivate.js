import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { userPrivate } from "../common/Commondata";

const SidebarPrivate = () => {
    const links = userPrivate;
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

export default SidebarPrivate;