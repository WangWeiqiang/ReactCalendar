class Calendar extends React.Component{
    render(){
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
        const today=new Date()
        return (
            <div className="row">
                <Month month={this.props.month} monthDays={this.props.monthDays}/>
            </div>
          )
    }
}