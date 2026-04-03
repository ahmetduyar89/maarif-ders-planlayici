import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Download, Copy, CheckCircle2, FileText, Edit2, Eye } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { RubricPDF } from './RubricPDF';
import MarkdownEditor from './MarkdownEditor';

interface Props {
  rubricContent: string;
}

export default function RubricOutput({ rubricContent: initialContent }: Props) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10">
        <h3 className="font-semibold text-slate-800 dark:text-white">Oluşturulan Rubrik</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isEditing 
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
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
              exportToWord(content, 'degerlendirme-rubrigi', 'Değerlendirme Rubriği');
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" /> Word İndir
          </button>

          <PDFDownloadLink
            document={<RubricPDF markdown={content} />}
            fileName="degerlendirme-rubrigi.pdf"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
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
              table: ({node, ...props}) => (
                <div className="overflow-x-auto mb-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <table className="w-full text-sm text-left border-collapse" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-amber-50/80 dark:bg-amber-900/20" {...props} />,
              th: ({node, ...props}) => <th className="px-4 py-4 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200" {...props} />,
              td: ({node, ...props}) => <td className="px-4 py-4 border-b border-slate-200 dark:border-slate-700 align-top text-slate-600 dark:text-slate-400" {...props} />,
              tr: ({node, ...props}) => <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors" {...props} />,
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-200 dark:border-slate-700" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-slate-900 dark:text-white" {...props} />,
              hr: ({node, ...props}) => <hr className="my-6 border-slate-200 dark:border-slate-700" {...props} />,
            }}
          >
            {content}
          </Markdown>
        )}
      </div>
    </div>
  );
}
