import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FileDown, Copy, Check, Loader2, FileText, Edit2, Eye } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { FiveEPlanPDF } from './FiveEPlanPDF';
import MarkdownEditor from './MarkdownEditor';

interface FiveEPlanOutputProps {
  markdown: string;
  onReset: () => void;
}

export default function FiveEPlanOutput({ markdown: initialMarkdown, onReset }: FiveEPlanOutputProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      // Generate PDF blob using @react-pdf/renderer
      const blob = await pdf(<FiveEPlanPDF markdown={markdown} />).toBlob();
      
      // Create download link and trigger click
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `5E_Ders_Plani.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF oluşturulurken hata:', error);
      alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
        <button 
          onClick={onReset}
          className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-colors"
        >
          &larr; Yeni 5E Planı
        </button>
        
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
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-sky-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Kopyalandı!' : 'Kopyala'}
          </button>
          
          <button
            onClick={async () => {
              const { exportToWord } = await import('../utils/exportUtils');
              exportToWord(markdown, '5e-ders-plani', '5E Ders Planı');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <FileText className="w-4 h-4" /> Word İndir
          </button>

          <button 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4" /> 
            )}
            {isGeneratingPDF ? 'Hazırlanıyor...' : 'PDF İndir'}
          </button>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="p-8 md:p-12 max-w-4xl mx-auto bg-white dark:bg-slate-900 print:p-0">
        {isEditing ? (
          <MarkdownEditor value={markdown} onChange={(val) => setMarkdown(val || '')} />
        ) : (
          <div className="prose prose-slate dark:prose-invert prose-sky max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:text-center prose-h1:mb-8 prose-h1:border-b-2 prose-h1:border-slate-800 dark:prose-h1:border-slate-200 prose-h1:pb-6 prose-h2:text-2xl prose-h2:text-sky-700 dark:prose-h2:text-sky-400 prose-h2:mt-10 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700 prose-h2:pb-2 prose-h3:text-xl prose-h3:text-slate-800 dark:prose-h3:text-slate-100 prose-h3:mt-8 prose-li:my-1">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
