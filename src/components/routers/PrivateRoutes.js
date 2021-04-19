import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';


export const PrivateRoutes = ({
    isAuth,
    component:Component,
    ...rest
}) => {

    localStorage.setItem('lastPath', rest.location.pathname);


//verifica si esta autentificado , si no esta auntentificado,
// no carga nada , solo redireciona al login
    return (
        <Route { ...rest }
        component={ (props) => (
                ( isAuth )
                ? ( <Component {...props} /> )
                : (<Redirect to="/login"/> )

            )}
        />
    )
}

// validamos las variables 
PrivateRoutes.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
