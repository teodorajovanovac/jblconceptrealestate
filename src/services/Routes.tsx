import { Routes, Route } from "react-router-dom";

//List all pages
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
import PricingPage from "../pages/PricingPage";
import ServicesPage from "../pages/ServicesPage";
import TermsPage from "../pages/TermsPage";
import RealEstatePage from "../pages/RealEstatePage";
import PropertyPage from '../pages/PropertyPage'
import AboutUsPage from "../pages/AboutUsPage";
import AgentPage from "../pages/AgentPage";
import ContactPage from '../pages/ContactPage'
import LoginPage from '../pages/LoginPage'
import AdminDashboardPage from '../pages/AdminDashboardPage'
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";



const AppRoutes = () => {
    //const auth = UseAuth();
    //const auth = ..;
    // if (!auth) {
    //     // Handle the case when auth is undefined (optional)
    //     return <div>UNAUTHORIZED</div>;
    // }  
    //const { token, project } = auth;
    const token = '';

  return (
    
    <Routes>
      
      {/* Public routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/service" element={<ServicesPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/properties" element={<RealEstatePage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/about-us/:id" element={<AgentPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      {/* Admin routes */}
      <Route element={<LayoutAdmin />}>
        <Route path="/promeni" element={<LoginPage />} />
        <Route path="/promeni/login" element={<LoginPage />} />
        <Route path="/promeni/dashboard" element={<AdminDashboardPage />} />
      </Route>
      
      {/* Routes for non-authenticated users */}
      {!token && (
        <Route path="/login" element={<LandingPage />} />
      )}
      
      {/* Routes for authenticated users */}
      {token && (
        <Route path="/login" element={<LandingPage />} />
      )}
      
      {/* Catch-all route for non-existing routes */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;