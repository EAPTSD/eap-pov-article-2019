const Plotly = window.Plotly;

const navDots = Array.from(document.querySelectorAll('.navigation-dot'));

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

}

window.addEventListener('scroll', scrollHandler);

// We want to correctly set UI state before scrolling starts.
scrollHandler();
// For some reason (TODO: figure it out later) the page refreshes to the middle scroll position.
// This is a quick hack so I can go back to what I was doing.
// window.scrollTo(0,0);

// #### d3 chart
const renderEapBarChart = async () => {
  const chartContainerSelector = '#eap_bar_chart';

  // The raw data is an array of objects with years, level, and region keys.
  const rawData = await d3.csv('./data/dreaded-bar-anime-data-for-use.csv');

  // We want to have a lookup table. First by region, then by year, then by poverty level.
  // From that we will generate traces for plotly on the fly.
  const regionalData = rawData.reduce((acc, curr) => {
    const {
      Country: region,
      Threshold: level,
      ...years
    } = curr;
    const regionMapExists = acc.hasOwnProperty(region);
    if(!regionMapExists){
      acc[region] = {};
    }
    const regionMap = acc[region];
    Object.entries(years).forEach(([year, population]) => {
      const yearMapExistsOnRegionMap = regionMap.hasOwnProperty(year);
      if(!yearMapExistsOnRegionMap){
        regionMap[year] = {}
      }
      const yearMap = regionMap[year];
      yearMap[level] = population;
    })
    return acc
  }, {})
  // The list of years will represent each state of the chart.
  
  // NOTE: To save some serious time for this POC, we're going to hardcode the values. This can be made dynamic if need be.
  
  // We're going to need to do this manually so that we can guarantee order. 
  // NOTE: If the column names change, this will break!
  const xLabels = [ 
    'extreme',
    'moderate',
    'vulnerable',
    'secure',
    'middle_class',
    'above_mc',
  ];

  const xLabelFullMap = {
    'extreme': 'Extremely Poor',
    'moderate': 'Moderately Poor',
    'vulnerable': 'Economically Vulnerable',
    'secure': 'Economically Secure',
    'middle_class': 'Middle Class',
    'above_mc': 'Above Middle Class',
  };

  const regions = ['RoEAP', 'China'];

  const regionMap = {
    'China': {
      name: 'China',
      color: '#F18F01',
    },
    'RoEAP': {
      name: 'Rest of developing EAP',
      color: '#048BA8',
    },
  };
  const years = Object.keys(regionalData.China).sort((a,b) => a - b);
  // This is the way without the regionalData object
  // const years = Object.keys(rawData[0]).filter(key => key !== 'Country' && key !== 'Threshold').sort((a,b) => a - b)
  
  const formatDataForSlider = () => {
    const output = [];
    // We need to iterate through the years.
    years.forEach(year => {
      // For each year, we need to iterate through the xLabels
      xLabels.forEach(x => {
        // For each xLabel, we need to get the corresponding value for each region.
        // Push that object into a top level array.
        const row = {
          year,
          x,
        }
        regions.forEach(region => {
          row[region] = regionalData[region][year][x]
        })
        output.push(row)
      })
    })
    return output;
  }

  // Why the double transform? To reuse some code which expects a different shape.
  // Using https://bl.ocks.org/reinson/166bae46dd106b45cf2d77c7802768ca for reference
  const rawSliderData = formatDataForSlider();

  // Hardcoded sizes for now.
  const baseSize = {
    width: 600,
    height: 400,
    margin: {
      top: 50,
      bottom: 200,
      left: 100,
      right: 100,
    },
  }

  // Build a single chart. 
  const svg = d3
    .select(chartContainerSelector)
    .append('svg')
    .attr("width", baseSize.width + baseSize.margin.left + baseSize.margin.right)
    .attr("height", baseSize.height + baseSize.margin.top + baseSize.margin.bottom);
  let groupContainer = svg
    .append('g')
    .attr("transform", `translate(${ baseSize.margin.left },${ baseSize.margin.top })`);
  const x = d3.scaleBand().domain(xLabels.map(x => xLabelFullMap[x])).range([0, baseSize.width]).padding(0.25);
  const y = d3.scaleLinear().domain([0, 1050]).rangeRound([baseSize.height, 0]);
  const stack = d3.stack()

  const data_nest = d3
    .nest()
    .key(d => d.year)
    .entries(rawSliderData);
  
  data = data_nest.filter(d => d.key === '2002')[0].values;

  groupContainer.selectAll(".bar-chart__region")
    .data(stack.keys(regions)(data))
    .enter()
      .append("g")
      .attr("class", "bar-chart__region")
      .attr("fill", d => regionMap[d.key].color)
    .selectAll("rect")
    .data(d => d )
    .enter().append("rect")
      .attr("x", d => x(xLabelFullMap[d.data.x]))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

  groupContainer.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + baseSize.height + ")")
    .style("font", "18px sans-serif")
    .call(d3.axisBottom(x))
    .call(() => {
      groupContainer.selectAll('.axis--x .tick line')
      .attr("display", "none")
    })
    .selectAll("text")	
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    // .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

  groupContainer.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(5, "d"))
    .append("text")
    .call(() => {
      groupContainer.selectAll('.axis--y .tick line')
      .attr("x2", baseSize.width)
      .attr("stroke-opacity", 0.1)
    })
    .call(() => {
      groupContainer.selectAll('.domain')
      .attr("display", "none")
    })

  svg.append("text")
    .attr("class", "bar-chart__title")
    .attr("x", (baseSize.width / 2) + baseSize.margin.left)
    .attr("y", baseSize.margin.top)
    .attr("text-anchor", "middle")
    .attr('font-size', "35px")
    .text("2002");

  // Label for y axis
  groupContainer    
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - baseSize.margin.left)
    .attr("x",0 - ( baseSize.height / 2))
    .attr("dy", "1em")
    .attr('font-size', '24px')
    .style("text-anchor", "middle")
    .text("Population (in millions)");      

  // ##### ANIMATION CONTROLS ######
  const slider = document.getElementById("eap_bar_chart_slider")
  const playButton = document.getElementById("eap_bar_chart__button--play")
  let activeYear = years[0];
  let timer;
  let isPlaying = false;

  const updateChart = year => {
    activeYear = year;
    const data = data_nest.filter(d => d.key === year)[0].values;

    groupContainer.selectAll(".bar-chart__region")
      .data(stack.keys(regions)(data))
      .selectAll("rect")
      .data(d => d)
      .transition()
      .duration(150) 
      .delay((d, i) => i * 50)     
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("x", d => x(xLabelFullMap[d.data.x]))
      .attr("y", d => y(d[1]))
    
    svg.selectAll('.bar-chart__title').text(year)

  }

  const incrementYear = () => {
    const nextYearIndex = years.indexOf(activeYear) + 1;
    const nextYear = years[nextYearIndex] ? years[nextYearIndex] : years[0];
    activeYear = nextYear;
    slider.value = nextYear;
    updateChart(nextYear)
  }

  const onSlider = e => {
    const value = e.target.value;
    updateChart(value)
  }
  const onPlay = e => {
    if(isPlaying){
      isPlaying = false;
      clearInterval(timer)
      e.target.innerText = 'Play'
    }
    else {
      isPlaying = true;
      e.target.innerText = 'Pause'
      timer = setInterval(incrementYear, 600)
    }
  }

  slider.addEventListener('input', onSlider)
  playButton.addEventListener('click', onPlay)

  // TODO: Hover population and Tooltips and Legend and Responsiveness.
}

renderEapBarChart();