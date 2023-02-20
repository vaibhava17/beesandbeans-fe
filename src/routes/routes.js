import { lazy } from "react";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
const Home = lazy(() => import("pages/Common/Home"));
const Contact = lazy(() => import("pages/Common/Contact"));
const Blog = lazy(() => import("pages/Blogs/Blog"));
const Blogs = lazy(() => import("pages/Blogs/BlogsList"));
const Products = lazy(() => import("pages/Products/AllProducts"));
const ProductDetails = lazy(() => import("pages/Products/ProductDetails"));
// const ProductsByCategory = lazy(() => import("pages/Products/ProductsByCategory"));
const FAQs = lazy(() => import("pages/Common/FAQs"));
const Profile = lazy(() => import("pages/Profile/Profile"));

const Login = lazy(() => import("pages/Auth/Login"));

const PageNotFound = lazy(() => import("pages/Other/PageNotFound"));

export const PublicRoutes = [
  {
    path: "/",
    exact: true,
    Component: Home,
    Navbar: Navbar,
    Footer: Footer,
  },
  {
    path: "/contact",
    Component: Contact,
    Navbar: () => {
      return <Navbar bg={true} />;
    },
    Footer: Footer,
  },
  {
    path: "/faqs",
    Component: FAQs,
    Navbar: () => {
      return <Navbar bg={true} />;
    },
    Footer: Footer,
  },
  {
    path: "/blogs/:id",
    Component: Blog,
    Navbar: Navbar,
    Footer: Footer,
  },
  {
    path: "/blogs",
    Component: Blogs,
    Navbar: () => {
      return <Navbar bg={true} />;
    },
    Footer: Footer,
  },
  {
    path: "/products",
    Component: Products,
    Navbar: () => {
      return <Navbar bg={true} />;
    },
    Footer: Footer,
  },
  {
    path: "/products/:id",
    Component: ProductDetails,
    Navbar: () => {
      return <Navbar bg={true} />;
    },
    Footer: Footer,
  },
  // {
  //   path: "/products/category/:id",
  //   Component: ProductsByCategory,
  //   Navbar: () => {
  //     return <Navbar bg={true} />;
  //   },
  //   Footer: Footer,
  // },
  {
    path: "/login",
    Component: Login,
    Navbar: () => {
      return <Navbar color={true} />;
    },
  },
  {
    path: "/profile",
    Component: Profile,
    Navbar: () => {
      return <Navbar bg />;
    }
  },
  {
    path: "/*",
    Component: PageNotFound,
    Navbar: () => {
      return <Navbar bg={true} />;
    },
  },
];