class BirthdayEditor extends React.Component{
    constructor(props){
        super(props)
        this.birthdays = JSON.parse(localStorage.getItem("birthdays")) || {}
        this.newBirthdayMonth = 1
        this.newBirthdayDate = 1
        this.newBirthdayName=""
        this.state={
            displayNewBirthdayForm:false
        }
        this.handleRemoveItem=this.handleRemoveItem.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleCloseWindow=this.handleCloseWindow.bind(this)
        this.toggleAddBirthdayForm = this.toggleAddBirthdayForm.bind(this)
        this.handleMonthChange = this.handleMonthChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleBirthdaySave=this.handleBirthdaySave.bind(this)
        this.handleNameChange=this.handleNameChange.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState){        
        return true
    }

    handleAddItem(){
        var storagedBusyDays = localStorage.getItem("birthdays")
        var objectString;
        if(storagedBusyDays==null){
            objectString = JSON.stringify([currentDayIndexKey])
        }
        else{
            
            var existBusyDays = JSON.parse(storagedBusyDays)
            if(existBusyDays.indexOf(currentDayIndexKey)<0 && window.SelectedDate.busy){
                
                existBusyDays.push(currentDayIndexKey)
            }
            else{
                if(existBusyDays.indexOf(currentDayIndexKey)>=0 && !window.SelectedDate.busy)
                {
                    
                    existBusyDays.splice(existBusyDays.indexOf(currentDayIndexKey),1)
                }
            }

            objectString=JSON.stringify(existBusyDays)
        }
        localStorage.setItem("busydays",objectString)

        this.setState({busy:e.target.checked})
    }

    handleRemoveItem=(date,name)=>{
        var i = this.birthdays[date].indexOf(name)
        if(i>=0){
            this.birthdays[date].splice(i,1)
        }

        if(this.birthdays[date].length==0){
            delete this.birthdays[date]
        }
        localStorage.setItem("birthdays",JSON.stringify(this.birthdays))
        this.setState({birthdayRemoved:true})
    }

    handleCloseWindow(){
        
        this.props.callBack(true)
    }

    handleMonthChange(e){
        let {name, value} = e.target;
        this.newBirthdayMonth=value
    }
    handleDateChange(e){
        let {name, value} = e.target;
        this.newBirthdayDate=value
    }

    handleNameChange(e){
        let {name,value}=e.target
        this.newBirthdayName=value
        
    }
    handleBirthdaySave(){
        var index = this.newBirthdayMonth +"-"+this.newBirthdayDate
        if(this.birthdays[index])
        {
            this.birthdays[index].push(this.newBirthdayName)
        }
        else{
            this.birthdays[index]=[this.newBirthdayName]
        }

        localStorage.setItem("birthdays",JSON.stringify(this.birthdays))
        

        this.setState({displayNewBirthdayForm:!this.state.displayNewBirthdayForm})
    }

    toggleAddBirthdayForm(){

        this.setState({displayNewBirthdayForm:!this.state.displayNewBirthdayForm})
    }

    render(){
        return(
        <div className="modal" tabIndex="-1" role="dialog" id="birthday-editor">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Birthdays</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {                            
                            Object.keys(this.birthdays).map(key=>{
                                return <div className='row mb-1' key={key}>
                                    <div className='col-sm-3'>{key.split('-')[1]} {MonthNames()[parseInt(key.split('-')[0])-1]}</div>
                                    <div className='col-sm-9'>{
                                        this.birthdays[key].map((b)=>(
                                            <div key={b}>{b} <i className='fa fa-times' onClick={()=>{this.handleRemoveItem(key,b)}}></i></div>
                                        ))
                                    }</div>
                                    
                                </div>
                            })
                        }
                        <div className="row">
                            <div className="col-sm-12 text-right">
                                {                                    
                                    <i className={"fa fa-"+(this.state.displayNewBirthdayForm?"minus":"plus")} onClick={this.toggleAddBirthdayForm}></i>                                        
                                }
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-sm-12">
                                <div className={!this.state.displayNewBirthdayForm?"d-none":""} id="form-new-birthday">
                                    <div className="form-row align-items-center">
                                        
                                        <div className="col-sm-3">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className='fa fa-calendar-day'></i></div>
                                                </div>
                                                <select className="form-control" onChange={this.handleMonthChange}>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                    <option value='6'>6</option>
                                                    <option value='7'>7</option>
                                                    <option value='8'>8</option>
                                                    <option value='9'>9</option>
                                                    <option value='10'>10</option>
                                                    <option value='11'>11</option>
                                                    <option value='12'>12</option>
                                                </select>
                                                
                                            </div>
                                        </div>

                                        <div className="col-sm-2">
                                            <div className="input-group mb-2">                                                
                                                <select className="form-control" onChange={this.handleDateChange}>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                    <option value='6'>6</option>
                                                    <option value='7'>7</option>
                                                    <option value='8'>8</option>
                                                    <option value='9'>9</option>
                                                    <option value='10'>10</option>
                                                    <option value='11'>11</option>
                                                    <option value='12'>12</option>
                                                    <option value='13'>13</option>
                                                    <option value='14'>14</option>
                                                    <option value='15'>15</option>
                                                    <option value='16'>16</option>
                                                    <option value='17'>17</option>
                                                    <option value='18'>18</option>
                                                    <option value='19'>19</option>
                                                    <option value='20'>20</option>
                                                    <option value='21'>21</option>
                                                    <option value='22'>22</option>
                                                    <option value='23'>23</option>
                                                    <option value='24'>24</option>
                                                    <option value='25'>25</option>
                                                    <option value='26'>26</option>
                                                    <option value='27'>27</option>
                                                    <option value='28'>28</option>
                                                    <option value='29'>29</option>
                                                    <option value='30'>30</option>
                                                    <option value='31'>31</option>

                                                </select>
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fa fa-user-circle"></i></div>
                                                </div>
                                                <input type="text" className="form-control" onChange={this.handleNameChange} placeholder="Friend Name"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="input-group mb-2">
                                                <button type="text" className="btn btn-success" onClick={this.handleBirthdaySave}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseWindow}>Close</button>                        
                    </div>
                </div>
            </div>
        </div>
        )
    }
}