import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from "../../actions/auth";
import { LoginPage } from '../auth/LoginPage';
import { RegisterPage } from '../auth/RegisterPage';
import { CalendarPage } from "../calendar/CalendarPage";
import { Loading } from "../ui/Loading";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {


    const dispatch = useDispatch();
    const {checking, uid } = useSelector(state => state.auth)

    useEffect(() => {

        dispatch(startChecking());
       
    }, [dispatch])


    if(checking){
      return(
        
         <Loading/>
      )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginPage}
                        isAuth={!!uid}
                         />


                    <PublicRoute
                        exact
                        path="/register"
                        component={RegisterPage}
                        isAuth={!!uid}
                        />



                    <PrivateRoutes
                        exact
                        path="/"
                        component={CalendarPage}
                        isAuth={!!uid}
                        />

                        <Redirect to="/" />

                </Switch>
            </div>
        </Router>

    )
}
