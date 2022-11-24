function getData(timeSeries, stockSeries, start, end){
  let length = timeSeries.length
  let index_begin = -1, index_end=length
  console.log("length: ", timeSeries.length)
  for (var i = 0; i< timeSeries.length; i++)
  {
    if (timeSeries[i]>=start && index_begin === -1) 
    {
      index_begin = i
      console.log("begin",index_begin)
    }
    if (timeSeries[i]>=end)
    {
      index_end = i;
      console.log("end",index_end)
      break
    }
  }
  return [timeSeries.slice(index_begin,index_end), stockSeries.slice(index_begin,index_end)]
}

module.exports = getData
