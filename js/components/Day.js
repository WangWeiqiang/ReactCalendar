class Day extends React.Component{
    getClassName(day, weekDayIndex, publicHolidays, birthDays, busy){
        var today=new Date()
        var classNames=[]
        if(weekDayIndex==0 || weekDayIndex==6){
            classNames.push("week-end")
        }
        if(day!=null && today.getDate() === day.date.getDate() && today.getMonth() === day.date.getMonth() && today.getFullYear() === day.date.getFullYear()){
            classNames.push("today")
        }
        if(day!=null && publicHolidays[day.date.getFullYear()+'-'+(day.date.getMonth()+1)+'-'+day.date.getDate()]!=undefined){
            classNames.push("publicholiday")
        }
        if(day!=null && birthDays[day.date.getFullYear()+'-'+(day.date.getMonth()+1)+'-'+day.date.getDate()]!=undefined){
            classNames.push("birthday")
        }
        if(busy){
            classNames.push("busy")
        }

        return classNames.join(" ")

    }
    render(){
        return (
        <td className={this.getClassName(this.props.day, this.props.weekDayIndex, this.props.publicHolidays, this.props.birthDays, this.props.busy)}
            key={this.props.weekDayIndex}>
                {this.props.day!=null? this.props.day.date.getDate():''}
        </td>
        )
    }
}