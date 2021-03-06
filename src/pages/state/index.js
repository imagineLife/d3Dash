
// color 
var income_domain = [50000,100000,150000,200000]
var income_color = d3.scaleThreshold()
    .domain(income_domain)
    .range(d3.schemeGreens[5]);

// incomeData 
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
    .defer(d3.json, "CTstate.json")
    .defer(d3.csv, "data.csv", function(d) { 
        if (isNaN(d.income)) {
            incomeData.set(d.id, 0); 
        } else {
            incomeData.set(d.id, +d.income); 
        }
        switch(true){
            case (d.income < 49999):
                colorRatio["level1"]++;
                break;
            case (d.income > 50000 && d.income< 99999):
                colorRatio["level2"]++;
                break;
            case (d.income > 100000 && d.income< 149000):
                colorRatio["level3"]++;
                break;
            case (d.income> 150000 && d.income< 199999):
                colorRatio["level4"]++;
                break;
            default:
                colorRatio["level5"]++;
                break;
        };
    })
    .await(ready);



// callback function  
function ready(error, data) {

    if (error) throw error;

    // Connecticut topojson
    var connecticut = topojson.feature(data, {
        type: "GeometryCollection",
        geometries: data.objects.townLayer.geometries
    });

    // projection and path
    var projection = d3.geoAlbersUsa()
        .fitExtent([[20, 20], [700, 580]], connecticut);

    var geoPath = d3.geoPath()
        .projection(projection);

    // draw Connecticut map and bind income data
    d3.select("svg.income").selectAll("path")
        .data(connecticut.features)
        .enter()
        .append("path")
        .attr("d", geoPath)
        .attr("fill", "white")
        .transition().duration(100)
        .delay(function(d, i) {
            return i * 2; 
        })
        .ease(d3.easeLinear)
        .attr("fill", function(d) { 
            var townGeoID = incomeData.get(d.properties.GEOID10);
            return (
                townGeoID != 0 ?
                income_color(townGeoID) : 
                "lightblue");  

        })
        .attr("class", "counties-income");
    
    // title
    d3.select("svg.income").selectAll("path")
        .append("title")
        .text(function(d) {
            return d.properties.NAME10;//d.income = incomeData.get(d.properties.GEOID);
        });

    // // draw Connecticut map and bind poverty data
    // d3.select("svg.poverty").selectAll("path")
    //     .data(connecticut.features)
    //     .enter()
    //     .append("path")
    //     .attr("d", geoPath)
    //     .attr("fill", "white")
    //     .transition().duration(2000)
    //     .delay(function(d, i) {
    //         return i * 5; 
    //     })
    //     .ease(d3.easeLinear)
    //     .attr("fill", function(d) { 
    //         var value = povertyData.get(d.properties.GEOID);
    //         return (value != 0 ? poverty_color(value) : "lightblue");  

    //     })
    //     .attr("class", "counties-poverty");
        
    // // title
    // d3.select("svg.poverty").selectAll("path")
    //     .append("title")
    //     .text(function(d) {
    //         return d.income = incomeData.get(d.properties.GEOID);
    //     });
}

