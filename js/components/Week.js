class Week extends React.Component{
    
    render(){        
        const today=new Date()
        return (
            <tr>
            {
                this.props.weekDays.map((d,i)=>(
                    <Day day={d} weekDayIndex={i} key={i}/>                    
                ))
            }
            </tr>
        )
    }
}