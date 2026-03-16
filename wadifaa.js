// 1. استيراد المكتبات الضرورية من Firebase (نسخة الـ CDN للمتصفح)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 2. الإعدادات الخاصة بك (Firebase Config)
const firebaseConfig = {
  apiKey: "AIzaSyDEXWQCwJ7JSIVHnjFzj3F9QYdySzh4lfE",
  authDomain: "waddifa-98a56.firebaseapp.com",
  databaseURL: "https://waddifa-98a56-default-rtdb.firebaseio.com",
  projectId: "waddifa-98a56",
  storageBucket: "waddifa-98a56.firebasestorage.app",
  messagingSenderId: "528638398956",
  appId: "1:528638398956:web:a4acac5a84f8901d9970c9",
  measurementId: "G-J3EGXKW201"
};

// 3. تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// متغيّر عام لتخزين الوظائف من أجل عملية البحث
let allJobs = [];

// 4. دالة عرض الوظائف في الصفحة
function renderJobs(jobs) {
    const jobsContainer = document.getElementById('dynamic-jobs');
    
    if (!jobs || jobs.length === 0) {
        jobsContainer.innerHTML = '<p style="text-align:center; padding:20px;">لا توجد وظائف حالياً.</p>';
        return;
    }

    // هنا كنأكدوا بلي كنستعملوا الأسامي اللي عندك في Firebase (title, company, date)
    jobsContainer.innerHTML = jobs.map(job => `
        <article class="job-card">
            <h2><a href="details.html?id=${job.id}">${job.title || 'عنوان غير متوفر'}</a></h2>
            <p class="company-name">${job.company || 'شركة غير معروفة'}</p>
            <span class="job-date">${job.date || ''}</span>
        </article>
    `).join('');
}

// 5. جلب البيانات من Firebase (التركيز على مسار 'jobs')
const jobsRef = ref(db, 'jobs'); 

onValue(jobsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // 1. كنجيبو القيم من Object ونحولوهم لـ Array
        let jobsArray = Object.values(data);
        
        // 2. هاد السطر هو "السحر": كيقبل الترتيب باش الجديد يولي هو الأول
        jobsArray.reverse(); 
        
        allJobs = jobsArray;
        renderJobs(allJobs);
    } else {
        renderJobs([]);
    }
}, (error) => {
    console.error("خطأ في جلب البيانات:", error);
});

// 6. نظام البحث (Filter)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredJobs = allJobs.filter(job => 
            (job.title && job.title.toLowerCase().includes(searchTerm)) || 
            (job.company && job.company.toLowerCase().includes(searchTerm))
        );
        renderJobs(filteredJobs);
    });
}
