import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ar: {
    translation: {
      // الصفحة الرئيسية
      'home': 'الرئيسية',
      'courses': 'المساقات',
      'books': 'الكتب',
      'questions': 'بنك الأسئلة',
      'dictionary': 'المصطلحات',
      'aiAssistant': 'المساعد الذكي',
      'statistics': 'الإحصائيات',
      
      // التخصصات
      'medicine': 'الطب البشري',
      'nursing': 'التمريض',
      'pharmacy': 'الصيدلة',
      'lab': 'المختبرات',
      'physiotherapy': 'العلاج الطبيعي',
      
      // المساقات
      'anatomy': 'التشريح',
      'physiology': 'وظائف الأعضاء',
      'biochemistry': 'الكيمياء الحيوية',
      'pharmacology': 'علم الأدوية',
      'microbiology': 'الأحياء الدقيقة',
      'pathology': 'علم الأمراض',
      
      // أزرار عامة
      'search': 'بحث',
      'save': 'حفظ',
      'delete': 'حذف',
      'edit': 'تعديل',
      'cancel': 'إلغاء',
      'confirm': 'تأكيد',
      'loading': 'جاري التحميل...',
      'error': 'حدث خطأ',
      'success': 'تم بنجاح',
      
      // نظام الأسئلة
      'selectCourse': 'اختر المساق',
      'selectQuestionsCount': 'اختر عدد الأسئلة',
      'startExam': 'ابدأ الاختبار',
      'score': 'النتيجة',
      'correctAnswers': 'الإجابات الصحيحة',
      'wrongAnswers': 'الإجابات الخاطئة',
      
      // وضع ليلي
      'darkMode': 'الوضع الليلي',
      'lightMode': 'الوضع النهاري',
      
      // المصادقة
      'login': 'تسجيل الدخول',
      'register': 'إنشاء حساب',
      'email': 'البريد الإلكتروني',
      'password': 'كلمة المرور',
      'logout': 'تسجيل الخروج',
      
      // الملاحظات
      'notes': 'الملاحظات',
      'addNote': 'إضافة ملاحظة',
      'editNote': 'تعديل الملاحظة',
      'deleteNote': 'حذف الملاحظة',
      
      // المفضلة
      'favorites': 'المفضلة',
      'addToFavorites': 'أضف إلى المفضلة',
      'removeFromFavorites': 'إزالة من المفضلة',
      
      // الإحصائيات
      'studyProgress': 'التقدم الدراسي',
      'testsCompleted': 'الاختبارات المكتملة',
      'successRate': 'نسبة النجاح',
      'studyTime': 'وقت الدراسة'
    }
  },
  en: {
    translation: {
      // Home
      'home': 'Home',
      'courses': 'Courses',
      'books': 'Books',
      'questions': 'Question Bank',
      'dictionary': 'Dictionary',
      'aiAssistant': 'AI Assistant',
      'statistics': 'Statistics',
      
      // Specialties
      'medicine': 'Medicine',
      'nursing': 'Nursing',
      'pharmacy': 'Pharmacy',
      'lab': 'Medical Laboratory',
      'physiotherapy': 'Physiotherapy',
      
      // Courses
      'anatomy': 'Anatomy',
      'physiology': 'Physiology',
      'biochemistry': 'Biochemistry',
      'pharmacology': 'Pharmacology',
      'microbiology': 'Microbiology',
      'pathology': 'Pathology',
      
      // General Buttons
      'search': 'Search',
      'save': 'Save',
      'delete': 'Delete',
      'edit': 'Edit',
      'cancel': 'Cancel',
      'confirm': 'Confirm',
      'loading': 'Loading...',
      'error': 'Error occurred',
      'success': 'Success',
      
      // Questions System
      'selectCourse': 'Select Course',
      'selectQuestionsCount': 'Select Questions Count',
      'startExam': 'Start Exam',
      'score': 'Score',
      'correctAnswers': 'Correct Answers',
      'wrongAnswers': 'Wrong Answers',
      
      // Dark Mode
      'darkMode': 'Dark Mode',
      'lightMode': 'Light Mode',
      
      // Authentication
      'login': 'Login',
      'register': 'Register',
      'email': 'Email',
      'password': 'Password',
      'logout': 'Logout',
      
      // Notes
      'notes': 'Notes',
      'addNote': 'Add Note',
      'editNote': 'Edit Note',
      'deleteNote': 'Delete Note',
      
      // Favorites
      'favorites': 'Favorites',
      'addToFavorites': 'Add to Favorites',
      'removeFromFavorites': 'Remove from Favorites',
      
      // Statistics
      'studyProgress': 'Study Progress',
      'testsCompleted': 'Tests Completed',
      'successRate': 'Success Rate',
      'studyTime': 'Study Time'
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // اللغة الافتراضية
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
