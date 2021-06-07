import { useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';


const Chart =()=>{

    const [text,settext] = useState("")
    const [data, setdata]= useState([
        { title: 'One', value: 10, color: '#E38627',key:"ss", },
        { title: 'Two', value: 15, color: '#C13C37',key:"ddd" },
        { title: 'Three', value: 20, color: '#6A2135' , key:"dddd"},
        ])

    return <div>
        <div style={{maxWidth:"40vh"}}>
        <PieChart
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            onMouseOver={(e) => settext(e.target.innerHTML.replace(/<\/?title>/g,''))}
            onMouseOut={e=> settext("")}
            animate={true}
            data={data}
            />
        </div>


        <div>{text}</div>
    </div>
}


export default Chart;