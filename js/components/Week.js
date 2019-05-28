class Week extends React.Component{
    
    render(){        
        const today=new Date()
        return (
            <tr key={this.props.month+'-'+this.props.weekIndex}>
            {
                this.props.weekDays.map((d,i)=>(                    
                    <td className={
                        ((i==0 ||i==6)?"week-end ":" ") 
                        +((d!=null && today.getDate() === d.date.getDate() && today.getMonth() === d.date.getMonth() && today.getFullYear() === d.date.getFullYear())?"today ":" ") 
                        +((d!=null && publicHolidays[d.date.getFullYear()+'-'+(d.date.getMonth()+1)+'-'+d.date.getDate()]!=undefined)? "publicholiday ":" ") 
                        +((d!=null && birthDays[d.date.getFullYear()+'-'+(d.date.getMonth()+1)+'-'+d.date.getDate()]!=undefined)? "birthday ":" ") 
                        }
                        key={this.props.month+'-'+ this.props.weekIndex +'-'+i}>
                    {d!=null? d.date.getDate():''}
                    </td>
                ))
            }
            </tr>
        )
    }
}