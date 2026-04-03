import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Download, Copy, CheckCircle2, FileText, Edit2, Eye } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MultipleChoiceTestPDF } from './MultipleChoiceTestPDF';
import MarkdownEditor from './MarkdownEditor';

interface Props {
  testContent: string;
}

export default function MultipleChoiceTestOutput({ testContent: initialContent }: Props) {
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
        <h3 className="font-semibold text-slate-800 dark:text-white">Oluşturulan Test</h3>
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
              exportToWord(content, 'coktan-secmeli-test', 'Çoktan Seçmeli Test');
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" /> Word İndir
          </button>

          <PDFDownloadLink
            document={<MultipleChoiceTestPDF markdown={content} />}
            fileName="coktan-secmeli-test.pdf"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
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

      <div className="p-8 md:p-12 max-w-4xl mx-auto bg-white dark:bg-slate-900 print:p-0">
        {isEditing ? (
          <MarkdownEditor value={content} onChange={(val) => setContent(val || '')} />
        ) : (
          <div className="prose prose-slate dark:prose-invert prose-rose max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:text-center prose-h1:mb-8 prose-h1:border-b-2 prose-h1:border-slate-800 dark:prose-h1:border-slate-200 prose-h1:pb-6 prose-h2:text-2xl prose-h2:text-rose-700 dark:prose-h2:text-rose-400 prose-h2:mt-10 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700 prose-h2:pb-2 prose-h3:text-xl prose-h3:text-slate-800 dark:prose-h3:text-slate-100 prose-h3:mt-8 prose-li:my-1">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
