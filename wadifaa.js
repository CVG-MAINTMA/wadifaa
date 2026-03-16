import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

let allJobs = [];

function renderJobs(jobs) {
    const container = document.getElementById('dynamic-jobs');
    if (jobs.length === 0) {
        container.innerHTML = '<p>لا توجد وظائف حالياً.</p>';
        return;
    }
    container.innerHTML = jobs.map(job => `
        <article class="job-card">
            <h2><a href="details.html?id=${job.id}">${job.title || 'بدون عنوان'}</a></h2>
            <p>${job.company || 'شركة غير محددة'}</p>
            <span>${job.date || ''}</span>
        </article>
    `).join('');
}

const jobsRef = ref(db, 'jobs');
onValue(jobsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const keys = Object.keys(data);
        keys.sort().reverse();
        allJobs = keys.map(key => ({ id: key, ...data[key] }));
        renderJobs(allJobs);
    }
});

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        renderJobs(allJobs.filter(j => j.title.toLowerCase().includes(term)));
    });
}
