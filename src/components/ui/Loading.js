import React from 'react';
import '../styles/components/loader.css';

export const Loading = () => {
    return (
        <div className="content">
            <img src={process.env.PUBLIC_URL + 'assets/images/loader.gif'} alt="algo"/>
            
        </div>
    )
}
