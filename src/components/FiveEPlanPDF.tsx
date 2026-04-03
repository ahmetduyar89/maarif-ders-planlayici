import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { marked } from 'marked';

// Türkçe karakter desteği için Roboto fontunu kaydediyoruz
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf', fontStyle: 'italic' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottom: '2 solid #e2e8f0',
    paddingBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#0284c7', // Sky 600
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 9,
    color: '#94a3b8',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1 solid #e2e8f0',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#94a3b8',
  }
});

const htmlStyles = {
  body: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.5,
  },
  h1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0284c7', // Sky 600
    padding: 10,
    marginBottom: 15,
    textAlign: 'center',
    borderRadius: 6,
  },
  h2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0369a1', // Sky 700
    marginTop: 15,
    marginBottom: 8,
    backgroundColor: '#f0f9ff', // Sky 50
    padding: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
    borderLeftStyle: 'solid',
  },
  h3: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 10,
    marginBottom: 4,
  },
  p: {
    fontSize: 10,
    marginBottom: 6,
    textAlign: 'justify',
  },
  ul: {
    marginBottom: 8,
    marginLeft: 15,
  },
  ol: {
    marginBottom: 8,
    marginLeft: 15,
  },
  li: {
    fontSize: 10,
    marginBottom: 4,
  },
  strong: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  em: {
    fontStyle: 'italic',
  },
  table: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
  },
  th: {
    backgroundColor: '#f8fafc',
    padding: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
    fontWeight: 'bold',
    fontSize: 10,
    color: '#0f172a',
  },
  td: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
    fontSize: 10,
  }
};

const SparklesIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </Svg>
);

export const FiveEPlanPDF = ({ markdown }: { markdown: string }) => {
  const htmlContent = marked.parse(markdown) as string;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Global Header */}
        <View style={styles.header} fixed>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <SparklesIcon />
            </View>
            <View>
              <Text style={styles.headerTitle}>Eğitim AI</Text>
              <Text style={styles.headerSubtitle}>Öğretmen Asistanı</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.dateText}>{new Date().toLocaleDateString('tr-TR')}</Text>
          </View>
        </View>

        {/* MEB Antet for 5E Plan */}
        <View style={{ alignItems: 'center', marginBottom: 20 }} fixed>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>T.C.</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>.................................................. KAYMAKAMLIĞI</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>.................................................. MÜDÜRLÜĞÜ</Text>
          <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 5 }}>2023-2024 EĞİTİM ÖĞRETİM YILI</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 10, textDecoration: 'underline' }}>5E DERS PLANI</Text>
        </View>

        <Html stylesheet={htmlStyles}>{htmlContent}</Html>

        {/* Signature Block */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 20 }} wrap={false}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 11, marginBottom: 40 }}>..../..../202...</Text>
            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Ders Öğretmeni</Text>
            <Text style={{ fontSize: 11 }}>İmza</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 11, marginBottom: 40 }}>..../..../202...</Text>
            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Okul Müdürü</Text>
            <Text style={{ fontSize: 11 }}>İmza</Text>
          </View>
        </View>

        {/* Global Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Eğitim AI - Öğretmen Asistanı tarafından oluşturulmuştur.</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
            `Sayfa ${pageNumber} / ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );
};
