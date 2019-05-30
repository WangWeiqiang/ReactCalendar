class Calendar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            year:props.data.year
        }
        this.changeYear = this.changeYear.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(this.state.year)
        console.log(nextState.year)
        return this.state.year==nextState.year
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
        
        const today=new Date()
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
                var dateString = date.getFullYear()+'-'+ (date.getMonth()+1)+'-'+date.getDate()

                days.push({
                    date:new Date(year,monthNames.indexOf(m),i),
                    publichHoliday:this.props.data.publicHolidays[dateString],
                    birthDays:this.props.data.birthDays[dateString],
                    busy:this.props.data.busyDays.indexOf(dateString)>=0,
                    anniversary:this.props.data.anniversary[dateString]
                })
            }
            for(var i=weekDayOfLastDay;i<6;i++){
                days.push(null)
            }
        
            var weekGroupDays=this.listToMatrix(days,7)
        
            return {
                month:m,
                weeks:weekGroupDays
            }
        })       

    }

    changeYear(direction){
        var year = this.state.year+(direction=="left"?-1:1)
        this.props.data.year=year
        this.setState({year:year})
    }

    
    render(){
        
        const months =  this.createMonths(this.props.data.year,this.props.data.monthNames)

        const ButtonChangeYear=({direction,onClick})=>{
            return (
                <button className="btn btn-sm btn-success" 
                    onClick={event=>{
                        if (!!onClick) {
                            onClick(direction);
                        }
                    }}><i className={"fa fa-caret-"+(direction=="left"?"left":"right")}></i></button>
            )
        }

        return (
            <div>
                <div className="row">
                    <ButtonChangeYear direction="left" onClick={this.changeYear}></ButtonChangeYear>
                    <ButtonChangeYear direction="right" onClick={this.changeYear}></ButtonChangeYear>
                </div>
                <div className="row">
                    <div className="col-sm-5"><h4>Calendar for Year {this.props.data.year}</h4></div>
                    <div className='col-sm-7 text-right'>
                        <ul className="legend">
                            <li><i className='fa fa-umbrella-beach text-success'></i>Public Holiday</li>
                            <li><i className='fa fa-birthday-cake text-danger'></i>Birthday</li>
                            <li><i className='fa fa-flag text-info'></i>Anniversary</li>
                            <li><i className='fa fa-running text-danger'></i>Busy</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {
                        this.props.data.monthNames.map(m => (
                            <Month monthName={m} monthData={months[this.props.data.monthNames.indexOf(m)]} weekNames={this.props.data.weekNames} key={m}/>
                        ))
                    }
                </div>                
            </div>

          )
    }
}