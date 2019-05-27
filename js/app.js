
// class Calendar extends React.Component{
//   render {
//     return (
//       <h>hellow world</h>
//     )
//   }
// }


const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
const weekNames =["Su","M","Tu","W","Th","F","Sa"]
const publicHolidays ={
  '2019-1-2':'Chinese New Year',
  '2019-2-23':'Good Friday',
  '2019-5-1':'Labour day'
}

const birthDays ={
  '2019-5-2':'Kelvin'
}

const anniversary={
  '2019-7-2':'Wedding'
}

const today=new Date()

const rootElement = document.getElementById('root')

const dates =[
  {
    month:'January',
    days:[
      [
        null,
        {
          date:'2019-1-1',
          weekDay:1,
          publicHoliday:{name:'Chinese New Year'},
          birthDay:{people:'WWQ'},
          busy:true,
          anniversary:{name:'wedding'}
        }

      ],
    ]
  }
]

function listToMatrix(list, elementsPerSubArray) {
  var matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
          k++;
          matrix[k] = [];
      }

      matrix[k].push(list[i]);
  }

  return matrix;
}

const date = new Date()
const myDates = monthNames.map(m => {
  const firstDay = new Date(date.getFullYear(), monthNames.indexOf(m), 1);
  const lastDay = new Date(date.getFullYear(), monthNames.indexOf(m) + 1, 0);
  var days=[]
  const weekDayOfFirstDay = firstDay.getDay()
  const weekDayOfLastDay = lastDay.getDay()
  for(var i=0;i<weekDayOfFirstDay;i++){
    days.push(null)
  }
  for(var i=1;i<=lastDay.getDate();i++){
    days.push({
      date:new Date(date.getFullYear(),monthNames.indexOf(m),i)
    })
  }
  for(var i=weekDayOfLastDay;i<6;i++){
    days.push(null)
  }

  var weekGroupDays=listToMatrix(days,7)

  return {
    month:m,
    days:weekGroupDays
  }
})


function CreateMonthTable(month){
  const monthIndex = monthNames.indexOf(month)
  const days = myDates[monthIndex].days
  console.log(days)
  return (
    <div className='box-week col-md-4 col-sm-6' key={month}>
      <h1>{month}</h1>
      <table className='tb-week'>
        <thead>
          <tr>
            <th>{weekNames[0]}</th>
            <th>{weekNames[1]}</th>
            <th>{weekNames[2]}</th>
            <th>{weekNames[3]}</th>
            <th>{weekNames[4]}</th>
            <th>{weekNames[5]}</th>
            <th>{weekNames[6]}</th>
          </tr>
        </thead>
        <tbody>
          {
            days.map((day,index)=>(
              <tr key={index}>
                {
                  day.map((d,i)=>(                    
                    <td className={(i==0 ||i==6)?"week-end":""} 
                        className={
                          ((d!=null && today.getDate() === d.date.getDate() && today.getMonth() === d.date.getMonth() && today.getFullYear() === d.date.getFullYear())?"today":"") +" " 
                          +((d!=null && publicHolidays[d.date.getFullYear()+'-'+(d.date.getMonth()+1)+'-'+d.date.getDate()]!=undefined)? "publicholiday":"") +" "
                          +((d!=null && birthDays[d.date.getFullYear()+'-'+(d.date.getMonth()+1)+'-'+d.date.getDate()]!=undefined)? "birthday":"") 
                        }
                        key={index+'-'+i}>
                     {d!=null? d.date.getDate():''}
                     </td>
                  ))
                            
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}


const element = monthNames.map(m => (CreateMonthTable(m)))
  
ReactDOM.render(element,rootElement)