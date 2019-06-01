const GoodFriday =(Y)=> {
    var C = Math.floor(Y/100)
    var N = Y - 19*Math.floor(Y/19)
    var K = Math.floor((C - 17)/25)
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15
    I = I - 30*Math.floor((I/30))
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11))
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4)
    J = J - 7*Math.floor(J/7)
    var L = I - J
    var M = 3 + Math.floor((L + 40)/44)
    var D = L + 28 - 31*Math.floor(M/4)
    //
    D = D-2  // subtract 2 days for Good Friday
    if (D <= 0){
    	D = D + 31	// correct day if we went back to March
    	M = 3			// correct month
    }
    M = parseInt(M, 10)
    
    D = parseInt(D, 10)
    
    return new Date(Y,M-1,D)
}


const SingaporeCNY=(Y)=>{
    var lunar = calendar.lunar2solar(Y,1,1)
    var solar = new Date(Y,lunar.cMonth-1,lunar.cDay)
    var weekDay = solar.getDay()
    var CNYHoliday = []

    CNYHoliday.push(new Date(Y,lunar.cMonth-1, lunar.cDay))
    CNYHoliday.push(new Date(Y,lunar.cMonth-1, lunar.cDay+1))
    
    return CNYHoliday
}

const SingaporeNewYear = (Y)=>{
    var d=new Date(Y,0,1);
    return (d.getDay()==7)? "1-2": "1-1"
}

const SingaporePublicHolidays={
    Data:{
        'HariRayaPuasa':{
            '1999':'1-19',
            '2000':'1-8',
            '2001':'12-16',
            '2001':'12-17',
            '2002':'12-6',
            '2003':'11-25',
            '2004':'11-14',
            '2004':'11-15',
            '2005':'11-3',
            '2006':'10-24',
            '2007':'10-13',
            '2008':'10-1',
            '2009':'9-20',
            '2009':'9-21',
            '2010':'9-10',
            '2011':'8-30',
            '2012':'8-19',
            '2012':'8-20',
            '2013':'8-8	',
            '2014':'7-28',
            '2015':'7-17',
            '2016':'7-6',
            '2017':'6-25',
            '2017':'6-26',
            '2018':'6-15',
            '2019':'6-5',
            '2020':'5-24',
            '2020':'5-25'
        },
        'HariRayaHaji':{        
            '1999':'3-28',
            '1999':'3-29',
            '2000':'3-16',
            '2001':'3-6',
            '2002':'2-23',
            '2003':'2-12',
            '2004':'2-1',
            '2004':'2-2',
            '2005':'1-21',
            '2006':'1-10',
            '2007':'12-27',
            '2008':'12-8',
            '2009':'11-27',
            '2010':'11-17',
            '2011':'11-6',
            '2011':'11-7',
            '2012':'10-26',
            '2013':'10-15',
            '2014':'10-5',
            '2014':'10-6',
            '2015':'9-24',
            '2016':'9-12',
            '2017':'9-1',
            '2018':'8-22',
            '2019':'8-11',
            '2019':'8-12',
            '2020':'7-31'
        },
        'VesakDay':{
            '1999':'5-29',
            '2000':'5-18',
            '2001':'5-7',
            '2002':'5-26',
            '2002':'5-27',
            '2003':'5-15',
            '2004':'5-2',
            '2005':'5-22',
            '2005':'5-23',
            '2006':'5-12',
            '2007':'5-31',
            '2008':'5-19',
            '2009':'5-9',
            '2010':'5-28',
            '2011':'5-17',
            '2012':'5-5',
            '2013':'5-24',
            '2014':'5-13',
            '2015':'6-1',
            '2016':'5-21',
            '2017':'5-10',
            '2018':'5-29',
            '2019':'5-19',
            '2019':'5-20',
            '2020':'5-7',
            '2021':'5-26'
        },
        'Deepavali':{
            '1999':'11-8',
            '2000':'10-26',
            '2001':'11-14',
            '2002':'11-4',
            '2003':'10-23',
            '2004':'11-11',
            '2005':'11-1',
            '2006':'10-21',
            '2007':'11-8',
            '2008':'11-27',
            '2009':'11-16',
            '2010':'11-5',
            '2011':'10-26',
            '2012':'11-13',
            '2013':'11-2',
            '2014':'10-22',
            '2015':'11-10',
            '2016':'10-29',
            '2017':'10-18',
            '2018':'11-6',
            '2019':'10-28',
            '2020':'11-14'
        }
    },
    getDate:function(festivalName,year){
        var data = this.Data[festivalName];
        var dates=[];
        if(data!=null){
            var monthDay = data[year.toString()]            
            if(monthDay!=null){
                var [month,day]=monthDay.split('-')
                dates.push(new Date(year,parseInt(month)-1,parseInt(day)))                
            }
        }
        else{
            switch(festivalName){
                case "NewYearDay":
                    dates.push(new Date(year,0,1))
                    break
                case "ChineseNewYear":
                    dates= dates.concat(SingaporeCNY(year))
                    break
                case "GoodFriday":
                    dates.push(GoodFriday(year))
                    break
                case "LabourDay":
                    dates.push(new Date(year,4,1))
                    break
                case "NationalDay":
                    dates.push(new Date(year,7,9))
                    break
                case "ChristmasDay":
                    dates.push(new Date(year,11,25))
                    break
            }
        }

        //observed
        if(dates.length==1){
            if(dates[0].getDay()==0){
                dates[0].setDate(dates[0].getDate() + 1);
            }
        }
        else{
            if(dates.length>1){
                if(dates[0].getDay()==6){
                    dates.forEach(d => {
                        d.setDate(d.getDate()+1)
                    });
                }
            }
        }
        
        return dates        
    }

}

