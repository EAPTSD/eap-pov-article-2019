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
    container: '#section-3',
    offset: 0.5,
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

const transformDataforDisplay = (dataset) => {
  const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].y;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.x, y: (datum.y / totals[i]) * 100 };
    });
  });
};

const formatHigherPovertyDataV2 = (array) => {
  const structuredArray = array.map((d, i) => {
    const obj = {};
    const arrObj = Object.keys(d).map((year, i) => {
      return (obj[i] = { x: parseInt(year) });
    });
    Object.values(d).map((value, i) => {
      return (arrObj[i].y = parseFloat(value));
    });
    return i <= 5 ? arrObj.slice(0, 5) : null;
  });

  return transformDataforDisplay(structuredArray);
};

const extractDataIntoYears = data => {
  const { columns, ...rows } = data;
  const years = columns.filter(column => column !== 'Pline');
  const yearData = {};
  const rowsArray = Object.values(rows)
  years.map(year => {
    yearData[year] = [];
    rowsArray.map(row => {
      yearData[year].push(row[year])
    })
  })
  return yearData;
}


(function(){
  const margin = {top: 10, right: 30, bottom: 0, left: 40},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select(".chart-2")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
            
  const chartData = [];
  d3.csv('./data/EAP_higher_pov_V2.csv').then(data => {
    const extracted = extractDataIntoYears(data);
    const columns = extracted['2002'];

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
      .data(columns)
      .enter()
      .append("rect")
        .attr("x", (d, i) => i * 21)
        .attr("width", 20)
        .attr("y", function(d) { return height - ((d / 1000) * height); })
        .attr("height", d => {
          return (d / 1000) * height;
        })
        .style("fill", "#69b3a2")
  })
})()