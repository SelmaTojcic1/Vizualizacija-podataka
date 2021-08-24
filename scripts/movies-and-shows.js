var moviesMargin = {top: 10, right: 30, bottom: 20, left: 50},
    moviesWidth = 850 - moviesMargin.left - moviesMargin.right,
    moviesHeight = 550 - moviesMargin.top - moviesMargin.bottom;

var moviesSvg = d3.select("#movies-and-shows-barchart")
  .append("svg")
    .attr("width", moviesWidth + moviesMargin.left + moviesMargin.right)
    .attr("height", moviesHeight + moviesMargin.top + moviesMargin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + moviesMargin.left + "," + moviesMargin.top + ")");

moviesSvg.append("text")
    .attr("x", (moviesWidth / 2))
    .attr("y", 0 - (moviesMargin.top - 28 / 2))
    .attr("text-anchor", "middle")
    .attr("font-weight", 700)
    .style("font-size", "20px")
    .text("Number of movies and shows available per year");

d3.csv("data/movies-and-shows.csv", function(data) {
  var subgroups = data.columns.slice(1)

  var groups = d3.map(data, function(d){return(d.year)}).keys()

  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])

  moviesSvg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  moviesSvg.append("text")
    .attr("transform",
          "translate(" + (moviesWidth / 2) + " ," +
          (moviesHeight + moviesMargin.top + 10) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Year");

  var y = d3.scaleLinear()
    .domain([0, 10000])
    .range([ height, 0 ]);
  moviesSvg.append("g")
    .call(d3.axisLeft(y));

  moviesSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - moviesMargin.left - 6)
    .attr("x",0 - (moviesHeight / 2))
    .attr("dy", "1em")
    .style("font-size", "18px")
    .style("text-anchor", "middle")
    .text("Number");

  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#a70000", "#ff7b7b"])

  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  moviesSvg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.year); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
  })
