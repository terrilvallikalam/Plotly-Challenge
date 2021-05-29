d3.json("static/data/data.json").then((data) => {

    // add data to the dropdown menu
    var dropDown = d3.select("#selDataset");
    data.names.forEach(function(value) {
        var option = dropDown.append("option");
        option.attr("value", value);
        option.text(value);
    });

    // plot the default data (940) when the page loads
    data.samples.forEach(function(value) {
        if (value.id === "940") {
            var yAxis = value.otu_ids.map(y => "OTU ID:" + y);
            // bar chart
            var traceBarDefault = {
                x: value.sample_values.slice(0,10).reverse(),
                y: yAxis.slice(0,10).reverse(),
                type: "bar",
                orientation: "h",
                text: value.otu_labels.slice(0,10).reverse(),
            };

            var layout = {
                title: "Frequency of Top 10 Microbes",
                };

            plotDefault = [traceBarDefault];
            Plotly.newPlot("bar", plotDefault, layout)

            // bubble chart
            var traceBubbleDefault = {
                x: value.otu_ids,
                y: value.sample_values,
                mode: 'markers',
                marker: {
                    size: value.sample_values.map(d => (d/2)),
                    color: value.otu_ids,
                },
                text: value.otu_labels
            };

            layout = {
                xaxis: { title: "OTU ID" }

            };

            plotBubbleDefault = [traceBubbleDefault];
            Plotly.newPlot("bubble", plotBubbleDefault, layout)
        };


    });

    var demographics = d3.select(".panel-body");
    
    data.metadata.forEach(function (value) {
        var ID = value.id.toString()
        
        if (ID === "940") {
            
            var p = demographics.append("p");
            p.attr("value", value.id);
            p.text("Test Subject ID:" + " " + value.id);

            var p = demographics.append("p");
            p.attr("value", value.ethnicity);
            p.text("Ethnicity:" + " " + value.ethnicity);

            var p = demographics.append("p");
            p.attr("value", value.gender);
            p.text("Gender:" + " " + value.gender);

            var p = demographics.append("p");
            p.attr("value", value.age);
            p.text("Age:" + " " + value.age);

            var p = demographics.append("p");
            p.attr("value", value.location);
            p.text("Location:" + " " + value.location);

            var p = demographics.append("p");
            p.attr("value", value.bbtype);
            p.text("Belly Button Type:" + " " + value.bbtype);

            var p = demographics.append("p");
            p.attr("value", value.wfreq);
            p.text("Wash Frequency:" + " " + value.wfreq);
        
        };
    
    });
    // update demographic and graphs based on dropdown choice
    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {

        // clear demographics
        var panelBody = d3.select(".panel-body");

        panelBody.html("")
        
        //use d3 to select the dropdown menu
        var dropDownMenu = d3.selectAll("#selDataset");

        // assign selection to a variable
        var newID = dropDownMenu.property("value");

        data.samples.forEach(function(value) {
            if (value.id === newID) {

                var yAxis = value.otu_ids.map(y => "OTU ID:" + y);
                
                var trace1 = {
                    x: value.sample_values.slice(0,10).reverse(),
                    y: yAxis.slice(0,10).reverse(),
                    type: "bar", 
                    orientation: "h",
                    text: value.otu_labels.slice(0,10).reverse(),
                };
        
                plot = [trace1];
                Plotly.newPlot("bar", plot)
            };
        });
    
        // create bubble chart
        data.samples.forEach(function(value) {
            if (value.id === newID) {
                var tracebubbleChoice = {
                    x: value.otu_ids.slice(0,10),
                    y: value.sample_values.slice(0,10),
                    mode: 'markers',
                    marker: {
                      color: value.otu_ids,
                      size: value.sample_values.map(d=>(d/2))
                    },
                    text: value.otu_labels.slice(0,10)
                  };

                  layout = {
                    xaxis: { title: "OTU ID" }
    
                };

                plotBubbleChoice = [tracebubbleChoice];
                Plotly.newPlot("bubble", plotBubbleChoice, layout)
            };
        });

        // populate the demographic info in the table upon change
        var demographics = d3.select(".panel-body");

        data.metadata.forEach(function (value) {
            var ID = value.id.toString()
            
            if (ID === newID) {
                
                var p = demographics.append("p");
                p.attr("value", value.id);
                p.text("Test Subject ID:" + " " + value.id);

                var p = demographics.append("p");
                p.attr("value", value.ethnicity);
                p.text("Ethnicity:" + " " + value.ethnicity);

                var p = demographics.append("p");
                p.attr("value", value.gender);
                p.text("Gender:" + " " + value.gender);

                var p = demographics.append("p");
                p.attr("value", value.age);
                p.text("Age:" + " " + value.age);

                var p = demographics.append("p");
                p.attr("value", value.location);
                p.text("Location:" + " " + value.location);

                var p = demographics.append("p");
                p.attr("value", value.bbtype);
                p.text("Belly Button Type:" + " " + value.bbtype);

                var p = demographics.append("p");
                p.attr("value", value.wfreq);
                p.text("Wash Frequency:" + " " + value.wfreq);
            
            };
        
        });
        
    };

});
