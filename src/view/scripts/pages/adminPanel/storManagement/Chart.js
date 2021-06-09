import { useEffect, useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';


const Chart =(probs)=>{


    const [text,settext] = useState("")


    const [data, setdata]= useState([])

    const colors =['#E38627','#C13C37','#6A2135','#581845','#FF5733']

    useEffect(()=>{

        if(probs.type === 'root')
        { 
            if(probs.dataAnalysis !== undefined)
            {
                var vv = Object.values(probs.dataAnalysis.category_product)

                vv.sort((a,b)=>{ if(a.count > b.count) return -1; return 1})

                FillData(vv)
            }
        } 
        else
        if(probs.type === 'cat')
        { 
            if(probs.dataAnalysis !== undefined)
            {
                console.log(probs)


                var v = probs.subcatlist.filter(e=>e.category_id == probs.id);

                var vv = Object.values(probs.dataAnalysis.subcategory_product)

                for(var i=0; i<v.length; i++)
                { 
                    v[i]= {...v[i], count:vv.find(e=>e.title === v[i].title).count}
                }

                v.sort((a,b)=>{ if(a.count > b.count) return -1; return 1})


                FillData(v)

            }
        }
        else
        if(probs.type === 'sub')
        { 
            var v = probs.productlist;
            v = v.filter(e=>e.subcategory_id === probs.id);

            for(var i=0; i<v.length; i++)
            {
                v[i]= {...v[i], count:v[i].quantity}
            }

            v.sort((a,b)=>{ if(a.count > b.count) return -1; return 1})


            FillData(v)
        }

    },[probs])

    const FillData =(probs)=>{

        var vv = probs;

        vv = vv.filter(e=>e.count !== 0)
        
        var otherCount=0;

        
        for(var i=4; i<vv.length; i++)
        {
            otherCount = otherCount + vv[i].count;
        }

        if(vv.length >5)
        {
            setdata([
                { title: vv[0].title, value: vv[0].count, color: colors[0],key:vv[0].title+"lbl", },
                { title: vv[1].title, value: vv[1].count, color: colors[1],key:vv[1].title+"lbl", },
                { title: vv[2].title, value: vv[2].count, color: colors[2],key:vv[2].title+"lbl", },
                { title: vv[3].title, value: vv[3].count, color: colors[3],key:vv[3].title+"lbl", },
                { title: "other", value: otherCount, color: colors[4],key:"otherlbl", },
            ])
        }
        else if(vv.length > 4)
        {
            setdata([
                { title: vv[0].title, value: vv[0].count, color: colors[0],key:vv[0].title+"lbl", },
                { title: vv[1].title, value: vv[1].count, color: colors[1],key:vv[1].title+"lbl", },
                { title: vv[2].title, value: vv[2].count, color: colors[2],key:vv[2].title+"lbl", },
                { title: vv[3].title, value: vv[3].count, color: colors[3],key:vv[3].title+"lbl", },
                { title: vv[4].title, value: vv[4].count, color: colors[4],key:vv[4].title+"lbl", },
            ])
        }
        else if(vv.length > 3)
        {
            setdata([
                { title: vv[0].title, value: vv[0].count, color: colors[0],key:vv[0].title+"lbl", },
                { title: vv[1].title, value: vv[1].count, color: colors[1],key:vv[1].title+"lbl", },
                { title: vv[2].title, value: vv[2].count, color: colors[2],key:vv[2].title+"lbl", },
                { title: vv[3].title, value: vv[3].count, color: colors[3],key:vv[3].title+"lbl", }
            ])
        }
        else if(vv.length > 2)
        {
            setdata([
                { title: vv[0].title, value: vv[0].count, color: colors[0],key:vv[0].title+"lbl", },
                { title: vv[1].title, value: vv[1].count, color: colors[1],key:vv[1].title+"lbl", },
                { title: vv[2].title, value: vv[2].count, color: colors[2],key:vv[2].title+"lbl", }
            ])
        }
        else if(vv.length > 1)
        {
            setdata([
                { title: vv[0].title, value: vv[0].count, color: colors[0],key:vv[0].title+"lbl", },
                { title: vv[1].title, value: vv[1].count, color: colors[1],key:vv[1].title+"lbl", },

            ])
        }
        else if(vv.length > 0)
        {
            setdata([
                { title: vv[0].title, value: vv[0].count, color: colors[0],key:vv[0].title+"lbl", }

            ])
        }
        else setdata([])
        



    }


    return <div>
        <div style={{maxWidth:"40vh"}}>

        <div>


        </div>

        <PieChart
            labelPosition="80"
            labelStyle={{fontSize:"7px", fontWeight:"bold"}}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
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