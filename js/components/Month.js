class Month extends React.Component{
    render(){
        const weekNames =["Su","M","Tu","W","Th","F","Sa"]            
        return(            
            <div className='box-week col-md-4 col-sm-6' key={this.props.month}>
                <h1  key={'header-'+this.props.month}>{this.props.month}</h1>
                <table className='tb-week' key={'tb-'+this.props.month}>
                    <thead  key={'th-'+this.props.month}>
                    <tr  key={'th-tr-'+this.props.month}>
                        <th key={'th-th-0'+this.props.month}>{weekNames[0]}</th>
                        <th key={'th-th-1'+this.props.month}>{weekNames[1]}</th>
                        <th key={'th-th-2'+this.props.month}>{weekNames[2]}</th>
                        <th key={'th-th-3'+this.props.month}>{weekNames[3]}</th>
                        <th key={'th-th-4'+this.props.month}>{weekNames[4]}</th>
                        <th key={'th-th-5'+this.props.month}>{weekNames[5]}</th>
                        <th key={'th-th-6'+this.props.month}>{weekNames[6]}</th>
                    </tr>
                    </thead>
                    <tbody  key={'tbody-'+this.props.month}>
                    {
                        this.props.monthDays.map((week,index)=>(
                        
                            
                            <Week weekDays={week} weekIndex={index} month={this.props.month}/>
                
                        ))
                    }
                    </tbody>
                </table>
            </div>            
        )
    }
}