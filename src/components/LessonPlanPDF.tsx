import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path, G } from '@react-pdf/renderer';
import { LessonPlanResponse } from '../services/geminiService';
import { getTeacherProfile } from '../utils/profileUtils';

// Türkçe karakter desteği için Roboto fontunu kaydediyoruz
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    fontFamily: 'Roboto',
    backgroundColor: '#f8fafc',
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
    backgroundColor: '#4f46e5',
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
  mainTitleContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderLeft: '4 solid #4f46e5',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  mainTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 10,
    color: '#64748b',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottom: '1 solid #f1f5f9',
    paddingBottom: 8,
  },
  sectionIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    color: '#4f46e5',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingBottom: 6,
    borderBottom: '1 dashed #f1f5f9',
  },
  label: {
    width: 100,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
  },
  value: {
    flex: 1,
    fontSize: 10,
    color: '#334155',
  },
  text: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 6,
    textAlign: 'justify',
  },
  subLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: '#f8fafc',
    padding: 4,
    borderRadius: 4,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: '#4f46e5',
    fontWeight: 'bold',
  },
  listText: {
    flex: 1,
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.4,
    textAlign: 'justify',
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

// Icons
const SparklesIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </Svg>
);

const InfoIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#4f46e5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <Path d="M12 16v-4" />
    <Path d="M12 8h.01" />
  </Svg>
);

const TargetIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#4f46e5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <Path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <Path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
  </Svg>
);

const StarIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#4f46e5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Svg>
);

const ActivityIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#4f46e5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </Svg>
);

const CheckIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#4f46e5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <Path d="M22 4L12 14.01l-3-3" />
  </Svg>
);

export const LessonPlanPDF = ({ plan }: { plan: LessonPlanResponse }) => {
  const profile = getTeacherProfile();
  const districtText = profile?.district ? `${profile.district.toLocaleUpperCase('tr-TR')} KAYMAKAMLIĞI` : '.................................................. KAYMAKAMLIĞI';
  const schoolText = profile?.schoolName ? `${profile.schoolName.toLocaleUpperCase('tr-TR')}` : '.................................................. MÜDÜRLÜĞÜ';
  const yearText = profile?.academicYear ? `${profile.academicYear} EĞİTİM ÖĞRETİM YILI` : '2023-2024 EĞİTİM ÖĞRETİM YILI';
  const teacherName = profile?.fullName ? profile.fullName : '.........................';
  const branchText = profile?.branch ? `${profile.branch} Öğretmeni` : '';

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

        {/* MEB Antet */}
        <View style={{ alignItems: 'center', marginBottom: 20 }} fixed>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>T.C.</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>{districtText}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>{schoolText}</Text>
          <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 5 }}>{yearText}</Text>
        </View>

        {/* Main Title */}
        <View style={styles.mainTitleContainer}>
          <Text style={styles.mainTitle}>GÜNLÜK DERS PLANI</Text>
          <Text style={styles.mainSubtitle}>{plan.dersBilgileri.ders} - {plan.dersBilgileri.sinif}</Text>
        </View>

        {/* Ders Bilgileri */}
        <View style={styles.section} wrap={false}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}><InfoIcon /></View>
            <Text style={styles.sectionTitle}>Ders Bilgileri</Text>
          </View>
          <View style={styles.row}><Text style={styles.label}>Ders:</Text><Text style={styles.value}>{plan.dersBilgileri.ders}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Sınıf:</Text><Text style={styles.value}>{plan.dersBilgileri.sinif}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Ünite/Tema:</Text><Text style={styles.value}>{plan.dersBilgileri.temaUnite}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Süre:</Text><Text style={styles.value}>{plan.dersBilgileri.sure}</Text></View>
        </View>

        {/* Kazanımlar */}
        <View style={styles.section} wrap={false}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}><TargetIcon /></View>
            <Text style={styles.sectionTitle}>Kazanımlar</Text>
          </View>
          {plan.kazanimlar.map((kazanim, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{kazanim}</Text>
            </View>
          ))}
        </View>

        {/* Beceriler ve Değerler */}
        <View style={styles.section} wrap={false}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}><StarIcon /></View>
            <Text style={styles.sectionTitle}>Beceriler ve Değerler</Text>
          </View>
          <Text style={styles.subLabel}>Beceriler:</Text>
          {plan.beceriler.map((beceri, i) => (
            <View key={`b-${i}`} style={styles.listItem}>
              <Text style={styles.bullet}>-</Text>
              <Text style={styles.listText}>{beceri}</Text>
            </View>
          ))}
          <Text style={styles.subLabel}>Değerler:</Text>
          {plan.degerler.map((deger, i) => (
            <View key={`d-${i}`} style={styles.listItem}>
              <Text style={styles.bullet}>-</Text>
              <Text style={styles.listText}>{deger}</Text>
            </View>
          ))}
        </View>

        {/* Öğretme-Öğrenme Süreçleri */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}><ActivityIcon /></View>
            <Text style={styles.sectionTitle}>Öğretme-Öğrenme Süreçleri</Text>
          </View>
          
          <Text style={styles.subLabel}>Giriş (Merak Uyandırma ve Günlük Hayat)</Text>
          <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Hook:</Text> {plan.surecTasarimi.giris.hook}</Text>
          <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Günlük Hayat:</Text> {plan.surecTasarimi.giris.gunlukHayat}</Text>
          
          <Text style={styles.subLabel}>Gelişme (Etkinlikler)</Text>
          <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>1.</Text> {plan.surecTasarimi.gelisme.etkinlik1}</Text>
          <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>2.</Text> {plan.surecTasarimi.gelisme.etkinlik2}</Text>
          <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>3.</Text> {plan.surecTasarimi.gelisme.etkinlik3}</Text>
          
          <Text style={styles.subLabel}>Sonuç (Yansıtma ve Transfer)</Text>
          <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Yansıtma Sorusu:</Text> {plan.surecTasarimi.sonuc.yansitmaSorusu}</Text>
          <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Transfer Görevi:</Text> {plan.surecTasarimi.sonuc.transferGorevi}</Text>
        </View>

        {/* Ölçme ve Değerlendirme */}
        <View style={styles.section} wrap={false}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}><CheckIcon /></View>
            <Text style={styles.sectionTitle}>Ölçme ve Değerlendirme</Text>
          </View>
          <Text style={styles.subLabel}>Gözlem Formu:</Text>
          <Text style={styles.text}>{plan.olcmeDegerlendirme.gozlemFormu}</Text>
          <Text style={styles.subLabel}>Çıkış Bileti:</Text>
          <Text style={styles.text}>{plan.olcmeDegerlendirme.cikisBileti}</Text>
          <Text style={styles.subLabel}>Mini Rubrik:</Text>
          <Text style={styles.text}>{plan.olcmeDegerlendirme.miniRubrik}</Text>
        </View>

        {/* İmza Blokları */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 20 }} wrap={false}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: branchText ? 15 : 30 }}>Ders Öğretmeni</Text>
            <Text style={{ fontSize: 11 }}>{teacherName}</Text>
            {branchText && <Text style={{ fontSize: 10, marginTop: 5, color: '#475569' }}>{branchText}</Text>}
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
