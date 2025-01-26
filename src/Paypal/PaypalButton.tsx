import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PaypalButtonInterface {
  invoice: string;
  totalValue: string;
  customId: string; // Añadir el ID personalizado como prop
}

const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                currency_code: "USD",
                value: props.totalValue,
              },
              custom_id: props.customId, // Añadir el ID personalizado aquí
            },
          ],
          intent: "CAPTURE"
        });
      }}
      onApprove={async (data, actions) => {
        if (actions.order) {
          const order = await actions.order.capture();
          console.log('Order captured:', order);

          // Realizar la llamada a la API REST con el ID personalizado
          fetch('https://your-api-endpoint.com/activate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: order.id,
              customId: props.customId, // Enviar el ID personalizado
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('API response:', data);
            // Manejar la respuesta de la API
          })
          .catch(error => {
            console.error('Error al llamar a la API:', error);
          });
        }
      }}
    />
  );
};

export default PaypalButton;