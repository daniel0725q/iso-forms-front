import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
page: {
  backgroundColor: '#fff',
  padding: 5,
},
title: {
  fontSize: 13,
  textAlign: 'center',
  fontWeight: 'bold',
  
},
title_bordered: {
  fontSize: 13,
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: '1px solid black',
  marginHorizontal: 10
},
section: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '5px 20px 5px 20px'
},
parragraph: {
  fontSize: 12,
  textAlign: 'center',
  lineHeight: 1.5,
  margin: 7,
},
pageNumber: {
  position: 'absolute',
  fontSize: 12,
  bottom: 30,
  left: 0,
  right: 0,
  textAlign: 'center',
  color: 'white',
}
});

interface IPDF {
  content: any
}

export const PDF = (props: IPDF) =>  {
  return (
    <Document>
      <Page 
        size={{ width: 240, height: 540 }}
        style={styles.page}>
        <Text style={styles.parragraph}>Fecha de emición</Text>
        <Text style={styles.title_bordered}>"FECHA" </Text>
        <Text style={styles.parragraph}> Tu número de radicación es: </Text>
        <Text style={styles.title}>
          Título
        </Text>
        <Text style={styles.parragraph}>
          Hola, aquí te atenderán
        </Text>
        <Text style={styles.parragraph}>
          Tipo de servicio: completo
        </Text>
        <Text style={styles.parragraph}>
          Ips: Saman
        </Text>
        <Text style={styles.title}>
          Sede: SURA
        </Text>
        <Text style={styles.title}>
          Hoy
        </Text>
        <Text style={styles.title}>
          123.128.7.6
        </Text>
        <Text style={styles.title_bordered}>
          1234567
        </Text>
        <Text style={styles.title}>
          Gracias por usar
        </Text>
      <Text style={styles.title_bordered}>
          puntofacil.coosalud.com
        </Text>

      </Page>
    </Document>
  );

}

export default PDF;