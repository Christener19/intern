//function returns a card fr every person
// contain whole view is sub componate
// card = props object to desturcture
//average engagament status
//name
//image/avatar
//full data = objects -history 
//pass to sub show status 


export default function EngagementLoggerCard ({cardObject}) {
    const { name, avgEngagement,image, fullData } = cardObject;
return(
<div className= "cardOutline ">
<div className= "CardContent">
<image/>
<div className= "cardTextContent">
<p></p>
<p></p>

</div>
</div>
</div>
)

}