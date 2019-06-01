class EventEditor extends React.Component{
    constructor(props){
        super(props)
        this.state={
            day:null,
            busy:false
        }
        this.handleBusyChange=this.handleBusyChange.bind(this)
        this.handleEditEvent=this.handleEditEvent.bind(this)
        this.handleCloseWindow=this.handleCloseWindow.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState){        
        return this.state.day!=nextState.day || this.state.busy!=nextState.busy        
    }

    handleEditEvent(){
        this.setState({
            day:window.SelectedDate,
            busy:window.SelectedDate.busy
        })
    }

    handleBusyChange(e){
        window.SelectedDate.busy=e.target.checked
        var storagedBusyDays = localStorage.getItem("busydays")
        var currentDay=window.SelectedDate.date;
        var currentDayIndexKey=currentDay.getFullYear()+"-"+(currentDay.getMonth()+1)+"-"+currentDay.getDate()
        var objectString;
        if(storagedBusyDays==null && window.SelectedDate.busy){
            objectString = JSON.stringify([currentDayIndexKey])
        }
        else{
            
            var existBusyDays = JSON.parse(storagedBusyDays)
            if(existBusyDays.indexOf(currentDayIndexKey)<0 && window.SelectedDate.busy)
                existBusyDays.push(currentDayIndexKey)
            else{
                if(existBusyDays.indexOf(currentDayIndexKey)>=0 && !window.SelectedDate.busy)
                {
                    existBusyDays.pop(existBusyDays.indexOf(currentDayIndexKey))
                }
            }

            objectString=JSON.stringify(existBusyDays)
        }
        localStorage.setItem("busydays",objectString)

        this.setState({busy:e.target.checked})
    }

    handleCloseWindow(){

        this.props.callBack(true)
    }

    render(){
        return(
        <div className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{this.state.day!=null?this.state.day.date.toLocaleDateString():""}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {
                        this.state.day!=null && this.state.day.publichHoliday!=null ? (<div className="row"><div className="col-sm-12">Today is {this.state.day.publichHoliday}</div></div>):""
                    }

                    
                        {
                            this.state.day!=null && this.state.day.birthDays!=undefined?
                            (
                                <div className="row mt-2">
                                    <div className="col-sm-5">Say happy birthday to</div>
                                    <div className="col-sm-7">
                                        <ul>
                                        {
                                            this.state.day.birthDays.map((b)=>(<li key={b}>{b}</li>))                                    
                                        }
                                        </ul>
                                    </div>
                                </div>
                            )
                            :
                            ""
                            
                        }

                        {
                            this.state.day!=null && this.state.day.anniversary!=undefined?
                            (
                                <div className="row mt-2">
                                    <div className="col-sm-5">Anniversary Day</div>
                                    <div className="col-sm-7">
                                        <ul>
                                        {
                                            this.state.day.anniversary.map((b)=>(<li key={b}>{b}</li>))                                    
                                        }
                                        </ul>
                                    </div>
                                </div>
                            )
                            :
                            ""
                        }
                        
                    
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-check">
                                <input id="ckb-busy" name="busy-status" className="form-check-input" onChange={(e) => this.handleBusyChange(e)} type="checkbox" checked={this.state.busy} />
                                <label className="form-check-label" htmlFor="ckb-busy">
                                    Busy
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-6 text-right">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseWindow}>Close</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        )
    }
}