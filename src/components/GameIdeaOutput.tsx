import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Printer, RefreshCcw, Download, FileText, Edit2, Eye } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { GameIdeaPDF } from './GameIdeaPDF';
import MarkdownEditor from './MarkdownEditor';

interface GameIdeaOutputProps {
  gameIdeaContent: string;
  onReset?: () => void;
}

export default function GameIdeaOutput({ gameIdeaContent: initialContent, onReset }: GameIdeaOutputProps) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              &larr; Yeni Fikirler
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
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
            onClick={async () => {
              const { exportToWord } = await import('../utils/exportUtils');
              exportToWord(content, 'egitici-oyun-fikirleri', 'Eğitici Oyun ve Etkinlik Fikirleri');
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" /> Word İndir
          </button>

          <PDFDownloadLink
            document={<GameIdeaPDF markdown={content} />}
            fileName="egitici-oyun-fikirleri.pdf"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            {({ loading }) => (
              <>
                <Download className="w-4 h-4" />
                {loading ? 'PDF Hazırlanıyor...' : 'PDF İndir'}
              </>
            )}
          </PDFDownloadLink>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" /> Yazdır
          </button>
        </div>
      </div>

      <div className="p-8 md:p-12 max-w-4xl mx-auto bg-white dark:bg-slate-900 print:p-0">
        {isEditing ? (
          <MarkdownEditor value={content} onChange={(val) => setContent(val || '')} />
        ) : (
          <div className="prose prose-slate dark:prose-invert prose-teal max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:text-center prose-h1:mb-8 prose-h1:border-b-2 prose-h1:border-slate-800 dark:prose-h1:border-slate-200 prose-h1:pb-6 prose-h2:text-2xl prose-h2:text-teal-700 dark:prose-h2:text-teal-400 prose-h2:mt-10 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700 prose-h2:pb-2 prose-h3:text-xl prose-h3:text-slate-800 dark:prose-h3:text-slate-100 prose-h3:mt-8 prose-li:my-1">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
