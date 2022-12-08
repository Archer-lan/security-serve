//获取当前时间
export function getNowDate():string{
    const date=new Date();
    let month:string|number=date.getMonth()+1;
    let strDate:string|number=date.getDate();
    if(month<=9){
        month="0"+month;
    }
    if(strDate<=9){
        strDate="0"+strDate;
    }
    return date.getFullYear()+"-"+month+"-"+strDate+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}