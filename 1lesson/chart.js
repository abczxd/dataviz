console.log("Hello world!");

async function drawLineChart() {
	
console.log("drawLineChart");
const data = await d3.json("my_weather_data.json");
console.log(data);
const yAccessor = d => d.temperatureMax;
const yAccessor1 = d => d.temperatureMin;
const yAccessorMid = d => (d.temperatureMax + d.temperatureMin) / 2;
const yAccessorDis = d => {
	const mid = (d.temperatureMax + d.temperatureMin) / 2;
	const max_2 = Math.pow((d.temperatureMax - mid),2);
	const min_2 = Math.pow((d.temperatureMin - mid),2);
	return (max_2 + min_2) / 2
	};



const dateParser = d3.timeParse("%Y-%m-%d");
function xAccesor(d) {
      return dateParser(d.date);
  }

let dimensions = {
  width: window.innerWidth*0.9,
  height: 400,
  margin: {
    top: 15,
    right: 15,
    bottom:40,
    left:60,
  },
}

dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

const wrapper = d3.select("#wrapper");
const svg = wrapper.append("svg");
svg.attr("width",dimensions.width);
svg.attr("height", dimensions.height);

const bounds = svg.append("g").style("transform",`translate(${dimensions.margin.left},${dimensions.margin.top})`);
// console.log(dimensions);

const yScale = d3.scaleLinear()
  .domain(d3.extent(data,yAccessorDis))
  .range([dimensions.boundedHeight,0]);

const limitTemperatureVal = yScale(32);

const limitTemperature = bounds.append("rect")
  .attr("x",0)
  .attr("width", dimensions.boundedWidth)
  .attr("y",limitTemperatureVal)
  .attr("height", dimensions.boundedHeight - limitTemperatureVal)
  .attr("fill","#eeeeee");

const xScale = d3.scaleTime()
  .domain(d3.extent(data, xAccesor))
  .range([0, dimensions.boundedWidth])

const lineGenerator = d3.line()
  .x(d=>xScale(xAccesor(d)))
  .y(d=>yScale(yAccessor(d)))
  
const lineGenerator1 = d3.line()
  .x(d=>xScale(xAccesor(d)))
  .y(d=>yScale(yAccessor1(d)))
  
const lineGeneratorMid = d3.line()
  .x(d=>xScale(xAccesor(d)))
  .y(d=>yScale(yAccessorMid(d)))
  
const lineGeneratorDis = d3.line()
  .x(d=>xScale(xAccesor(d)))
  .y(d=>yScale(yAccessorDis(d)))

const line = bounds.append("path")
  .attr("d",lineGenerator(data))
  .attr("fill","none")
  .attr("stroke","#af9999")
  .attr("stroke-width", 2)
  
const line1 = bounds.append("path")
  .attr("d",lineGenerator1(data))
  .attr("fill","none")
  .attr("stroke","#ff00ff")
  .attr("stroke-width", 2)
  
const lineMid = bounds.append("path")
  .attr("d",lineGeneratorMid(data))
  .attr("fill","none")
  .attr("stroke","#0000ff")
  .attr("stroke-width", 2)
  
const lineDis = bounds.append("path")
  .attr("d",lineGeneratorDis(data))
  .attr("fill","none")
  .attr("stroke","#00ffff")
  .attr("stroke-width", 2)

const yAxisGenerator = d3.axisLeft()
  .scale(yScale);

const xAxisGenertor = d3.axisBottom()
  .scale(xScale);

const yAxis = bounds.append("g").call(yAxisGenerator);

const xAxis = bounds.append("g").call(xAxisGenertor)
  .style("transform",`translateY(${dimensions.boundedHeight}px)`)

//console.log(myTemp1,myTemp2);


}


drawLineChart();
