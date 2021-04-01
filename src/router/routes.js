import Login from "@/views/pace-auth/Login";

// layout
import Layout from "@/layouts/full-layout/Layout";
import Blanklayout from "@/layouts/blank-layout/Blanklayout";

export const routes = [
    { path: "/", redirect: "/auth/login" },

    {
        path: "/auth",
        redirect: "login",
        component: Blanklayout,
        children: [
            {
                name: "Login",
                path: "login",
                component: Login
            }
        ]
    }
];
