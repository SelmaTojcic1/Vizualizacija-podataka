var totalRevenueMargin = {top: 10, right: 30, bottom: 60, left: 40},
    totalRevenueWidth = 800 - totalRevenueMargin.left - totalRevenueMargin.right,
    totalRevenueHeight = 600 - totalRevenueMargin.top - totalRevenueMargin.bottom;

var totalRevenueSvg = d3.select("#revenue-barchart")
  .append("svg")
    .attr("width", totalRevenueWidth + totalRevenueMargin.left + totalRevenueMargin.right)
    .attr("height", totalRevenueHeight + totalRevenueMargin.top + totalRevenueMargin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + totalRevenueMargin.left + "," + totalRevenueMargin.top + ")");

totalRevenueSvg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (totalRevenueMargin.top - 28 / 2))
    .attr("text-anchor", "middle")
    .attr("font-weight", 700)
    .style("font-size", "20px")
    .text("Total revenue growth");

d3.csv("data/total-revenue.csv", function(totalRevenueData) {

var x = d3.scaleBand()
  .range([ 0, totalRevenueWidth ])
  .domain(totalRevenueData.map(function(d) { return d.year; }))
  .padding(0.2);

totalRevenueSvg.append("g")
  .attr("transform", "translate(0," + totalRevenueHeight + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

totalRevenueSvg.append("text")
    .attr("transform",
          "translate(" + (totalRevenueWidth / 2) + " ," +
          (totalRevenueHeight + totalRevenueMargin.top + 40) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Year");

var y = d3.scaleLinear()
  .domain([0, 25])
  .range([ totalRevenueHeight, 0]);
totalRevenueSvg.append("g")
  .call(d3.axisLeft(y));

totalRevenueSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - totalRevenueMargin.left - 5)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("font-size", "18px")
    .style("text-anchor", "middle")
    .text("$B");

totalRevenueSvg.selectAll("mybar")
  .data(totalRevenueData)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.year); })
    .attr("width", x.bandwidth())
    .attr("fill", "#E50914")
    .attr("height", function(d) { return totalRevenueHeight - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

totalRevenueSvg.selectAll("rect")
  .transition()
  .duration(1400)
  .attr("y", function(d) { return y(d.revenue); })
  .attr("height", function(d) { return totalRevenueHeight - y(d.revenue); })

})
