const charts = ['chart-1'];

const chartElements = charts.map(chartId => document.getElementById(chartId));

const navDots = Array.from(document.querySelectorAll('.navigation-dot'));

const isChartVisible = chart => {
  const rect = chart.getBoundingClientRect();
  const { top, bottom } = rect;
  const topIsVisible = top >= 0 && top <= window.innerHeight;
  const bottomIsVisible = bottom >= 0 && bottom <= window.innerHeight;
  return topIsVisible && bottomIsVisible;
}

const getActiveSection = () => {
  const sortedNavDots = navDots.sort((a,b) => {
    const sectionA = document.querySelector(a.hash);
    const sectionB = document.querySelector(b.hash);
    const a_absDistanceToScreenTop = Math.abs(window.scrollY - sectionA.offsetTop);
    const b_absDistanceToScreenTop = Math.abs(window.scrollY - sectionB.offsetTop);
    return a_absDistanceToScreenTop - b_absDistanceToScreenTop;
  })
  return sortedNavDots[0];
}

const scrollHandler = e => {
  // Highlight correct navigation dot.
  // 1. Get Active Dot
  const activeSection = getActiveSection();
  // 2. Toggle active for active dot only.
  for(let i = 0; i < navDots.length; i++){
    const navDot = navDots[i];
    navDot.classList.remove('active');
  }
  activeSection.classList.add('active');

  // Wake up visible charts!
  for(let i = 0; i < chartElements.length; i++){
    const chartElement = chartElements[i];
    const isVisible = isChartVisible(chartElement);
    if(isVisible){
      chartElement.classList.remove('hidden');
    }
    else {
      chartElement.classList.add('hidden');
    }
  }
}

window.addEventListener('scroll', scrollHandler);

// We want to correctly set UI state before scrolling starts.
scrollHandler();

// #################################
// Scrollerama for sticky scrolling
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
  .setup({
    step: 'section .step',
    text: "scroll__text",
    graphic: "scroll__graphic",
    container: '#section-4',
    offset: 0.2,
  })
  .onStepEnter(response => {
    // { element, index, direction }
    response.element.classList.add('active');
  })
  .onStepExit(response => {
    // { element, index, direction }
    response.element.classList.remove('active');
  })

// setup resize event
window.addEventListener('resize', scroller.resize);

// ################################
// d3 Charts

// 1. EAP Poverty By Year - Stacked Area Chart
// Using this pattern largely: https://medium.com/@louisemoxy/how-to-create-a-stacked-area-chart-with-d3-28a2fee0b8ca
const renderEAPPovertyChart = async () => {
  // TODO: Pick colors
  const colors = [
    "orangered",
    "orange",
    "yellow",
    "lightgreen",
    "green",
  ];
  const margin = {top: 50, right: 250, bottom: 140, left: 100};
  const strokeWidth = 1;

  const svg = d3
    .select("#EAP_breakdown_yearly")
    .append("svg")
    .attr("height", 600)
    .attr("width", 1000)

  const chart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const width = +svg.attr("width") - margin.left - margin.right - strokeWidth * 2;
  const height = +svg.attr("height") - margin.top - margin.bottom;

  const group = chart
    .append("g")
    .attr("transform", `translate(-${margin.left - strokeWidth},-${margin.top})`);

  // NOTE: The csv data is incorrectly formatted for our purposes. I manually reformatted some for testing.
  const data = await d3.csv('./data/EAP_breakdown_yearly/reformatted.csv');
  // We want all the groups except the year (which is our x axis value)
  const keys = data.columns.slice(1);
  const stack = d3.stack().keys(keys);
  const stackedValues = stack(data);
  const stackedData = stackedValues.map((layer, index) => {
    const currentStack = layer.map((d, i) => ({
        values: d,
        year: data[i].year
    }));  
    return currentStack
  })

  // Create scales
  // TODO: Ask why the total population counts are the same each year. It looks proportionate, but seems
  // to claim absolute values.
  const yScale = d3
    .scaleLinear()
    .range([height + margin.top, 0])
    .domain([0, d3.max(stackedValues[stackedValues.length - 1], dp => dp[1])]);
  const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data, dataPoint => dataPoint.year));

  const area = d3
    .area()
    .x(dataPoint => xScale(dataPoint.year))
    .y0(dataPoint => yScale(dataPoint.values[0]))
    .y1(dataPoint => yScale(dataPoint.values[1]));

  const series = group
    .selectAll(".series")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("class", "series");

  series
    .append("path")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .style("fill", (d, i) => colors[i])
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", strokeWidth)
    .attr("d", d => area(d));

  // Add the X Axis
  chart
    .append("g")
    .attr("transform", `translate(0,${height + margin.top})`)
    .call(d3.axisBottom(xScale).ticks(data.length, '.4'));

  // Add the Y Axis
  chart
    .append("g")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));

  // Add y axis label
  chart
    .append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -100)
    .attr("y", -70)
    .attr("dy", "0.3408em")
    .attr("fill", "#000")
    .text("Population (in Millions)")
    .style("font-size", "25px")

  // Add title text
  // TODO: Remove this from chart and just add it as a regular element.
  chart
    .append("text")
    .attr("x", 0)
    .attr("y", -40)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("The population in developing EAP is shifting towards higher economic classes")
    .style("font", "23px avenir")
    .style("fill", "#000000");
  
}

// For now, we'll render all charts immediately. If it gets slow we can always lazy render them. (we can also just convert the
// static charts to images too of course.)
renderEAPPovertyChart()

// For some reason (TODO: figure it out later) the page refreshes to the middle scroll position.
// This is a quick hack so I can go back to what I was doing.
window.scrollTo(0,0);
