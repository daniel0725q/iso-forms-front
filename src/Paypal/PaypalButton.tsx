import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
const { REACT_APP_API_ENDPOINT } = process.env;

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
          fetch(`${REACT_APP_API_ENDPOINT}/payments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`
            },
            body: JSON.stringify({
              paymentId: order.id,
              formTemplateId: props.customId, // Enviar el ID personalizado
              status: order.status,
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