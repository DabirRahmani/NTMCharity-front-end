import Alert from '@material-ui/lab/Alert'
import SingleEvent from './singleEvent'



const EventRenderer = (props)=>{
    const createList=()=>{

        if(props.eventList !== undefined)
        if(props.eventList.length !== 0 )
        return props.eventList.map(e=>{return <SingleEvent 
            key={e.id}
            id={e.id}
            eventid={e.id}
            title={e.title}
            username={e.creator_username}
            imageurl={e.image_url}
            date={e.create_date}
            description={e.description}
            moneytarget={e.money_target}
            listofneeds={e.list_of_needs}
            donatedmoney={e.donated_money}
            
            />})

            return <Alert severity="info" style={{fontFamily:"Mate SC"}}>there is no request!</Alert> 
        }

return <div>
        {createList()}
    </div>
}
export default EventRenderer;