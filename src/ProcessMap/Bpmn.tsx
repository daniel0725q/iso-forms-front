/* eslint-disable @typescript-eslint/no-explicit-any */
import BpmnModeler from 'bpmn-js/lib/Modeler';  // <-- Importa Modeler en lugar de Viewer
import type EventBus from 'diagram-js/lib/core/EventBus'; 
import type InternalEvent from 'diagram-js/lib/core/EventBus'; // Ajusta tipos si es necesario
import { forwardRef, useCallback, useEffect, useRef, useState, useImperativeHandle } from 'react';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

type BpmnProps = {
  xml: string;
  onEventClick?: (e: InternalEvent) => void;
  onSave?: (xmlSaved: string) => void;  // <-- Prop opcional para guardar el XML
};

const Bpmn = forwardRef(({ xml, onEventClick, onSave }: BpmnProps, ref) => {
  const bpmnRef = useRef<HTMLDivElement>(null);
  const [diagram, setDiagram] = useState("");
  const modeler = useRef<BpmnModeler | null>(null);

  const handleEventClick = useCallback((e: InternalEvent) => {
    if (onEventClick) {
      onEventClick(e);
    }
  }, [onEventClick]);

  useImperativeHandle(ref, () => ({
    handleReset() {
      if (modeler.current) {
        const selection = modeler.current.get("selection") as any;
        selection.select([]);
      }
    },
  }), []);

  useEffect(() => {
    setDiagram(xml);
  }, [xml]);

  useEffect(() => {
    const createModeler = async () => {
      if (bpmnRef.current && diagram) {
        // Instancia de BpmnModeler que permite edición
        modeler.current = new BpmnModeler({
          container: bpmnRef.current,
          keyboard: {
            bindTo: bpmnRef.current
          }
        });

        try {
          const { warnings } = await modeler.current.importXML(diagram);
          console.log("Import warnings:", warnings);

          const eventBus = modeler?.current?.get("eventBus") as EventBus;
          eventBus.on("element.click", handleEventClick);

        } catch (error) {
          console.error("Error importing XML:", error);
        }
      }
    };

    createModeler();

    return () => {
      modeler.current?.destroy();
    };
  }, [diagram, handleEventClick]);

  // Función para guardar el diagrama
//   const handleSaveDiagram = async () => {
//     if (modeler.current) {
//       try {
//         const { xml: xmlSaved } = await modeler.current.saveXML({ format: true });
//         console.log("XML guardado:", xmlSaved);
//         // Llamar a la prop onSave si está definida, para enviar el XML a un backend o BD
//         if (onSave) {
//           onSave(xmlSaved);
//         } else {
//           // Lógica de guardado por defecto:
//           // Enviar el xmlSaved a tu servicio (fetch, axios, etc.)
//           // fetch('/api/guardar-diagrama', { method: 'POST', body: xmlSaved });
//         }
//       } catch (error) {
//         console.error("Error saving XML:", error);
//       }
//     }
//   };

  return (
    <>
      <div
        ref={bpmnRef}
        style={{
          border: "1px solid #000000",
          height: "80vh",
          width: "80vw",
          margin: "auto"
        }}
      />
      {/* <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={handleSaveDiagram}>Guardar diagrama</button>
      </div> */}
    </>
  );
});

export default Bpmn;
