// 1. استيراد المكتبات من Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 2. إعدادات Firebase الخاصة بك
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

let allJobs = []; // مصفوفة لتخزين الوظائف للبحث

// 4. دالة عرض الوظائف في HTML
function renderJobs(jobs) {
    const jobsContainer = document.getElementById('dynamic-jobs');
    
    if (!jobs || jobs.length === 0) {
        jobsContainer.innerHTML = '<p style="text-align:center; padding:20px;">لا توجد وظائف حالياً.</p>';
        return;
    }

    jobsContainer.innerHTML = jobs.map(job => `
        <article class="job-card">
            <h2><a href="details.html?id=${job.id}">${job.title || 'بدون عنوان'}</a></h2>
            <p class="company-name">${job.company || 'شركة غير محددة'}</p>
            <span class="job-date">${job.date || ''}</span>
        </article>
    `).join('');
}

// 5. جلب البيانات وترتيبها (الجديد أولاً)
const jobsRef = ref(db, 'jobs'); 

onValue(jobsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // الحصول على جميع المفاتيح (IDs)
        const keys = Object.keys(data);
        
        // ترتيب المفاتيح تنازلياً (Z to A) لأن IDs الفايربيس مرتبة زمنياً
        keys.sort().reverse(); 

        // بناء قائمة الوظائف بناءً على الترتيب الجديد
        const sortedJobs = keys.map(key => {
            return {
                id: key,
                ...data[key]
            };
        });

        allJobs = sortedJobs;
        renderJobs(allJobs);
    } else {
        renderJobs([]);
    }
}, (error) => {
    console.error("خطأ في الاتصال:", error);
});

// 6. تفعيل خانة البحث
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
