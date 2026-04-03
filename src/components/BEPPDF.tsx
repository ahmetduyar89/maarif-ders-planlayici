import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { getTeacherProfile } from '../utils/profileUtils';

// Register a font that supports Turkish characters
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: '40 50',
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#1e293b',
    paddingBottom: 15,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  headerRight: {
    textAlign: 'right',
  },
  documentType: {
    fontSize: 14,
    fontWeight: 700,
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  date: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#94a3b8',
  },
  pageNumber: {
    fontSize: 9,
    color: '#94a3b8',
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#334155',
  }
});

const HeartHandshakeIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <Path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
    <Path d="m18 15-2-2" />
    <Path d="m15 18-2-2" />
  </Svg>
);

const htmlStyles = {
  h1: { fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, marginTop: 10 },
  h2: { fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 10, marginTop: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 4 },
  h3: { fontSize: 14, fontWeight: 700, color: '#334155', marginBottom: 8, marginTop: 12 },
  p: { fontSize: 11, lineHeight: 1.6, color: '#334155', marginBottom: 8 },
  ul: { marginBottom: 10, marginLeft: 15 },
  ol: { marginBottom: 10, marginLeft: 15 },
  li: { fontSize: 11, lineHeight: 1.6, color: '#334155', marginBottom: 4 },
  strong: { fontWeight: 700, color: '#0f172a' },
  em: { fontStyle: 'italic' },
  blockquote: { borderLeft: '3px solid #cbd5e1', paddingLeft: 10, color: '#475569', fontStyle: 'italic', margin: '10px 0' },
  table: { width: '100%', marginBottom: 15, borderCollapse: 'collapse' },
  th: { backgroundColor: '#f8fafc', padding: 6, border: '1px solid #e2e8f0', fontWeight: 700, fontSize: 10, textAlign: 'left' },
  td: { padding: 6, border: '1px solid #e2e8f0', fontSize: 10 },
};

interface Props {
  markdown: string;
}

export const BEPPDF = ({ markdown }: Props) => {
  const currentDate = new Date().toLocaleDateString('tr-TR');
  const profile = getTeacherProfile();
  const schoolText = profile?.schoolName ? profile.schoolName.toLocaleUpperCase('tr-TR') : 'T.C. MİLLÎ EĞİTİM BAKANLIĞI';
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Global Header */}
        <View style={styles.header} fixed>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <HeartHandshakeIcon />
            </View>
            <View>
              <Text style={styles.headerTitle}>{schoolText}</Text>
              <Text style={styles.headerSubtitle}>Bireyselleştirilmiş Eğitim Programı (BEP)</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.documentType}>BEP TASLAĞI</Text>
            <Text style={styles.date}>Tarih: {currentDate}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Html stylesheet={htmlStyles}>
            {markdown}
          </Html>
        </View>

        {/* Global Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Bu belge Eğitim AI - Öğretmen Asistanı tarafından hazırlanmıştır.</Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `Sayfa ${pageNumber} / ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );
};
