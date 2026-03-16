import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 1. إعدادات Firebase (حط الإعدادات ديالك هنا)
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

// 2. جلب وتحديث الوظائف (ديناميكي)
onValue(ref(db, 'jobs'), (snapshot) => {
    const data = snapshot.val();
    const container = document.getElementById('dynamic-jobs');
    if (!container) return;

    if (!data) {
        container.innerHTML = '<p>لا توجد وظائف حالياً.</p>';
        return;
    }

    // تحويل البيانات لـ Array وترتيبها من الأحدث للأقدم
    let jobs = Object.entries(data).map(([id, val]) => ({ id, ...val }));
    jobs.reverse();

    // فلترة حسب الرابط (مثلاً: index.html?type=gov)
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type) {
        jobs = jobs.filter(j => j.type === type);
    }

    container.innerHTML = jobs.map(job => `
        <article class="job-card">
            <h2><a href="details.html?id=${job.id}">${job.title}</a></h2>
            <p>${job.description || 'لا يوجد وصف متاح.'}</p>
            <div class="job-meta">
                <span>🏢 ${job.company}</span>
                <span>📅 ${job.date}</span>
                <span class="tag">${job.type === 'gov' ? 'حكومي' : job.type === 'private' ? 'خاص' : 'مباراة'}</span>
            </div>
        </article>
    `).join('');
});

// 3. جلب الأخبار (Sidebar)
onValue(ref(db, 'news'), (snapshot) => {
    const data = snapshot.val();
    const newsList = document.getElementById('news-list');
    if (data && newsList) {
        newsList.innerHTML = Object.values(data).slice(-7).reverse().map(n => 
            `<li><i class="fas fa-bullhorn"></i> ${n.text}</li>`
        ).join('');
    }
});

// 4. خاصية البحث (اختياري)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        // تقدر تزيد هنا كود الفلترة المباشر حسب العنوان
    });
}
