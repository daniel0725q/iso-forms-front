import React from 'react';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Header from './Header'; // Assuming Header component is imported
import Html from 'react-pdf-html'; // Import the Html component

interface PageContentProps {
    content: any
}

const PageContent = (props: PageContentProps) => (
  <Page style={styles.page} size={'A4'}>
    <Header />
    <Html>{props.content}</Html>
  </Page>
);

const styles = StyleSheet.create({
  page: { padding: 20 },
});

export default PageContent;
