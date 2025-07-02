import Login from "./views/Login.js";
import Dashboard from "./views/dashboard/Index.js";
import Books from "./views/dashboard/Books.js";
import AddEditBook from "./views/dashboard/AddEditBook.js";
import Loans from "./views/dashboard/Loans.js";
import History from "./views/dashboard/History.js";
import Users from "./views/dashboard/Users.js";
import AddUser from "./views/dashboard/AddUser.js";
var routes = [
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: <Login />,
        layout: "/auth",
    },

    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Dashboard,
        layout: "/dashboard",
    },
    {
        path: "/books",
        name: "Books",
        icon: "ni ni-book-bookmark text-primary",
        component: Books,
        layout: "/dashboard",
    },
    {
        path: "/addEditBook/:bookId",
        name: "Add Edit Book",
        icon: "ni ni-book-bookmark text-primary",
        component: AddEditBook,
        layout: "/dashboard",
    },
    {
        path: "/loans",
        name: "Loans",
        icon: "ni ni-book-bookmark text-primary",
        component: Loans,
        layout: "/dashboard",
    },
    {
        path: "/history",
        name: "History",
        icon: "ni ni-book-bookmark text-primary",
        component: History,
        layout: "/dashboard",
    },
    {
        path: "/users",
        name: "Users",
        icon: "ni ni-book-bookmark text-primary",
        component: Users,
        layout: "/dashboard",
    },
    {
        path: "/addUser",
        name: "Add User",
        icon: "ni ni-book-bookmark text-primary",
        component: AddUser,
        layout: "/dashboard",
    },
]

export default routes;  