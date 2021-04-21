import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew = (event) =>{
    return async(dispatch , getState) =>{

        const{uid,name} = getState().auth;

        try {

            const resp = await fetchWithToken('events', event ,'POST');
            const body = await resp.json();

            console.log(body);


        if(body.ok){

            event.id = body.eventSave.id;
            event.user = {
                _id: uid,
                name: name
            }
            console.log(event);
            dispatch(eventAddNew( event ) );


        }
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error',error,'error');
            
        }



    }
}


 const eventAddNew = (event) =>({

    type: types.eventAddNew,
    payload: event

});

export const eventSetActive = (event) =>({

    type: types.eventSetActive,
    payload: event

});


export const eventCleanEvent = () =>({

    type: types.eventClearEvent,
})

export const eventUpdated = (event) =>({

    type: types.eventUpdated,
    payload: event


})


export const eventDelete = () =>({

    type:types.eventDelete
    

})

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchWithToken('events');
            const body = await resp.json();

            const events = prepareEvents( body.eventSave );

            console.log(events);


        //    dispatch( eventLoaded([]) )
            
        } catch (error) {
            console.log(error);
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})