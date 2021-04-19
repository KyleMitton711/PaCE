// User Auth
import Login from "@/views/pace-auth/Login";
import Register from "@/views/pace-auth/Register";
import ResetPassword from "@/views/pace-auth/ResetPassword";
import NewPassword from "@/views/pace-auth/NewPassword";
// User Main
import Greeting from "@/views/pace-main/Greeting";
import Search from "@/views/pace-main/Search";
import Test from "@/views/pace-main/Test";

// Admin Auth
import AdminLogin from "@/views/pace-admin/auth/AdminLogin";
import AdminProjects from "@/views/pace-admin/main/AdminProjects";
import AdminResources from "@/views/pace-admin/main/AdminResources";

// layout
import Adminlayout from "@/layouts/full-layout/Adminlayout";
import Blanklayout from "@/layouts/blank-layout/Blanklayout";
import Searchlayout from "@/layouts/blank-layout/Searchlayout";
import Greetinglayout from "@/layouts/blank-layout/Greetinglayout";

export const routes = [
    {
        path: "/",
        redirect: "/",
        component: Greetinglayout,
        children: [
            {
                name: "Greeting",
                path: "/",
                component: Greeting
            },
        ]
    },

    {
        path: "/",
        component: Blanklayout,
        children: [
            {
                name: "Search",
                path: "search",
                component: Search
            },
            {
                name: "Test",
                path: "test",
                component: Test
            },
        ]
    },

    {
        path: "/auth",
        redirect: "auth/login",
        component: Blanklayout,
        children: [
            {
                name: "Login",
                path: "login",
                component: Login
            },
            {
                name: "Register",
                path: "register",
                component: Register
            },
            {
                name: "ResetPassword",
                path: "resetpassword",
                component: ResetPassword
            },
            {
                name: "NewPassword",
                path: "newpassword",
                component: NewPassword
            },
        ]
    },

    {
        path: "/admin/auth",
        redirect: "admin/auth/login",
        component: Blanklayout,
        children: [
            {
                name: "AdminLogin",
                path: "login",
                component: AdminLogin
            }
        ]
    },

    {
        path: "/admin",
        redirect: "admin/projects",
        component: Adminlayout,
        children: [
            {
                name: "AdminProjects",
                path: "projects",
                component: AdminProjects
            },
            {
                name: "AdminResources",
                path: "resources",
                component: AdminResources
            }
        ]
    },
];
