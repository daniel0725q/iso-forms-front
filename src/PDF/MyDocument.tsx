import React from 'react';
import { Document, Page, View, Text, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
});

interface PDFGeneratorProps {
  content: any;
  fileName: string;
}

class PDFGenerator extends React.Component<PDFGeneratorProps> {
  parse(content: any) {
    const elements: any[] = [];
    for (const key in content) {
      const el = content[key];
      if (Array.isArray(el)) {
        el.forEach((v: any) => {
          if (v.value.includes("<ul>")) {
            const firstIndex = v.value.indexOf("<ul>")
            const lastIndex = v.value.indexOf("</ul>")
          }

          if (v.value.includes("<img")) {
            const firstIndex = v.value.indexOf("<img src")
            const lastIndex = v.value.indexOf(">", firstIndex)
            const src =v.value.substring(firstIndex + 9, lastIndex);
            const img = <Image src={src}></Image>;
            elements.push(img);
          }
        })
      }
    }
    return elements;
  }

    render() {
      const { content, fileName } = this.props;
      const element = (
        <Document>
            <Page size="A4" style={styles.page}>
                {this.parse(content)}
            </Page>
        </Document>
    );

        return (
            <div>
                <PDFDownloadLink document={element} fileName={fileName}>
                  Download
                </PDFDownloadLink>
            </div>
        );
    }
}

export default PDFGenerator;
