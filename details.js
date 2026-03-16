import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// الإعدادات (تأكد أنها نفس اللي فـ wadifaa.js)
const firebaseConfig = {
    apiKey: "AIzaSyDEXWQCwJ7JSIVHnjFzj3F9QYdySzh4lfE",
    databaseURL: "https://waddifa-98a56-default-rtdb.firebaseio.com",
    projectId: "waddifa-98a56"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// جلب الـ ID من الرابط (مثال: details.html?id=123)
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');

if (jobId) {
    const dbRef = ref(db, `jobs/${jobId}`);
    
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const job = snapshot.val();
            // تعمير العناصر بـ IDs
            document.getElementById('job-title').innerText = job.title;
            document.getElementById('job-company').innerText = `🏢 الشركة: ${job.company}`;
            document.getElementById('job-date').innerText = `📅 ${job.date}`;
            document.getElementById('job-type').innerText = job.type;
            document.getElementById('job-desc').innerText = job.description;
        } else {
            document.getElementById('job-title').innerText = "عذراً، هذه الوظيفة غير موجودة.";
        }
    }).catch((error) => {
        console.error("خطأ:", error);
    });
} else {
    document.getElementById('job-title').innerText = "رابط غير صالح.";
}
