const defaults={s:'0', i:'0', h:'0', dom:'*', dow:'?', m:'*', y:'*',}const rx={asterx:/^\*$/, zeroFiftynine:/^([0-5]{1}[0-9]{1}|[0-9]{1})$/, zeroTwentythree:/^([01]\d|2[0-3]|\d)$/, oneThirtyone:/^(?:[012]\d|3[0,1]|[1-9]{1})$/, weekday:/^(?:[1-7]{1}|SUN|MON|TUE|WED|THU|FRI|SAT)$/, weekdayAfterX:/^(?:[1-7]{1}|SUN|MON|TUE|WED|THU|FRI|SAT)\/(?:[012]\d|3[0,1]|[1-9]{1})$/, LW:/^LW?$/, Lx:/^(L-[012]\d|3[0,1]|[1-9]{1})$/, xL31:/^([012]\d|3[0,1]|[1-9]{1})L$/, xLweekday:/^([1-7]{1}|SUN|MON|TUE|WED|THU|FRI|SAT)L$/, nthWeekDay:/^([1-7]{1}|SUN|MON|TUE|WED|THU|FRI|SAT)\#[1-5]{1}$/, quest:/^(\?)$/, dom:/^(\?)|(\*)|()$/, dow:/^(\?)|$/, month:/^(^0?[1-9]$)|(^1[0-2]$)|(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/, year:/^(20[2-9][0-9])$/, wildCadence:/^\d*$/, splitter:/^([\d,\w]*)(-([\d\w]*)(\/([\d\w]*))?)?$/}const getRangeValidator=({mainRx, cadenceRx})=> val=>{const v=`${val}`;if(v.match(rx.asterx))return true const s=v.match(rx.splitter);if(!s)return false const starts=s[1].split(/,/), to=s[3], cadence=s[5];return(starts.length && starts.every(start=> start.match(mainRx))&&(!to ||(to.match(mainRx)&&(!cadence || !!cadence.match(cadenceRx)))))}const getValidator=rxs=> v=> rxs.find(r=>{if(typeof r==='function')return r(v)return `${v}`.match(r)})const rx059=getRangeValidator({mainRx:rx.zeroFiftynine, cadenceRx:rx.zeroFiftynine})const rx023=getRangeValidator({mainRx:rx.zeroTwentythree, cadenceRx:rx.zeroTwentythree})const rx131=getRangeValidator({mainRx:rx.oneThirtyone, cadenceRx:rx.oneThirtyone})const rxmonth=getRangeValidator({mainRx:rx.month, cadenceRx:rx.month})const rxYear=getRangeValidator({mainRx:rx.year, cadenceRx:rx.wildCadence})const rxWeekday=getRangeValidator({mainRx:rx.weekday, cadenceRx:rx.weekday})const rxDom=getValidator([rx.oneThirtyone, rx.quest, rx.asterx, rx.weekdayAfterX, rx131, rx.LW, rx.Lx, rx.xL31,])const rxDow=getValidator([rx.quest, rxWeekday, rx.xLweekday, rx.nthWeekDay])const validators={second:rx059, minute:rx059, hour:rx023, month:rxmonth, year:rxYear, dayOfMonth:rxDom, dayOfWeek:rxDow}const fieldCorrelationValidators=[{validator:({dom, dow})=> !(dow!=='?' && dom!=='?'), message:'either dom either dow must contain "?"'}]module.exports={validators, fieldCorrelationValidators, defaults}