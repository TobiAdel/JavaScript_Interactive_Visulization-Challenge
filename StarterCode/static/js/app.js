 let fileSample = "samples.json"

function int(){

  d3.json(fileSample).then(function(dataset) {
        //  console.log(dataset);
        
        var bellyNames = dataset.names
        

        let selector = d3.select("#selDataset");
        let sampleNames = bellyNames.map(data =>data);
       


        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
                // console.log(sample);   

    });
  })
}

int()

  
function demo(work){
    d3.json(fileSample).then(function(dataset) {
        
       
        
        let bellyMetadata = dataset.metadata.filter(testsample => testsample.id == work)
        // console.log(bellyMetadata[0])

       let storingDemo =  d3.select("#sample-metadata")
        storingDemo.html("")
        
        for ( key in bellyMetadata[0]){
            storingDemo
                .append("h5")
                .text(`${key.toUpperCase()} : ${bellyMetadata[0][key]}`)
                

        }

    });

}

demo()





//Bubble chart//

// Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.

function bar(work){
    d3.json(fileSample).then(function(dataset) {
        var bellyGraph = dataset.samples
        // console.log(bellyGraph)
        

       
         let graphData = bellyGraph.map(graphdata => {return{"id":graphdata.id, "otu_ids":graphdata.otu_ids, "sample_values": graphdata.sample_values, "otu_labels": graphdata.otu_labels }});
         let buttonMetadata = graphData.filter(charts => charts.id == work)

         for (let i = 0; i < buttonMetadata.length; i++) {
                
            var barChart =  buttonMetadata[0]
            console.log(barChart)

            var sample_values = barChart.sample_values
            console.log(sample_values)

            var otu_ids = barChart.otu_ids
            console.log(otu_ids)
            
            var otu_labels = barChart.otu_labels
            // console.log(otu_labels)


//Bar Chart //
// Use sample_values as the values for the bar chart.

// Use otu_ids as the labels for the bar chart.

// Use otu_labels as the hovertext for the chart.

            let graphChart = [{
                x: sample_values.slice(0,10).reverse(),
                y: otu_ids.slice(0,10).map(id => 'OTU '+ id).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: 'bar',
                orientation: 'h'
            }]

            let layout = {
                title: `Top 10 OTUs Found`
              };

            Plotly.newPlot('bar',graphChart, layout)



//Bubble chart//

// Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.



        let bubbleChart = [{
            y: sample_values.slice(0,10),
            x: otu_ids.slice(0,10),
            text: otu_labels.slice(0,10),
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids
              }

        }]


        var bubblelayout = {
            title: 'Top 10 OTUs Found',
            showlegend: false,
            xaxis: {
                title: {
                  text: 'OTU ID',
                }
            }
            
          };
        
          Plotly.newPlot('bubble',bubbleChart, bubblelayout)
}



        })
        

}

bar()


function optionChanged(work){
    demo(work)
    bar(work)
}