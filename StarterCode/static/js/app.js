//Use d3 to select the data
const bbUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(bbUrl).then(function(data){console.log(data)});

function init() {
   let dropdownMenu = d3.selectAll("#selectDataSet");
   
   d3.json(bbUrl).then((data) => {
        let names = data.names;
        
        names.forEach((id) => {
            console.log(id);
            dropdownMenu.append('option')
            .text(id)
            .property('value', id);
        });

        let picksample = names[0];
        console.log(picksample);

        buildMetaData(picksample);
        buildBarChart(picksample);
        buildBubbleChart(picksample);
        
        // Call updatePlotly() when a change takes place to the DOM
        d3.selectAll("#selectDataset").on("change", updatePlotly);

        // This function is called when a dropdown menu item is selected
        function updatePlotly() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selectDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property('value');
        };
    });
   };
    

    function buildMetaData(sample) {
       
        d3.json(bbUrl).then((data) => {
           
            let metadata = data.metadata;
            let value = metadata.filter(result => result.id == sample);
            console.log(value)
        
            let valueData = value[0];

            d3.select('#sample-metadata').html('');
            Object.entries(valueData).forEach(([key, value]) => {
                console.log(key, value);
                d3.select('#sample-metadata').append('h5').text(`${key}: ${value}`);
            });
        });
    };

    function buildBarChart(sample) {
        d3.json(bbUrl).then((data) => {
                
                let sampleInfo = data.samples;
                let value = sampleInfo.filter(result => result.id == sample);
                let valueData = value[0];
                let otu_ids = valueData.otu_ids;
                let otu_labels = valueData.otu_labels;
                let sample_values = valueData.sample_values;

                console.log(otu_ids, otu_labels, sample_values);

                let xticks = sample_values.slice(0,10).reverse();
                let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
                let labels = otu_labels.slice(0,10).reverse();
    
                let trace1 = {
                    x: xticks,
                    y: yticks,
                    text: labels,
                    type: 'bar',
                    orientation: 'h',
                    marker: {
                        color: 'rgb(172, 107, 242)',
                    },
                    
                };

                let layout = {
                     title: "Top 10 OTUs Present",
                     hovermode: otu_labels
                };
                // Call Plotly to plot the bar chart
                Plotly.newPlot('bar', [trace1], layout)
        });
    };

    function buildBubbleChart(sample) {
        
        d3.json(bbUrl).then((data) => {
            let sampleInfo = data.samples;
            let value = sampleInfo.filter(result => result.id == sample);
            let valueData = value[0];

            let otu_ids = valueData.otu_ids;
            let otu_labels = valueData.otu_labels;
            let sample_values = valueData.sample_values;

            console.log(otu_ids, otu_labels, sample_values);

            let trace2 = {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Electric'
                }
            };

            let layout = {
                title: "Bacteria per Sample",
                hovermode: 'closest',
                xaxis: {title: "OTU IDs"},
            };
            // Call Plotly to plot the bubble chart
            Plotly.newPlot('bubble', [trace2], layout)

        });
    };

    function dropdownMenuChange(value) {
        console.log(value);

        buildMetaData(value);
        buildBarChart(value);
        buildBubbleChart(value);
    };
  
  init();
