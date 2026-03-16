import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 1. الإعدادات (نفسها اللي فـ wadifaa.js)
const firebaseConfig = {
    apiKey: "AIzaSyDEXWQCwJ7JSIVHnjFzj3F9QYdySzh4lfE",
    databaseURL: "https://waddifa-98a56-default-rtdb.firebaseio.com",
    projectId: "waddifa-98a56"
    // ... زيد باقي الإعدادات ديالك هنا
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. قراءة الـ ID من الرابط وجلب الداتا
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');

if (jobId) {
    const dbRef = ref(db);
    get(child(dbRef, `jobs/${jobId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const job = snapshot.val();
            // تعمير الـ HTML بالمعلومات
            document.getElementById('job-title').innerText = job.title;
            document.getElementById('job-company').innerText = `🏢 ${job.company}`;
            document.getElementById('job-date').innerText = `📅 ${job.date}`;
            document.getElementById('job-desc').innerText = job.description;
        } else {
            document.getElementById('job-title').innerText = "عذراً، الوظيفة غير موجودة.";
        }
    }).catch((error) => {
        console.error("خطأ في جلب البيانات:", error);
    });
} else {
    document.getElementById('job-title').innerText = "رابط الوظيفة غير صحيح.";
}
