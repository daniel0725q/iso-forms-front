import { useRef } from "react";
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

export default Editor
