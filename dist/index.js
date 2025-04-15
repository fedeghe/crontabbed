/*
validations
https://www.freeformatter.com/cron-expression-generator-quartz.html


https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/tutorial-lesson-06.html
https://www.npmjs.com/package/cron-time-generator

s   [0,59]
i   [0,59]
h   [0,23]
dom [1,31]*
m   [1,12]*
dow [1(SUN), 7(SAT)]*
y   [2xxx,]*
*/

const defaults = {
    s : '0', // seconds
    i : '0', // minutes
    h : '0', // seconds
    dom : '*', // day of month
    dow : '?', // day of week
    m : '*', // month
    y : '*', // year (1970-2099) ...how 1970 :D ??????
}

// const rawValidators = {
//     year : y => {
//         var _y = parseInt(y, 10);
//         return _y - y === 0
//             && _y >= 1970
//             && _y >= 2099
//     },
//     month : m => m.match(/(^0?[1-9]$)|(^1[0-2]$)|^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/)
// }


class CronTabist {
    constructor({
        s = defaults.s, // seconds
        i = defaults.i, // minutes
        h = defaults.h, // seconds
        dom = defaults.dom, // day of month
        dow = defaults.dow, // day of week
        m = defaults.m, // month
        y = defaults.y, // year
    } = {}) {
        this.months = { min: 0, max: 11 }
        this.elements = { s, i, h, dom, m, dow, y }
    }

    static getRanger(max) {
        return n => {
            let normN = parseInt(n, 10) % max
            while (normN < 0) normN += max
            return normN
        }
    }

    range24 = CronTabist.getRanger(24)
    range12 = CronTabist.getRanger(12)
    range60 = CronTabist.getRanger(60)

    over({ s, i, h, dom, m, dow, y }) {
        this.elements = {
            s: s ?? this.elements.s,
            i: i ?? this.elements.i,
            h: h ?? this.elements.h,
            dom: dom ?? this.elements.dom,
            m: m ?? this.elements.m,
            dow: dow ?? this.elements.dow,
            y: y ?? this.elements.y,
        }
        this.descriptions = {
            s: s ?? this.elements.s,
            i: i ?? this.elements.i,
            h: h ?? this.elements.h,
            dom: dom ?? this.elements.dom,
            m: m ?? this.elements.m,
            dow: dow ?? this.elements.dow,
            y: y ?? this.elements.y,
        }
        return this;
    }
    /* seconds */
    everySecond() {
        return this.over({ s: '*'})
    }
    everyXSeconds({freq, start = 0}) {
        return this.over({ s: `${start}/${freq}` })
    }
    atSecond(s) {
        return this.over({ s })
    }
    atSecondAdd(s) {
        var current = this.elements.s.split(',')
        return this.over({ s: [...current, s].join(',') })
    }
    betweenSeconds(from, to, every) {
        return this.over({ s: `${from}-${to}${every ? `/${every}`: ''}` })
    }

    /* minutes */
    everyMinute() {
        return this.over({ i: '*'})
    }
    everyXMinutes({freq, start = 0}) {
        return this.over({ i: `${start}/${freq}` })
    }
    atMinute(i) {
        return this.over({ i })
    }
    atMinuteAdd(i) {
        var current = this.elements.i.split(',')
        return this.over({ i: [...current, i].join(',') })
    }
    betweenMinutes(from, to, every) {
        return this.over({ i: `${from}-${to}${every ? `/${every}` : ''}` })
    }

    /* hours */
    everyHour() {
        return this.over({ h: '*'})
    }
    everyXHours({freq, start = 0}) {
        return this.over({ h: `${start}/${freq}` })
    }
    atHour(h) {
        return this.over({ h })
    }
    atHourAdd(h) {
        var current = this.elements.h.split(',')
        return this.over({ h: [...current, h].join(',') })
    }
    betweenHours(from, to, every) {
        return this.over({ h: `${from}-${to}${every ? `/${every}`: ''}` })
    }

    /* dom/dow */
    everyDay(){
        return this.over({ dom: '*'})
    }
    everyXDayStartingFromYDay(x, y){
        return this.over({ dom: `${y}/${x}`, dow: '?'})
    }
    everyDayOfWeek(d) {
        return this.over({ dom: '?', dow: d })
    }   
    everyDayOfWeekAdd(d) {
        var current = this.elements.dow === defaults.dow
            ? []
            : this.elements.dow.split(',')
        return this.over({ dom: '?', dow: [...current, d].join(',') })
    }
    atDayOfMonth(dom) {
        return this.over({ dom, dow: '?' })
    }
    atDayOfMonthAdd(dom) {
        var current = this.elements.dom === defaults.dom
            ? []
            : this.elements.dom.split(',')
        return this.over({ dom: [...current, dom].join(','), dow: '?' })
    }
    onLastDayOfMonth(){
        return this.over({ dom: 'L', dow: '?' })
    }
    onLastWeekDayOfMonth(){
        return this.over({ dom: 'LW', dow: '?' })
    }
    onLastXWeekDayOfMonth(x){
        return this.over({ dom: '?', dow: `${x}L` })
    }
    onLastXDayBeforeTheEndOfTheMonth(x){
        return this.over({ dom:`L-${x}`, dow: '?' })
    }
    onClosestWorkingDayToTheXofTheMonth(x) {
        return this.over({ dom:`${x}W`, dow: '?' })
    }
    onTheNthWeekDayOfTheMonth(n,wd) {
        return this.over({ dom:'?', dow: `${wd}#${n}` })
    }

    /* month */
    everyMonth() {
        return this.over({ m: '*'})
    }
    everyXMonths({freq, start = 0}) {
        return this.over({ m: `${start}/${freq}` })
    }
    atMonth(m) {
        return this.over({ m })
    }
    atMonthAdd(m) {
        var current = this.elements.m === defaults.m
            ? []
            : this.elements.m.split(',')
        return this.over({ m: [...current, m].join(',') })
    }
    betweenMonths(from, to, every) {
        return this.over({ m: `${from}-${to}${every ? `/${every}` : ''}` })
    }

    /* year */
    everyYear() {
        return this.over({ y: '*'})
    }
    everyXYears({freq, start = 0}) {
        return this.over({ y: `${start}/${freq}` })
    }
    atYear(y) {
        return this.over({ y })
    }
    atYearAdd(y) {
        var current = this.elements.y === defaults.y
            ? []
            : this.elements.y.split(',')
        return this.over({ y: [...current, y].join(',') })
    }
    betweenYears(from, to, every) {
        return this.over({ y: `${from}-${to}${every ? `/${every}` : ''}` })
    }
    describe() {
        return [
            this.describeTime(),
            this.describeDomDowOccurrence(),
            this.describeYears()
        ].join(' of ')
    }
    describeTime() {
        return 'every second'
    }
    describeDomDowOccurrence() {
        return 'every day'
    }
    describeYears() {
        return 'every year'
    }

    validate(){
        const errors = [],
            rxSecMinHrs = /^(([0-9,]*)|([0-9]*-[0-9]*))?(\/([0-9]*))?$/;

        // dow and dom cant coexist withouth a ?
        if (this.elements.dom !== '?' && this.elements.dow !== '?') {
            errors.push('Dow and Dom cant both have a configuration');
        }
        if (!this.elements.s.match(rxSecMinHrs)) {
            errors.push('Seconds are not well formatted');
        }
        if (!this.elements.i.match(rxSecMinHrs)) {
            errors.push('Minutes are not well formatted');
        }
        if (!this.elements.h.match(rxSecMinHrs)) {
            errors.push('Hours are not well formatted');
        }

        return {
            valid: errors.length === 0,
            errors
        }
    }

    out() {
        return [
            this.elements.s,
            this.elements.i,
            this.elements.h,
            this.elements.dom,
            this.elements.m,
            this.elements.dow,
            this.elements.y,
        ]
            .filter(e => e !== undefined && e !== null)
            .join(' ')
    }

}

module.exports =  CronTabist;