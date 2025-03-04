import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "liststaff",
        component: () => import("@/views/ListStaff.vue"),
    },
    {
        path: "/staff/new",
        name: "createstaff",
        component: () => import("@/views/CreateStaff.vue"),
    },
    {
        path: "/staff/:id",
        name: "editstaff",
        component: () => import("@/views/EditStaff.vue"),
    },
    {
        path: "/products",
        name: "products",
        component: () => import("@/views/ListProduct.vue"),
    },
    {
        path: "/product/new",
        name: "createproduct",
        component: () => import("@/views/CreateProduct.vue"),
    },
    {
        path: "/product:id",
        name: "editproduct",
        component: () => import("@/views/EditProduct.vue"),
    },
    {
        path: "/categories",
        name: "categories",
        component: () => import("@/views/ListCategory.vue"),
    },
    {
        path: "/category/new",
        name: "createcategory",
        component: () => import("@/views/CreateCategory.vue"),
    },
    {
        path: "/shifts",
        name: "shifts",
        component: () => import("@/views/ListShift.vue"),
    },
    {
        path: "/shift/new",
        name: "createshift",
        component: () => import("@/views/CreateShift.vue"),
    },
    {
        path: "/shift/:id",
        name: "editshift",
        component: () => import("@/views/EditShift.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;