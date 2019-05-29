class Calendar extends React.Component{
    listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;
      
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
      
            matrix[k].push(list[i]);
        }
      
        return matrix;
    }

    

    createMonths(monthNames){
        
        const today=new Date()
        return monthNames.map(m => {
            const firstDay = new Date(today.getFullYear(), monthNames.indexOf(m), 1);
            const lastDay = new Date(today.getFullYear(), monthNames.indexOf(m) + 1, 0);
            var days=[]
            const weekDayOfFirstDay = firstDay.getDay()
            const weekDayOfLastDay = lastDay.getDay()
            for(var i=0;i<weekDayOfFirstDay;i++){
                days.push(null)
            }

            for(var i=1;i<=lastDay.getDate();i++){
                var date=new Date(today.getFullYear(),monthNames.indexOf(m),i)
                var dateString = date.getFullYear()+'-'+ (date.getMonth()+1)+'-'+date.getDate()

                days.push({
                    date:new Date(today.getFullYear(),monthNames.indexOf(m),i),
                    publichHoliday:this.props.publicHolidays[dateString],
                    birthDays:this.props.birthDays[dateString],
                    busy:this.props.busyDays.indexOf(dateString)>=0,
                    anniversary:this.props.anniversaries[dateString]
                })
            }
            for(var i=weekDayOfLastDay;i<6;i++){
                days.push(null)
            }
        
            var weekGroupDays=this.listToMatrix(days,7)
        
            return {
                month:m,
                weeks:weekGroupDays
            }
        })       

    }

    render(){
        
        const months =  this.createMonths(this.props.monthNames)

        return (

                 <div className="row" key='month-list'>
                    {
                        this.props.monthNames.map(m => (
                            <Month monthName={m} monthData={months[monthNames.indexOf(m)]} weekNames={this.props.weekNames} key={m}/>
                        ))
                    }
                </div>                

          )
    }
}