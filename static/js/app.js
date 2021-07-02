// Use D3 fetch to read the JSON file
// Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.

function buildMetadata(sample) {

	d3.json("data/samples.json").then ((data) => {

		console.log(data)

		var parsedData = data.metadata;
		console.log(parsedData);

		var subjectId = parsedData.filter(item => item.id == sample);
		console.log(subjectId);

		var demographicInfo = d3.select("#sample-metadata").html("");
		
		
		Object.entries(subjectId[0]).forEach(([key,value]) => {
			demographicInfo.append("p").text(`${key}: ${value}`);
	});
		console.log(demographicInfo);
	});

}


// Create a chart with a dropdown menu to display the top 10 OTUs found 


function buildPlot(sample) {

	d3.json("data/samples.json").then((data) => {
		//console.log(data)

		var parsedData = data.samples;
		console.log(parsedData);

		var sampleList = parsedData.filter(item => item.id == sample)[0];
		console.log(sampleList);

		var sampleValues = sampleList.sample_values.slice(0 ,10).reverse();
			
		console.log(sampleValues);


		var sampleIds = sampleList.otu_ids.slice(0, 10).reverse();
		console.log(sampleIds);
		
		var plotLabels = [];
		sampleIds.forEach((label) => {
			plotLabels.push("OTU" +  label);
		});

		var hovertext = sampleList.otu_labels.slice(0, 10);
		console.log(hovertext)


		// Set the trace for bar chart
		var trace1 = {
		    x: sampleValues,
		    y: plotLabels,
		    type: "bar",
		    orientation: "h",
		  };

		  // Create the data array for bar plot

		  var data1 = [trace1];

		  
		  // Define the plot layout
		var layout1 = {
		    title: "Top 10 Bacteria Cultures Found",
		    height:500,
		    width:500
		    
		  };

	  // Plot the chart 
	  Plotly.newPlot("bar", data1, layout1);
	  

// Set the trace for pie chart 

	var trace2 = {
		type: "pie",
		values: sampleValues,
		labels: sampleIds,
		hovertext: hovertext,
		automargin: true
	};

// Create the data array for pie plot

		  var data2 = [trace2];
	
	var layout2 = {
		height:500,
		width:500
						
	};

	Plotly.newPlot("pie", data2, layout2);
	

// Set the trace for bubble chart

	var trace3 = {
		x: sampleIds,
		y: sampleValues,
		mode: 'markers',

		hovertext: hovertext,
		marker: {
			size: sampleValues,
			color: sampleIds,
			
			}
			
		
	};

	// Create the data array for bubble plot

		var data3 = [trace3];
	
		var layout3 = {
			title: " Bateria Cultures Per Sample",
			showlegend: false,
			height: 600,
			width: 1200,
		};
			
			Plotly.newPlot("bubble", data3, layout3);
	});


	}



function init() {

	
	d3.json("data/samples.json").then ((data) => {

		var parsedData = data.names;
		console.log(parsedData);

		var dropdown = d3.select("#selDataset");

		parsedData.forEach((name) => {
			dropdown.append("option").property("value", name).text(name);
		})

		buildMetadata(parsedData[0]);
		buildPlot(parsedData[0]);

		
	});

}

// This function is called when a dropdown menu item is selected
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildPlot(newSample);

};

init();



