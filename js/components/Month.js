class Month extends React.Component{    
    render()
    {        
        return(            
            <div className='col-md-4 col-sm-6'>
                <div className='week-box card'>
                    <h1>{this.props.monthName}</h1>
                    <table className='week-tb'>
                        <thead>
                        <tr>
                            {
                                this.props.weekNames.map((m)=>(
                                    <th key={m}>{m}</th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.monthData.weeks.map((week,index)=>(
                                <Week weekDays={week} weekIndex={index} month={this.props.month} key={index} editCalendarEvent={this.props.editCalendarEvent}/>                
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>            
        )
    }
}