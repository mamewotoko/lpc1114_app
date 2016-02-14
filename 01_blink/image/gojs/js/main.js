function init() {
    var $ = go.GraphObject.make;

    myDiagram =
	$(go.Diagram, "myDiagram",
          {
              //initialContentAlignment: go.Spot.Left,
              initialContentAlignment: go.Spot.Top,
              initialAutoScale: go.Diagram.UniformToFill,
              layout: $(go.LayeredDigraphLayout,
			{ direction: 0 }),
              "undoManager.isEnabled": true
          }
	 );

    function makePort(name, leftside) {
	var port = $(go.Shape, "Rectangle",
                     {
			 fill: "gray", stroke: null, strokeWidth: 0,
			 desiredSize: new go.Size(8, 8),
			 portId: name,  // declare this object to be a "port"
			 //toMaxLinks: 1,  // don't allow more than one link into a port
			 cursor: "pointer"  // show a different cursor to indicate potential link point
                     });

	var lab = $(go.TextBlock, name,  // the name of the port
                    { font: "7pt sans-serif" });

	var panel = $(go.Panel, "Horizontal",
                      { margin: new go.Margin(2, 0) });

	if (leftside) {
            port.toSpot = go.Spot.Left;
            port.toLinkable = true;
            lab.margin = new go.Margin(1, 0, 0, 1);
            panel.alignment = go.Spot.TopLeft;
            panel.add(port);
            panel.add(lab);
	} else {
            port.fromSpot = go.Spot.Right;
            port.fromLinkable = true;
            lab.margin = new go.Margin(1, 1, 0, 0);
            panel.alignment = go.Spot.TopRight;
            panel.add(lab);
            panel.add(port);
	}
	return panel;
    }

    function makeTemplate(typename, background, inports, outports, w, h) {
	var width = 100;
	if(typeof w != "undefined"){
	    width = w;
	}
	var height;
	if(typeof h != "undefined"){
	    height = h;
	}
	else {
	    height = Math.max(inports.length, outports.length)*20;
	}
	var node = $(go.Node, "Spot",
		     $(go.Panel, "Auto",
		       { width: width, height: height },
		       $(go.Shape, "Rectangle",
			 {
			     fill: background, stroke: null, strokeWidth: 0,
			     spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight
			 }),
		       $(go.Panel, "Table",
			 $(go.TextBlock, typename,
			   {
			       row: 0,
			       margin: 3,
			       maxSize: new go.Size(80, NaN),
			       stroke: "white",
			       font: "bold 11pt sans-serif"
			   }),
			 $(go.TextBlock,
			   {
			       row: 2,
			       margin: 3,
			       editable: true,
			       maxSize: new go.Size(80, 40),
			       stroke: "white",
			       font: "bold 9pt sans-serif"
			   },
			   new go.Binding("text", "name").makeTwoWay())
			)
		      ),
		     $(go.Panel, "Vertical",
		       {
			   alignment: go.Spot.Left,
			   alignmentFocus: new go.Spot(0, 0.5, -8, 0)
		       },
		       inports),
		     $(go.Panel, "Vertical",
		       {
			   alignment: go.Spot.Right,
			   alignmentFocus: new go.Spot(1, 0.5, 8, 0)
		       },
		       outports)
		    );
	myDiagram.nodeTemplateMap.add(typename, node);
    }

    makeTemplate("Chip", "gray",
                 [makePort("1:PIO0_8", true),
		  makePort("2:PIO0_9", true),
		  makePort("3:SWCLK", true),
		  makePort("4:PIO0_11", true),
		  makePort("5:PIO0_5", true),
		  makePort("6:PIO0_6", true),
		  makePort("7:V_DDA", true),
		  makePort("8:V_SSA", true),
		  makePort("9:PIO1_0", true),
		  makePort("10:PIO1_1", true),
		  makePort("11:PIO1_2", true),
		  makePort("12:SWDIO", true),
		  makePort("13:PIO1_4", true),
		  makePort("14:PIO1_5,RXD", true)
		 ],
                 [makePort("28", false),
		  makePort("27", false),
		  makePort("26", false),
		  makePort("25", false),
		  makePort("24", false),
		  makePort("23", false),
		  makePort("22", false),
		  makePort("21", false),
		  makePort("20", false),
		  makePort("29", false),
		  makePort("18", false),
		  makePort("17", false),
		  makePort("16", false),
		  makePort("15", false)
		 ]);
    
    makeTemplate("Switch", "mediumorchid",
                 [makePort("1", true), makePort("3", true)],
                 [makePort("2", true), makePort("4", true)]);
    makeTemplate("LED", "blue",
                 [makePort("+", true)],
                 [makePort("-", false)], 50, 30);
    makeTemplate("Line", "black",
                 [],
		 [], 30, 300);
                 //[makePort("1", false)], 30, 300);
    
    makeTemplate("USB", "mediumorchid",
                 [makePort("1:GND", true),
		  makePort("2:TXD", true),
		  makePort("3:VDD324", true),
		  makePort("4:RXD", true)],
                 [makePort("8:VO_33", false),
		  makePort("7:VDD_5", false),
		  makePort("6:DM", false),
		  makePort("5:DP", false)]);

    myDiagram.linkTemplate =
	$(go.Link,
          {
              routing: go.Link.Orthogonal,
	      corner: 5,
              relinkableFrom: true,
	      relinkableTo: true
          },
          $(go.Shape, { stroke: "green", strokeWidth: 2 })
	 );

    load();
}

// Show the diagram's model in JSON format that the user may edit
function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}

function load() {
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}
