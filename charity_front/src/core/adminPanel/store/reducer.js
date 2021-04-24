
export default function reducer(state=[], action)
{
    switch(action.type)
    {
        case "ADD_EVENT":
            {
                return [...state, {
                    eventid:action.payload.eventid,
                    title:action.payload.title, 
                    description:action.payload.description, 
                    creator:action.payload.creator,
                    enabled:action.payload.enabled,
                    date:action.payload.date,
                    status:action.payload.status,
                    imageurl:action.payload.imageurl,
                    listofneeds:action.payload.listofneeds,
                }] ;
            }

        case "DELETE_EVENT":
            {
                return state.filter(n=> n.eventid !== action.payload.eventid);
            }

        case "RESET":
            {
                return []
            }

        default:{}
    }
}
 