var stockData=[]
//stock data
var timeData=[]
let startDate = new Date("2020-05-30T23:50:21.817Z")
let endDate = new Date("2023-05-30T23:50:21.817Z")
//let interval = 730000
let interval = 7300
let deltaTime = Math.floor( ( endDate.getTime() - startDate.getTime() )/interval)
console.log("deltaTime", deltaTime, startDate.getTime());
let newDate=null
for (var i = 1; i <= interval; i++) {
   stockData.push(Math.random()*10);
   newDate = new Date(startDate.getTime()+deltaTime*i);
   timeData.push(newDate);
}
console.log(newDate)

//helper functions
function convertTZ(dates, tzString) {
  let res=[]
  for(var i = 0; i<dates.length; i++)
  {
    var nd = new Date((typeof dates[i] === "string" ? new Date(dates[i]) : dates[i]).toLocaleString("en-US", {timeZone: tzString}));   
    res.push(nd)
  }
  return res
}

function getData(timeSeries, stockSeries, start, end){
  let index_begin = -1, index_end=-1
  console.log("length: ", timeSeries.length)
  for (var i = 0; i< timeSeries.length; i++)
  {
    let dt = new Date(timeSeries[i]);
    // console.log(dt, start, timeSeries[i])
    // console.log(i,dt>start)
    if (timeSeries[i]>start && index_begin === -1) 
    {
      index_begin = i
      console.log("begin",index_begin)
    }
    if (timeSeries[i]>end)
    {
      index_end = i;
      console.log("end",index_end)
      break
    }
  }
  return [timeSeries.slice(index_begin,index_end), stockSeries.slice(index_begin,index_end)]
}



//date time picker
$(function(){
  $("#demo").daterangepicker({
    showISOWeekNumbers: true,
    timePicker: true,
    autoUpdateInput: true,
    locale: {
      cancelLabel: "Clear",
      format: "MMMM DD, YYYY @ h:mm A",
      separator: " - ",
      applyLabel: "Apply",
      cancelLabel: "Cancel",
      fromLabel: "From",
      toLabel: "To",
      customRangeLabel: "Custom",
      weekLabel: "W",
      daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      firstDay: 1
    },
    linkedCalendars: true,
    showCustomRangeLabel: false,
    startDate: 1,
    endDate: "December 31, 2016 @ h:mm A",
    opens: "center"
  },
  function(startDate,endDate, label)
  {
    let rangeStart=startDate
    let rangeEnd=endDate
    let newData=getData(timeData,stockData,rangeStart, rangeEnd)
    let newTimeData=newData[0]
    let newStockData=newData[1]

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: convertTZ(newTimeData,timezone),
        datasets: [{
          label: 'stock',
          data: newStockData,
          borderWidth: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x:{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 20
            },
            // type: 'time',
            // time: {
              // unit: 'hour',
              // min: rangeStart,
              // max: rangeEnd,
              // displayFormats: {
                  // hour: 'HH'
              // },
              // parser: function (utcMoment) {
                  // return utcMoment.utcOffset('+0100');
              // }                
            // }
          },
        },
      }
    });
  }

);
});

const ctx = document.getElementById('myChart');


let rangeStart= new Date("2021-05-10T00:00:00.000Z")
let rangeEnd= new Date("2021-06-10T00:00:00.000Z")
let timezone="UTC"


console.log(getData(timeData,stockData,rangeStart, rangeEnd))


