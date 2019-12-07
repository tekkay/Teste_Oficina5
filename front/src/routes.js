// core components/views for Admin layout
import Home from "views/Home/Home.jsx";

import posts from "views/posts/index.jsx";
import albums from "views/albums/index.jsx"
import users from "views/users/index.jsx"

const dashboardRoutes = [
  {
    path: "/posts",
    name: "Posts",
    component: posts,
    layout: "/admin"
  },
  {
    path: "/addPost",
    component: addPost,
    layout: "/admin"
  },
  {
    path: "/editPost/:id",
    name: "Editar Postd",
    component: editPost,
    layout: "/admin"
  },
  {
    path: "/viewPost/:id",
    name: "Visualizar Posts",
    component: viewPost,
    layout: "/admin"
  },
  
  {
    path: "/users",
    component: users,
    layout: "/admin"
  },
  {
    path: "/albums",
    component: albums,
    layout: "/admin"
  },
  

];

export default dashboardRoutes;