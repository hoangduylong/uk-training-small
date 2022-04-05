const notices = () => [
    {
        title:'CCGS08_11',
        visible: true
    },
    {
        title:'CCGS08_14',
        visible: true
    }

];

const topAlert = () => {
    return {
        title: '',
        description: 'サーバーのメンテナンス、すべての作業を保存してください' 
    };
};

const overtimes = () => [
    {
        time1:'45:00',
        time2:'21:32',
        time3:'23:02',
        time4:'',
        _rowClass:'normal'
        
    },
    {
        time1:'15:00',
        time2:'21:32',
        time3:'22:02',
        time4: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>',
    }
];

const timeStatus = () => {
    return {
        overTime: 0,
        holidayInstruction: 0,
        approved: 1,
        unApproved: 19,
        deniedNo: 0,
        remand: 0,
        appDeadlineMonth: {
            use: false,
            deadLine: '2019/05/17'
        },
        presenceDailyPer: false,
        overtimeHours: {
            hours: 1,
            min: 52
        },
        flexTime: {
            hours: 0,
            min: 0
        },
        restTime: {
            hours: 0,
            min: 0
        },
        nightWorktime: {
            hours: 0,
            min: 0
        },
        lateRetreat: 0,
        earlyRetreat: 0,
        yearlyHoliday: {
            nextTime: '2019/08/01',
            grantedDaysNo: 12.5,
            nextTimeInfo: {
                day: 0,
                hours: {
                    hours: 0,
                    min: 0
                },
                remaining: 0,
                timeYearLimit: {
                    hours: 0,
                    min: 0
                }
            },
            nextGrantDate: '2019/08/01',
            nextGrantDateInfo: {
                day: 0,
                hours: {
                    hours: 0,
                    min: 0
                },
                remaining: 0,
                timeYearLimit: {
                    hours: 0,
                    min: 0
                }
            },
            afterGrantDateInfo: {
                day: 0,
                hours: {
                    hours: 0,
                    min: 0
                },
                remaining: 0,
                timeYearLimit: {
                    hours: 0,
                    min: 0
                }
            },
            attendanceRate: 0,
            workingDays: 0,
            calculationMethod: 0,
            useSimultaneousGrant: 0,
            showGrantDate: false
        },
        reservedYearsRemainNo: {
            name: '',
            before: 0,
            after: 0,
            grantDate: '2018/12/09',
            showAfter: false
        },
        remainAlternationNoDay: -0.5,
        remainsLeft: 2,
        publicHDNo: 0,
        childRemainNo: {
            name: '',
            before: 0,
            after: 0,
            grantDate: '2019/05/17',
            showAfter: false
        },
        careLeaveNo: {
            name: '',
            before: 0,
            after: 0,
            grantDate: '2019/05/17',
            showAfter: false
        },
        extraRest: {
            hours: 0,
            min: 0
        },
        sphdramainNo: [
            {
                name: 'Pika',
                before: 0,
                after: 0,
                grantDate: '2019/05/17',
                showAfter: false
            },
            {
                name: '特別休暇 2',
                before: 0,
                after: 0,
                grantDate: '2019/05/17',
                showAfter: false
            }
        ]
    };
};

export { notices, topAlert, overtimes, timeStatus };