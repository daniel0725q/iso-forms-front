import React, { useEffect, useRef, useState } from 'react';
import * as go from 'gojs';

const DiagramEditor = () => {
  const diagramRef: any = useRef(null);
  const paletteRef: any = useRef(null);
  const textRef: any = useRef(null);

  const [diag, setDiag] = useState<any>(null);


  useEffect(() => {
    const $ = go.GraphObject.make;

    var yellow = '#FFB400';

    var green = '#7FB800';
    var blue = '#00A6ED';
    var red = '#D73909';
    var white = '#DCE9F9';

    var blueShadow = '#407090';
    var greenShadow = '#406050';
    var yellowShadow = '#804040';
    var redShadow = '#705020';
    var whiteShadow = '#404050';

    var selectColor = 'dodgerBlue';
    var undesiredEventTextColor = 'whitesmoke';

    var lineColor = '#0D2C54';
    var commentLineColor = 'darkgreen';

    var darkModeBackgroundColor = '#06162a';
    var lightModeBackgroundColor = '#FFFFFF';

    var bigfont = 'bold 13pt Helvetica, Arial, sans-serif';
    var smallfont = 'bold 11pt Helvetica, Arial, sans-serif';

    function addNodeAndLink(e: any, obj: any) {
        var adorn = obj.part;
        if (adorn === null) return;
        e.handled = true;
        var diagram = adorn.diagram;
        diagram.startTransaction('Add State');
        // get the node data for which the user clicked the button
        var fromNode = adorn.adornedPart;
        var fromData = fromNode.data;
        // create a new "State" data object, positioned off to the right of the adorned Node
        var toData: any = { text: 'new' };
        var p = fromNode.location;
        toData.loc = p.x + 200 + ' ' + p.y; // the "loc" property is a string, not a Point object
        // add the new node data to the model
        var model = diagram.model;
        model.addNodeData(toData);
        // create a link data from the old node data to the new node data
        var linkdata: any = {};
        linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
        linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
        // and add the link data to the model
        model.addLinkData(linkdata);
        // select the new Node
        var newnode = diagram.findNodeForData(toData);
        diagram.select(newnode);
        diagram.commitTransaction('Add State');
      }

      var defaultAdornment = new go.Adornment('Spot')
      .add(
        new go.Panel('Auto')
          .add(
            new go.Shape({
              fill: null,
              stroke: selectColor,
              strokeWidth: 3
            }),
            new go.Placeholder()
          )
      )
      .add(
        // the button to create a "next" node, at the top-right corner
        go.GraphObject.make('Button', {
          alignment: new go.Spot(1, 0, -5, 5),
          click: addNodeAndLink
        }) // this function is defined below
          .bindObject('visible', '', (a) => !a.diagram.isReadOnly)
          .add(
            new go.Shape('PlusLine', { desiredSize: new go.Size(6, 6) })
          )
      );
      
    // Define text styling
    function textStyle() {
      return {
        margin: 10,
        wrap: go.TextBlock.WrapFit,
        textAlign: 'center',
        editable: true,
        font: bigfont,
      };
    }

    // Initialize the main diagram
    const myDiagram = $(go.Diagram, diagramRef.current, {
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
      initialAutoScale: go.Diagram.Uniform,
      'linkingTool.direction': go.LinkingTool.ForwardsOnly,
      layout: $(go.LayeredDigraphLayout, {
        isInitial: false,
        isOngoing: false,
        layerSpacing: 100,
      }),
      'undoManager.isEnabled': true,
    });

    // Modify title and Save button on document change
    myDiagram.addDiagramListener('Modified', () => {
      const saveButton: any = document.getElementById('SaveButton');
      if (saveButton) saveButton.disabled = !myDiagram.isModified;
      const idx = document.title.indexOf('*');
      if (myDiagram.isModified) {
        if (idx < 0) document.title += '*';
      } else {
        if (idx >= 0) document.title = document.title.slice(0, idx);
      }
    });

    // Define node templates (examples)
    myDiagram.nodeTemplate = new go.Node('Auto', {
        selectionAdornmentTemplate: defaultAdornment,
        isShadowed: true,
        shadowBlur: 2,
        shadowColor: yellowShadow,
        shadowOffset: new go.Point(4, 6)
      })
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
        .add(
          new go.Shape('Rectangle', {
            fill: yellow,
            stroke: 'rgba(0, 0, 0, 0)',
            portId: '',
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer',
            toEndSegmentLength: 50,
            fromEndSegmentLength: 40
          }),
          new go.TextBlock('Panel', {
            margin: 10,
            font: bigfont,
            editable: true
          })
            .bindTwoWay('text')
        );
  
      myDiagram.nodeTemplateMap.add('Codigo',
        new go.Node('Auto', {
          isShadowed: true,
          shadowBlur: 2,
          shadowColor: blueShadow,
          shadowOffset: new go.Point(4, 6)
        })
          .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
          .add(
            new go.Shape('RoundedRectangle', {
              name: 'SHAPE',
              fill: blue,
              stroke: 'rgba(0, 0, 0, 0)',
              portId: '',
              fromLinkable: true,
              cursor: 'pointer',
              fromEndSegmentLength: 40
            })
              .bind('fill', 'color'),
            new go.TextBlock('Inicio', textStyle() as any)
              .bindTwoWay('text')
          )
      );
  
      myDiagram.nodeTemplateMap.add('DesiredEvent',
        new go.Node('Auto', {
          isShadowed: true,
          shadowBlur: 2,
          shadowColor: greenShadow,
          shadowOffset: new go.Point(4, 6)
        })
          .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
          .add(
            new go.Shape('RoundedRectangle', {
              fill: green,
              stroke: null,
              portId: '',
              toLinkable: true,
              toEndSegmentLength: 50
            })
              .bind('fill', 'color'),
            new go.TextBlock('Fin', textStyle() as any)
              .bindTwoWay('text')
          )
      );

    // Initialize the palette
    const myPalette = $(go.Palette, paletteRef.current, {
      nodeTemplateMap: myDiagram.nodeTemplateMap,
      autoScale: go.Diagram.Uniform,
      model: new go.GraphLinksModel([
        { category: 'Codigo' },
        { category: 'DesiredEvent' },
        { category: 'UndesiredEvent', reasonsList: [{}] },
        { category: 'Comment' },
      ]),
    });

    // Clean up on unmount
    return () => {
      myDiagram.div = null;
      myPalette.div = null;
    };
  }, []);

  // Save and Load functions
  const save = () => {
    const myDiagram = go.Diagram.fromDiv(diagramRef.current);
    if (myDiagram) {
      const modelJson = myDiagram.model.toJson();
      console.log('Saved Model:', modelJson);
      setDiag(modelJson);
    }
  };

  const load = () => {
    const myDiagram = go.Diagram.fromDiv(diagramRef.current);
    if (myDiagram) {
      const modelJson = '{"class": "go.GraphLinksModel", "nodeDataArray": [], "linkDataArray": []}';
      myDiagram.model = go.Model.fromJson(modelJson);
    }
  };
  
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div ref={paletteRef} style={{ width: '150px', height: '600px', border: '1px solid #ccc', display: 'inline-block' }}></div>
        <div ref={diagramRef} style={{ width: '800px', height: '600px', border: '1px solid #ccc', display: 'inline-block' }}></div>
        <div ref={textRef} style={{ width: '150px', height: '600px', border: '1px solid #ccc', display: 'inline-block' }}>
            { diag }
        </div>
      </div>
      <button id="SaveButton" onClick={save}>Save</button>
      <button onClick={load}>Load</button>
    </div>
  );
};

export default DiagramEditor;
