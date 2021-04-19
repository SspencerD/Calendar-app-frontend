import { types } from "../types/types";



export const eventAddNew = (event) =>({

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