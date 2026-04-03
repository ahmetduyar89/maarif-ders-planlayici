import React, { useState, useEffect } from 'react';
import { TeacherProfile, getTeacherProfile, saveTeacherProfile } from '../utils/profileUtils';
import { User, Save, X, Check } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function TeacherProfileSettings({ onClose }: Props) {
  const [profile, setProfile] = useState<TeacherProfile>({
    fullName: '',
    schoolName: '',
    branch: '',
    academicYear: '2023-2024',
    district: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getTeacherProfile();
    if (existing) {
      setProfile(existing);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTeacherProfile(profile);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Öğretmen Profili</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-slate-500 mb-6">
            Bilgilerinizi bir kez kaydedin. Oluşturduğunuz tüm PDF ve Word belgelerine (MEB Anteti) otomatik olarak eklenecektir.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Ad Soyad</label>
              <input
                type="text"
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">İlçe</label>
              <input
                type="text"
                placeholder="Örn: Kadıköy"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
                value={profile.district}
                onChange={(e) => setProfile({ ...profile, district: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Okul Adı</label>
              <input
                type="text"
                placeholder="Örn: Atatürk İlkokulu"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
                value={profile.schoolName}
                onChange={(e) => setProfile({ ...profile, schoolName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Branş</label>
              <input
                type="text"
                placeholder="Örn: Sınıf Öğretmeni, Matematik"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
                value={profile.branch}
                onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Eğitim Öğretim Yılı</label>
              <input
                type="text"
                placeholder="Örn: 2023-2024"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-slate-100"
                value={profile.academicYear}
                onChange={(e) => setProfile({ ...profile, academicYear: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                saved ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  Kaydedildi!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Bilgileri Kaydet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
