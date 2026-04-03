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
    backgroundColor: '#059669', // Emerald 600
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
    fontSize: 11,
    color: '#334155',
    lineHeight: 1.6,
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#059669', // Emerald 600
    padding: 12,
    marginBottom: 15,
    textAlign: 'center',
    borderRadius: 6,
  },
  h2: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#047857', // Emerald 700
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#ecfdf5', // Emerald 50
    padding: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    borderLeftStyle: 'solid',
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 12,
    marginBottom: 6,
  },
  p: {
    fontSize: 11,
    marginBottom: 8,
    textAlign: 'justify',
  },
  ul: {
    marginBottom: 10,
    marginLeft: 15,
  },
  ol: {
    marginBottom: 10,
    marginLeft: 15,
  },
  li: {
    fontSize: 11,
    marginBottom: 6,
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
  },
  th: {
    backgroundColor: '#f8fafc',
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#0f172a',
  },
  td: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
    fontSize: 11,
  },
  hr: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    borderBottomStyle: 'dashed',
  }
};

const UsersIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Path d="M12 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
    <Path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

export const ParentMeetingPDF = ({ markdown }: { markdown: string }) => {
  const htmlContent = marked.parse(markdown) as string;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Global Header */}
        <View style={styles.header} fixed>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <UsersIcon />
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

        {/* MEB Antet for Meeting */}
        <View style={{ alignItems: 'center', marginBottom: 20 }} fixed>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>T.C.</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>.................................................. KAYMAKAMLIĞI</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>.................................................. MÜDÜRLÜĞÜ</Text>
          <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 5 }}>2023-2024 EĞİTİM ÖĞRETİM YILI</Text>
        </View>

        <Html stylesheet={htmlStyles}>{htmlContent}</Html>

        {/* İmza Blokları */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, paddingHorizontal: 20 }} wrap={false}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 30 }}>Sınıf Rehber Öğretmeni</Text>
            <Text style={{ fontSize: 11 }}>.........................</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 10 }}>Okul Müdürü</Text>
            <Text style={{ fontSize: 11, marginBottom: 20 }}>......./......./202...</Text>
            <Text style={{ fontSize: 11 }}>.........................</Text>
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
