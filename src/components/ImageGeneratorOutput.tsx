import React from 'react';
import { RefreshCcw, Download } from 'lucide-react';

interface Props {
  imageUrl: string;
  onReset: () => void;
}

export default function ImageGeneratorOutput({ imageUrl, onReset }: Props) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'egitim-gorseli.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              &larr; Yeni Görsel Üret
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" /> Görseli İndir
          </button>
        </div>
      </div>

      <div className="p-8 md:p-12 flex justify-center items-center bg-slate-100/50 dark:bg-slate-900/50 min-h-[400px]">
        <img 
          src={imageUrl} 
          alt="Üretilen Eğitim Görseli" 
          className="max-w-full h-auto rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
