
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function() {
  // constants to define the size
  // and margins of the vis area.

  //var margin = {top: 20, right: 20, bottom: 30, left: 40};
  //var width = 960 - margin.left - margin.right;
  //var height = 500 - margin.top - margin.bottom;

  var width = 560;
  var height = 400;
  var margin = {top:0, left:35, bottom:40, right:5};

  var heightBar = height - 30;
  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  
  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  //we define the scales and axis for the line chart as well as the time format
  var parseDate = d3.time.format("%d/%m/%Y %H:%M").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([heightBar, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.ID); });



  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];





  var color=d3.scale.ordinal()
      .domain(["Atmospheric","Underground","Underwater"])
      .range(["DeepSkyBlue","Chocolate","Aquamarine"]);

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function(selection) {
    selection.each(function() {
      // create svg and give it a width and height
      var svg = d3.select(this).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      // this group element will be used to contain all
      // other elements.
      g = svg.append("g")
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      gYear = svg.append("g")
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      // perform some preprocessing on raw data
      //var wordData = getWords(rawData);
      // filter to just include filler words
      //var fillerWords = getFillerWords(wordData);

      // get the counts of filler words for the
      // bar chart display
      //var fillerCounts = groupByWord(fillerWords);
      // set the bar scale's domain
      //var countMax = d3.max(fillerCounts, function(d) { return d.values;});
      //xBarScale.domain([0,countMax]);

      // get aggregated histogram data
      //var histData = getHistogram(fillerWords);
      // set histogram's domain
      //var histMax = d3.max(histData, function(d) { return d.y; });
      //yHistScale.domain([0, histMax]);

      //setupVis(wordData, fillerCounts, histData);

      setupSections();

    });
  };


  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   *
   * @param wordData - data object for each word.
   * @param fillerCounts - nested data that includes
   *  element for each filler word type.
   * @param histData - binned histogram data
   */
  setupVis = function(wordData, fillerCounts, histData) {
    // axis
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + heightBar + ")")
      .call(xAxisBar);
    g.select(".x.axis").style("opacity", 0);



  };

  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  setupSections = function() {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = showText;
    activateFunctions[1] = showImage;
    activateFunctions[2] = showLineChart;
    activateFunctions[3] = showTestCountryOverTime;
    activateFunctions[4] = showTestPerCountry;
    activateFunctions[5] = showTestType;
    activateFunctions[6] = showTestHeight;
    activateFunctions[7] = showMap;
    activateFunctions[8] = showWeapons;
    activateFunctions[9] = removeAll;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for(var i = 0; i < 8; i++) {
      updateFunctions[i] = function() {};
    }
    //updateFunctions[7] = updateCough;
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

 /**
   * showImage - initial image
   *
   * shows: intro image
   *
   */ 

  function showText(){
   
    d3.selectAll("image")
      .transition().ease("linear")
      .duration(200)
      //.attr("opacity", 0);
      .remove()

      g.append("text")
          .attr("class","title")
          .attr("y", height/3)
          .attr("x", width/2)
          .attr("dy", ".71em")
          .text("A");



      g.append("text")
          .attr("class","sub-title")
          .attr("y", height/3 + 55)
          .attr("x", width/2)
          .attr("dy", ".71em")
          .text("NUCLEAR WORLD");    
  }

  function showImage(){

    g.selectAll(".title")
      .transition().ease("linear")
      .duration(300)
      //.attr("opacity", 0);
      .remove()


    g.selectAll(".sub-title")
      .transition().ease("linear")
      .duration(300)
      //.attr("opacity", 0);
      .remove()

    g.selectAll(".line-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    var picture = d3.selectAll("g").append("svg:image")
        .attr("xlink:href", "pics/Hiroshima.jpg")
        .attr("width", width)
        .attr("height", height);

    d3.selectAll("image")
      .on("mouseover",function(){
        d3.select(this)
        .attr("xlink:href", "pics/Nagasaki.jpg")
        .attr("width", width)
        .attr("height", height);
      })
 
    d3.selectAll("image")
      .on("mouseout",function(){  
        d3.select(this)
          .attr("xlink:href", "pics/Hiroshima.jpg")
          .attr("width", width)
          .attr("height", height);
        })
  }

 /**
   * showTimeSeries - line chart
   *
   * hides: image
   * shows: line chart
   *
   */  
  function showLineChart() {
    d3.selectAll("image")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    
    g.selectAll(".countrystacked-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()
    
    d3.tsv("data/line.tsv", function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.ID = +d.ID;
      });

      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.ID; }));
    
      g.append("linearGradient")
          .attr("class","line-chart")
          .attr("id", "temperature-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0).attr("y1", y(500))
          .attr("x2", 0).attr("y2", y(1500))
        .selectAll("stop")
          .data([
            {offset: "0%", color: "snow"},
            {offset: "50%", color: "lightcoral"},
            {offset: "100%", color: "red"}
          ])
        .enter().append("stop")
          .attr("offset", function(d) { return d.offset; })
          .attr("stop-color", function(d) { return d.color; });

      g.append("g")
          .attr("class", "x axis line-chart")
          .attr("transform", "translate(0," + heightBar + ")")
          .call(xAxis);

      g.append("g")
          .attr("class", "y axis line-chart")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Number");

      g.append("path")
          .datum(data)
          .attr("class", "line line-chart")
          .transition()
          .duration(3000)
          //.attr("d", line);
          .attrTween('d', pathTween);

      function pathTween() {
        var interpolate = d3.scale.quantile()
          .domain([0,1])
          .range(d3.range(1, data.length + 1));
        return function(t) {
            return line(data.slice(0, interpolate(t)));
        };
      }  

      function getSmoothInterpolation() {
        var interpolate = d3.scale.quantile()
          .domain([0,1])
          .range(d3.range(1, data.length + 1));

        return function(t) {
          var flooredX = Math.floor(interpolate(t));
          var interpolatedLine = data.slice(0, flooredX);
                
          if(flooredX > 0 && flooredX < data.length) {
            var weight = interpolate(t) - flooredX;
            var weightedLineAverage = data[flooredX].y * weight + data[flooredX-1].y * (1-weight);
            interpolatedLine.push( {"x":interpolate(t)-1, "y":weightedLineAverage} );
          }
        
          return line(interpolatedLine);
        }
      }

    });
  }



  function showTestCountryOverTime(){

    g.selectAll(".line-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    g.selectAll(".testPerCountry-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .rangeRound([heightBar, 0]);

    var color = d3.scale.ordinal()
          .range(['#f0e68c','#feb15f','#ff7735','#ff0000','#c2ba71','#c48b4a','#be5725','#b20000']);
         

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    
    d3.tsv("data/Nuclear_country_count.tsv", function(error, data) {
      if (error) throw error;

      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year"}));

      data.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0 , y1: y0 += +d[name], num : d[name] }; });

        d.total = d.ages[d.ages.length - 1].y1;
      });
     // data.sort(function(a, b) { return a.total - b.total; });

      x.domain(data.map(function(d) { return d.Year; }));
      y.domain([0, d3.max(data, function(d) { return d.total; })]);

      g.append("g")
          .attr("class", "x axis countrystacked-chart")
          .attr("transform", "translate(0," + heightBar + ")")
          .call(xAxis)
          .selectAll("text") 
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.5em")
          .attr("transform", "rotate(-90)")  ;

      g.append("g")
          .attr("class", "y axis countrystacked-chart")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Number of nuclear tests");

      var year = g.selectAll(".year")
          .attr("class","countrystacked-chart")
          .data(data)
          .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x(d.Year) + ",0)"; });

      year.selectAll("rect")
          .data(function(d) { return d.ages; })
          .enter().append("rect")
          .attr("class", function(d) {  return "weapons" + d.num + " countrystacked-chart"; })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return heightBar ; })
          .attr("height", 0)
          .style("fill", function(d) { return color(d.name); })
          .transition().delay(function (d,i){ return i * 200;})
          .duration(600)
          .ease("quad")
          .attr("y", function(d) { return y(d.y1); })
          .attr("height", function(d) { return y(d.y0) - y(d.y1); });


      var legend = g.selectAll(".legend")
          .data(color.domain().slice().reverse())
          .enter().append("g")
          .attr("class", "legend countrystacked-chart")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });
    });
  }

  function showTestPerCountry() {

    var heightBar = height - 30;

    g.selectAll(".countrystacked-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    g.selectAll(".TestType-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .25);

    var y = d3.scale.linear()
        .range([heightBar, margin.bottom]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(0);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "");


    d3.tsv("data/Nuclear_test.tsv", type, function(error, data) {
      if (error) throw error;

      data=data.sort(function (a,b) {return d3.descending(a.n, b.n); })

      x.domain(data.map(function(d) { return d.countryName; }));
      y.domain([0, d3.max(data, function(d) { return d.n; })]);

      g.append("g")
          .attr("class", "x axis testPerCountry-chart")
          .attr("transform", "translate(0, " + heightBar*1.02 + " )")
          .call(xAxis)
          .selectAll(".tick text")
          .call(wrap, x.rangeBand());

      g.append("g")
          .attr("class", "y axis testPerCountry-chart")
          .call(yAxis);

      g.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar testPerCountry-chart")
          .attr("x", function(d) { return x(d.countryName); })
          .attr("y", function(d) { return heightBar; })
          .attr("height", 0)
          .attr("width", x.rangeBand())
          .transition().delay(function (d,i){ return i * 300;})
          .duration(300)
          .ease("quad")
          .attr("height", function(d) { return heightBar - y(d.n); })
          .attr("y", function(d) { return y(d.n); });
     
      g.selectAll(".label")
          .data(data)
          .enter().append("text")
          .attr("class", "label testPerCountry-chart")
          .transition().delay(function(d,i){return i *300})
          .text(function(d){return d.n  + " tests";})
          .attr("x", function(d) { return x(d.countryName) + width/(7*data.length); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.n) - 5; });

      function wrap(text, width) {
        text.each(function() {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.1, // ems
              y = text.attr("y"),
              dy = parseFloat(text.attr("dy")),
              tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }

    });

    function type(d) {
      d.n = +d.n;
      return d;
    }
  }


  function showTestType() {


    g.selectAll(".testPerCountry-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()


    g.selectAll(".showTestHeight-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    var radius = d3.scale.linear().range([0,4]);

    var padding=1;

    d3.tsv("data/Nuclear_test_type.tsv", function(error,data){

      var nodes=data.map(function(d) {
        return {
          type: d.sourceType,
          radius: radius(Math.sqrt(d.n/Math.PI)),
          color: color(d.sourceType),
          test:d.n
        }
      });
      
      var force = d3.layout.force()
        .nodes(nodes)
        .size([width, height])
        .gravity(.05)
        .charge(7)
        .on("tick", tick)
        .start();

      var circle = g.selectAll("a.node")
        .data(nodes)
        .enter().append("a")
        .attr("class","nodes TestType-chart")
        .call(force.drag);


      circle.append("circle")
        .attr("r", function(d) { return d.radius; })
        .style("stroke", function(d) { return d.color; })
        .style("fill", function(d) { return d.color; });


      circle.append("text")
        .attr("class","text TestType-chart")
        .text(function(d) { return d.type; })
        .attr("x", function(d) {return d.radius})
        //.attr("y", function(d) {return d.radius});

      circle.append("text")
        .attr("class","text TestType-chart")
        .text(function(d) { return d.test + " tests"; })
        .attr("x", function(d) {return d.radius})
        .attr("y", 20)
        //.attr("y", function(d) {return d.radius});

      function tick(e) {
        circle
          .each(cluster(10 * e.alpha * e.alpha))
          .each(collide(.5))
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      }

      // Move d to be adjacent to the cluster node.
      function cluster(alpha) {
        var max = {};

        // Find the largest node for each cluster.
        nodes.forEach(function(d) {
          if (!(d.color in max) || (d.radius > max[d.color].radius)) {
            max[d.color] = d;
          }
        });

        return function(d) {
          var node = max[d.color],
            l,
            r,
            x,
            y,
            i = -1;

          if (node == d) return;
          x = d.x - node.x;
          y = d.y - node.y;
          l = Math.sqrt(x * x + y * y);
          r = d.radius + node.radius;
          if (l != r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            node.x += x;
            node.y += y;
          }
        };
      }
      
      function collide(alpha) {
        var quadtree = d3.geom.quadtree(nodes);
        return function(d) {
          var r = d.radius + radius.domain()[1] + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
          quadtree.visit(function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
              var x = d.x - quad.point.x,
                  y = d.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y),
                  r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
              if (l < r) {
                  l = (l - r) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
              }
            }
            return x1 > nx2
                || x2 < nx1
                || y1 > ny2
                || y2 < ny1;
          });
        };
      }

    });

  }

  function showTestHeight(){

    g.selectAll(".TestType-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()


    gYear.selectAll("text")
      .transition()
      .duration(150)
      //.attr("opacity", 0);
      .remove()

    g.selectAll(".showMap-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    var marginHeightChart = 50;

    d3.tsv("data/Nuclear_Height.tsv", function(error,data){

      var data = data.filter(function(d) { return d.depth!=""; });
      data.forEach(function(d){return d.depth=d.depth*-1;})
      data.sort(function(a, b){return b.depth-a.depth});

      var xScale = d3.scale.linear()
                 .domain([0,10])
                 .range([marginHeightChart, 2*marginHeightChart]);

      var yScale = d3.scale.sqrt()
                 .domain([d3.min(data, function(d) { return parseFloat(d.depth); }), d3.max(data, function(d) { return parseFloat(d.depth); })])
                 .range([height - marginHeightChart/4, marginHeightChart/4]);
  
      var opacityScale = d3.scale.linear()
                 .domain([d3.min(data, function(d) { return parseFloat(d.depth); }), d3.max(data, function(d) { return parseFloat(d.depth); })])
                 .range([0.1,0.5]);

      //Define Y axis
      var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
      
      //Create Y axis
      g.append("g")
        .attr("class", "axis showTestHeight-chart")
        .attr("transform", "translate(" + xScale(20) + ",0)")
        .call(yAxis);

      g.append("text")
        .attr("class","showTestHeight-chart")
        .attr("x",xScale(0)-2.5*marginHeightChart)
        .attr("y",xScale(23))
        .attr("transform","rotate(-90)")
        .text("Height (km)")
        .attr('dy', '0.25em')
        .attr("fill","grey");

      g.append("line")
        .attr("class","line showTestHeight-chart")
        .attr("x1", xScale(25))
        .attr("y1", yScale(0))
        .attr("x2", xScale(35))
        .attr("y2", yScale(0));
     
      //Create circles
      g.selectAll("circle")
         .data(data)
         .enter()
         .append("circle")
         .attr("class", function(d) { return "test" + d.ID + " showTestHeight-chart"; })
         .attr("cx", function(d) {
            return xScale(30);
         })
         .attr("cy", 0)
         .attr("r", function(d) {
            return 4;
         })
         .attr("fill",function(d) {
            return color(d.sourceType);
         })
         .attr("fill-opacity",function(d){return opacityScale(d.depth);});

              //Create circles
      g.selectAll("circle")
         .transition().duration(3000)
         .attr("cy", function(d) {
            return yScale(parseFloat(d.depth));
         });

      g.selectAll("circle")
            .on("mouseover", showTooltip)
            .on("mouseout",  removeTooltip);

      //Hide the tooltip when the mouse moves away
      function removeTooltip (d, i) {

        //Save the chosen circle (so not the voronoi)
        var element = d3.selectAll("test"+ d.ID );
          
        //Fade out the bubble again
        //element.style("opacity", 0.7);
        
        //Hide tooltip
        $('.popover').each(function() {
          $(this).remove();
        }); 
          
      }//function removeTooltip

      //Show the tooltip on the hovered over slice
      function showTooltip (d, i) {
        //Save the chosen circle (so not the voronoi)
        var element = d3.selectAll(".test"+d.ID);
        
        //Define and show the tooltip
        $(element).popover({
          placement: 'auto top',
          container: '#vis',
          trigger: 'manual',
          html : true,
          content: function() {
            return "<div style='font-size: 11px; text-align: center;'><span style='font-weight:bold'>" + d.name + "</span><br><span style='font-style:italic'>"+d.sourceType+"</span><br><span>Height: <span >" + parseFloat(d.depth) +" km</span></div>"; }
        });

        $(element).popover('show');

        //Make chosen circle more visible
        element.style("opacity", 1);              
      }
    });
  }

  function showWeapons(){

    gYear.selectAll("text")
      .transition()
      .duration(150)
      //.attr("opacity", 0);
      .remove()

    g.selectAll(".showMap-chart")
      .transition()
      .duration(150)
      //.attr("opacity", 0);
      .remove()

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .rangeRound([heightBar, 10]);

    var color = d3.scale.ordinal()
          .range(['#f0e68c','#f6c06d','#f9994d','#f96b2d','#ff0000']);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    
    d3.tsv("data/nuclear_weapon.tsv", function(error, data) {
      if (error) throw error;

      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year" && key !== "Total"}));

      data.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0 , y1: y0 += +d[name], num : d[name] }; });

        d.total = d.ages[d.ages.length - 1].y1;
      });
     // data.sort(function(a, b) { return a.total - b.total; });

      x.domain(data.map(function(d) { return d.Year; }));
      y.domain([0, d3.max(data, function(d) { return d.total; })]);

      g.append("g")
          .attr("class", "x axis showWeapons-chart")
          .attr("transform", "translate(0," + heightBar + ")")
          .call(xAxis)
          .selectAll("text") 
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.5em")
          .attr("transform", "rotate(-90)")  ;

      g.append("g")
          .attr("class", "y axis showWeapons-chart")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Number of nuclear warheads");

      var year = g.selectAll(".year")
          .data(data)
          .enter().append("g")
          .attr("class", "g showWeapons-chart")
          .attr("transform", function(d) { return "translate(" + x(d.Year) + ",0)"; });

      year.selectAll("rect")
          .data(function(d) { return d.ages; })
          .enter().append("rect")
          .attr("class", function(d) {  return "weapons" + d.num + " showWeapons-chart"; })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return heightBar ; })
          .attr("height", 0)
          .style("fill", function(d) { return color(d.name); })
          .transition().delay(function (d,i){ return i * 300;})
          .duration(600)
          .ease("quad")
          .attr("y", function(d) { return y(d.y1); })
          .attr("height", function(d) { return y(d.y0) - y(d.y1); });


      var legend2 = g.selectAll(".legendWeapons")
          .data(color.domain().slice().reverse())
          .enter().append("g")
          .attr("class", "legend showWeapons-chart")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend2.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend2.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });


    });      
  }


  function showMap(){


    g.selectAll(".showTestHeight-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()

    g.selectAll(".showWeapons-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove()
      
      //Quick fix for resizing some things for mobile-ish viewers
      var mobileScreen = ($( window ).innerWidth() < 500 ? true : false);

      //Legend      
      var legendMargin = {left: 5, top: 10, right: 5, bottom: 10},
        legendWidth = 145,
        legendHeight = 270;

      var rectSize = 15, //dimensions of the colored square
          rowHeight = 20, //height of a row in the legend
          maxWidth = 144; //widht of each row
               

      var projection = d3.geo.robinson()
        .scale(100)
        .translate([width / 2, height / 2])
        //.clipAngle(180 - 1e-3)
        .precision(.01);
      
      
      var path = d3.geo.path()
          .projection(projection);
      

      // Add the year label; the value is set on transition.
      var label = gYear.append("text")
          .attr("class", "year label showMap-chart")
          .attr("text-anchor", "end")
          .attr("y", height - 28)
          .attr("x", width)
          .text(1945);


      d3.json("data/map.json", function(error, topology) {
        g.insert("path", ".graticule")
                      .datum(topojson.feature(topology, topology.objects.land))
                      .attr("class", "land showMap-chart")
                      .attr("d", path);

        g.insert("path", ".graticule")
            .datum(topojson.mesh(topology, topology.objects.countries, function(a, b) { return a !== b; }))
            .attr("class", "boundary showMap-chart")
            .attr("d", path);


      });
    
      d3.tsv("data/Nuclear_map.tsv", function(error,data){

        var rScale = d3.scale.sqrt()
              .range([mobileScreen ? 0 : 0, mobileScreen ? 7 : 12])
              .domain(d3.extent(data, function(d) { return d.value; }));

       var svgLegend = g.append("g")
                .attr("width", (legendWidth + legendMargin.left + legendMargin.right))
                .attr("height", (legendHeight + legendMargin.top + legendMargin.bottom))
                .attr("class","showMap-chart");     

        var legendWrapper = svgLegend.append("g").attr("class", "legendWrapper")
                .attr("transform", "translate(" + legendMargin.left + "," + legendMargin.top +")");
        var bubbleSizeLegend = legendWrapper.append("g")
                .attr("transform", "translate(" + (legendWidth/2 - 30) + "," + 20 +")");

        //Draw the bubble size legend
        if (!mobileScreen) {
        bubbleLegend(bubbleSizeLegend, rScale, legendSizes = [1e2,5e2,2e3], legendName = "Yield (kt)");  
        }//if !mobileScreen
        else {
          d3.select("#legend").style("display","none");
        }

        var dataYear = data.filter(function(d) { return d.variable==1945; });
        
        var dots=g.selectAll("dot")
                    .data(dataYear);

        var circle=dots.enter().append("a")
                  .attr("class","dots showMap-chart")
                  .append("circle") 
                  .attr("cx", function(d) {
                    return projection([d.lon,d.lat])[0];
                  })
                  .attr("cy", function(d) {
                    return projection([d.lon,d.lat])[1];
                  })
                  .attr("r",function(j){ if (j.yea==1945) {return 1*rScale(j.value)} else {return 0.5*rScale(j.value)}})
                  .style("fill", function(j){if (j.yea==1945) {return "red"} else {return "gold"}})
                  .style("opacity", function(j){if (j.yea==1945) {return 0.5} else {return 0.05}})
                  .transition().duration(300)
                  //.delay(500*i+50)
                  .attr("r",function(j){return 0.5*rScale(j.value)})
                  .style("fill", "gold")
                  .style("opacity", 0.05);;

                  dots.exit().remove();

        var yearTable = d3.map(data, function(d){return d.yea;}).keys();
        var length = yearTable.length;

      //play();
            var play = g.append("g")
            .attr("class", "play showMap-chart")
            .on("click", play);

        play.append("path")
            .attr("d", "M-30,-30L30,0L-30,30Z")
            .attr("transform", "translate(" + width / 2 + "," + 9*height/10  + ")scale(.6)");

      function play(){
        dots.selectAll("circle")
          .attr("r",0)
          .style("fill","red")
          .style("opacity",0);

        

        for( var i=0 ;i < length;i++){
          var dataYear = data.filter(function(d) { return d.variable==yearTable[i]; });
          
          
          dots.data(dataYear)
                      .select("circle")
                      .transition()
                      .delay(750*i)
                      .duration(100)
                      .attr("r",function(j){ if (j.yea==yearTable[i]) {return 1*rScale(j.value)} else {return 0.5*rScale(j.value)}})
                      .style("fill", function(j){if (j.yea==yearTable[i]) {return "red"} else {return "gold"}})
                      .style("opacity", function(j){if (j.yea==yearTable[i]) {return 0.5} else {return 0.05}})
                      .transition().duration(300)
                      //.delay(500*i+50)
                      .attr("r",function(j){return 0.5*rScale(j.value)})
                      .style("fill", "gold")
                      .style("opacity", 0.05);
            
          
          gYear.selectAll('text')
              .transition()
              .delay(750*i)
              .text(yearTable[i]);
        };
      }         



//////////////////////////////////////////////////////
/////////////////// Bubble Legend ////////////////////
//////////////////////////////////////////////////////

        function bubbleLegend(wrapperVar, scale, sizes, titleName) {

          var legendSize1 = sizes[0],
            legendSize2 = sizes[1],
            legendSize3 = sizes[2],
            legendCenter = 10,
            legendBottom = height-50,
            legendLineLength = 25,
            textPadding = 5,
            numFormat = d3.format(",");
          
          wrapperVar.append("text")
            .attr("class","legendTitle")
            .attr("transform", "translate(" + legendCenter + "," + legendBottom + ")")
            .attr("x", 0 + "px")
            .attr("y", 0 + "px")
            .attr("dy", "1em")
            .text(titleName);
            
          wrapperVar.append("circle")
                .attr('r', 0.5*scale(legendSize1))
                .attr('class',"legendCircle")
                .attr('cx', legendCenter)
                .attr('cy', (legendBottom-0.5*scale(legendSize1)));
            wrapperVar.append("circle")
                .attr('r', 0.5*scale(legendSize2))
                .attr('class',"legendCircle")
                .attr('cx', legendCenter)
                .attr('cy', (legendBottom-0.5*scale(legendSize2)));
            wrapperVar.append("circle")
                .attr('r', 0.5*scale(legendSize3))
                .attr('class',"legendCircle")
                .attr('cx', legendCenter)
                .attr('cy', (legendBottom-0.5*scale(legendSize3)));
            
          wrapperVar.append("line")
                .attr('class',"legendLine")
                .attr('x1', legendCenter)
                .attr('y1', (legendBottom-1*scale(legendSize1)))
            .attr('x2', (legendCenter + legendLineLength))
                .attr('y2', (legendBottom-1*scale(legendSize1))); 
          wrapperVar.append("line")
                .attr('class',"legendLine")
                .attr('x1', legendCenter)
                .attr('y1', (legendBottom-1*scale(legendSize2)))
            .attr('x2', (legendCenter + legendLineLength))
                .attr('y2', (legendBottom-1*scale(legendSize2)));
          wrapperVar.append("line")
                .attr('class',"legendLine")
                .attr('x1', legendCenter)
                .attr('y1', (legendBottom-1*scale(legendSize3)))
            .attr('x2', (legendCenter + legendLineLength))
                .attr('y2', (legendBottom-1*scale(legendSize3)));
            
          wrapperVar.append("text")
                .attr('class',"legendText")
                .attr('x', (legendCenter + legendLineLength + textPadding))
                .attr('y', (legendBottom-1*scale(legendSize1)))
            .attr('dy', '0.25em')
            .text( numFormat(Math.round(legendSize1)) + " kt");
          wrapperVar.append("text")
                .attr('class',"legendText")
                .attr('x', (legendCenter + legendLineLength + textPadding))
                .attr('y', (legendBottom-1*scale(legendSize2)))
            .attr('dy', '0.25em')
            .text( numFormat(Math.round(legendSize2)) + " kt");
          wrapperVar.append("text")
                .attr('class',"legendText")
                .attr('x', (legendCenter + legendLineLength + textPadding))
                .attr('y', (legendBottom-1*scale(legendSize3)))
            .attr('dy', '0.25em')
            .text( numFormat(Math.round(legendSize3)) + " kt");
            
        }//bubbleLegend

     

      });

  }


  function removeAll(){


    g.selectAll(".showWeapons-chart")
      .transition().ease("linear")
      .duration(0)
      //.attr("opacity", 0);
      .remove();
  }
































  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function(index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function(i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function(index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};


/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display() {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select("#vis")
    //.datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function(index, progress){
    plot.update(index, progress);
  });
}

// load data and display
//d3.tsv("data/words.tsv", display);
display();
