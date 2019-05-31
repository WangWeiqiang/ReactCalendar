class Day extends React.Component{

    constructor(props){
        super(props)
        
        this.editCalendarEvent=this.editCalendarEvent.bind(this)
    }

    editCalendarEvent(){
        if(this.props.day!=null){
            $(".modal").modal()
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return true
    }


    getClassNameAndIcon(day, weekDayIndex){
        var today=new Date()
        var classNames=[]
        var tooltips=[]
        var icons=[]
        if(weekDayIndex==0 || weekDayIndex==6){
            classNames.push("week-end")
        }
        if(day!=null && today.getDate() === day.date.getDate() && today.getMonth() === day.date.getMonth() && today.getFullYear() === day.date.getFullYear()){
            classNames.push("today")            
        }
        if(day!=null && day.publichHoliday!=null){
            icons.push('umbrella-beach text-success')
            tooltips.push({type:"publicholiday",title:day.publichHoliday,icon:'umbrella-beach text-success'})
        }
        if(day!=null && day.birthDays!=null){
            icons.push('birthday-cake text-danger')
            tooltips.push({type:"birthday",title:day.birthDays.join(','),icon:'birthday-cake text-danger'})
        }
        if(day!=null && day.anniversary!=null){
            icons.push("flag text-info")
            tooltips.push({type:"anniversary",title:day.anniversary,icon:'flag text-info'})
        }
        if(day!=null && day.busy){
            icons.push('running text-danger')
            tooltips.push({type:"busy",title:"Busy",icon:'running text-danger'})
        }

        return [classNames.join(" "),icons,tooltips]

    }

    render(){
        const [className,icons,tooltips]=this.getClassNameAndIcon(this.props.day, this.props.weekDayIndex)
        return (
        <td className={className + ' '+(icons.length>0?'popover_wrapper count-'+icons.length:'')} onClick={this.editCalendarEvent}>
            {
                icons.length>0?(
                    <div>
                        {
                            icons.length>0? icons.map((icon)=>(<i className={'fa fa-'+icon} key={icon}></i>)):''
                        }
                        <div className="popover_content">
                        {
                            tooltips.map((t)=>(<div className='tooltip_text' key={t.type}><span><i className={'fa fa-'+t.icon}></i> {t.title}</span></div>))
                        }
                        </div>
                    </div>
                )
                :
                this.props.day!=null?this.props.day.date.getDate():''
            }
        </td>
        )
    }
}