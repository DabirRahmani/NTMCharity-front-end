import React from 'react';
import CanvasJSReact from '../../../../../diagram/canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart=()=>
{
    const options = 
    {
        animationEnabled: true,
        title: {
            text: "Customer Satisfaction"
        },
        subtitles: [{
            text: "71% Positive",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: "Unsatisfied", y: 11 },
                { name: "Undfied", y: 11 },
                { name: "Unsdtisfied", y: 8 },
                { name: "Very Unsatisfied", y: 22 },
                { name: "Very Satisfied", y: 11 },
                { name: "Satisfied", y: 7 },
                { name: "Neutral", y: 30 }
            ]
        }]
    }
    
    return (
    <div>
        <CanvasJSChart options = {options} 
        />
    </div>
    );
}

export default DoughnutChart;