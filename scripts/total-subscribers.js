var totalSubscribersMargin = {top: 10, right: 30, bottom: 60, left: 40},
    totalSubscribersWidth = 800 - totalSubscribersMargin.left - totalSubscribersMargin.right,
    totalSubscribersHeight = 600 - totalSubscribersMargin.top - totalSubscribersMargin.bottom;

var totalSubscribersSvg = d3.select("#subscribers-barchart")
  .append("svg")
    .attr("width", totalSubscribersWidth + totalSubscribersMargin.left + totalSubscribersMargin.right)
    .attr("height", totalSubscribersHeight + totalSubscribersMargin.top + totalSubscribersMargin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + totalSubscribersMargin.left + "," + totalSubscribersMargin.top + ")");

totalSubscribersSvg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (totalSubscribersMargin.top - 28 / 2))
    .attr("text-anchor", "middle")
    .attr("font-weight", 700)
    .style("font-size", "20px")
    .text("Total subscriber growth");

d3.csv("data/total-subscribers.csv", function(totalSubscribersData) {

var x = d3.scaleBand()
  .range([ 0, totalSubscribersWidth ])
  .domain(totalSubscribersData.map(function(d) { return d.year; }))
  .padding(0.2);

totalSubscribersSvg.append("g")
  .attr("transform", "translate(0," + totalSubscribersHeight + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

totalSubscribersSvg.append("text")
    .attr("transform",
          "translate(" + (totalSubscribersWidth / 2) + " ," +
          (totalSubscribersHeight + totalSubscribersMargin.top + 40) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Year");

var y = d3.scaleLinear()
  .domain([0, 210])
  .range([ totalSubscribersHeight, 0]);
totalSubscribersSvg.append("g")
  .call(d3.axisLeft(y));

totalSubscribersSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - totalSubscribersMargin.left - 5)
    .attr("x",0 - (totalSubscribersHeight / 2))
    .attr("dy", "1em")
    .style("font-size", "18px")
    .style("text-anchor", "middle")
    .text("$M");

totalSubscribersSvg.selectAll("mybar")
  .data(totalSubscribersData)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.year); })
    .attr("width", x.bandwidth())
    .attr("fill", "#E50914")
    .attr("height", function(d) { return totalSubscribersHeight - y(0); })
    .attr("y", function(d) { return y(0); })

totalSubscribersSvg.selectAll("rect")
  .transition()
  .duration(1400)
  .attr("y", function(d) { return y(d.subscribers); })
  .attr("height", function(d) { return totalRevenueHeight - y(d.subscribers); })

})
