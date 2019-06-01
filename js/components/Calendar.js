class Calendar extends React.Component{
    constructor(props){
        super(props)
        this.data={
            year:new Date().getFullYear(),
            monthNames : ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
            weekNames : ["Su","M","Tu","W","Th","F","Sa"],
            publicHolidays : {    
            },
            birthDays : {
                '5-6':['Klevin','Json','NET']
            },
          
            anniversary : {
                '5-31':['Writer and lecturer Hellen Keller dies','Basketball Hall of Famer George Mikan dies']
            },
          
            busyDays : [
              '2019-2-3','2019-4-5'
            ]
          
        }

        this.initialData(this.data.year)
          
        this.state={
            year:this.data.year
        }
        this.changeYear = this.changeYear.bind(this)
        this.initialData = this.initialData.bind(this)
        this.eventEditorCallBack=this.eventEditorCallBack.bind(this)
        this.eventUpdated=false;

    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.year!=nextState.year || this.eventUpdated
    }

    listToMatrix(list, elementsPerSubArray) {
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

    createMonths(year,monthNames){        
        return monthNames.map(m => {
            const firstDay = new Date(year, monthNames.indexOf(m), 1);
            const lastDay = new Date(year, monthNames.indexOf(m) + 1, 0);
            var days=[]
            const weekDayOfFirstDay = firstDay.getDay()
            const today=new Date()
            for(var i=0;i<weekDayOfFirstDay;i++){
                days.push(null)
            }

            for(var i=1;i<=lastDay.getDate();i++){
                var date=new Date(year,monthNames.indexOf(m),i)
                var montDayString= (date.getMonth()+1)+'-'+date.getDate()
                var fulldateString = date.getFullYear()+'-'+ montDayString
                var day={
                    date:new Date(year,monthNames.indexOf(m),i),
                    publichHoliday:this.data.publicHolidays[montDayString],
                    birthDays:this.data.birthDays[montDayString],
                    busy:localStorage.getItem("busydays")!=null? (JSON.parse(localStorage.getItem("busydays"))).indexOf(fulldateString)>=0:false,
                    anniversary:this.data.anniversary[montDayString]
                }
                days.push(day)

                if(day.date.getFullYear() == today.getFullYear() && day.date.getMonth()==today.getMonth() && day.date.getDate() ==today.getDate()){
                    window.SelectedDate=day
                }
            }

            var offDays = 42-days.length
            for(var j=0;j<offDays;j++){                
                days.push(null)
            }

            

            var weekGroupDays=this.listToMatrix(days,7)
        
            return {
                month:m,
                weeks:weekGroupDays
            }
        })       

    }

    initialData(year){
        //public holidays
        this.data.publicHolidays={};
        ['Hari Raya Puasa','Hari Raya Haji','Vesak Day','Deepavali','New Year\'s Day',
            'Chinese New Year','Good Friday','Labour Day','National Day','Christmas Day'].forEach(f => {
                const publicHoliday = SingaporePublicHolidays.getDate(f,year)
                
                if(publicHoliday.length>0){
                    publicHoliday.forEach(d=>{
                        this.data.publicHolidays[(d.getMonth()+1)+'-'+d.getDate()]=f
                    })
                }
                
        });

        //birthdays


        //buys status


        //anniverities

    }

    changeYear(direction){
        var year = this.state.year+(direction=="back"?-1:1)
        this.data.year=year
        this.initialData(year)

        this.setState({year:year})
    }

    editCalendarEvent=()=>{
        this.refs.eventEditor.handleEditEvent();
        $(".modal").modal()
    }

    eventEditorCallBack=(updated)=>{
        this.eventUpdated=updated
        this.setState({year:this.state.year})
    }

    
    render(){
        
        const months =  this.createMonths(this.data.year,this.data.monthNames)

        const ButtonChangeYear=({direction,onClick})=>{
            return (
                <button className="btn btn-sm btn-success" 
                    onClick={event=>{
                        if (!!onClick) {
                            onClick(direction);
                        }
                    }}><i className={"fa fa-caret-"+(direction=="back"?"left":"right")}></i></button>
            )
        }


        return (
            <div>                
                <div className="row">
                    <div className="col-3 text-right">
                        <ButtonChangeYear direction="back" onClick={this.changeYear}></ButtonChangeYear>
                    </div>
                    <div className="col-6 text-center">
                        <div className="row">
                        {
                            [this.data.year-1,this.data.year,this.data.year+1].map((year)=>(
                                <div className="text-center col-4" key={year}>
                                    <span className={"p-1"+(year==this.data.year?" bg-warning font-weight-bold":"")}>{year}</span>
                                </div>
                            ))
                            
                        }
                        </div>
                    </div>
                    <div className="col-3 text-left">
                        <ButtonChangeYear direction="forward" onClick={this.changeYear}></ButtonChangeYear>
                    </div>
                </div>
                <hr/>
                <div className="row mt-3">
                    <div className="col-sm-5"><h4>Calendar for Year {this.data.year}</h4></div>
                    <div className='col-sm-7 text-right'>
                        <ul className="legend">
                            <li><i className='fa fa-umbrella-beach text-success'></i> Public Holiday</li>
                            <li><i className='fa fa-birthday-cake text-danger'></i> Birthday</li>
                            <li><i className='fa fa-flag text-info'></i> Anniversary</li>
                            <li><i className='fa fa-running text-danger'></i> Busy</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {
                        this.data.monthNames.map(m => (
                            <Month monthName={m} monthData={months[this.data.monthNames.indexOf(m)]} weekNames={this.data.weekNames} key={m} editCalendarEvent={this.editCalendarEvent}/>
                        ))
                    }
                </div>

                <EventEditor ref="eventEditor" callBack={this.eventEditorCallBack}/>
            </div>

          )
    }
}