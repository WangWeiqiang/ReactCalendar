class EventEditor extends React.Component{
    constructor(props){
        super(props)
        this.state={
            day : null,
            busy : false
        }
        this.handleBusyChange = this.handleBusyChange.bind(this)
        this.handleEditEvent = this.handleEditEvent.bind(this)
        this.handleCloseWindow = this.handleCloseWindow.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState){        
        return this.state.day != nextState.day || this.state.busy != nextState.busy        
    }

    handleEditEvent(){
        this.setState({
            day : window.SelectedDate,
            busy : window.SelectedDate.busy
        })
    }

    handleBusyChange(e){
        window.SelectedDate.busy = e.target.checked
        var storagedBusyDays = localStorage.getItem("busydays")
        var currentDay=window.SelectedDate.date;
        var currentDayIndexKey = currentDay.getFullYear()+ "-" +(currentDay.getMonth()+1)+ "-" +currentDay.getDate()
        var objectString;
        if(storagedBusyDays == null && window.SelectedDate.busy){
            objectString = JSON.stringify([currentDayIndexKey])
        }
        else{
            
            var existBusyDays = JSON.parse(storagedBusyDays)
            if(existBusyDays.indexOf(currentDayIndexKey) < 0 && window.SelectedDate.busy){
                
                existBusyDays.push(currentDayIndexKey)
            }
            else{
                if(existBusyDays.indexOf(currentDayIndexKey) >= 0 && !window.SelectedDate.busy)
                {                    
                    existBusyDays.splice(existBusyDays.indexOf(currentDayIndexKey),1)
                }
            }

            objectString=JSON.stringify(existBusyDays)
        }
        localStorage.setItem("busydays",objectString)

        this.setState({busy : e.target.checked})
    }

    handleCloseWindow(){

        this.props.callBack(true)
    }

    render(){
        return(
        <div className="modal" tabIndex="-1" role="dialog" id="event-editor">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{this.state.day!=null?(this.state.day.date.getDate() + " "+MonthNames()[this.state.day.date.getMonth()] +" "+ this.state.day.date.getFullYear()):""}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={this.handleCloseWindow}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h1 className="text-center text-warning mb-3"><i className="fa fa-smile"></i> Have A Nice Day!</h1>
                    {
                        this.state.day!=null && this.state.day.publichHoliday!=null ? (<div className="row"><div className="col-sm-12 text-center text-info">Today is {this.state.day.publichHoliday}</div></div>):""
                    }
                    
                    {
                        this.state.day!=null && this.state.day.birthDays!=undefined?
                            (
                                <div className="row mt-2">
                                    <div className="col-sm-12 text-center text-success">Say happy birthday to your friend{this.state.day.birthDays.length>1?'s':''} {this.state.day.birthDays.join(',')}</div>
                                </div>
                            )
                            :
                            ""
                            
                    }

                    {
                        this.state.day!=null && this.state.day.anniversary!=undefined?
                            (
                                <div className="row mt-2">
                                    <div className="col-sm-12">
                                        
                                        {
                                            this.state.day.anniversary.map((a)=>(
                                                <div className="mb-2 text-center" key={a.name}><i className="fa fa-flag text-success"></i> {a.name} - {this.state.day.date.getFullYear() - a.year} Year(s)</div>
                                            ))
                                        }
                                        
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
                                    <i className="fa fa-running text-danger"></i> Busy
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