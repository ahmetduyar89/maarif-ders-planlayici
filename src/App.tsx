import React, { useState } from 'react';
import LessonPlanForm from './components/LessonPlanForm';
import LessonPlanOutput from './components/LessonPlanOutput';
import UnitPlanForm from './components/UnitPlanForm';
import UnitPlanOutput from './components/UnitPlanOutput';
import FiveEPlanForm from './components/FiveEPlanForm';
import FiveEPlanOutput from './components/FiveEPlanOutput';
import MultipleChoiceTestForm from './components/MultipleChoiceTestForm';
import MultipleChoiceTestOutput from './components/MultipleChoiceTestOutput';
import RubricForm from './components/RubricForm';
import RubricOutput from './components/RubricOutput';
import WrittenExamForm from './components/WrittenExamForm';
import WrittenExamOutput from './components/WrittenExamOutput';
import WorksheetForm from './components/WorksheetForm';
import WorksheetOutput from './components/WorksheetOutput';
import GameIdeaForm from './components/GameIdeaForm';
import GameIdeaOutput from './components/GameIdeaOutput';
import ProjectTaskForm from './components/ProjectTaskForm';
import ProjectTaskOutput from './components/ProjectTaskOutput';
import StorytellingForm from './components/StorytellingForm';
import StorytellingOutput from './components/StorytellingOutput';
import ParentMeetingForm from './components/ParentMeetingForm';
import ParentMeetingOutput from './components/ParentMeetingOutput';
import DifferentiatedInstructionForm from './components/DifferentiatedInstructionForm';
import DifferentiatedInstructionOutput from './components/DifferentiatedInstructionOutput';
import BEPForm from './components/BEPForm';
import BEPOutput from './components/BEPOutput';
import EventPlannerForm from './components/EventPlannerForm';
import EventPlannerOutput from './components/EventPlannerOutput';
import DebateForm from './components/DebateForm';
import DebateOutput from './components/DebateOutput';
import BatchGeneratorForm, { BatchRequest } from './components/BatchGeneratorForm';
import BatchGeneratorOutput, { BatchResults } from './components/BatchGeneratorOutput';
import ImageGeneratorForm from './components/ImageGeneratorForm';
import ImageGeneratorOutput from './components/ImageGeneratorOutput';
import TeacherProfileSettings from './components/TeacherProfileSettings';
import { generateLessonPlan, generateUnitPlan, generateFiveEPlan, generateMultipleChoiceTest, generateRubric, generateWrittenExam, generateWorksheet, generateGameIdea, generateProjectTask, generateStory, generateParentMeeting, generateDifferentiatedInstruction, generateBEP, generateEventPlan, generateDebatePlan, generateEducationalImage, LessonPlanRequest, LessonPlanResponse, UnitPlanRequest, FiveEPlanRequest, MultipleChoiceTestRequest, RubricRequest, WrittenExamRequest, WorksheetRequest, GameIdeaRequest, ProjectTaskRequest, StorytellingRequest, ParentMeetingRequest, DifferentiatedInstructionRequest, BEPRequest, EventPlanRequest, DebateRequest, ImageRequest } from './services/geminiService';
import { BookOpen, Sparkles, Layers, ArrowLeft, Target, Calendar, CheckSquare, Clock, ListChecks, Table, FileEdit, FileText, Gamepad2, ClipboardList, Wand2, Users, Split, HeartHandshake, CalendarDays, UserCircle, MessageSquare, Image as ImageIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';

type AppView = 'home' | 'lesson-plan-form' | 'lesson-plan-output' | 'unit-plan-form' | 'unit-plan-output' | 'five-e-plan-form' | 'five-e-plan-output' | 'multiple-choice-test-form' | 'multiple-choice-test-output' | 'rubric-form' | 'rubric-output' | 'written-exam-form' | 'written-exam-output' | 'worksheet-form' | 'worksheet-output' | 'game-idea-form' | 'game-idea-output' | 'project-task-form' | 'project-task-output' | 'storytelling-form' | 'storytelling-output' | 'parent-meeting-form' | 'parent-meeting-output' | 'differentiated-instruction-form' | 'differentiated-instruction-output' | 'bep-form' | 'bep-output' | 'event-planner-form' | 'event-planner-output' | 'debate-form' | 'debate-output' | 'batch-generator-form' | 'batch-generator-output' | 'image-generator-form' | 'image-generator-output';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<LessonPlanResponse | null>(null);
  const [unitPlan, setUnitPlan] = useState<string | null>(null);
  const [fiveEPlan, setFiveEPlan] = useState<string | null>(null);
  const [multipleChoiceTest, setMultipleChoiceTest] = useState<string | null>(null);
  const [rubric, setRubric] = useState<string | null>(null);
  const [writtenExam, setWrittenExam] = useState<string | null>(null);
  const [worksheet, setWorksheet] = useState<string | null>(null);
  const [gameIdea, setGameIdea] = useState<string | null>(null);
  const [projectTask, setProjectTask] = useState<string | null>(null);
  const [story, setStory] = useState<string | null>(null);
  const [parentMeeting, setParentMeeting] = useState<string | null>(null);
  const [differentiatedInstruction, setDifferentiatedInstruction] = useState<string | null>(null);
  const [bep, setBep] = useState<string | null>(null);
  const [eventPlan, setEventPlan] = useState<string | null>(null);
  const [debatePlan, setDebatePlan] = useState<string | null>(null);
  const [batchResults, setBatchResults] = useState<BatchResults | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const handleError = (err: any, defaultMessage: string) => {
    console.error(err);
    const errorMessage = err?.message || String(err);
    if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      setError('Yapay zeka API kullanım limiti aşıldı (Kota doldu). Lütfen daha sonra tekrar deneyin veya API anahtarınızın limitlerini kontrol edin.');
    } else {
      setError(defaultMessage);
    }
  };

  const handleGenerateLessonPlan = async (request: LessonPlanRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateLessonPlan(request);
      setLessonPlan(generatedPlan);
      setCurrentView('lesson-plan-output');
    } catch (err) {
      handleError(err, 'Ders planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateUnitPlan = async (request: UnitPlanRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateUnitPlan(request);
      setUnitPlan(generatedPlan);
      setCurrentView('unit-plan-output');
    } catch (err) {
      handleError(err, 'Ünite planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFiveEPlan = async (request: FiveEPlanRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateFiveEPlan(request);
      setFiveEPlan(generatedPlan);
      setCurrentView('five-e-plan-output');
    } catch (err) {
      handleError(err, '5E planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMultipleChoiceTest = async (request: MultipleChoiceTestRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedTest = await generateMultipleChoiceTest(request);
      setMultipleChoiceTest(generatedTest);
      setCurrentView('multiple-choice-test-output');
    } catch (err) {
      handleError(err, 'Çoktan seçmeli test oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateRubric = async (request: RubricRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedRubric = await generateRubric(request);
      setRubric(generatedRubric);
      setCurrentView('rubric-output');
    } catch (err) {
      handleError(err, 'Rubrik oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateWrittenExam = async (request: WrittenExamRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedExam = await generateWrittenExam(request);
      setWrittenExam(generatedExam);
      setCurrentView('written-exam-output');
    } catch (err) {
      handleError(err, 'Yazılı sınav oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateWorksheet = async (request: WorksheetRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedWorksheet = await generateWorksheet(request);
      setWorksheet(generatedWorksheet);
      setCurrentView('worksheet-output');
    } catch (err) {
      handleError(err, 'Çalışma yaprağı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateGameIdea = async (request: GameIdeaRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedGameIdea = await generateGameIdea(request);
      setGameIdea(generatedGameIdea);
      setCurrentView('game-idea-output');
    } catch (err) {
      handleError(err, 'Oyun fikirleri oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProjectTask = async (request: ProjectTaskRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedProjectTask = await generateProjectTask(request);
      setProjectTask(generatedProjectTask);
      setCurrentView('project-task-output');
    } catch (err) {
      handleError(err, 'Proje ödevi taslağı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStory = async (request: StorytellingRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedStory = await generateStory(request);
      setStory(generatedStory);
      setCurrentView('storytelling-output');
    } catch (err) {
      handleError(err, 'Hikaye oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateParentMeeting = async (request: ParentMeetingRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedMeeting = await generateParentMeeting(request);
      setParentMeeting(generatedMeeting);
      setCurrentView('parent-meeting-output');
    } catch (err) {
      handleError(err, 'Veli görüşme raporu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDifferentiatedInstruction = async (request: DifferentiatedInstructionRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedInstruction = await generateDifferentiatedInstruction(request);
      setDifferentiatedInstruction(generatedInstruction);
      setCurrentView('differentiated-instruction-output');
    } catch (err) {
      handleError(err, 'Farklılaştırılmış öğretim planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBEP = async (request: BEPRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedBEP = await generateBEP(request);
      setBep(generatedBEP);
      setCurrentView('bep-output');
    } catch (err) {
      handleError(err, 'BEP taslağı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateEventPlan = async (request: EventPlanRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateEventPlan(request);
      setEventPlan(generatedPlan);
      setCurrentView('event-planner-output');
    } catch (err) {
      handleError(err, 'Etkinlik planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDebatePlan = async (request: DebateRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateDebatePlan(request);
      setDebatePlan(generatedPlan);
      setCurrentView('debate-output');
    } catch (err) {
      handleError(err, 'Tartışma planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBatch = async (request: BatchRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const promises: Promise<any>[] = [];
      const results: BatchResults = {};

      if (request.materials.lessonPlan) {
        promises.push(
          generateLessonPlan({
            ders: request.ders,
            sinifSeviyesi: request.sinifSeviyesi,
            konu: request.konu,
            sure: '1 Ders Saati',
            ogrenciProfili: 'Genel',
            materyaller: 'Akıllı Tahta, Ders Kitabı'
          }).then(res => results.lessonPlan = res.content)
        );
      }

      if (request.materials.worksheet) {
        promises.push(
          generateWorksheet({
            sinifSeviyesi: request.sinifSeviyesi,
            ders: request.ders,
            konu: request.konu,
            soruTipleri: ['Boşluk Doldurma', 'Açık Uçlu', 'Doğru/Yanlış'],
            zorlukSeviyesi: 'Orta'
          }).then(res => results.worksheet = res)
        );
      }

      if (request.materials.quiz) {
        promises.push(
          generateMultipleChoiceTest({
            sinifSeviyesi: request.sinifSeviyesi,
            soruSayisi: 5,
            konuAciklama: request.konu
          }).then(res => results.quiz = res)
        );
      }

      if (request.materials.game) {
        promises.push(
          generateGameIdea({
            sinifSeviyesi: request.sinifSeviyesi,
            ders: request.ders,
            konu: request.konu,
            mekan: 'Sınıf İçi',
            materyalDurumu: 'Basit Materyallerle',
            ogrenciSayisi: '20-30'
          }).then(res => results.game = res)
        );
      }

      await Promise.all(promises);
      setBatchResults(results);
      setCurrentView('batch-generator-output');
    } catch (err) {
      handleError(err, 'Toplu materyal üretilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async (request: ImageRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateEducationalImage(request);
      setGeneratedImage(imageUrl);
      setCurrentView('image-generator-output');
    } catch (err) {
      handleError(err, 'Görsel oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setLessonPlan(null);
    setUnitPlan(null);
    setFiveEPlan(null);
    setMultipleChoiceTest(null);
    setRubric(null);
    setWrittenExam(null);
    setWorksheet(null);
    setGameIdea(null);
    setProjectTask(null);
    setStory(null);
    setParentMeeting(null);
    setDifferentiatedInstruction(null);
    setBep(null);
    setEventPlan(null);
    setDebatePlan(null);
    setBatchResults(null);
    setGeneratedImage(null);
    setError(null);
    setCurrentView('home');
  };

  const renderHome = () => (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Yapay Zeka Destekli Eğitim Araçları
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Öğretmenler için özel olarak tasarlanmış, müfredata uygun ve pedagojik açıdan güçlü asistanlar.
        </p>
      </div>

      {/* Planlama ve Hazırlık Araçları */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Planlama ve Hazırlık Araçları</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ders Planı Kartı */}
          <button 
            onClick={() => setCurrentView('lesson-plan-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shadow-inner">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ders Planı Oluşturucu</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Türkiye Yüzyılı Maarif Modeli'ne uygun, tek bir ders saati için detaylı, beceri temelli ve etkileşimli ders planları hazırlayın.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform">
              Plan Oluştur <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Ünite Planı Kartı */}
          <button 
            onClick={() => setCurrentView('unit-plan-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Layers className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ünite Planlayıcı</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Geniş kapsamlı, gün gün bölünmüş, pedagojik hedeflere ve bağlama uygun detaylı ünite planları tasarlayın.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-2 transition-transform">
              Ünite Tasarla <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* 5E Planı Kartı */}
          <button 
            onClick={() => setCurrentView('five-e-plan-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 dark:bg-sky-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">5E Model Planlayıcı</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Yapılandırmacı yaklaşıma dayalı, 5 aşamalı (Engage, Explore, Explain, Elaborate, Evaluate) detaylı ders planları oluşturun.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold group-hover:translate-x-2 transition-transform">
              5E Planı Oluştur <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Belirli Gün ve Haftalar / Etkinlik Planlayıcı Kartı */}
          <button 
            onClick={() => setCurrentView('event-planner-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 dark:bg-pink-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center shadow-inner">
              <CalendarDays className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Etkinlik Planlayıcı</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Belirli gün ve haftalar veya kulüp etkinlikleri için kutlama programı, konuşma metinleri ve pano fikirleri üretin.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-pink-600 dark:text-pink-400 font-semibold group-hover:translate-x-2 transition-transform">
              Etkinlik Planla <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Toplu Materyal Üretimi Kartı */}
          <button 
            onClick={() => setCurrentView('batch-generator-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Layers className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Toplu Materyal Üretimi</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Verilen bir konu için tek tuşla hem ders planı, hem çalışma yaprağı, hem de çoktan seçmeli test üretin.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform">
              Zincirleme Üretim <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>
        </div>
      </div>

      {/* Materyal ve Etkinlik Araçları */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Materyal ve Etkinlik Araçları</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Çalışma Yaprağı Kartı */}
          <button 
            onClick={() => setCurrentView('worksheet-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center shadow-inner">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Çalışma Yaprağı Oluşturucu</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Belirli bir konu ve sınıf seviyesi için boşluk doldurma, eşleştirme, doğru/yanlış gibi farklı soru tiplerini içeren yazdırılabilir çalışma kağıtları hazırlayın.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold group-hover:translate-x-2 transition-transform">
              Yaprak Oluştur <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Eğitici Oyun Kartı */}
          <button 
            onClick={() => setCurrentView('game-idea-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 dark:bg-teal-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Eğitici Oyun Fikirleri</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Sınıf içi veya bahçede oynanabilecek, konuyu pekiştiren, materyalli veya materyalsiz yaratıcı oyun senaryoları üretin.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-2 transition-transform">
              Oyun Üret <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Proje ve Performans Ödevi Kartı */}
          <button 
            onClick={() => setCurrentView('project-task-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Proje ve Performans Ödevi</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Öğrencilerin araştırma ve sunum becerilerini geliştirecek, yönergeleri ve değerlendirme kriterleri net olan ödev taslakları hazırlayın.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
              Ödev Tasarla <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Hikayeleştirme (Storytelling) Kartı */}
          <button 
            onClick={() => setCurrentView('storytelling-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 dark:bg-purple-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Wand2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Hikayeleştirme Aracı</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Sıkıcı veya soyut konuları öğrencilerin ilgisini çekecek, akılda kalıcı kısa hikayelere ve senaryolara dönüştürün.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
              Hikaye Yaz <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Münazara ve Tartışma Tasarımcısı Kartı */}
          <button 
            onClick={() => setCurrentView('debate-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 dark:bg-amber-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center shadow-inner">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Tartışma Tasarımcısı</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Sınıf içi münazara, panel veya Sokratik seminerler için argümanlar, roller ve değerlendirme rubriği hazırlayın.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-2 transition-transform">
              Tartışma Planla <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Görsel/İllüstrasyon Üretimi Kartı */}
          <button 
            onClick={() => setCurrentView('image-generator-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-600 dark:text-fuchsia-400 rounded-2xl flex items-center justify-center shadow-inner">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Eğitici Görsel Üretimi</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Ders materyallerinizde kullanmak üzere konunuza uygun, eğitici ve ilgi çekici illüstrasyonlar veya görseller oluşturun.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-400 font-semibold group-hover:translate-x-2 transition-transform">
              Görsel Oluştur <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>
        </div>
      </div>

      {/* Rehberlik ve İletişim Araçları */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Rehberlik ve İletişim Araçları</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Veli Toplantısı ve Görüşme Raporu Kartı */}
          <button 
            onClick={() => setCurrentView('parent-meeting-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Veli Görüşme Raporu</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Veli toplantıları için gündem maddeleri veya bireysel görüşmeler için profesyonel geri bildirim metinleri hazırlayın.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-2 transition-transform">
              Rapor Oluştur <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>
          {/* Farklılaştırılmış Öğretim Kartı */}
          <button 
            onClick={() => setCurrentView('differentiated-instruction-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 dark:bg-teal-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Split className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Farklılaştırılmış Öğretim</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Aynı konuyu sınıf içindeki farklı öğrenme hızlarına sahip öğrenciler için 3 farklı zorluk seviyesinde anlatan etkinlikler üretin.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-2 transition-transform">
              Etkinlik Tasarla <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* BEP Asistanı Kartı */}
          <button 
            onClick={() => setCurrentView('bep-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shadow-inner">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">BEP Asistanı</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Özel gereksinimli (kaynaştırma) öğrenciler için kısa/uzun dönemli hedefler ve uyarlamalar içeren BEP taslakları hazırlayın.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform">
              BEP Hazırla <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>
        </div>
      </div>

      {/* Sınav ve Değerlendirme Araçları */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-xl">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Sınav ve Değerlendirme Araçları</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Çoktan Seçmeli Test Kartı */}
          <button 
            onClick={() => setCurrentView('multiple-choice-test-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 dark:bg-rose-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center shadow-inner">
              <ListChecks className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Çoktan Seçmeli Test</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Sınıf seviyesine uygun, çeldiricileri özenle hazırlanmış ve yeni nesil sorular içeren çoktan seçmeli testler oluşturun.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold group-hover:translate-x-2 transition-transform">
              Test Oluştur <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Rubrik Kartı */}
          <button 
            onClick={() => setCurrentView('rubric-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 dark:bg-amber-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Table className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Rubrik Oluşturucu</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Öğrenci performansını objektif değerlendirmek için analitik dereceli puanlama anahtarları (rubrik) hazırlayın.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-2 transition-transform">
              Rubrik Oluştur <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>

          {/* Yazılı Hazırlama Kartı */}
          <button 
            onClick={() => setCurrentView('written-exam-form')}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-left overflow-hidden flex flex-col items-start gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 dark:bg-violet-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center shadow-inner">
              <FileEdit className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Yazılı Hazırlama</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Öğrencilerin üst düzey düşünme becerilerini ölçecek yeni nesil açık uçlu sınav kağıtları ve cevap anahtarları oluşturun.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold group-hover:translate-x-2 transition-transform">
              Sınav Oluştur <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans print:bg-white print:text-black transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shadow-sm print:hidden transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setCurrentView('home')}
          >
            <div className="bg-indigo-600 dark:bg-indigo-500 p-2 rounded-lg text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Eğitim AI</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Öğretmen Asistanı</p>
            </div>
          </div>
          
          {currentView !== 'home' && (
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Ekrana Dön
            </button>
          )}
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowProfileSettings(true)}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg"
            >
              <UserCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Öğretmen Profili</span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <TeacherProfileSettings onClose={() => setShowProfileSettings(false)} />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 print:p-0 print:m-0">
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm max-w-3xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="transition-all duration-500 ease-in-out">
          {currentView === 'home' && renderHome()}

          {currentView === 'lesson-plan-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Ders Planı Oluşturucu
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Türkiye Yüzyılı Maarif Modeli'ne %100 uyumlu, beceri temelli ve öğrenci merkezli ders planlarınızı saniyeler içinde hazırlayın.
                </p>
              </div>
              <LessonPlanForm onSubmit={handleGenerateLessonPlan} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'lesson-plan-output' && lessonPlan && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <LessonPlanOutput plan={lessonPlan} onReset={() => setCurrentView('lesson-plan-form')} />
            </div>
          )}

          {currentView === 'unit-plan-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Ünite Planlayıcı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Geniş kapsamlı, gün gün bölünmüş, pedagojik hedeflere ve bağlama uygun detaylı ünite planları tasarlayın.
                </p>
              </div>
              <UnitPlanForm onSubmit={handleGenerateUnitPlan} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'unit-plan-output' && unitPlan && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <UnitPlanOutput markdown={unitPlan} onReset={() => setCurrentView('unit-plan-form')} />
            </div>
          )}

          {currentView === 'five-e-plan-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  5E Model Planlayıcı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Yapılandırmacı yaklaşıma dayalı, 5 aşamalı (Engage, Explore, Explain, Elaborate, Evaluate) detaylı ders planları oluşturun.
                </p>
              </div>
              <FiveEPlanForm onSubmit={handleGenerateFiveEPlan} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'five-e-plan-output' && fiveEPlan && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <FiveEPlanOutput markdown={fiveEPlan} onReset={() => setCurrentView('five-e-plan-form')} />
            </div>
          )}

          {currentView === 'multiple-choice-test-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Çoktan Seçmeli Test Oluşturucu
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Sınıf seviyesine uygun, çeldiricileri özenle hazırlanmış ve yeni nesil sorular içeren çoktan seçmeli testler oluşturun.
                </p>
              </div>
              <MultipleChoiceTestForm onSubmit={handleGenerateMultipleChoiceTest} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'multiple-choice-test-output' && multipleChoiceTest && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MultipleChoiceTestOutput testContent={multipleChoiceTest} />
            </div>
          )}

          {currentView === 'rubric-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Rubrik Oluşturucu
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Öğrenci performansını objektif ve net bir şekilde değerlendirmek için analitik dereceli puanlama anahtarları hazırlayın.
                </p>
              </div>
              <RubricForm onSubmit={handleGenerateRubric} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'rubric-output' && rubric && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <RubricOutput rubricContent={rubric} />
            </div>
          )}

          {currentView === 'written-exam-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Yazılı Hazırlama Aracı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Öğrencilerin üst düzey düşünme becerilerini ölçecek yeni nesil açık uçlu sınav kağıtları ve cevap anahtarları oluşturun.
                </p>
              </div>
              <WrittenExamForm onSubmit={handleGenerateWrittenExam} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'written-exam-output' && writtenExam && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <WrittenExamOutput examContent={writtenExam} />
            </div>
          )}

          {currentView === 'worksheet-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Çalışma Yaprağı Oluşturucu
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Öğrencileriniz için pratik, yazdırılabilir ve farklı soru tiplerini barındıran etkinlik kağıtları hazırlayın.
                </p>
              </div>
              <WorksheetForm onSubmit={handleGenerateWorksheet} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'worksheet-output' && worksheet && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <WorksheetOutput worksheetContent={worksheet} onReset={() => setCurrentView('worksheet-form')} />
            </div>
          )}

          {currentView === 'game-idea-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Eğitici Oyun ve Etkinlik Fikirleri
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Öğrencilerin konuyu yaşayarak ve eğlenerek öğrenmesini sağlayacak yaratıcı oyun senaryoları tasarlayın.
                </p>
              </div>
              <GameIdeaForm onSubmit={handleGenerateGameIdea} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'game-idea-output' && gameIdea && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <GameIdeaOutput gameIdeaContent={gameIdea} onReset={() => setCurrentView('game-idea-form')} />
            </div>
          )}

          {currentView === 'project-task-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Proje ve Performans Ödevi Tasarımcısı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Öğrencilerin araştırma ve sunum becerilerini geliştirecek, yönergeleri ve değerlendirme kriterleri net olan ödev taslakları hazırlayın.
                </p>
              </div>
              <ProjectTaskForm onSubmit={handleGenerateProjectTask} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'project-task-output' && projectTask && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ProjectTaskOutput projectTaskContent={projectTask} onReset={() => setCurrentView('project-task-form')} />
            </div>
          )}

          {currentView === 'storytelling-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Hikayeleştirme (Storytelling) Aracı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Soyut ve zor konuları öğrencilerin ilgisini çekecek eğlenceli hikayelere dönüştürün.
                </p>
              </div>
              <StorytellingForm onSubmit={handleGenerateStory} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'storytelling-output' && story && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <StorytellingOutput storyContent={story} onReset={() => setCurrentView('storytelling-form')} />
            </div>
          )}

          {currentView === 'parent-meeting-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Veli Toplantısı ve Görüşme Raporu Hazırlayıcı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Genel toplantı gündemleri veya bireysel veli görüşmeleri için profesyonel raporlar hazırlayın.
                </p>
              </div>
              <ParentMeetingForm onSubmit={handleGenerateParentMeeting} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'parent-meeting-output' && parentMeeting && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ParentMeetingOutput meetingContent={parentMeeting} onReset={() => setCurrentView('parent-meeting-form')} />
            </div>
          )}

          {currentView === 'differentiated-instruction-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Farklılaştırılmış Öğretim Aracı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Farklı öğrenme hızlarına sahip öğrenciler için 3 seviyeli etkinlikler tasarlayın.
                </p>
              </div>
              <DifferentiatedInstructionForm onSubmit={handleGenerateDifferentiatedInstruction} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'differentiated-instruction-output' && differentiatedInstruction && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DifferentiatedInstructionOutput instructionContent={differentiatedInstruction} onReset={() => setCurrentView('differentiated-instruction-form')} />
            </div>
          )}

          {currentView === 'bep-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  BEP (Bireyselleştirilmiş Eğitim Programı) Asistanı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Özel gereksinimli öğrencileriniz için MEB standartlarına uygun, hedefleri ve uyarlamaları net BEP taslakları hazırlayın.
                </p>
              </div>
              <BEPForm onSubmit={handleGenerateBEP} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'bep-output' && bep && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <BEPOutput bepContent={bep} onReset={() => setCurrentView('bep-form')} />
            </div>
          )}

          {currentView === 'event-planner-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Belirli Gün ve Haftalar / Etkinlik Planlayıcı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Özel günler, milli bayramlar veya kulüp etkinlikleri için kutlama programı ve konuşma metinleri üretin.
                </p>
              </div>
              <EventPlannerForm onSubmit={handleGenerateEventPlan} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'event-planner-output' && eventPlan && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <EventPlannerOutput planContent={eventPlan} onReset={() => setCurrentView('event-planner-form')} />
            </div>
          )}

          {currentView === 'debate-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Münazara ve Sınıf İçi Tartışma Tasarımcısı
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Öğrencilerinizin eleştirel düşünme ve hitabet becerilerini geliştirecek yapılandırılmış tartışma planları oluşturun.
                </p>
              </div>
              <DebateForm onSubmit={handleGenerateDebatePlan} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'debate-output' && debatePlan && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DebateOutput planContent={debatePlan} onReset={() => setCurrentView('debate-form')} />
            </div>
          )}

          {currentView === 'batch-generator-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Toplu Materyal Üretimi (Zincirleme)
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Tek bir konu girerek ihtiyacınız olan tüm ders materyallerini aynı anda oluşturun.
                </p>
              </div>
              <BatchGeneratorForm onSubmit={handleGenerateBatch} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'batch-generator-output' && batchResults && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <BatchGeneratorOutput results={batchResults} onReset={() => setCurrentView('batch-generator-form')} />
            </div>
          )}

          {currentView === 'image-generator-form' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 print:hidden">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                  Eğitici Görsel ve İllüstrasyon Üretimi
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Ders materyallerinizi zenginleştirmek için yapay zeka ile konunuza uygun görseller oluşturun.
                </p>
              </div>
              <ImageGeneratorForm onSubmit={handleGenerateImage} isLoading={isLoading} />
            </div>
          )}

          {currentView === 'image-generator-output' && generatedImage && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ImageGeneratorOutput imageUrl={generatedImage} onReset={() => setCurrentView('image-generator-form')} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
