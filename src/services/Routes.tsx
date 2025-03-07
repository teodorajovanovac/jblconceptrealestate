import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";

//List all pages
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
import Test from "../pages/Test";
import PricingPage from "../pages/PricingPage";
import ServicesPage from "../pages/ServicesPage";
import TermsPage from "../pages/TermsPage";
import RealEstatePage from "../pages/RealEstatePage";
import PropertyPage from '../pages/PropertyPage'
import AboutUsPage from "../pages/AboutUsPage";
import AgentPage from "../pages/AgentPage";
import ContactPage from '../pages/ContactPage'


const AppRoutes = () => {
    //const auth = UseAuth();
    //const auth = ..;
    // if (!auth) {
    //     // Handle the case when auth is undefined (optional)
    //     return <div>UNAUTHORIZED</div>;
    // }  
    //const { token, project } = auth;
    const token = '';

  // Define public routes accessible to public
  const routesForPublic = [
    {
      path: "/",
    //   element: <StartLayout autoshowLogin={false}/>,
      element: <LandingPage/>
    },
    {
      path: "/service",
      element: <ServicesPage />,
    },
    {
      path: "/about-us",
      element: <AboutUsPage />,
    },
    {
      path: "/landing",
      element: <LandingPage/>,
    },
    {
      path: "/pricing",
      element: <PricingPage />,
    },
    {
      path: "/terms",
      element: <TermsPage />,
    },
    {
      path: "/properties",
      element: <RealEstatePage />,
    },
    {
      path: "/property/:id",
      element: <PropertyPage />,
    },
    {
      path: "/about-us/:id",
      element: <AgentPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/test",
      element: <Test />,
    },
  ];


  // Define routes accessible only to non-authenticated users - Landing Page, Login page, LogOut page, Error Login...
  const routesForNotAuthenticatedOnly = [
   
    {
      path: "/login",
    //   element:  <StartLayout autoshowLogin={true}/>,
      element: <LandingPage/>
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
   
    {
      path: "/login",
      element: <LandingPage/>,
    },
  ];

   // Define routes for non existing routes
   const routesForNonExisting = [
    {
        path: "*",
        element: <ErrorPage/>
    }
   ]

// Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    ...routesForNonExisting
  ]);
  
  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
}

export default AppRoutes;