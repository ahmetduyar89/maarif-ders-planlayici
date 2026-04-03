import React, { useState } from 'react';
import { LessonPlanResponse } from '../services/geminiService';
import { FileDown, Edit3, Save, X, BookOpen, Target, Brain, Heart, Layers, CheckSquare, FileText } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { LessonPlanPDF } from './LessonPlanPDF';

interface LessonPlanOutputProps {
  plan: LessonPlanResponse;
  onReset: () => void;
}

export default function LessonPlanOutput({ plan: initialPlan, onReset }: LessonPlanOutputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [plan, setPlan] = useState<LessonPlanResponse>(initialPlan);
  const [editedPlan, setEditedPlan] = useState<LessonPlanResponse>(initialPlan);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      // Generate PDF blob using @react-pdf/renderer
      const blob = await pdf(<LessonPlanPDF plan={plan} />).toBlob();
      
      // Create download link and trigger click
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Ders_Plani_${plan.dersBilgileri.ders.replace(/\s+/g, '_')}_${plan.dersBilgileri.sinif}.pdf`;
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

  const handleSave = () => {
    setPlan(editedPlan);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPlan(plan);
    setIsEditing(false);
  };

  const handleChange = (section: keyof LessonPlanResponse, field: string | number, value: string, subSection?: string) => {
    setEditedPlan(prev => {
      const updated = { ...prev };
      
      if (Array.isArray(updated[section])) {
        (updated[section] as string[])[field as number] = value;
      } else if (subSection) {
        // @ts-ignore
        updated[section][subSection][field] = value;
      } else {
        // @ts-ignore
        updated[section][field] = value;
      }
      
      return updated;
    });
  };

  const renderSectionHeader = (icon: React.ReactNode, title: string) => (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h2>
    </div>
  );

  const renderEditableTextarea = (value: string, onChange: (val: string) => void, rows = 3) => {
    if (isEditing) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full p-2 border border-indigo-300 dark:border-indigo-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50/30 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        />
      );
    }
    return <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{value}</p>;
  };

  const renderEditableInput = (value: string, onChange: (val: string) => void) => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-1.5 border border-indigo-300 dark:border-indigo-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50/30 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
        />
      );
    }
    return <span className="font-semibold text-slate-800 dark:text-slate-100">{value}</span>;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden print:border-none print:shadow-none">
      {/* Action Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10 print:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            &larr; Yeni Plan
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <X className="w-4 h-4" /> İptal
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" /> Kaydet
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Edit3 className="w-4 h-4" /> Düzenle
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FileDown className="w-4 h-4" /> 
                {isGeneratingPDF ? 'Hazırlanıyor...' : 'PDF İndir'}
              </button>
              <button
                onClick={async () => {
                  const { exportToWord } = await import('../utils/exportUtils');
                  const markdown = `
# GÜNLÜK DERS PLANI
**Ders:** ${plan.dersBilgileri.ders}
**Sınıf:** ${plan.dersBilgileri.sinif}
**Ünite/Tema:** ${plan.dersBilgileri.temaUnite}
**Süre:** ${plan.dersBilgileri.sure}

## Kazanımlar
${plan.kazanimlar.map(k => `* ${k}`).join('\n')}

## Beceriler ve Değerler
**Beceriler:**
${plan.beceriler.map(b => `* ${b}`).join('\n')}

**Değerler:**
${plan.degerler.map(d => `* ${d}`).join('\n')}

## Öğretme-Öğrenme Süreçleri
### Giriş (Merak Uyandırma ve Günlük Hayat)
**Hook:** ${plan.surecTasarimi.giris.hook}
**Günlük Hayat:** ${plan.surecTasarimi.giris.gunlukHayat}

### Gelişme (Etkinlikler)
1. ${plan.surecTasarimi.gelisme.etkinlik1}
2. ${plan.surecTasarimi.gelisme.etkinlik2}
3. ${plan.surecTasarimi.gelisme.etkinlik3}

### Sonuç (Yansıtma ve Transfer)
**Yansıtma Sorusu:** ${plan.surecTasarimi.sonuc.yansitmaSorusu}
**Transfer Görevi:** ${plan.surecTasarimi.sonuc.transferGorevi}

## Ölçme ve Değerlendirme
**Gözlem Formu:** ${plan.olcmeDegerlendirme.gozlemFormu}
**Çıkış Bileti:** ${plan.olcmeDegerlendirme.cikisBileti}
**Mini Rubrik:** ${plan.olcmeDegerlendirme.miniRubrik}
                  `;
                  exportToWord(markdown, 'ders-plani', 'Ders Planı');
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4" /> Word İndir
              </button>
            </>
          )}
        </div>
      </div>

      {/* Printable Content */}
      <div className="p-8 md:p-12 max-w-4xl mx-auto print:p-0 bg-white dark:bg-slate-900">
        <div className="text-center mb-10 pb-6 border-b-2 border-slate-800 dark:border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ders Planı</h1>
          <h2 className="text-xl text-slate-600 dark:text-slate-400 font-medium">{plan.dersBilgileri.ders} - {plan.dersBilgileri.sinif}</h2>
        </div>

        <div className="space-y-10">
          {/* 1. Ders Bilgileri */}
          <section>
            {renderSectionHeader(<BookOpen className="w-6 h-6" />, "1. Ders Bilgileri")}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Ders</span>
                {renderEditableInput(editedPlan.dersBilgileri.ders, (val) => handleChange('dersBilgileri', 'ders', val))}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Sınıf</span>
                {renderEditableInput(editedPlan.dersBilgileri.sinif, (val) => handleChange('dersBilgileri', 'sinif', val))}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Süre</span>
                {renderEditableInput(editedPlan.dersBilgileri.sure, (val) => handleChange('dersBilgileri', 'sure', val))}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Tema / Ünite</span>
                {renderEditableInput(editedPlan.dersBilgileri.temaUnite, (val) => handleChange('dersBilgileri', 'temaUnite', val))}
              </div>
            </div>
          </section>

          {/* 2. Kazanımlar */}
          <section>
            {renderSectionHeader(<Target className="w-6 h-6" />, "2. Kazanımlar")}
            <ul className="list-disc pl-5 space-y-3">
              {editedPlan.kazanimlar.map((kazanim, index) => (
                <li key={index} className="text-slate-700 dark:text-slate-300 pl-2 marker:text-indigo-500 dark:marker:text-indigo-400">
                  {renderEditableTextarea(kazanim, (val) => handleChange('kazanimlar', index, val), 2)}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 3. Beceriler */}
            <section>
              {renderSectionHeader(<Brain className="w-6 h-6" />, "3. Beceriler")}
              <div className="flex flex-wrap gap-2">
                {editedPlan.beceriler.map((beceri, index) => (
                  <div key={index} className="w-full">
                    {isEditing ? (
                      <input
                        type="text"
                        value={beceri}
                        onChange={(e) => handleChange('beceriler', index, e.target.value)}
                        className="w-full p-2 mb-2 border border-indigo-300 dark:border-indigo-700 rounded-md focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm"
                      />
                    ) : (
                      <span className="inline-block px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800 mb-2 mr-2">
                        {beceri}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Değerler */}
            <section>
              {renderSectionHeader(<Heart className="w-6 h-6" />, "4. Değerler")}
              <div className="flex flex-wrap gap-2">
                {editedPlan.degerler.map((deger, index) => (
                  <div key={index} className="w-full">
                    {isEditing ? (
                      <input
                        type="text"
                        value={deger}
                        onChange={(e) => handleChange('degerler', index, e.target.value)}
                        className="w-full p-2 mb-2 border border-indigo-300 dark:border-indigo-700 rounded-md focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm"
                      />
                    ) : (
                      <span className="inline-block px-3 py-1.5 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-lg text-sm font-medium border border-rose-100 dark:border-rose-800 mb-2 mr-2">
                        {deger}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 5. Süreç Tasarımı */}
          <section>
            {renderSectionHeader(<Layers className="w-6 h-6" />, "5. Süreç Tasarımı")}
            
            <div className="space-y-6">
              {/* Giriş */}
              <div className="bg-white dark:bg-slate-800 border-l-4 border-amber-400 p-5 rounded-r-xl shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm">1</span>
                  Giriş
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide mb-1">Hook (Merak Uyandırıcı Soru)</h4>
                    {renderEditableTextarea(editedPlan.surecTasarimi.giris.hook, (val) => handleChange('surecTasarimi', 'hook', val, 'giris'))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide mb-1">Günlük Hayat Bağlantısı</h4>
                    {renderEditableTextarea(editedPlan.surecTasarimi.giris.gunlukHayat, (val) => handleChange('surecTasarimi', 'gunlukHayat', val, 'giris'))}
                  </div>
                </div>
              </div>

              {/* Gelişme */}
              <div className="bg-white dark:bg-slate-800 border-l-4 border-indigo-500 p-5 rounded-r-xl shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm">2</span>
                  Gelişme
                </h3>
                <div className="space-y-5">
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide mb-1">Etkinlik 1</h4>
                    {renderEditableTextarea(editedPlan.surecTasarimi.gelisme.etkinlik1, (val) => handleChange('surecTasarimi', 'etkinlik1', val, 'gelisme'), 4)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide mb-1">Etkinlik 2</h4>
                    {renderEditableTextarea(editedPlan.surecTasarimi.gelisme.etkinlik2, (val) => handleChange('surecTasarimi', 'etkinlik2', val, 'gelisme'), 4)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide mb-1">Etkinlik 3</h4>
                    {renderEditableTextarea(editedPlan.surecTasarimi.gelisme.etkinlik3, (val) => handleChange('surecTasarimi', 'etkinlik3', val, 'gelisme'), 4)}
                  </div>
                </div>
              </div>

              {/* Sonuç */}
              <div className="bg-white dark:bg-slate-800 border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">3</span>
                  Sonuç
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide mb-1">Yansıtma Sorusu</h4>
                    {renderEditableTextarea(editedPlan.surecTasarimi.sonuc.yansitmaSorusu, (val) => handleChange('surecTasarimi', 'yansitmaSorusu', val, 'sonuc'))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide mb-1">Transfer Görevi</h4>
                    {renderEditableTextarea(editedPlan.surecTasarimi.sonuc.transferGorevi, (val) => handleChange('surecTasarimi', 'transferGorevi', val, 'sonuc'))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Ölçme-Değerlendirme */}
          <section>
            {renderSectionHeader(<CheckSquare className="w-6 h-6" />, "6. Ölçme-Değerlendirme")}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Gözlem Formu
                </h4>
                {renderEditableTextarea(editedPlan.olcmeDegerlendirme.gozlemFormu, (val) => handleChange('olcmeDegerlendirme', 'gozlemFormu', val), 4)}
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Çıkış Bileti
                </h4>
                {renderEditableTextarea(editedPlan.olcmeDegerlendirme.cikisBileti, (val) => handleChange('olcmeDegerlendirme', 'cikisBileti', val), 4)}
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Mini Rubrik
                </h4>
                {renderEditableTextarea(editedPlan.olcmeDegerlendirme.miniRubrik, (val) => handleChange('olcmeDegerlendirme', 'miniRubrik', val), 4)}
              </div>
            </div>
          </section>
        </div>
        
        {/* Footer for PDF */}
        <div className="mt-16 pt-6 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-400 dark:text-slate-500">
          Türkiye Yüzyılı Maarif Modeli Ders Planı Oluşturucu ile hazırlanmıştır.
        </div>
      </div>
    </div>
  );
}
