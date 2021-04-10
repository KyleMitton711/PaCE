// User Auth
import Login from "@/views/pace-auth/Login";
import Register from "@/views/pace-auth/Register";
import ResetPassword from "@/views/pace-auth/ResetPassword";
import NewPassword from "@/views/pace-auth/NewPassword";
// User Main
import Greeting from "@/views/pace-main/Greeting";
import Search from "@/views/pace-main/Search";
import Test from "@/views/pace-main/Test";
import Resources from "@/views/pace-resources/pace-resources";

// Admin Auth
import AdminLogin from "@/views/pace-admin/auth/AdminLogin";

// layout
import Layout from "@/layouts/full-layout/Layout";
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
        path: "/resources",
        component: Blanklayout,
        children: [
            {
                name: "Resources",
                path: "/",
                component: Resources
            }
        ]
    },
];
