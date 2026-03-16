import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = { /* حط هنا الإعدادات ديالك */ };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 1. جلب المدن
onValue(ref(db, 'cities'), (s) => {
    const sel = document.getElementById('citySelect');
    if (s.val()) {
        sel.innerHTML = '<option value="">كل المدن</option>' + 
        Object.values(s.val()).map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }
});

// 2. جلب آخر خبر
onValue(ref(db, 'news'), (s) => {
    if (s.val()) {
        const news = Object.values(s.val());
        document.getElementById('latestNews').innerText = news[news.length - 1].text;
    }
});

// 3. جلب وعرض الوظائف
onValue(ref(db, 'jobs'), (s) => {
    const jobs = s.val() ? Object.entries(s.val()).map(([id, val]) => ({id, ...val})) : [];
    document.getElementById('dynamic-jobs').innerHTML = jobs.reverse().map(j => `
        <article class="job-card">
            <h2><a href="details.html?id=${j.id}">${j.title}</a></h2>
            <p>🏢 ${j.company}</p>
            <small>📅 ${j.date || ''}</small>
        </article>
    `).join('');
});
