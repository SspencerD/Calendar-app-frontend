import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDelete } from '../../actions/events';

export const DeleteEventFab = () => {

const dispatch = useDispatch();

    const handleDelete = () =>{

        dispatch(eventDelete());

    }


    return (

      
            <button
            onClick={handleDelete}
        className="btn btn-outline-danger fab-danger"

        >
            <i className="fas fa-trash"></i>
            <span>  Borrar evento </span>
            
        </button>


        
    )
}
