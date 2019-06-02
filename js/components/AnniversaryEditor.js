class AnniversaryEditor extends React.Component{
    constructor(props){
        super(props)
        this.anniversary = JSON.parse(localStorage.getItem("anniversary")) || {}
        this.newAnnYear=(new Date()).getFullYear()-1
        this.newAnnMonth = 1
        this.newAnnDate = 1

        this.newAnnName=""
        this.state={
            displayNewAnnForm:false
        }
        this.handleRemoveItem=this.handleRemoveItem.bind(this)
        this.handleCloseWindow=this.handleCloseWindow.bind(this)
        this.toggleAnnForm = this.toggleAnnForm.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleMonthChange = this.handleMonthChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleAnnSave=this.handleAnnSave.bind(this)
        this.handleNameChange=this.handleNameChange.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState){        
        return true
    }

    handleRemoveItem=(date,name)=>{
        var i = this.anniversary[date].indexOf(name)
        if(i>=0){
            this.anniversary[date].splice(i,1)
        }

        if(this.anniversary[date].length==0){
            delete this.anniversary[date]
        }
        localStorage.setItem("anniversary",JSON.stringify(this.anniversary))
        this.setState({updated:true})
    }

    handleCloseWindow(){
        
        this.props.callBack(true)
    }

    handleYearChange(e){
        let {name, value} = e.target;
        this.newAnnYear=value
    }

    handleMonthChange(e){
        let {name, value} = e.target;
        this.newAnnMonth=value
    }
    handleDateChange(e){
        let {name, value} = e.target;
        this.newAnnDate=value
    }

    handleNameChange(e){
        let {name,value}=e.target
        this.newAnnName=value        
    }
    handleAnnSave(){
        var index =this.newAnnYear +"-"+ this.newAnnMonth +"-"+this.newAnnDate
        if(this.anniversary[index])
        {
            this.anniversary[index].push(this.newAnnName)
        }
        else{
            this.anniversary[index]=[this.newAnnName]
        }

        localStorage.setItem("anniversary",JSON.stringify(this.anniversary))


        this.setState({displayNewAnnForm:!this.state.displayNewAnnForm})
    }

    toggleAnnForm(){

        this.setState({displayNewAnnForm:!this.state.displayNewAnnForm})
    }

    render(){
        var years = [];
        for(let x =(new Date()).getFullYear()-1; x > 1900 ; x--) {
            years.push(x)
        }
        var months=[]
        for(let x = 1; x <=12; x++) {
            months.push(x)
        }
        var days=[]
        for(let x = 1; x <=31; x++) {
            days.push(x)
        }



        return(
        <div className="modal" tabIndex="-1" role="dialog" id="anniversary-editor">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Anniversaries</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {                            
                            Object.keys(this.anniversary).map(key=>{
                                return <div className='row mb-1' key={key}>
                                    <div className='col-sm-4'>{key.split('-')[2]} {MonthNames()[parseInt(key.split('-')[1])-1]} {key.split('-')[0]}</div>
                                    <div className='col-sm-8'>{
                                        this.anniversary[key].map((b)=>(
                                            <div key={b}>{b} <i className='fa fa-times' onClick={()=>{this.handleRemoveItem(key,b)}}></i></div>
                                        ))
                                    }</div>
                                    
                                </div>
                            })
                        }
                        <div className="row">
                            <div className="col-sm-12 text-right">
                                {                                    
                                    <i className={"fa fa-"+(this.state.displayNewBirthdayForm?"minus":"plus")} onClick={this.toggleAnnForm}></i>                                        
                                }
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-sm-12">
                                <div className={!this.state.displayNewAnnForm?"d-none":""} id="form-new-ann">
                                    <div className="form-row align-items-center">
                                        <div className="col-sm-4">
                                            <div className="input-group mb-2">                                                
                                                <select className="form-control" onChange={this.handleMonthChange}>
                                                    <option>Year</option>
                                                    {
                                                        years.map((y)=>(
                                                            <option key={y} value={y}>{y}</option>
                                                        ))
                                                    }
                                                </select>                                                
                                            </div>
                                        </div>

                                        <div className="col-sm-4">
                                            <div className="input-group mb-2">
                                                <select className="form-control" onChange={this.handleMonthChange}>
                                                    <option>Month</option>
                                                {
                                                        months.map((y)=>(
                                                            <option key={y} value={y}>{y}</option>
                                                        ))
                                                    }
                                                </select>                                                
                                            </div>
                                        </div>

                                        <div className="col-sm-4">
                                            <div className="input-group mb-2">                                                
                                                <select className="form-control" onChange={this.handleDateChange}>
                                                    <option>Day</option>
                                                {
                                                        days.map((y)=>(
                                                            <option key={y} value={y}>{y}</option>
                                                        ))
                                                    }
                                                </select>
                                                
                                            </div>
                                        </div>
                                        </div>
                                        <div className="form-row align-items-center">
                                        <div className="col-sm-9">
                                            <div className="input-group mb-2">
                                                <input type="text" className="form-control" onChange={this.handleNameChange} placeholder="Event Name"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="input-group mb-2">
                                                <button type="text" className="btn btn-success form-control" onClick={this.handleAnnSave}>Save</button>
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