class Month extends React.Component{    
    render(){
        
        return(            
            <div className='box-week col-md-4 col-sm-6'>
                <h1>{this.props.monthName}</h1>
                <table className='tb-week'>
                    <thead>
                    <tr>
                        {
                            this.props.weekNames.map((m)=>(
                                <th>{m}</th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.monthData.weeks.map((week,index)=>(
                            <Week weekDays={week} weekIndex={index} month={this.props.month} key={index}/>                
                        ))
                    }
                    </tbody>
                </table>
            </div>            
        )
    }
}