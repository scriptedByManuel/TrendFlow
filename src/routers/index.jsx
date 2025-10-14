import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Faq from "../pages/Faq";
import Contact from "../pages/Contact";
import ProductDetail from "../pages/ProductDetail";
import Categories from "../pages/Categories";
import CategoryProduct from "../pages/CategoryProduct";
import AccountLayout from "../pages/account/AccountLayout";
import PersonalInfo from "../pages/account/PersonalInfo";
import Security from "../pages/account/Security";
import Orders from "../pages/account/Orders";
import Address from "../pages/account/Address";
import Payment from "../pages/account/Payment";
import WishList from "../pages/WishList";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";



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
                path: "/about",
                element: <About />
            },
            {
                path: "/faq",
                element: <Faq />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/wishlist",
                element: <WishList />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/cart/checkout",
                element: <Checkout />
            },
            {
                path: "/cart/checkout/order-confirmation",
                element: <OrderConfirmation />
            },
            {
                path: "my-account",
                element: <AccountLayout />,
                children: [
                    {
                        path: "personal-information",
                        element: <PersonalInfo />
                    },
                    {
                        path: "security",
                        element: <Security />
                    },
                    {
                        path: "orders",
                        element: <Orders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "payment",
                        element: <Payment />
                    },
                ]
            }
        ]
    },
]);

export default router