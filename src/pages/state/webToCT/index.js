// color 
let lvl = {
    "one":5,
    "two":10,
    "three":15,
    "four":20
}

var income_domain = [lvl.one,lvl.two,lvl.three,lvl.four]

//categorical coloring option
// var income_color = d3.scaleThreshold()
//     .domain(income_domain)
//     .range(d3.schemeReds[5]);

var income_color = d3.scaleSequential(d3.interpolateReds)
    .domain([.5,31.9])

var incomeData = d3.map();


let colorRatio = {
    "level1": 0,
    "level2": 0,
    "level3": 0,
    "level4": 0,
    "level5": 0
}


// asynchronous tasks, load topojson maps and data
d3.queue()
    .defer(d3.json, "data.json")
    .defer(d3.csv, "data.csv", function(d) { 
        if (isNaN(d.percentBelowPoverty)) {
            incomeData.set(d.id, 0); 
        } else {
            incomeData.set(d.id, +d.percentBelowPoverty); 
        }
        switch(true){
            case (d.percentBelowPoverty < (lvl.one - .1)):
                colorRatio["level1"]++;
                break;
            case (d.percentBelowPoverty >= lvl.one && d.percentBelowPoverty< (lvl.two - .1)):
                colorRatio["level2"]++;
                break;
            case (d.percentBelowPoverty >= lvl.two && d.percentBelowPoverty < (lvl.three - .1)):
                colorRatio["level3"]++;
                break;
            case (d.percentBelowPoverty >= lvl.three && d.percentBelowPoverty < (lvl.four - .1)):
                colorRatio["level4"]++;
                break;
            default:
                colorRatio["level5"]++;
                break;
        };

    })
    .await(ready);


d3.select(window)
      .on("resize", sizeChange);

const svg = d3.select("#container")
  .append("svg")
  .attr("width", "100%")
  .attr("class", 'income')
      .append("g");


function ready(error, data) {
    if (error) throw error;

    // connecticut topojson
    var connecticut = topojson.feature(data, {
        type: "GeometryCollection",
        geometries: data.objects.townLayer.geometries
    });

    // projection and path
    var projection = d3.geoAlbersUsa()
        .fitExtent([[0,0], [900, 550]], connecticut);

    var geoPath = d3.geoPath()
        .projection(projection);

    // draw connecticut map and bind income data
    svg.selectAll(".towns")
        .data(connecticut.features)
        .enter().append("path")
        .attr("class", "towns")        
        .attr("d", geoPath)
        // .attr("fill", "white")
        // .transition().duration(100)
        // .delay(function(d, i) {
        //     return i * 2; 
        // })
        // .ease(d3.easeLinear)
        .attr("fill", function(d) { 
            var townGeoID = incomeData.get(d.properties.GEOID10);
            return (
                townGeoID != 0 ?
                income_color(townGeoID) : 
                "lightblue");  

        });
    
    // title
    d3.select("svg.income").selectAll("path")
        .append("title")
        .text(function(d) {
            return d.properties.NAME10;
        });

}

function sizeChange() {
    d3
      .select("g")
      .attr('transform', 'translate(100,50)')
      .attr("transform", "scale(" + $("#container")
      .width()/900 + ")");
   
    $("svg").height($("#container").width()*0.618);
}