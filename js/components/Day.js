class Day extends React.Component{
    getClassName(day, weekDayIndex){
        var today=new Date()
        var classNames=[]
        if(weekDayIndex==0 || weekDayIndex==6){
            classNames.push("week-end")
        }
        if(day!=null && today.getDate() === day.date.getDate() && today.getMonth() === day.date.getMonth() && today.getFullYear() === day.date.getFullYear()){
            classNames.push("today")
        }
        if(day!=null && day.publichHoliday!=null){
            classNames.push("publicholiday")
        }
        if(day!=null && day.birthDays!=null){
            classNames.push("birthday")
        }
        if(day!=null && day.busy){
            classNames.push("busy")
        }

        return classNames.join(" ")

    }
    render(){
        return (
        <td className={this.getClassName(this.props.day, this.props.weekDayIndex)}>
                {this.props.day!=null? this.props.day.date.getDate():''}
        </td>
        )
    }
}