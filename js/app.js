var calendarDataofCurrentYear={
  year:2019,
  monthNames : ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
  weekNames : ["Su","M","Tu","W","Th","F","Sa"],
  publicHolidays : {
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
  },
  birthDays : {
    '2019-5-1':['Kelvin','Lucy']
  },

  anniversary : {
    '2019-7-2':'Wedding',
    '2019-5-1':'Starhub'
  },

  busyDays : [
    '2019-6-25',
    '2019-10-11',
    '2019-5-1'  
  ]

}

const rootElement = document.getElementById('root')

ReactDOM.render(<Calendar data={calendarDataofCurrentYear}/>, rootElement)