const navDots = Array.from(document.querySelectorAll('.navigation-dot'));
const topojson = window.topojson;

const getActiveSection = () => {
  const sortedNavDots = navDots.sort((a, b) => {
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
  for (let i = 0; i < navDots.length; i++) {
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
    if (!regionMapExists) {
      acc[region] = {};
    }
    const regionMap = acc[region];
    Object.entries(years).forEach(([year, population]) => {
      const yearMapExistsOnRegionMap = regionMap.hasOwnProperty(year);
      if (!yearMapExistsOnRegionMap) {
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
    'extreme': 'Extreme Poor',
    'moderate': 'Moderate Poor',
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
  const years = Object.keys(regionalData.China).sort((a, b) => a - b);
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
    tooltip: {
      fontSize: 14,
      width: 120,
      height: 40,
      posX: 50,
      posY: 0,
      textOffset: {
        x: 10,
        y: 0,
      },
    }
  }

  // Build a single chart. 
  const svg = d3
    .select(chartContainerSelector)
    .append('svg')
    .attr("width", baseSize.width + baseSize.margin.left + baseSize.margin.right)
    .attr("height", baseSize.height + baseSize.margin.top + baseSize.margin.bottom);

  let groupContainer = svg
    .append('g')
    .attr("transform", `translate(${baseSize.margin.left},${baseSize.margin.top})`);

  const x = d3.scaleBand().domain(xLabels.map(x => xLabelFullMap[x])).range([0, baseSize.width]).padding(0.25);
  const y = d3.scaleLinear().domain([0, 1050]).rangeRound([baseSize.height, 0]);
  const stack = d3.stack();

  const data_nest = d3
    .nest()
    .key(d => d.year)
    .entries(rawSliderData);

  data = data_nest.filter(d => d.key === '2002')[0].values;

  const highlightGroup = groupName => {
    // Turn all bars and legend transparent (but not tooltip)
    d3.selectAll(".bar-chart__legend-icon").style("opacity", 0.3)
    d3.selectAll(".bar-chart__region-bar").style("opacity", 0.3)
    // Recolor the ones to highlight
    d3.selectAll(`.bar-chart__region--${groupName} rect`).style("opacity", 1)
    d3.selectAll(`.bar-chart__legend-icon--${groupName}`).style("opacity", 1)
  }

  const mouseoverBar = function (d) {
    // Reveal the tooltip container.
    d3.selectAll('.bar-chart__tooltip').style("display", null);

    // Find the value that this group was generated from (ie the region)
    // From https://www.d3-graph-gallery.com/graph/barplot_stacked_highlight.html
    const groupName = d3.select(this.parentNode).datum().key;
    highlightGroup(groupName);
  }

  const mouseleaveBar = function (d) {
    d3.selectAll('.bar-chart__tooltip').style("display", "none");
    d3.selectAll("rect").style("opacity", 1)
  }

  function onMousemove(d) {
    const activeRegion = d3.select(this.parentNode).datum().key
    const { data } = d;
    // We want to draw the values for both bars (so that bars that are miniscule and hard to select are still available
    // to show values)
    // Since there are two known and fixed values, we'll do this manually. But it would make sense to use a loop
    // for dynamism in most cases.
    // We also want to highlight the active region so it's clear which bar is being hovered.

    // 1. Reposition the tooltip above the mouse's current location with an offset.
    const xPosition = d3.mouse(this)[0] + baseSize.tooltip.posX;
    const yPosition = d3.mouse(this)[1] + baseSize.tooltip.posY;
    const tooltip = d3.selectAll('.bar-chart__tooltip');
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");

    // 2. Render China
    tooltip
      .select(".bar-chart__tooltip-text--China")
      .text(`China: ${parseFloat(data.China, 10).toFixed(2)}m`)
      .attr("font-weight", "normal")
    // 3. Render RoEAP
    tooltip
      .select(".bar-chart__tooltip-text--RoEAP")
      .text(`RoEAP: ${parseFloat(data.RoEAP, 10).toFixed(2)}m`)
      .attr("font-weight", "normal")
    // 4. Highlight active region
    tooltip
      .select(`.bar-chart__tooltip-text--${activeRegion}`)
      .attr("font-weight", "bolder")
  }


  groupContainer.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + baseSize.height + ")")
    .style("font", "16px sans-serif")
    .attr("font-family", "Lato")
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

  groupContainer.selectAll(".bar-chart__region")
    .data(stack.keys(regions)(data))
    .enter()
    .append("g")
    .attr("class", d => "bar-chart__region bar-chart__region--" + d.key)
    .attr("fill", d => regionMap[d.key].color)
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr("class", "bar-chart__region-bar")
    .attr("x", d => x(xLabelFullMap[d.data.x]))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    .on("mousemove", onMousemove)
    .on("mouseover", mouseoverBar)
    // Mouseout vs mouseleave??
    .on("mouseleave", mouseleaveBar)


  // Main Title text
  svg.append("text")
    .attr("class", "bar-chart__title")
    .attr("x", (baseSize.width / 2) + baseSize.margin.left)
    .attr("y", baseSize.margin.top)
    .attr("text-anchor", "middle")
    .attr("font-family", "Lato")
    .attr('font-size', "24px")
    .text("2002");

  // Label for y axis
  groupContainer
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - baseSize.margin.left)
    .attr("x", 0 - (baseSize.height / 2))
    .attr("dy", "1em")
    .attr("font-family", "Lato")
    .attr('font-size', '24px')
    .style("text-anchor", "middle")
    .text("Population (in millions)");

  const legend = groupContainer.append("g")
    .attr("font-family", "Lato")
    .attr("font-size", 14)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(regions.slice().reverse())
    .enter().append("g")
    .attr("transform", function (d, i) { return "translate(0," + ((i * 26) + 30) + ")"; });

  legend.append("rect")
    .attr("font-family", "Lato")
    .attr("x", baseSize.width - 22)
    .attr("class", d => `bar-chart__legend-icon bar-chart__legend-icon--${d}`)
    .attr("width", 22)
    .attr("height", 22)
    .attr("fill", d => regionMap[d]['color'])
    .on("mouseover", d => highlightGroup(d))
    .on("mouseleave", mouseleaveBar)

  legend.append("text")
    .attr("font-family", "Lato")
    .attr("x", baseSize.width - 30)
    .attr("y", 9.5)
    .attr("dy", "0.5em")
    .text(d => regionMap[d]['name']);

  // The tooltip box will initially be hidden.
  // It is a floating box we will move to track the mouse while it
  // is over the graph, but only reveal when hovering over a specific bar.
  const tooltip = svg.append("g")
    .attr("class", "bar-chart__tooltip")
    .style("display", "none");

  tooltip.append("rect")
    .attr("width", baseSize.tooltip.width)
    .attr("height", baseSize.tooltip.height)
    .attr("fill", "#DDD")
    .style("opacity", .5);

  tooltip.append("text")
    .attr("x", baseSize.tooltip.textOffset.x)
    .attr("dy", "1.1em")
    // NOTE: This is manual.
    // I don't think it's a good use of abstraction to use the data/enter pattern
    // for a known set of two. n.b. This breaks if the column headers change.
    .attr("class", "bar-chart__tooltip--text bar-chart__tooltip-text--China")
    .style("text-anchor", "left")
    .attr("font-size", `${baseSize.tooltip.fontSize}px`)
  tooltip.append("text")
    .attr("x", baseSize.tooltip.textOffset.x)
    .attr("dy", "2.4em")
    .attr("class", "bar-chart__tooltip--text bar-chart__tooltip-text--RoEAP")
    .style("text-anchor", "left")
    .attr("font-size", `${baseSize.tooltip.fontSize}px`)

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
    if (isPlaying) {
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

  // TODO: Responsiveness.
}

renderEapBarChart();

const renderMongoliaChoropleth = async () => {
  const labelMap = {
    // Imp_0_c,
    // Imp_1_c,
    // Imp_2_c,
    // Imp_3_c,
    // Imp_4_c,
    // Imp_5_c,
    // Imp_6_c,
    // Impi_0,
    // Impi_1,
    // Impi_2,
    // Impi_3,
    // Impi_4,
    // Impi_5,
    // Impi_6,
    countryCode: 'cntrycd',
    countryName: 'cntrynm',
    regionName: 'id',
    monetaryPovertyCountry: 'mpi1_c',
    monetaryPovertyRegion: 'mpi1_s',
    eduAttainPovertyCountry: 'mpi2a_c',
    eduAttainPovertyRegion: 'mpi2a_s',
    eduEnrollPovertyCountry: 'mpi2b_c',
    eduEnrollPovertyRegion: 'mpi2b_s',
    // electricityPovertyCountry: 'mpi3a_c',
    // electricityPovertyRegion: 'mpi3a_s',
    waterPovertyCountry: 'mpi3b_c',
    waterPovertyRegion: 'mpi3b_s',
    sanitationPovertyCountry: 'mpi3c_c',
    sanitationPovertyRegion: 'mpi3c_s',
    // npr190_c,
    // npr190_s,
    // npr320_c,
    // npr320_s,
    // npr550_c,
    // npr550_s,
    // pop_c,
    // pop_s,
    // pr190_c,
    // pr190_s,
    // pr320_c,
    // pr320_s,
    // pr550_c,
    // pr550_s,
    // uniqid,
  }
  
  const baseSize = {
    container: {
      width: 800,
      height: 610
    },
    tooltip: {
      fontSize: 14,
      width: 120,
      height: 200,
      posX: 20,
      posY: 20,
      textOffset: {
        x: 10,
        y: 20,
      },
    },
  }

  // Stroke width is currently unnecessary (they are all the same). Leaving it in in case the requirements change.
  const countrySettings = {
    'MNG': {
      label: 'Mongolia',
      scale: 1300,
      positionOffset: {
        x: -15,
        y: 0,
      },
      strokeWidth: .2,
    },
    'PNG': {
      label: 'Papua New Guinea',
      scale: 2800,
      positionOffset: {
        x: -160,
        y: 0,
      },
      strokeWidth: .2,
    },
    'PHL': {
      label: 'Philippines',
      scale: 1800,
      positionOffset: {
        x: 30,
        y: 20,
      },
      strokeWidth: .2,
    },
    'IDN': {
      label: 'Indonesia',
      scale: 900,
      positionOffset: {
        x: -10,
        y: 0,
      },
      strokeWidth: .2,
    },
    'THA': {
      label: 'Thailand',
      scale: 2000,
      positionOffset: {
        x: 0,
        y: -70,
      },
      strokeWidth: .2,
    },
    'SLB': {
      label: 'Solomon Islands',
      scale: 3600,
      positionOffset: {
        x: -140,
        y: -50,
      },
      strokeWidth: .2,
    },
    'LAO': {
      label: 'Lao PDR',
      scale: 3200,
      positionOffset: {
        x: 0,
        y: -20,
      },
      strokeWidth: .2,
    },
    'VNM': {
      label: 'Vietnam',
      scale: 1900,
      positionOffset: {
        x: 0,
        y: -20,
      },
      strokeWidth: .2,
    },
    'MMR': {
      label: 'Myanmar',
      scale: 1500,
      positionOffset: {
        x: 0,
        y: -50,
      },
      strokeWidth: .2,
    },
    'VUT': {
      label: 'Vanuatu',
      scale: 3800,
      positionOffset: {
        x: 0,
        y: -20,
      },
      strokeWidth: .2,
    }
  }

  // No China, Cambodia, add Malaysia later, check Fiji remote islands

  const initialCountryCode = 'MNG';
  const formId = 'choropleth_poverty_selector';
  const form = document.getElementById(formId);

  const povertySelector = '#choropleth_poverty_chart';
  const countrySelectorId = 'choropleth_country_selector';

  const rawJson = await d3.json('./data/ChoroplethData/eap_subnatid_povdata_simplified.json');

  const allEapFeatures = topojson.feature(rawJson, rawJson.objects.eap_subnatid_povdata);

  const renderMap = countryCode => {
    const countryFeatures = {
      features: allEapFeatures.features.filter(feature => feature.properties[labelMap.countryCode] === countryCode),
      type: 'FeatureCollection',
    }
  
    const center = d3.geoPath().centroid(countryFeatures)
  
    const projection = d3
      .geoMercator()
      .scale(countrySettings[countryCode].scale)
      .center(center)
      .translate( [baseSize.container.width / 2, baseSize.container.height / 2 ] )
  
    const path = d3.geoPath().projection(projection);
  
    const mapDataToColor = d3.scaleSequential(d3.interpolateRdYlGn).domain([0, 100]);
    const strokeColor = '#fff';
  
    const onMouseoverRegion = function (region) {
      // Get current poverty type being visualized
      // const selectionType = form.poverty_measure.value;
      // const data = region.properties[selectionType];
      // const colorValue = d3.scaleSequential(d3.interpolateGreys).domain([0, 100])(data)
      d3.select(this)
        // .attr('fill', '#777')
        .attr('stroke-width', 2)
        .attr("stroke", "#DDD")

      // Reveal the tooltip container.
      d3.selectAll('.poverty-map__tooltip').style("display", null);
    }

    const onMouseleaveRegion = function (region) {
      // Get current poverty type being visualized
      // const selectionType = form.poverty_measure.value;
      // const data = region.properties[selectionType]
      // const colorValue = mapDataToColor(100 - data)
      d3.select(this)
        // .attr('fill', colorValue)
        .attr('stroke-width', countrySettings[region.properties.cntrycd].strokeWidth);
      
      d3.selectAll('.poverty-map__tooltip').style("display", "none");
    }

    function onMousemove(region) {
      const regionName = region.properties[labelMap.regionName];
      const selectionType = form.poverty_measure.value;
      const data = region.properties[selectionType];
      const country = countrySettings[region.properties.cntrycd]
      const { positionOffset } = country;
      // We want to draw the values for both bars (so that bars that are miniscule and hard to select are still available
      // to show values)
      // Since there are two known and fixed values, we'll do this manually. But it would make sense to use a loop
      // for dynamism in most cases.
      // We also want to highlight the active region so it's clear which bar is being hovered.
  
      // 1. Reposition the tooltip above the mouse's current location with an offset.
      const xPosition = d3.mouse(this)[0] + baseSize.tooltip.posX + positionOffset.x;
      const yPosition = d3.mouse(this)[1] + baseSize.tooltip.posY + positionOffset.y;
      const tooltip = d3.selectAll('.poverty-map__tooltip');
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.selectAll('text').remove();
  
      tooltip.append("text")
        .attr("x", baseSize.tooltip.textOffset.x)
        .attr("y", baseSize.tooltip.textOffset.y)
        .attr("class", "poverty-map__tooltip--text")
        .style("text-anchor", "left")
        .attr("font-size", `${ baseSize.tooltip.fontSize + 2 }px`)
        .text(`${ regionName }`)
      tooltip.append("text")
        .attr("x", baseSize.tooltip.textOffset.x)
        .attr("y", baseSize.tooltip.textOffset.y * 2)
        .attr("class", "poverty-map__tooltip--text")
        .style("text-anchor", "left")
        .attr("font-size", `${ baseSize.tooltip.fontSize + 2 }px`)
        .text(`${ data }`)
    }
  

    // Clear contents of SVG
    d3
      .select(povertySelector)
      .selectAll('*')
      .remove()
  
    const svg = d3
      .select(povertySelector)
      .append("svg")
      .attr("viewBox", [0, 0, baseSize.container.width, baseSize.container.height])
      .attr("height", baseSize.container.height)
      .attr("width", baseSize.container.width)
      .style("background", "black")
  
    const regions = svg
      .append("g")
      .attr("transform", `translate(${ countrySettings[countryCode].positionOffset.x }, ${ countrySettings[countryCode].positionOffset.y })`)
      .selectAll("path")
      .data(countryFeatures.features)
      .join("path")
        .attr('class', "poverty-map__sub-region")
        .attr("fill", d => {
          const value = d.properties[labelMap.monetaryPovertyRegion];
          // Low is good and there isn't a chromatic scale that goes green to blue.
          const invertedValue = 100 - value;
          return mapDataToColor(invertedValue);
        })
        .attr("stroke", strokeColor)
        .attr('stroke-width', countrySettings[countryCode].strokeWidth)
        .attr("d", path)
        .on('mouseover', onMouseoverRegion)
        .on('mouseleave', onMouseleaveRegion)
        .on('mousemove', onMousemove)
    
    // The tooltip box will initially be hidden.
    // It is a floating box we will move to track the mouse while it
    // is over the graph, but only reveal when hovering over a specific bar.
    const tooltip = svg.append("g")
      .attr("class", "poverty-map__tooltip")
      .style("display", "none");

    tooltip.append("rect")
      .attr("width", baseSize.tooltip.width)
      .attr("height", baseSize.tooltip.height)
      .attr("fill", "#DDD")
      .style("opacity", .5);

    
    const onFormChange = e => {
      const buttonValue = e.target.value;
      regions
        .attr("fill", d => {
          const value = d.properties[buttonValue];
          // Low is good and there isn't a chromatic scale that goes green to blue.
          const invertedValue = 100 - value;
          return mapDataToColor(invertedValue);
        })
    }
    form.addEventListener('change', onFormChange);
  }

  // Dyanamically build country selector if element exists.
  const countrySelectorElement = document.getElementById(countrySelectorId);
  if(countrySelectorElement){
    const countryCodes = Object.keys(countrySettings);
    countryCodes.forEach(countryCode => {
      const option = document.createElement('option');
      option.value = countryCode;
      option.innerText = countrySettings[countryCode].label;
      countrySelectorElement.appendChild(option)
    })
    countrySelectorElement.addEventListener('change', e => {
      const countryCode = e.target.value;
      renderMap(countryCode);
    })
  }

  renderMap(initialCountryCode);
}

renderMongoliaChoropleth('MNG');