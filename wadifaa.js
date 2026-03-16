import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 1. الإعدادات (تأكد من وضع الإعدادات ديالك هنا)
const firebaseConfig = {
    apiKey: "AIzaSyDEXWQCwJ7JSIVHnjFzj3F9QYdySzh4lfE",
    authDomain: "waddifa-98a56.firebaseapp.com",
    databaseURL: "https://waddifa-98a56-default-rtdb.firebaseio.com",
    projectId: "waddifa-98a56",
    storageBucket: "waddifa-98a56.firebasestorage.app",
    messagingSenderId: "528638398956",
    appId: "1:528638398956:web:a4acac5a84f8901d9970c9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. دالة جلب وعرض البيانات (مركزية)
function initApp() {
    // قراءة النوع من الرابط (URL Parameters)
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type'); // كياخد gov, private, الخ...

    const jobsRef = ref(db, 'jobs');
    
    onValue(jobsRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        // تحويل البيانات لمصفوفة
        let jobs = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        
        // ذكاء الفلترة: إلا كان نوع محدد، كنفلترو، إلا ما كانش، كنعرضو كلشي
        let filteredJobs = type ? jobs.filter(j => j.type === type) : jobs;

        // عرض النتائج في الصفحة
        const container = document.getElementById('dynamic-jobs');
        if (container) {
            container.innerHTML = filteredJobs.reverse().map(job => `
                <article class="job-card">
                    <h2><a href="details.html?id=${job.id}">${job.title}</a></h2>
                    <p class="job-desc">${job.company || ''}</p>
                    <div class="job-meta">
                        <span>📅 ${job.date || '2026'}</span>
                        <span class="tag">${job.type || 'عام'}</span>
                    </div>
                </article>
            `).join('');
        }
    });

    // 3. جلب الأخبار (إضافي للـ Sidebar)
    const newsRef = ref(db, 'news');
    onValue(newsRef, (snapshot) => {
        const news = snapshot.val();
        const newsList = document.getElementById('news-list');
        if (news && newsList) {
            newsList.innerHTML = Object.values(news).slice(-5).reverse().map(n => 
                `<li>${n.text}</li>`
            ).join('');
        }
    });
}

// تشغيل الدالة
initApp();
