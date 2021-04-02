// User Auth
import Login from "@/views/pace-auth/Login";
import Register from "@/views/pace-auth/Register";
import ResetPassword from "@/views/pace-auth/ResetPassword";
import NewPassword from "@/views/pace-auth/NewPassword";
// Admin Auth
import AdminLogin from "@/views/pace-admin/auth/AdminLogin";

// layout
import Layout from "@/layouts/full-layout/Layout";
import Blanklayout from "@/layouts/blank-layout/Blanklayout";

export const routes = [
    { path: "/", redirect: "/admin/auth/login" },

    {
        path: "/auth",
        redirect: "login",
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
        redirect: "login",
        component: Blanklayout,
        children: [
            {
                name: "AdminLogin",
                path: "login",
                component: AdminLogin
            }
        ]
    }
];
