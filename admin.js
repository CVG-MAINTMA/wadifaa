import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const statusDiv = document.getElementById('status');

// إضافة وظيفة
document.getElementById('addJobForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newJobRef = push(ref(db, 'jobs'));
    set(newJobRef, {
        id: newJobRef.key,
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('jobCompany').value,
        date: document.getElementById('jobDate').value,
        description: document.getElementById('jobDesc').value
    }).then(() => {
        statusDiv.innerText = "✅ تمت إضافة الوظيفة!";
        document.getElementById('addJobForm').reset();
    });
});

// إضافة مدينة
document.getElementById('addCityForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newCityRef = push(ref(db, 'cities'));
    set(newCityRef, { name: document.getElementById('cityName').value }).then(() => {
        statusDiv.innerText = "✅ تمت إضافة المدينة!";
        document.getElementById('addCityForm').reset();
    });
});

// إضافة خبر
document.getElementById('addNewsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newNewsRef = push(ref(db, 'news'));
    set(newNewsRef, { text: document.getElementById('newsText').value }).then(() => {
        statusDiv.innerText = "✅ تم نشر الخبر!";
        document.getElementById('addNewsForm').reset();
    });
});
document.getElementById('addJobForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newJobRef = push(ref(db, 'jobs'));
    set(newJobRef, {
        id: newJobRef.key,
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('jobCompany').value,
        type: document.getElementById('jobType').value, // هادي هي اللي كتاخد التصنيف
        description: document.getElementById('jobDesc').value,
        date: new Date().toLocaleDateString('ar-MA')
    }).then(() => {
        alert("تمت الإضافة بنجاح!");
        document.getElementById('addJobForm').reset();
    });
});
