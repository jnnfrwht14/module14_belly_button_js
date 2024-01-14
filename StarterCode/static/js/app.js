//Use d3 to select the data
const bbUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const bellyButton = d3.json(bbUrl);
console.log("Belly Button: ", bellyButton);

// Fetch the JSON data and console log it
d3.json(bbUrl).then(function(data){console.log(data)});


let values = sample_values.map(function (row){
    return row.ids
});
//trace for the belly button data
let trace1 = {
    x:
    y:
    type: "bar"
};

//data trace array
let data = [trace1];

let layout = {
    title: "top 10 OTUs found"
};
Plotly.newPlot("plot", data, layout);