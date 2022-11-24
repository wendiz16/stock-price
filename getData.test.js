const getData = require('./getData.js');
const timeData = [ 
    new Date("2021-05-10T00:00:00.000Z"),
    new Date("2021-05-11T00:00:00.000Z"),
    new Date("2021-05-12T00:00:00.000Z"),
    new Date("2021-05-13T00:00:00.000Z")
  ]
const stockData= [1,2,3,4]

describe("Function that test selected stock data", () => {
  it('if end date greater than data time range', () => {
    expect(getData(timeData,stockData, new Date("2021-05-10T00:00:00.000Z"), new Date("2021-05-13T10:00:00.000Z")   )).toStrictEqual( [timeData, stockData]);
    expect(getData(timeData,stockData, new Date("2021-05-10T00:00:00.000Z"), new Date("2021-05-13T10:00:00.000Z")   )).not.toStrictEqual( [timeData.slice(0,3), stockData.slice(0,3)]);
  });

  it('if end date equal to data time range', () => {
    expect(getData(timeData,stockData, new Date("2021-05-10T00:00:00.000Z"), new Date("2021-05-13T00:00:00.000Z")   )).toStrictEqual( [timeData.slice(0,3), stockData.slice(0,3)]);
    expect(getData(timeData,stockData, new Date("2021-05-10T00:00:00.000Z"), new Date("2021-05-13T00:00:00.000Z")   )).not.toStrictEqual( [timeData, stockData]);
  });

  it('if end date less than data time range', () => {
    expect(getData(timeData,stockData, new Date("2021-05-10T00:00:00.000Z"), new Date("2021-05-12T10:00:00.000Z")   )).toStrictEqual( [timeData.slice(0,3), stockData.slice(0,3)]);
    expect(getData(timeData,stockData, new Date("2021-05-10T00:00:00.000Z"), new Date("2021-05-12T10:00:00.000Z")   )).not.toStrictEqual( [timeData, stockData]);
  });


});


