var originalsMargin = {top: 20, right: 20, bottom: 70, left: 145},
    originalsWidth = 800 - originalsMargin.left - originalsMargin.right,
    originalsHeight = 400 - originalsMargin.top - originalsMargin.bottom;

var originalsSvg = d3.select("#netflix-originals-barchart")
  .append("svg")
    .attr("width", originalsWidth + originalsMargin.left + originalsMargin.right)
    .attr("height", originalsHeight + originalsMargin.top + originalsMargin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + originalsMargin.left + "," + originalsMargin.top + ")");

d3.csv("data/netflix-originals.csv", function(data) {

  var x = d3.scaleLinear()
    .domain([0, 1400])
    .range([ 0, originalsWidth]);
  originalsSvg.append("g")
    .attr("transform", "translate(0," + originalsHeight + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  originalsSvg.append("text")
    .attr("transform",
          "translate(" + (originalsWidth / 2) + " ," +
          (originalsHeight + originalsMargin.top + 25) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Streamed minutes in million");

  var y = d3.scaleBand()
    .range([ 0, originalsHeight ])
    .domain(data.map(function(d) { return d.name; }))
    .padding(.1);
  originalsSvg.append("g")
    .call(d3.axisLeft(y))

  originalsSvg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return x(d.minutes); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#E50914")

})
