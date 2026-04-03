import React, { useState } from 'react';
import { WorksheetRequest } from '../services/geminiService';
import { FileText, Loader2 } from 'lucide-react';

interface WorksheetFormProps {
  onSubmit: (request: WorksheetRequest) => void;
  isLoading: boolean;
}

const QUESTION_TYPES = [
  'Boşluk Doldurma',
  'Eşleştirme',
  'Doğru/Yanlış',
  'Açık Uçlu Sorular',
  'Kavram Haritası / Tablo Doldurma',
  'Kısa Cevaplı Sorular'
];

export default function WorksheetForm({ onSubmit, isLoading }: WorksheetFormProps) {
  const [formData, setFormData] = useState<WorksheetRequest>({
    sinifSeviyesi: '',
    ders: '',
    konu: '',
    soruTipleri: [],
    zorlukSeviyesi: 'Orta',
    ekTalimatlar: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.soruTipleri.length === 0) {
      alert('Lütfen en az bir soru tipi seçin.');
      return;
    }
    onSubmit(formData);
  };

  const handleCheckboxChange = (type: string) => {
    setFormData(prev => {
      const isSelected = prev.soruTipleri.includes(type);
      if (isSelected) {
        return { ...prev, soruTipleri: prev.soruTipleri.filter(t => t !== type) };
      } else {
        return { ...prev, soruTipleri: [...prev.soruTipleri, type] };
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Çalışma Yaprağı (Worksheet) Oluştur</h2>
          <p className="text-slate-500 text-sm mt-1">Öğrencileriniz için pratik ve yazdırılabilir etkinlik kağıtları hazırlayın.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Sınıf Seviyesi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 5. Sınıf, Lise 2 vb."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.sinifSeviyesi}
              onChange={(e) => setFormData({ ...formData, sinifSeviyesi: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Ders <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Fen Bilimleri, İngilizce"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 dark:text-slate-100"
              value={formData.ders}
              onChange={(e) => setFormData({ ...formData, ders: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Konu / Kazanım <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Örn: Güneş Sistemi ve Gezegenler"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.konu}
            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Soru Tipleri (En az 1 tane seçiniz) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUESTION_TYPES.map(type => (
              <label key={type} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
                  checked={formData.soruTipleri.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                />
                <span className="text-slate-700 dark:text-slate-300">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Zorluk Seviyesi <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            value={formData.zorlukSeviyesi}
            onChange={(e) => setFormData({ ...formData, zorlukSeviyesi: e.target.value })}
          >
            <option value="Kolay">Kolay</option>
            <option value="Orta">Orta</option>
            <option value="Zor">Zor</option>
            <option value="Karma (Kolaydan Zora)">Karma (Kolaydan Zora)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Ek Talimatlar (İsteğe Bağlı)
          </label>
          <textarea
            placeholder="Örn: Sorular günlük hayattan örnekler içersin, resim çizme alanı da olsun..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all min-h-[100px] text-slate-900 dark:text-slate-100"
            value={formData.ekTalimatlar}
            onChange={(e) => setFormData({ ...formData, ekTalimatlar: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Çalışma Yaprağı Oluşturuluyor...
          </>
        ) : (
          <>
            <FileText className="w-6 h-6" />
            Çalışma Yaprağı Oluştur
          </>
        )}
      </button>
    </form>
  );
}
