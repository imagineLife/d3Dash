// Build Variables
  const vars = {
    xLabel : 'War',
    yLabel : 'Number Of Deaths',
    margin : { left: 120, right: 70, top: 20, bottom: 220 }
  };

  const xValFromData = d => d.WarName;
  const yValFromData = d => +d.TotalDeaths;

// D3 select The elements & convert to vars
  let chartDiv = document.getElementById("chartDiv");
  let svg = d3.select(chartDiv).append("svg");
  let gObj = svg.append('g').attr('class', 'gWrapper');
  let bars = gObj.selectAll('rect');
  let checkBox = d3.select("input");

//Tooltip
  let tooltipDiv = d3.select("body").append("div").attr("class", "toolTip");


// X-Scale, horizontalScale
//setting PADDING and SCALE-TYPE
  const xScale = d3.scaleBand()
    .paddingInner(0.3)
    .paddingOuter(0.2);

// Y-Scale, verticalScale
//setting SCALE-TYPE
  const yScale = d3.scaleLinear();
  const yTicks = 10;


// Extract the width and height that was computed by CSS.
  let resizedWidth = chartDiv.clientWidth;
  let resizedHeight = chartDiv.clientHeight;

  const widthLessMargins = resizedWidth - vars.margin.left - vars.margin.right;
  const heightLessMargins = resizedHeight - vars.margin.top - vars.margin.bottom;

//set svg height & width
  svg.attrs({
    "width" : resizedWidth,
    "height" : resizedHeight
  });

// Set vars for more d3 selections
//attach a g to the svg
  gObj.attr('transform', `translate(${vars.margin.left},${vars.margin.top})`);

//attach another g as xAxisG to the 'parent' g
  const xAxisG = gObj.append('g')
      .attrs({
        'transform': `translate(0, ${heightLessMargins})`,
        'class': 'xAxisClass'

      });

//attach another g as yAxisG to the 'parent' g
  const yAxisG = gObj.append('g')
    .style('class', 'yAxisClass');

  let xAxisLabel = xAxisG.append('text');
  let yAxisLabel = yAxisG.append('text');

/* add to the xAxis & yAxis
text, class, & x/y placement

TRANSFORM the Axis Text
*/
  xAxisLabel
      .attrs({
        'class' :'x axis-label',
        'x' : widthLessMargins / 2,
        'y' : resizedHeight * .1
      })
      .text(vars.xLabel);


    yAxisLabel.attrs({
        'class' : 'y axis-label',
        'x' : -heightLessMargins / 2,
        'y' : -vars.margin.left / 1.75,
        'transform' : `rotate(-90)`
      })
      .style('text-anchor', 'middle')
      .text(vars.yLabel);

// X-AXIS
//via D3
  const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickPadding(15)
    .tickSize(-heightLessMargins);



// Y-AXIS
//via D3
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(yTicks)
    .tickPadding(15)
    .tickFormat(d3.format('.2s'))
    .tickSize(-widthLessMargins);


// Parse through data,
  d3.json('data.json', data => {

    data.sort((a, b) => b.TotalDeaths - a.TotalDeaths);

    first5 = data.slice(2,14);

    /*
     xScale Assignment 
      DOMAIN = data
      RANGE = pixel-length, missing here, in resize
    */

   xScale
      .domain(first5.map(xValFromData))

    /*
     yScale Assignment 
      DOMAIN = data
      RANGE = pixel-length, missing here, in resize
    */
    yScale
      .domain([0, d3.max(first5, yValFromData)])
      .nice(yTicks);

    /*
      BARS
      Put the DATA from D3
      into rectangles
    */
    bars.data(first5)
      .enter().append('rect')
        .attrs({
          'x' : d => xScale(d.WarName),
          'y' : d => yScale(+d.TotalDeaths),
          'width' : d => xScale.bandwidth(),
          'height' : d => heightLessMargins - yScale(yValFromData(d)),
          'fill' : 'steelblue',
          'class':'barClass'
        })
        .on("mousemove", function(d){
        tooltipDiv
          .style("left", d3.event.pageX - 150 +  "px")
          .style("top", d3.event.pageY - 150 + "px")
          .style("display", "inline-block")
          .html(`The <b>${d.WarName}</b> war<br>`+
            `had <b>${d.TotalDeaths}</b> deaths<br>`+
            `in <b>${d.TotalDays}</b> days.`);
        })
        .on("mouseout", function(d){ tooltipDiv.style("display", "none");});;

    //tilt x-Axis Labels
    xAxisG.call(xAxis)
      .selectAll('.tick line').remove();
    xAxisG.selectAll('.tick text')
      .attrs({
        'transform': 'rotate(-45)',
        'text-anchor': 'end',
        'alignment-baseline':'middle',
        'x': -5,
        'y': 15,
        'dy':0

      })
    
    yAxisG.call(yAxis);

    d3.select("input").on("change", change);

    /*
    Sort onClick function
    */
    function change() {

      // Copy-on-write since tweens are evaluated after a delay.
      var x0 = xScale.domain(first5.sort(this.checked
          ? function(a, b) { 
              return b.TotalDays - a.TotalDays; 
            }
          : function(a, b) { return d3.descending(a.TotalDeaths, b.TotalDeaths); })
          .map(function(d) { return d.WarName; }))
          .copy();

      svg.selectAll(".barClass")
          .sort(function(a, b) { return x0(a.WarName) - x0(b.WarName); });

      var transition = svg.transition().duration(500),
          delay = function(d, i) { return i * 50; };

      transition.selectAll(".barClass")
          .delay(delay)
          .attr("x", function(d) { return x0(d.WarName); });

      transition.select(".xAxisClass")
          .call(xAxis)
        .selectAll("g")
          .delay(delay);
    }


  });



let resize = () => {
// Extract the width and height that was computed by CSS.
  let resizedFnWidth = chartDiv.clientWidth;
  let resizedFnHeight = chartDiv.clientHeight;

  svg.attrs({
    "width" : resizedFnWidth,
    "height" : resizedFnHeight
  });

  let resizedWidthLessMargins = resizedFnWidth - vars.margin.left - vars.margin.right;
  let resizedHeightLessMargins = resizedFnHeight - vars.margin.top - vars.margin.bottom;


  //Update scale RANGES
  xScale.range([0, resizedWidthLessMargins]);
  yScale.range([resizedHeightLessMargins, vars.margin.top]);

  //Update the X-AXIS
  xAxisG
    .attrs({
        'transform': `translate(0, ${resizedHeightLessMargins})`,
        'x' : widthLessMargins / 2,
        'y' : resizedHeight * .1,
    })
    .call(xAxis);

  //Update the X-AXIS LABEL
  xAxisLabel
    .attrs({
      'x' : resizedWidthLessMargins / 2,
      'y' : 150
    })

  //Update the Y-AXIS
  yAxisG
    .attrs({
        'x' : -resizedHeightLessMargins / 2,
        'y' : -vars.margin.left / 2,
    })
    .call(yAxis);

  //Update yAxis Label
  yAxisLabel.attrs({
    'x' : -resizedHeightLessMargins / 2,
    'y' : -vars.margin.left / 1.75,
  });

  //Update Bars
  d3.selectAll('.barClass').attrs({
    'x' : d => xScale(d.WarName),
    'y' : d => yScale(d.TotalDeaths),
    'width' : d => xScale.bandwidth(),
    'height' : d => resizedHeightLessMargins - yScale(yValFromData(d))
  });

  d3.selectAll('.tick line')
    .attr('x2', resizedWidthLessMargins);

  yAxis.ticks(Math.max(resizedHeightLessMargins/80, 2))
}


// Call the resize function whenever a resize event occurs
d3.select(window).on('resize', resize);

// call resize to draw the chart initially 
resize();