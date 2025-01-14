import React, { useEffect, useRef } from 'react';
import Diagram from 'diagram-js';
import ModelingModule from 'diagram-js/lib/features/modeling';
import ConnectModule from 'diagram-js/lib/features/connect';
import MoveModule from 'diagram-js/lib/features/move';
import KeyboardModule from 'diagram-js/lib/features/keyboard';
import SelectionModule from 'diagram-js/lib/features/selection';
import { assign } from 'min-dash';

const DiagramEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const diagram = new Diagram({
      canvas: {
        container: containerRef.current
      },
      modules: [
        ModelingModule,
        ConnectModule,
        MoveModule,
        KeyboardModule,
        SelectionModule
      ]
    });

    const canvas: any = diagram.get('canvas');
    const elementFactory: any = diagram.get('elementFactory');
    const modeling: any = diagram.get('modeling');
    const elementRegistry: any = diagram.get('elementRegistry');

    // Crear un plano raíz si no existe
    let rootElement = canvas.getRootElement();
    if (!rootElement) {
      rootElement = elementFactory.createRoot({
        id: 'root'
      });
      canvas.setRootElement(rootElement);
    }

    canvas.zoom('fit-viewport');

    // Función para añadir una caja al diagrama
    const addBox = () => {
      const shape = elementFactory.createShape({
        id: `box_${Math.random()}`,
        x: 100,
        y: 100,
        width: 100,
        height: 80,
        businessObject: { name: 'Box' }
      });

      modeling.createShape(shape, { x: 100, y: 100 }, rootElement);
    };

    // Función para enlazar dos cajas con una flecha
    const linkBoxes = (sourceId: string, targetId: string) => {
      const source = elementRegistry.get(sourceId);
      const target = elementRegistry.get(targetId);

      if (source && target) {
        const connection = elementFactory.createConnection({
          id: `connection_${Math.random()}`,
          waypoints: [
            { x: source.x + source.width / 2, y: source.y + source.height / 2 },
            { x: target.x + target.width / 2, y: target.y + target.height / 2 }
          ],
          source,
          target,
          businessObject: { name: 'Connection' }
        });

        modeling.createConnection(connection, source, target, rootElement);
      }
    };

    // Añadir botones para añadir cajas y enlazar cajas
    const addButton = (text: string, onClick: () => void) => {
      const button = document.createElement('button');
      button.innerText = text;
      button.onclick = onClick;
      containerRef.current?.appendChild(button);
    };

    addButton('Añadir Caja', addBox);
    addButton('Enlazar Cajas', () => linkBoxes('box_1', 'box_2'));

    return () => {
      diagram.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default DiagramEditor;