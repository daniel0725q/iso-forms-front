import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import PageContent from './PageContent'; // Assuming PageContent component is imported

interface MyDocumentProps {
  content: any
}

const MyDocument = (props: MyDocumentProps) => (
  <Document>
    <PageContent content={"HI"} />
  </Document>
);

export default MyDocument;
