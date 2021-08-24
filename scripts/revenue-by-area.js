var areaRevenueMargin = {top: 10, right: 30, bottom: 50, left: 100},
      width = 750,
      height = 500;

var areaRevenueSvg = d3.select("#revenue-line-chart")
    .append("svg")
      .attr("width", width + areaRevenueMargin.left + areaRevenueMargin.right)
      .attr("height", height + areaRevenueMargin.top + areaRevenueMargin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + areaRevenueMargin.left + "," + areaRevenueMargin.top + ")");

areaRevenueSvg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (areaRevenueMargin.top - 28 / 2))
    .attr("text-anchor", "middle")
    .attr("font-weight", 700)
    .style("font-size", "20px")
    .text("Revenue growth by region");

d3.csv("data/revenue-by-area.csv", function(data) {
    var allGroup = d3.map(data, function(d){return(d.area)}).keys()

d3.select("#select-button")
    .selectAll('myOptions')
      .data(allGroup)
    .enter()
      .append('option')
    .text(function (d) { return d; })
    .attr("value", function (d) { return d; })

var myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(["#a70000", "#ff0000", "#ff5252", "#ff7b7b"]);

var x = d3.scaleBand()
    .domain(data.map(function(d) {return d.year;}))
    .range([0, width]);
  areaRevenueSvg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

areaRevenueSvg.append("text")
    .attr("transform",
          "translate(" + (width/2) + " ," +
          (height + areaRevenueMargin.top + 35) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Quartals");

var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return + d.revenue; })])
    .range([ height, 0 ]);
  areaRevenueSvg.append("g")
    .call(d3.axisLeft(y));

areaRevenueSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - areaRevenueMargin.left + 40)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("font-size", "18px")
    .style("text-anchor", "middle")
    .text("$M");

var line = areaRevenueSvg
    .append('g')
    .append("path")
      .datum(data.filter(function(d){return d.area==allGroup[0]}))
        .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(+d.revenue) })
        )
    .attr("stroke", function(d){ return myColor("valueA") })
    .style("stroke-width", 3)
    .style("fill", "none")

function update(selectedGroup) {
    var dataFilter = data.filter(function(d){return d.area==selectedGroup})

line
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", d3.line()
      .x(function(d) { return x(d.year) })
      .y(function(d) { return y(+d.revenue) })
    )
    .attr("stroke", function(d){ return myColor(selectedGroup) })
}

d3.select("#select-button").on("change", function(d) {
    var selectedOption = d3.select(this).property("value")
    update(selectedOption)
})

})
