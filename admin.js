import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = { /* حط الإعدادات ديالك هنا */ };
const db = getDatabase(initializeApp(firebaseConfig));

document.getElementById('adminForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newJob = {
        title: document.getElementById('title').value,
        company: document.getElementById('company').value,
        city: document.getElementById('city').value,
        type: document.getElementById('type').value,
        description: document.getElementById('description').value,
        date: new Date().toLocaleDateString('ar-MA')
    };

    // سيفط البيانات لـ Firebase
    push(ref(db, 'jobs'), newJob).then(() => {
        alert('تم نشر الوظيفة بنجاح!');
        document.getElementById('adminForm').reset();
    }).catch(err => console.error(err));
});
