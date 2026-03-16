import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = { /* حط هنا الإعدادات ديالك */ };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// قراءة نوع الوظيفة من الرابط (فلترة ديناميكية)
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

// جلب الوظائف وفلترتها
onValue(ref(db, 'jobs'), (snapshot) => {
    const data = snapshot.val();
    let jobs = data ? Object.entries(data).map(([id, val]) => ({id, ...val})) : [];
    
    if (type) {
        jobs = jobs.filter(j => j.type === type); // تأكد أن الوظائف فـ Firebase عندها خاصية type
    }
    
    document.getElementById('dynamic-jobs').innerHTML = jobs.reverse().map(j => `
        <article class="job-card">
            <h2><a href="details.html?id=${j.id}">${j.title}</a></h2>
            <p>🏢 ${j.company} | 📅 ${j.date}</p>
        </article>
    `).join('');
});

// جلب الأخبار للـ Sidebar
onValue(ref(db, 'news'), (snapshot) => {
    const news = snapshot.val();
    if (news) {
        document.getElementById('news-list').innerHTML = Object.values(news).slice(-7).reverse().map(n => 
            `<li>${n.text}</li>`
        ).join('');
    }
});
