class Calendar extends React.Component{
    constructor(props){
        super(props)
        this.data={
            year : new Date().getFullYear(),
            
            monthNames : MonthNames(),
            
            weekNames : ["Su","M","Tu","W","Th","F","Sa"],
            
            publicHolidays : PublicHolidays(new Date().getFullYear()),

            birthDays : JSON.parse(localStorage.getItem("birthdays")) || {},
          
            anniversary :  JSON.parse(localStorage.getItem("anniversary")) || {},
          
            busyDays : JSON.parse(localStorage.getItem("busydays")) || []
          
        }

        this.state={
            year : this.data.year
        }
        
        this.changeYear = this.changeYear.bind(this)
        
        this.eventEditorCallBack = this.eventEditorCallBack.bind(this)
        this.lunchBirthdayEditor = this.lunchBirthdayEditor.bind(this)
        this.eventUpdated = false;

    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.year != nextState.year || this.eventUpdated
    }

    getAnniversary(monthDay){
        var anniverities = []
        Object.keys(this.data.anniversary).map(key=>{
            const [Y,M,D] = key.split('-')
            if(M +'-' + D == monthDay){
                anniverities.push({year : Y,name : this.data.anniversary[key]})
            }
        })

        return anniverities.length > 0 ? anniverities : null
    }

    createMonths(year, monthNames){        
        return monthNames.map(m => {
            const firstDay = new Date(year, monthNames.indexOf(m), 1);
            const lastDay = new Date(year, monthNames.indexOf(m) + 1, 0);
            var days = []
            const weekDayOfFirstDay = firstDay.getDay()
            const today = new Date()
            for(var i = 0; i < weekDayOfFirstDay; i++){
                days.push(null)
            }

            for(var i = 1; i <= lastDay.getDate(); i++){
                var date = new Date(year,monthNames.indexOf(m), i)
                var montDayString = (date.getMonth()+1) + '-' + date.getDate()
                var fulldateString = date.getFullYear() + '-' + montDayString
                var day = {
                    date : new Date(year,monthNames.indexOf(m), i),
                    publichHoliday : this.data.publicHolidays[montDayString],
                    birthDays : this.data.birthDays[montDayString],
                    busy : this.data.busyDays.indexOf(fulldateString) >= 0,
                    anniversary : this.getAnniversary(montDayString)
                }
                days.push(day)

                if(day.date.getFullYear() == today.getFullYear() && day.date.getMonth() == today.getMonth() && day.date.getDate() == today.getDate()){
                    window.SelectedDate = day
                }
            }

            var offDays = 42-days.length
            for(var j = 0; j < offDays; j++){                
                days.push(null)
            }

            var weekGroupDays = listToMatrix(days , 7)
        
            return {
                weeks : weekGroupDays
            }
        })       

    }


    changeYear(direction){
        var year = this.state.year+(direction=="back"?-1:1)
        this.data.year = year
        this.data.publicHolidays =  PublicHolidays(year)
        this.setState({year:year})
    }

    editCalendarEvent=()=>{
        this.refs.eventEditor.handleEditEvent();
        $("#event-editor").modal({
            backdrop: 'static',
            keyboard: false
        })
    }

    eventEditorCallBack=(updated)=>{
        this.data.birthDays = JSON.parse(localStorage.getItem("birthdays")) || {}
        this.data.busyDays = JSON.parse(localStorage.getItem("busydays")) || []
        this.data.anniversary = JSON.parse(localStorage.getItem("anniversary")) || {}
        this.eventUpdated = updated
        this.setState({year:this.state.year})
    }

    lunchBirthdayEditor(){
        $('#birthday-editor').modal({
            backdrop: 'static',
            keyboard: false
        })
    }

    lunchAnniversaryEditor(){        
        $('#anniversary-editor').modal({
            backdrop: 'static',
            keyboard: false
        })
    }

    
    render(){
        
        const months =  this.createMonths(this.data.year, this.data.monthNames)

        const ButtonChangeYear = ({direction, onClick})=>{
            return (
                <button className="btn btn-sm btn-success" 
                    onClick = { event => {
                        if (!!onClick) {
                            onClick(direction);
                        }
                    }}><i className={ "fa fa-caret-" + (direction=="back"?"left":"right") }></i></button>
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
                                    <span className={"p-1" + (year==this.data.year? " bg-warning font-weight-bold" : "")}>{year}</span>
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
                            <li><i className='fa fa-birthday-cake text-danger'></i> <a href="#" onClick = {this.lunchBirthdayEditor}>Birthday</a></li>
                            <li><i className='fa fa-flag text-info'></i> <a href="#" onClick = {this.lunchAnniversaryEditor}>Anniversary</a></li>
                            <li><i className='fa fa-running text-danger'></i> Busy</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {
                        this.data.monthNames.map(m => (
                            <Month monthName = {m} monthData={months[this.data.monthNames.indexOf(m)]} weekNames={this.data.weekNames} key={m} editCalendarEvent={this.editCalendarEvent}/>
                        ))
                    }
                </div>

                <EventEditor ref="eventEditor" callBack={this.eventEditorCallBack}/>
                <BirthdayEditor ref="birthdayEditor" callBack={this.eventEditorCallBack}/>
                <AnniversaryEditor ref="anniversaryEditor" callBack={this.eventEditorCallBack}/>
            </div>

          )
    }
}