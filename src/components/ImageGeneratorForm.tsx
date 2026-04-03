import React, { useState } from 'react';
import { ImageRequest } from '../services/geminiService';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (request: ImageRequest) => void;
  isLoading: boolean;
}

export default function ImageGeneratorForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<ImageRequest>({
    konu: '',
    stil: '',
    ekIstekler: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Görselin Konusu</label>
          <input
            type="text"
            required
            placeholder="Örn: Güneş sistemi, Fotosentez yapan bir bitki, Eski Mısır piramitleri"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.konu}
            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Görsel Stili</label>
          <select
            required
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
            value={formData.stil}
            onChange={(e) => setFormData({ ...formData, stil: e.target.value })}
          >
            <option value="">Seçiniz...</option>
            <option value="Çizgi Film (Çocuklar için)">Çizgi Film (Çocuklar için)</option>
            <option value="Eğitici İllüstrasyon (Ders Kitabı Stili)">Eğitici İllüstrasyon (Ders Kitabı Stili)</option>
            <option value="Gerçekçi Fotoğraf">Gerçekçi Fotoğraf</option>
            <option value="Suluboya">Suluboya</option>
            <option value="3D Animasyon Stili">3D Animasyon Stili</option>
            <option value="Kara Kalem Eskiz">Kara Kalem Eskiz</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ek İstekler / Detaylar (İsteğe Bağlı)</label>
          <textarea
            rows={3}
            placeholder="Örn: Görselde metin olmasın, renkler çok canlı olsun, arka plan beyaz olsun..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-900 dark:text-slate-100"
            value={formData.ekIstekler}
            onChange={(e) => setFormData({ ...formData, ekIstekler: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Görsel Oluşturuluyor...
          </>
        ) : (
          <>
            <ImageIcon className="w-6 h-6" />
            Görsel Üret
          </>
        )}
      </button>
    </form>
  );
}
