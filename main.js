const ctx = document.getElementById('myChart');
// generate random stock data at fixed time interval between 2020 and 2023 
var stockData=[]
var timeData=[]
let startDate = new Date("2020-05-30T23:50:21.817Z")
let endDate = new Date("2023-05-30T23:50:21.817Z")
let nData = 7300
let deltaTime = Math.floor( ( endDate.getTime() - startDate.getTime() )/nData)
console.log("deltaTime", deltaTime, startDate.getTime());
let newDate=null
for (var i = 1; i <= nData; i++) {
   stockData.push(Math.random()*10);
   newDate = new Date(startDate.getTime()+deltaTime*i);
   timeData.push(newDate);
}
console.log(newDate)


// helper function- select data from a particular time range (user's choice)
function getData(timeSeries, stockSeries, start, end){
  let index_begin = -1, index_end=-1
  console.log("length: ", timeSeries.length)
  for (var i = 0; i< timeSeries.length; i++)
  {
    if (timeSeries[i]>=start && index_begin === -1) 
    {
      index_begin = i
      console.log("begin",index_begin)
    }
    if (timeSeries[i]>end)
    {
      index_end = i
      console.log("end",index_end)
      break
    }
  }
  return [timeSeries.slice(index_begin,index_end), stockSeries.slice(index_begin,index_end)]
}


//creating global variable for chart
let chart = null;
// creating global time zone variable for changing x axis
let timezone="America/Chicago"
timezone="UTC"

// Generate chart for start and end range, plot at specified timezone (tz)
function chartFunction(startDate,endDate, tz)
{
  let newData=getData(timeData,stockData,startDate, endDate)
  let newTimeData=newData[0]
  let newStockData=newData[1]

  //destroy chart if it has been previously created. 
  //this allows new chart with new data to be formed whenever date range changes.
  if (chart !== null)
  {
    chart.destroy()
  } 
    chart = 
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: newTimeData,
        datasets: [{
          label:"stock",
          data: newStockData,
          borderColor: "rgba(220,20,20,1)",
          backgroundColor: "rgba(220,20,20,0.5)",
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          x: {
            maxBarThickness: 10,
            type: "time",
            time: {
              unit: 'day',
              timezone: tz,
              tooltipFormat : 'YYYY-MM-DD HH:mm:SS ZZ'
            },
            ticks: {
              autoSkip: true,
              //maxTicksLimit: 10
            },
          },
          y: {
              ticks: {
                beginAtZero: true
              }
          }
        }
      }
    });

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
    console.log(startDate,endDate,label)
    chartFunction(startDate,endDate, timezone)
  }
);
});



