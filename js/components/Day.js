class Day extends React.Component{
    getClassNameAndIcon(day, weekDayIndex){
        var today=new Date()
        var classNames=[]
        var icons=[]
        if(weekDayIndex==0 || weekDayIndex==6){
            classNames.push("week-end")
        }
        if(day!=null && today.getDate() === day.date.getDate() && today.getMonth() === day.date.getMonth() && today.getFullYear() === day.date.getFullYear()){
            classNames.push("today")
        }
        if(day!=null && day.publichHoliday!=null){
            classNames.push("publicholiday")
            icons.push('umbrella-beach text-success')
        }
        if(day!=null && day.birthDays!=null){
            classNames.push("birthday")
            icons.push('birthday-cake text-danger')
        }
        if(day!=null && day.anniversary!=null){
            classNames.push("anniversary")
            icons.push("flag text-info")
        }
        if(day!=null && day.busy){
            classNames.push("busy")
            icons.push('running text-danger')
        }

        return [classNames.join(" "),icons]

    }

    debug(){
        console.log(this.props.day)
    }

    render(){
        const [className,icons]=this.getClassNameAndIcon(this.props.day, this.props.weekDayIndex)
        return (
        <td className={className + ' '+(icons.length>1?'count-'+icons.length:'')}>
            {
                icons.length>0? icons.map((icon)=>(
                    <i className={'fa fa-'+icon} key={icon}></i>
                ))
                :
                <span>{this.props.day!=null? this.props.day.date.getDate():''}</span>
            }
                
        </td>
        )
    }
}