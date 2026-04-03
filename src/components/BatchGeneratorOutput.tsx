import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Printer, RefreshCcw, FileText, Download, Edit2, Eye } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { LessonPlanPDF } from './LessonPlanPDF';
import { WorksheetPDF } from './WorksheetPDF';
import { MultipleChoiceTestPDF } from './MultipleChoiceTestPDF';
import { GameIdeaPDF } from './GameIdeaPDF';
import MarkdownEditor from './MarkdownEditor';

export interface BatchResults {
  lessonPlan?: string;
  worksheet?: string;
  quiz?: string;
  game?: string;
}

interface Props {
  results: BatchResults;
  onReset: () => void;
}

type TabType = 'lessonPlan' | 'worksheet' | 'quiz' | 'game';

export default function BatchGeneratorOutput({ results: initialResults, onReset }: Props) {
  const [results, setResults] = useState<BatchResults>(initialResults);
  const [isEditing, setIsEditing] = useState(false);
  
  // Find the first available tab
  const initialTab = (Object.keys(results) as TabType[]).find(key => results[key]) || 'lessonPlan';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  // Reset editing state when tab changes
  useEffect(() => {
    setIsEditing(false);
  }, [activeTab]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = async () => {
    const { exportToWord } = await import('../utils/exportUtils');
    
    let content = '';
    let title = '';
    
    if (activeTab === 'lessonPlan' && results.lessonPlan) {
      content = results.lessonPlan;
      title = 'Ders Planı';
    } else if (activeTab === 'worksheet' && results.worksheet) {
      content = results.worksheet;
      title = 'Çalışma Yaprağı';
    } else if (activeTab === 'quiz' && results.quiz) {
      content = results.quiz;
      title = 'Çoktan Seçmeli Test';
    } else if (activeTab === 'game' && results.game) {
      content = results.game;
      title = 'Eğitici Oyun Fikri';
    }

    exportToWord(content, `${title.toLowerCase().replace(/\s+/g, '-')}`, title);
  };

  const handleContentChange = (newContent: string | undefined) => {
    setResults(prev => ({
      ...prev,
      [activeTab]: newContent || ''
    }));
  };

  const renderActiveContent = () => {
    const content = results[activeTab];
    if (!content) return null;

    if (isEditing) {
      return <MarkdownEditor value={content} onChange={handleContentChange} />;
    }

    return (
      <div className="prose prose-slate dark:prose-invert prose-indigo max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:text-center prose-h1:mb-8 prose-h1:border-b-2 prose-h1:border-slate-800 dark:prose-h1:border-slate-200 prose-h1:pb-6 prose-h2:text-2xl prose-h2:text-indigo-700 dark:prose-h2:text-indigo-400 prose-h2:mt-10 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700 prose-h2:pb-2 prose-h3:text-xl prose-h3:text-slate-800 dark:prose-h3:text-slate-100 prose-h3:mt-8 prose-li:my-1">
        <Markdown>{content}</Markdown>
      </div>
    );
  };

  const renderPDFLink = () => {
    const content = results[activeTab];
    if (!content) return null;

    let documentComponent;
    let fileName = '';

    if (activeTab === 'lessonPlan') {
      documentComponent = <LessonPlanPDF markdown={content} />;
      fileName = 'Ders_Plani.pdf';
    } else if (activeTab === 'worksheet') {
      documentComponent = <WorksheetPDF markdown={content} />;
      fileName = 'Calisma_Yapragi.pdf';
    } else if (activeTab === 'quiz') {
      documentComponent = <MultipleChoiceTestPDF markdown={content} />;
      fileName = 'Test.pdf';
    } else if (activeTab === 'game') {
      documentComponent = <GameIdeaPDF markdown={content} />;
      fileName = 'Oyun_Fikri.pdf';
    }

    if (!documentComponent) return null;

    return (
      <PDFDownloadLink
        document={documentComponent}
        fileName={fileName}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
      >
        {({ loading }) => (
          <>
            <Download className="w-4 h-4" />
            {loading ? 'PDF Hazırlanıyor...' : 'PDF İndir'}
          </>
        )}
      </PDFDownloadLink>
    );
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
              &larr; Yeni Üretim Yap
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
            onClick={handleExportWord}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" /> Word İndir
          </button>

          {renderPDFLink()}

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" /> Yazdır
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-700 print:hidden">
        {results.lessonPlan && (
          <button
            onClick={() => setActiveTab('lessonPlan')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'lessonPlan' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            Ders Planı
          </button>
        )}
        {results.worksheet && (
          <button
            onClick={() => setActiveTab('worksheet')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'worksheet' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            Çalışma Yaprağı
          </button>
        )}
        {results.quiz && (
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'quiz' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            Çoktan Seçmeli Test
          </button>
        )}
        {results.game && (
          <button
            onClick={() => setActiveTab('game')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'game' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            Eğitici Oyun Fikri
          </button>
        )}
      </div>

      <div className="p-8 md:p-12 max-w-4xl mx-auto bg-white dark:bg-slate-900 print:p-0">
        {renderActiveContent()}
      </div>
    </div>
  );
}
