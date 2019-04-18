import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header'
import MenCollection from './pages/men-collection';
import LandingPage from './pages/landing-page';


import Operations from './pages/admin/operations';

export default function Routerr() {
    return (
        <Router>
            <div>
                <Header />
                <Route exact path="/" component={LandingPage} />
                <Route exact path='/men-collection' component={MenCollection} />
                <Route exact path='/admin/operations' component={Operations} />
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
    )
}