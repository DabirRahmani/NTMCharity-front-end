import Alert from '@material-ui/lab/Alert'
import SingleEvent from './singleEvent'



const NeedReqRenderer = (props)=>{
    const createList=()=>{

        if(props.eventList !== undefined)
        if(props.eventList.length !== 0 )
        return props.eventList.map(e=>{return <SingleNeed 
            key={e.id}
            id={e.id}
            NeedReqid={e.id}
            username={e.creator_username}
            date={e.create_date}
            description={e.description}
            moneyNeed={e.money_Need}
            listofneeds={e.list_of_needs}
            donatedmoney={e.donated_money}
            
            />})

            return <Alert severity="info">there is no request!</Alert> 
        }

return <div>
        {createList()}
    </div>
}
export default NeedReqRenderer;