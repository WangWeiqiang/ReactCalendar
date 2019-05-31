var calendarDataofCurrentYear={
  year:2019,
  monthNames : ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
  weekNames : ["Su","M","Tu","W","Th","F","Sa"],
  publicHolidays : {
    '1-1':'New Year\'s Day',
    '2-5':'Chinese New Year',
    '2-6':'Chinese New Year',
    '4-19':'Good Friday',
    '5-1':'Labour Day',
    '5-19':'Vesak Day',
    '6-5':'Hari Raya Puasa',
    '8-9':'National Day',
    '8-11':'Hari Raya Haji',
    '10-27':'Deepvali',
    '12-25':'Christmas Day'
  },
  birthDays : {
    '5-1':['Kelvin','Lucy']
  },

  anniversary : {
    '7-2':'Wedding',
    '5-1':'Starhub'
  },

  busyDays : [
    '2019-6-25',
    '2019-10-11',
    '2019-5-1'  
  ]

}

const rootElement = document.getElementById('root')

ReactDOM.render(<Calendar data={calendarDataofCurrentYear}/>, rootElement)