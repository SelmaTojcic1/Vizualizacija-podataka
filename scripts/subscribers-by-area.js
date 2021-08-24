var pieWidth = 900
    pieHeight = 450
    pieMargin = 40

var radius = Math.min(pieWidth, pieHeight) / 2 - pieMargin

var svg = d3.select("#subscribers-pie-chart-container")
  .append("svg")
    .attr("width", pieWidth)
    .attr("height", pieHeight)
  .append("g")
    .attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

svg.append("text")
    .attr("x", (pieWidth / 100))
    .attr("y", 0 - (pieMargin + 320 / 2))
    .attr("text-anchor", "middle")
    .attr("font-weight", 700)
    .style("font-size", "20px")
    .text("Subscribers by region in Q2 2021");

var data = {"US and Canada (43%)": 43, "Europe, Middle East and Africa (30%)": 30,
            "Latin America (18%)": 18, "Asia-Pacific (9%)": 9}

var color = d3.scaleOrdinal()
  .domain(["US and Canada","Europe, Middle East and Africa",
           "Latin America", "Asia-Pacific"])
  .range(["#a70000", "#ff0000", "#ff5252", "#ff7b7b"]);

var pie = d3.pie()
  .sort(null)
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

var arc = d3.arc()
  .innerRadius(radius * 0.5)
  .outerRadius(radius * 0.8)

var outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)

svg
  .selectAll('allSlices')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

svg
  .selectAll('allPolylines')
  .data(data_ready)
  .enter()
  .append('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      var posA = arc.centroid(d)
      var posB = outerArc.centroid(d)
      var posC = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
      return [posA, posB, posC]
    })

svg
  .selectAll('allLabels')
  .data(data_ready)
  .enter()
  .append('text')
    .text( function(d) { console.log(d.data.key) ; return d.data.key } )
    .attr('transform', function(d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
