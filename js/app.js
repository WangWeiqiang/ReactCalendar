
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
  '2019-1-1':'New Year\'s Day',
  '2019-2-5':'Chinese New Year',
  '2019-2-6':'Chinese New Year',
  '2019-4-19':'Good Friday',
  '2019-5-1':'Labour Day',
  '2019-5-19':'Vesak Day',
  '2019-6-5':'Hari Raya Puasa',
  '2019-8-9':'National Day',
  '2019-8-11':'Hari Raya Haji',
  '2019-10-27':'Deepvali',
  '2019-12-25':'Christmas Day'
}

const birthDays ={
  '2019-5-1':['Kelvin','Lucy']
}

const anniversary={
  '2019-7-2':'Wedding',
  '2019-5-1':'Starhub'
}

const busyDays=[
  '2019-6-25',
  '2019-10-11',
  '2019-5-1'

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