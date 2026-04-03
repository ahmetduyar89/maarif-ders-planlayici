import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Download, Copy, CheckCircle2, FileText, Edit2, Eye } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Svg, Path } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { marked } from 'marked';
import MarkdownEditor from './MarkdownEditor';

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
    backgroundColor: '#7c3aed', // Violet 600
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
    color: '#1e293b',
    lineHeight: 1.6,
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 15,
  },
  h2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4c1d95', // Violet 900
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
    paddingBottom: 4,
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 15,
    marginBottom: 5,
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
    marginBottom: 4,
  },
  strong: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  em: {
    fontStyle: 'italic',
  },
  hr: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    borderBottomStyle: 'dashed',
  },
  code: {
    fontFamily: 'Courier',
    backgroundColor: '#f1f5f9',
    padding: 2,
    borderRadius: 3,
  },
  pre: {
    fontFamily: 'Courier',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 4,
    border: '1 solid #e2e8f0',
    marginBottom: 10,
  }
};

const SparklesIcon = () => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </Svg>
);

const WrittenExamPDF = ({ markdown }: { markdown: string }) => {
  // We remove SVG code blocks for PDF rendering to avoid breaking react-pdf-html
  // since it doesn't support raw SVG strings well. We'll replace them with a placeholder text.
  const cleanMarkdown = markdown.replace(/```svg[\s\S]*?```/g, '\n*[Görsel burada yer alacaktır]*\n');
  const htmlContent = marked.parse(cleanMarkdown) as string;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
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

        {/* MEB Antet for Exam */}
        <View style={{ alignItems: 'center', marginBottom: 20 }} fixed>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>T.C.</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>.................................................. KAYMAKAMLIĞI</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.5 }}>.................................................. MÜDÜRLÜĞÜ</Text>
          <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 5 }}>2023-2024 EĞİTİM ÖĞRETİM YILI</Text>
        </View>

        {/* Exam Info Table */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottom: '1 solid #000', paddingBottom: 10 }}>
          <View>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>Adı Soyadı: .......................................</Text>
            <Text style={{ fontSize: 11 }}>Sınıfı / No: .................... / ................</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>Tarih: ..../..../202...</Text>
            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Puan: .................</Text>
          </View>
        </View>

        <Html stylesheet={htmlStyles}>{htmlContent}</Html>

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

interface Props {
  examContent: string;
}

export default function WrittenExamOutput({ examContent: initialContent }: Props) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10">
        <h3 className="font-semibold text-slate-800 dark:text-white">Oluşturulan Yazılı Sınav</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isEditing 
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm'
            }`}
          >
            {isEditing ? (
              <>
                <Eye className="w-4 h-4" />
                Önizleme
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Düzenle
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </button>
          
          <button
            onClick={async () => {
              const { exportToWord } = await import('../utils/exportUtils');
              exportToWord(content, 'yazili-sinav', 'Yazılı Sınav');
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" /> Word İndir
          </button>

          <PDFDownloadLink
            document={<WrittenExamPDF markdown={content} />}
            fileName="yazili-sinav.pdf"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors shadow-sm"
          >
            {/* @ts-ignore */}
            {({ loading }) => (
              <>
                <Download className="w-4 h-4" />
                {loading ? 'PDF Hazırlanıyor...' : 'PDF İndir'}
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="p-8 max-w-none overflow-x-auto">
        {isEditing ? (
          <MarkdownEditor value={content} onChange={(val) => setContent(val || '')} />
        ) : (
          <Markdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-violet-900 dark:text-violet-400 mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-slate-900 dark:text-white" {...props} />,
              hr: ({node, ...props}) => <hr className="my-8 border-slate-300 dark:border-slate-700 border-dashed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 text-slate-700 dark:text-slate-300 space-y-1" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 text-slate-700 dark:text-slate-300 space-y-1" {...props} />,
              li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
              code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                const isSvg = match && match[1] === 'svg';
                
                if (isSvg) {
                  return (
                    <div 
                      className="flex justify-center my-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                      dangerouslySetInnerHTML={{ __html: String(children).replace(/\n$/, '') }}
                    />
                  );
                }
                
                const isInline = !match;
                return isInline ? (
                  <code className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto mb-4">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                );
              }
            }}
          >
            {content}
          </Markdown>
        )}
      </div>
    </div>
  );
}
