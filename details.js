import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// إعدادات Firebase (نفسها اللي فـ index)
const db = getDatabase(initializeApp({ /* حط Config ديالك هنا */ }));

const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id'); // هنا كنجبدو الـ ID من الرابط

if (jobId) {
    const dbRef = ref(db);
    get(child(dbRef, `jobs/${jobId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const job = snapshot.val();
            document.getElementById('job-title').innerText = job.title;
            document.getElementById('job-desc').innerText = job.description;
            document.getElementById('job-company').innerText = job.company;
        } else {
            document.getElementById('job-title').innerText = "الوظيفة غير موجودة!";
        }
    });
}
