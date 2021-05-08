import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateClass from "../components/CreateClass";
import Dashboard from "../components/Dashboard";
import DetailClass from "../components/DetailClass";
import JoinClass from "../components/JoinClass";
import NotFound from "../components/NotFound";

function RouterURL(props) {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/class" component={Dashboard} />
            <Route exact path="/class/malop" component={DetailClass} />
            <Route exact path="/class/joinclass" component={JoinClass} />
            <Route exact path="/class/createclass" component={CreateClass} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default RouterURL;
