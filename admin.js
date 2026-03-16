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

document.getElementById('addJobForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. جمع البيانات من الخانات
    const title = document.getElementById('jobTitle').value;
    const company = document.getElementById('jobCompany').value;
    const date = document.getElementById('jobDate').value;
    const description = document.getElementById('jobDesc').value;

    // 2. إنشاء مكان جديد في الـ Database (ID تلقائي)
    const jobsListRef = ref(db, 'jobs'); 
    const newJobRef = push(jobsListRef);

    // 3. إرسال البيانات
    set(newJobRef, {
        id: newJobRef.key, // كياخد الـ ID اللي تصاوب أوتوماتيكياً
        title: title,
        company: company,
        date: date,
        description: description
    }).then(() => {
        document.getElementById('status').innerText = "✅ تم نشر الوظيفة بنجاح!";
        document.getElementById('addJobForm').reset();
    }).catch((error) => {
        document.getElementById('status').innerText = "❌ خطأ: " + error.message;
    });
});