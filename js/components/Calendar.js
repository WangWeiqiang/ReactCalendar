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
            },
          
            anniversary : {
            },
          
            busyDays : [
              
            ]
          
        }

        this.initialData(this.data.year)
          
        this.state={
            year:this.data.year
        }
        this.changeYear = this.changeYear.bind(this)
        this.initialData = this.initialData.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.year!=nextState.year
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
            const weekDayOfLastDay = lastDay.getDay()
            for(var i=0;i<weekDayOfFirstDay;i++){
                days.push(null)
            }

            for(var i=1;i<=lastDay.getDate();i++){
                var date=new Date(year,monthNames.indexOf(m),i)
                var montDayString= (date.getMonth()+1)+'-'+date.getDate()
                var fulldateString = date.getFullYear()+'-'+ montDayString

                days.push({
                    date:new Date(year,monthNames.indexOf(m),i),
                    publichHoliday:this.data.publicHolidays[montDayString],
                    birthDays:this.data.birthDays[montDayString],
                    busy:this.data.busyDays.indexOf(fulldateString)>=0,
                    anniversary:this.data.anniversary[montDayString]
                })
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
        ['HariRayaPuasa','HariRayaHaji','VesakDay','Deepavali','NewYearDay',
            'ChineseNewYear','GoodFriday','LabourDay','NationalDay','ChristmasDay'].forEach(f => {
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
                            <Month monthName={m} monthData={months[this.data.monthNames.indexOf(m)]} weekNames={this.data.weekNames} key={m}/>
                        ))
                    }
                </div>

                
            </div>

          )
    }
}