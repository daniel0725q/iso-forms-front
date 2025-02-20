import { useRef, useState } from "react";
import Bpmn from "./Bpmn";
import { useParams } from "react-router-dom";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_11uuseb" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="14.0.0">
  <bpmn:process id="Process_0cybc1z" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1ylxb7y">
      <bpmn:outgoing>Flow_1swbon5</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:endEvent id="Event_1apm4np">
      <bpmn:incoming>Flow_1swbon5</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1swbon5" sourceRef="StartEvent_1ylxb7y" targetRef="Event_1apm4np" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0cybc1z">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1ylxb7y">
        <dc:Bounds x="156" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1apm4np_di" bpmnElement="Event_1apm4np">
        <dc:Bounds x="302" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1swbon5_di" bpmnElement="Flow_1swbon5">
        <di:waypoint x="192" y="100" />
        <di:waypoint x="302" y="100" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;

type BpmnChild = {
  handleReset: () => void;
  applyColorToElement: (elementId: string, color: string) => void;
  getSelectedElement: () => any; // Método para obtener el elemento seleccionado
};

function Editor() {
  const childRef = useRef<BpmnChild>(null); // Tipado correcto del ref
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("#FFFFFF"); // Color seleccionado

  // Paleta de colores predefinidos
  const colorPalette = [
    "#4A90E2", // Azul corporativo
    "#50E3C2", // Verde agua
    "#B8E986", // Verde claro
    "#F8E71C", // Amarillo suave
    "#F5A623", // Naranja suave
    "#D0021B", // Rojo serio
    "#BD10E0", // Morado moderno
    "#9013FE", // Morado oscuro
    "#7ED321", // Verde fresco
    "#417505", // Verde oscuro
    "#8B572A", // Marrón
    "#4A4A4A", // Gris oscuro
    "#9B9B9B", // Gris medio
    "#E1E1E1", // Gris claro
  ];

  const handleColorChange = (color: string) => {
    if (childRef.current) {
      const selectedElement = childRef.current.getSelectedElement(); // Obtener el elemento seleccionado
      if (selectedElement) {
        childRef.current.applyColorToElement(selectedElement.id, color); // Aplicar el color al elemento
      }
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <h1>Mapa de Procesos</h1>
        <label>
          Selecciona un color:
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value);
              handleColorChange(e.target.value);
            }}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>

        {/* Paleta de colores predefinidos */}
        <div style={{ marginTop: "1rem", display:'flex', justifyContent:'center' }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {colorPalette.map((color, index) => (
              <div
                key={index}
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: color,
                  cursor: "pointer",
                  border: color === selectedColor ? "2px solid #000" : "1px solid #ccc",
                }}
                onClick={() => {
                  setSelectedColor(color);
                  handleColorChange(color);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {!id ? (
        <Bpmn ref={childRef} xml={xml} />
      ) : (
        <Bpmn ref={childRef} xml={xml} id={id} />
      )}
    </>
  );
}

export default Editor;
/*import { useRef } from "react";
import Bpmn from "./Bpmn"
import type InternalEvent from "bpmn-js/lib/Viewer"
import { useParams } from "react-router-dom";
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_11uuseb" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="14.0.0">
  <bpmn:process id="Process_0cybc1z" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1ylxb7y">
      <bpmn:outgoing>Flow_1swbon5</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:endEvent id="Event_1apm4np">
      <bpmn:incoming>Flow_1swbon5</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1swbon5" sourceRef="StartEvent_1ylxb7y" targetRef="Event_1apm4np" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0cybc1z">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1ylxb7y">
        <dc:Bounds x="156" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1apm4np_di" bpmnElement="Event_1apm4np">
        <dc:Bounds x="302" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1swbon5_di" bpmnElement="Flow_1swbon5">
        <di:waypoint x="192" y="100" />
        <di:waypoint x="302" y="100" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`
type BpmnChild = {
  handleReset: () => void
}

function Editor() {
  const childRef = useRef<BpmnChild>();
  const { id } = useParams();

  const handleReset = () => {
    if (childRef.current) {
      childRef.current.handleReset()
    }
  }

  return (
    <>
    
    {!id ? <Bpmn ref={childRef} xml={xml} /> : <Bpmn ref={childRef} xml={xml} id={id} />}
    </>
  )
}

export default Editor*/
