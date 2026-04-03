import React, { useState } from 'react';
import { WrittenExamRequest, Kazanim } from '../services/geminiService';
import { BookOpen, FileEdit, GraduationCap, User, ListPlus, Settings, Trash2, Plus, Send } from 'lucide-react';

interface Props {
  onSubmit: (request: WrittenExamRequest) => void;
  isLoading: boolean;
}

export default function WrittenExamForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<Omit<WrittenExamRequest, 'kazanimlar'>>({
    sinavBasligi: '',
    ders: '',
    sinifSeviyesi: '',
    ogretmenAdiSoyadi: '',
    ekKriterler: '',
  });

  const [kazanimlar, setKazanimlar] = useState<Kazanim[]>([
    { kazanim: '', soruSayisi: 1 }
  ]);

  const handleAddKazanim = () => {
    setKazanimlar([...kazanimlar, { kazanim: '', soruSayisi: 1 }]);
  };

  const handleRemoveKazanim = (index: number) => {
    if (kazanimlar.length > 1) {
      const newKazanimlar = [...kazanimlar];
      newKazanimlar.splice(index, 1);
      setKazanimlar(newKazanimlar);
    }
  };

  const handleKazanimChange = (index: number, field: keyof Kazanim, value: string | number) => {
    const newKazanimlar = [...kazanimlar];
    newKazanimlar[index] = { ...newKazanimlar[index], [field]: value };
    setKazanimlar(newKazanimlar);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      kazanimlar
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-violet-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Yazılı Hazırlama Aracı</h2>
        <p className="text-violet-100">
          Maarif Modeli'ne uygun, üst düzey düşünme becerilerini ölçen yeni nesil açık uçlu sınav kağıtları ve rubrikler hazırlayın.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <FileEdit className="w-4 h-4 text-violet-600" />
              Sınav Başlığı
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 1. Dönem 1. Yazılı Yoklama"
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all"
              value={formData.sinavBasligi}
              onChange={(e) => setFormData({ ...formData, sinavBasligi: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <BookOpen className="w-4 h-4 text-violet-600" />
              Ders
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Fen Bilimleri"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ders}
              onChange={(e) => setFormData({ ...formData, ders: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <GraduationCap className="w-4 h-4 text-violet-600" />
              Sınıf Seviyesi
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 8. Sınıf"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all text-slate-900 dark:text-slate-100"
              value={formData.sinifSeviyesi}
              onChange={(e) => setFormData({ ...formData, sinifSeviyesi: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <User className="w-4 h-4 text-violet-600" />
              Öğretmen Adı Soyadı
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Ahmet Yılmaz"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ogretmenAdiSoyadi}
              onChange={(e) => setFormData({ ...formData, ogretmenAdiSoyadi: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <ListPlus className="w-4 h-4 text-violet-600" />
              Kazanımlar ve Soru Sayıları
            </label>
            <button
              type="button"
              onClick={handleAddKazanim}
              className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Kazanım Ekle
            </button>
          </div>
          
          <div className="space-y-3">
            {kazanimlar.map((kazanim, index) => (
              <div key={index} className="flex gap-3 items-start bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex-grow space-y-2">
                  <input
                    type="text"
                    required
                    placeholder={`${index + 1}. Kazanım (Örn: Mevsimlerin oluşumuna yönelik tahminlerde bulunur.)`}
                    className="w-full p-2.5 text-sm bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all text-slate-900 dark:text-slate-100"
                    value={kazanim.kazanim}
                    onChange={(e) => handleKazanimChange(index, 'kazanim', e.target.value)}
                  />
                </div>
                <div className="w-24 shrink-0 space-y-2">
                  <input
                    type="number"
                    required
                    min="1"
                    max="10"
                    placeholder="Soru"
                    className="w-full p-2.5 text-sm bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all text-slate-900 dark:text-slate-100"
                    value={kazanim.soruSayisi}
                    onChange={(e) => handleKazanimChange(index, 'soruSayisi', parseInt(e.target.value) || 1)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveKazanim(index)}
                  disabled={kazanimlar.length === 1}
                  className="p-2.5 text-slate-400 hover:text-red-500 disabled:opacity-50 disabled:hover:text-slate-400 transition-colors mt-0.5"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Settings className="w-4 h-4 text-violet-600" />
            Ek Kriterler (İsteğe Bağlı)
          </label>
          <textarea
            rows={2}
            placeholder="Örn: Sorular günlük hayattan örnekler içersin, deney tasarlama sorusu mutlaka olsun..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-600 focus:border-violet-600 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.ekKriterler}
            onChange={(e) => setFormData({ ...formData, ekKriterler: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Sınav Kağıdı Oluştur
            </>
          )}
        </button>
      </form>
    </div>
  );
}
