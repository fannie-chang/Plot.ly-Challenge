// Use D3 fetch to read the JSON file

d3.json("data/samples.json").then ((importedData) => {
	//console.log(importedData);
	var data = importedData;
})

//Sort the data array using the 