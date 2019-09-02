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

// #### Plotly chart

const eapBarChartContainer = document.getElementById('eap_bar_chart');

const renderEapBarChart = () => {
  Plotly.d3.csv('./data/dreaded-bar-anime-data-for-use.csv', rawData => {
    // The raw data is an array of objects with years, level, and region keys.

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
    const years = Object.keys(regionalData.China).sort((a,b) => a - b);
    const traceYear = years[0];
    const getTrace = (region, year) => {
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
      }

      const regionMap = {
        'China': {
          name: 'China',
          color: '#F18F01',
        },
        'RoEAP': {
          name: 'Rest of developing EAP',
          color: '#048BA8',
        }
      }

      const x = xLabels.map(xLabel => xLabelFullMap[xLabel]);
      const y = xLabels.map(xLabel => regionalData[region][year][xLabel]);

      return {
        x,
        y,
        name: regionMap[region]['name'],
        type: 'bar',
        marker: {
          color: regionMap[region]['color'],
          // Uncomment out the following if you want an outline for the bars.
          // NOTE: you may need to adjust the bargap and bargroupgap to compensate.
          // line: {
          //   width: 1,
          // }
        },
      }
    }

    const getStep = (year) => ({
      label: year,
      method: 'animate',
      args: [
        [year],
        {
          mode: 'immediate',
          transition: {
            duration: 300,
          },
          frame: {
            duration: 300,
            redraw: false,
          },
        },
      ],
    })

    const data = ['RoEAP', 'China'].map(region => getTrace(region, traceYear));
    const frames = years.map(year => ({
      name: year,
      data: ['RoEAP', 'China'].map(region => getTrace(region, year)),
    }))

    const layout = {
      title: traceYear,
      xaxis: {
        tickfont: {
          size: 14,
        },
        automargin: true,
        fixedrange: true,
      },
      yaxis: {
        title: 'Population',
        titlefont: {
          size: 18,
        },
        tickfont: {
          size: 14,
        },
        fixedrange: true,
        range: [0, 800],
      },
      barmode: 'group',
      bargap: 0.25,
      bargroupgap: .05,

      sliders: [
        {
          pad: {
            l: 0, 
            t: 100,
          },
          currentvalue: {
            // visible: true,
            prefix: 'Year: ',
            xanchor: 'right',
            font: {
              size: 18, 
              color: '#666'
            },
          },
          transition: {
            duration: 300,
          },
          steps: years.map(year => getStep(year)),
        },
      ],
      updatemenus: [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {t: 87, r: 10},
        buttons: [{
          method: 'animate',
          args: [null, {
            mode: 'immediate',
            fromcurrent: true,
            transition: {duration: 300},
            frame: {duration: 1000, redraw: false}
          }],
          label: 'Play'
        }, {
          method: 'animate',
          args: [[null], {
            mode: 'immediate',
            transition: {duration: 0},
            frame: {duration: 0, redraw: false}
          }],
          label: 'Pause'
        }]
      }],
    }

    const plotSettings = {
      data,
      layout,
      frames,
      config: {
        responsive: true,
        // displaylogo: false,
        displayModeBar: false,
      },
    };

    console.log(plotSettings)
    
    Plotly.newPlot('eap_bar_chart', plotSettings);
  })
}

renderEapBarChart();