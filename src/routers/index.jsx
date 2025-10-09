import {
    createBrowserRouter,
    useLocation,
} from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Faq from "../pages/Faq";
import Contact from "../pages/Contact";
import ProductDetail from "../pages/ProductDetail";
import Categories from "../pages/Categories";
import CategoryProduct from "../pages/CategoryProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/categories",
                element: <Categories />
            },
            {
                path: "/categories/:title",
                element: <CategoryProduct />
            },
            {
                path: `/categories/:title/:id`,
                element: <ProductDetail />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/products/:id",
                element: <ProductDetail />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "faq",
                element: <Faq />
            },
            {
                path: "contact",
                element: <Contact />
            }
        ]
    },
]);

export default router