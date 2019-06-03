class Week extends React.Component{    
    render(){ 
        
        return (
            <tr>
            {
                this.props.weekDays.map((d,i)=>(
                    <Day day={d} weekDayIndex={i} key={i} editCalendarEvent={this.props.editCalendarEvent}/>                    
                ))
            }
            </tr>
        )
    }
}