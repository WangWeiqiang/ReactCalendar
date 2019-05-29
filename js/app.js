
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

const busyDays=[
  '2019-6-25',
  '2019-10-11'
]


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

  
ReactDOM.render(
  <Calendar monthNames={monthNames} weekNames={weekNames} 
    publicHolidays={publicHolidays} birthDays={birthDays} 
    busyDays={busyDays} anniversaries = {anniversary}/>,
  rootElement)