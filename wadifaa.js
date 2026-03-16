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

// 1. Fonction pour afficher les jobs
function renderJobs(jobs) {
    const jobsContainer = document.getElementById('dynamic-jobs');
    jobsContainer.innerHTML = jobs.map(job => `
        <article class="job-card">
            <h2><a href="details.html?id=${job.id}">${job.title}</a></h2>
            <p class="company-name">${job.company}</p>
            <span class="job-date">${job.date}</span>
        </article>
    `).join('');
}

// 2. Charger les Villes dans le SELECT
const citiesRef = ref(db, 'cities');
onValue(citiesRef, (snapshot) => {
    const data = snapshot.val();
    const citySelect = document.getElementById('citySelect');
    if (data) {
        let options = '<option value="">Toutes les villes</option>';
        Object.values(data).forEach(city => {
            options += `<option value="${city.name}">${city.name}</option>`;
        });
        citySelect.innerHTML = options;
    }
});

// 3. Charger les Nouvelles (News) dans la Sidebar ET le bandeau jaune
const newsRef = ref(db, 'news');
onValue(newsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const newsArray = Object.values(data);
        
        // Mettre le dernier message dans le bandeau jaune
        const latestNews = newsArray[newsArray.length - 1];
        document.getElementById('latestNews').innerText = "📢 " + latestNews.text;

        // Mettre les nouvelles dans la liste de la sidebar
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = newsArray.slice(-5).reverse().map(n => 
            `<li><span class="news-date">🆕</span> ${n.text}</li>`
        ).join('');
    }
});

// 4. Charger les Jobs
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

// 5. Recherche
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        renderJobs(allJobs.filter(j => j.title.toLowerCase().includes(term)));
    });
}
