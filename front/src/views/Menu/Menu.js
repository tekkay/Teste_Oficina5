// @material-ui/icons
import {Dashboard, Person, LocationOn, Assessment, FormatListBulleted, List}
from "@material-ui/icons";
// core components/views for Admin layout
import users from "views/users/index.jsx";
import albums from "views/albums/index.jsx"
import posts from "views/albums/index.jsx"


const dashboardRoutes = [
  {
    path: "/users",
    name: "Users",
    icon: Dashboard,
    component: users,
    layout: "/admin"
  },
  {
    path: "/albums",
    name: "Albums",
    icon: LocationOn,
    component: albums,
    layout: "/admin"
  },
  {
    path: "/posts",
    name: "Posts",
    icon: FormatListBulleted,
    component: posts,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;
