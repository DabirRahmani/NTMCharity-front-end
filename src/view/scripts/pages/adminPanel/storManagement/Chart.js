import { useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';


const Chart =(probs)=>
{

    console.log(probs.type, probs.id)

    const [onFocused, setOnFocused] = useState("")

    const colors =["#FF3333","#7533FF","#2BD139","#FF8B1E", "#2CEECA"]

    const [data, setdata]= useState([
        { title: 'One', value: 10, color: colors[0],key:"ss", },
        { title: 'Two', value: 15, color: colors[1],key:"ddd" },
        { title: 'Three', value: 20, color: colors[2] , key:"dddd"},
        { title: 'other', value: 5, color: colors[3] , key:"ddddd"},
    ])

    useEffect(()=>{
        console.log("sallam")
    },[probs.id, probs.type])

    return <div>
        <div style={{ width:"100%"}}>
        <PieChart
            label={({ dataEntry }) => {if (dataEntry.title === "other") return dataEntry.title}}
            onMouseOver={(e) => setOnFocused(e.target.innerHTML.replace(/<\/?title>/g,''))}
            onMouseOut={e=> setOnFocused("")}
            animate={true}
            data={data}
            />
        </div>


        <div>{onFocused}</div>
    </div>
}


export default Chart;