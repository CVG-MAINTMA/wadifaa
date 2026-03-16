import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const db = getDatabase(initializeApp({
    // حط هنا الـ Config ديالك
    databaseURL: "https://waddifa-98a56-default-rtdb.firebaseio.com"
}));

const container = document.getElementById('jobs-container');
const type = new URLSearchParams(window.location.search).get('type');

onValue(ref(db, 'jobs'), (snapshot) => {
    const data = snapshot.val();
    if (!data) return;
    
    let jobs = Object.entries(data).map(([id, v]) => ({id, ...v}));
    if (type) jobs = jobs.filter(j => j.type === type);
    
    container.innerHTML = jobs.map(j => `
        <article class="job-card">
            <h2><a href="details.html?id=${j.id}">${j.title}</a></h2>
            <small>${j.date || '2026'}</small>
        </article>
    `).join('');
});
