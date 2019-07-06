import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/header";
import MenCollection from "./pages/mens-page";
import WomensCollection from "./pages/womens-page";
import FootWearCollection from "./pages/footwears-page";
import LandingPage from "./pages/landing-page";

import AdminLogin from "./pages/admin/login";
import AdminSignUp from "./pages/admin/signup";
import DeleteProducts from "./pages/admin/deleteProduct";
import HeaderAdmin from "./pages/admin/header";
import AddProducts from "./pages/admin/addProduct";
import UpdateProducts from "./pages/admin/updateProducts";
import Admin from "./pages/admin";
import ProductsPage from "./pages/products";

const MemberRoutes = () => (
  <>
    <HeaderAdmin />
    <Route path="/admin/deleteProducts" component={DeleteProducts} />
    <Route path="/admin/addProducts" component={AddProducts} />
    <Route path="/admin/updateProducts" component={UpdateProducts} />
  </>
);

export default function Routerr() {
  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/men" component={MenCollection} />
        <Route path="/admin" component={MemberRoutes} />
        <Route path="/login" component={AdminLogin} />
        <Route path="/signup" component={AdminSignUp} />
        <Route path="/logAdmin" component={Admin} />
        <Route path="/women" component={WomensCollection} />
        <Route path="/footwears" component={FootWearCollection} />
        <Route exact path="/products/:productId" component={ProductsPage} />
        {/* <Route exact path='/signup' component={SignUp} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/account' component={Account} />
                {/* <Route exact path = '/games' component = {Games}/> */}
        {/* <Route exact path='/lotto' component={Lotto} /> */}
        {/* <Route exact path='/confirmEmail' component={ConfirmEmail} /> */}
        {/* <Route exact path='/checkResults' component={Result} /> */}

        {/* <Route exact path = "/club/editClub" render ={(props) => <EditClub {...props}/>}/> */}
      </div>
    </Router>
  );
}
