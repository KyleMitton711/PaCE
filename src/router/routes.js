// User Auth
import Login from "@/views/pace-auth/Login";
import Register from "@/views/pace-auth/Register";
import ResetPassword from "@/views/pace-auth/ResetPassword";
import NewPassword from "@/views/pace-auth/NewPassword";
// User Main
import Greeting from "@/views/pace-main/Greeting";
import Search from "@/views/pace-main/Search";
import Resources from "@/views/pace-main/Resources";
import Test from "@/views/pace-main/Test";

// Admin Auth
import AdminLogin from "@/views/pace-admin/auth/AdminLogin";
import AdminProjects from "@/views/pace-admin/main/AdminProjects";
import AdminResources from "@/views/pace-admin/main/AdminResources";
import AdminPrograms from "@/views/pace-admin/main/AdminPrograms";
import AdminTags from "@/views/pace-admin/main/AdminTags";
import AdminUsers from "@/views/pace-admin/main/AdminUsers";
import AdminUserMetrics from "@/views/pace-admin/main/AdminUserMetrics";

// layout
import Adminlayout from "@/layouts/full-layout/Adminlayout";
import Blanklayout from "@/layouts/blank-layout/Blanklayout";
import Authlayout from "@/layouts/blank-layout/Authlayout";
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
                component: Greeting,
                meta: {
                    publicRoute: true
                }
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
                component: Search,
                meta: {
                    publicRoute: true
                }
            },
            {
                name: "Resources",
                path: "resources",
                component: Resources,
                meta: {
                    publicRoute: true
                }
            }
        ]
    },

    {
        path: "/auth",
        redirect: "auth/login",
        component: Blanklayout,
        children: [
            // {
            //     name: "Login",
            //     path: "login",
            //     component: Login,
            //     meta: {
            //         publicRoute: true
            //     }
            // },
            // {
            //     name: "Register",
            //     path: "register",
            //     component: Register,
            //     meta: {
            //         publicRoute: true
            //     }
            // },
            // {
            //     name: "ResetPassword",
            //     path: "resetpassword",
            //     component: ResetPassword,
            //     meta: {
            //         publicRoute: true
            //     }
            // },
            {
                name: "NewPassword",
                path: "newpassword",
                component: NewPassword,
                meta: {
                    publicRoute: true
                }
            },
        ]
    },

    {
        path: "/admin/auth",
        redirect: "admin/auth/login",
        component: Authlayout,
        children: [
            {
                name: "AdminLogin",
                path: "login",
                component: AdminLogin,
                meta: {
                    publicRoute: true
                }
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
            },
            {
                name: "AdminPrograms",
                path: "programs",
                component: AdminPrograms
            },
            {
                name: "AdminTags",
                path: "tags/:tagType",
                component: AdminTags
            },
            {
                name: "AdminUsers",
                path: "users",
                component: AdminUsers
            },
            {
                name: "AdminUserMetrics",
                path: "usermetrics",
                component: AdminUserMetrics
            }
        ]
    },
];
