import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyDEXWQCwJ7JSIVHnjFzj3F9QYdySzh4lfE",
  authDomain: "waddifa-98a56.firebaseapp.com",
  databaseURL: "https://waddifa-98a56-default-rtdb.firebaseio.com",
  projectId: "waddifa-98a56",
  storageBucket: "waddifa-98a56.firebasestorage.app",
  messagingSenderId: "528638398956",
  appId: "1:528638398956:web:a4acac5a84f8901d9970c9"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 1. جلب الـ ID من الرابط (URL)
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');

if (jobId) {
    // 2. البحث عن الوظيفة باستخدام الـ ID في مسار 'jobs'
    const jobRef = ref(db, 'jobs/' + jobId);

    onValue(jobRef, (snapshot) => {
        const job = snapshot.val();
        const loadingDiv = document.getElementById('loading');
        const contentDiv = document.getElementById('job-content');

        if (job) {
            // تحديث العناصر بالبيانات الحقيقية
            document.getElementById('job-title').innerText = job.title || 'بدون عنوان';
            document.getElementById('job-company').innerText = job.company || 'شركة غير محددة';
            document.getElementById('job-description').innerText = job.description || 'لا يوجد وصف متاح.';
            document.getElementById('job-date').innerText = job.date || '';

            // إخفاء التحميل وإظهار المحتوى
            loadingDiv.style.display = 'none';
            contentDiv.style.display = 'block';
        } else {
            loadingDiv.innerHTML = "<h2>❌ الوظيفة غير موجودة أو تم حذفها.</h2>";
        }
    }, (error) => {
        console.error("خطأ في الاتصال:", error);
        document.getElementById('loading').innerText = "حدث خطأ أثناء تحميل البيانات.";
    });
} else {
    document.getElementById('loading').innerText = "خطأ: لم يتم تحديد معرف الوظيفة.";
}