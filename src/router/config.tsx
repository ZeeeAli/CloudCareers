
import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/page";
import Jobs from "../pages/jobs/page";
import Companies from "../pages/companies/page";
import About from "../pages/about/page";
import CareerResources from "../pages/career-resources/page";
import Contact from "../pages/contact/page";
import Blog from "../pages/blog/page";
import JobDetails from "../pages/job-details/page";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ArticleDetail from "../pages/career-resources/ArticleDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/job/:id",
    element: <JobDetails />,
  },
  {
    path: "/companies",
    element: <Companies />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/career-resources",
    element: <CareerResources />,
  },
  {
    path: "/career-resources/article/:id",
    element: <ArticleDetail />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
];

export default routes;
