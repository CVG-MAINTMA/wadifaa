fetch('wadifaa.json')
    .then(response => {
        if (!response.ok) throw new Error("Problem loading JSON");
        return response.json();
    })
    .then(data => {
        const jobsContainer = document.getElementById('dynamic-jobs');
        if (!jobsContainer) return;

        jobsContainer.innerHTML = data.map(job => {
            // حسابات البارطاج
            const shareText = encodeURIComponent(`شوف هاد الخدمة واش غاتعجبك: ${job.title}`);
            const currentUrl = `details.html?id=${job.id}`; // الرابط ديال صفحة التفاصيل
            const shareUrl = encodeURIComponent(currentUrl);

            // كنرجعو غير نسخة واحدة ديال الـ HTML
            return `
            <article class="job-card">
                <div class="job-header">
                    <div class="job-title-area">
                        <h2><a href="${currentUrl}">${job.title}</a></h2>
                        <p class="company-name">${job.company || 'شركة غير محددة'}</p>
                    </div>
                    <img src="https://via.placeholder.com/60" alt="logo" class="company-logo">
                </div>

                <div class="job-footer">
                    <span class="job-date"><i class="far fa-calendar-alt"></i> ${job.date}</span>
                    
                    <div class="share-buttons">
                        <a href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank" class="share-btn whatsapp">
                            <i class="fab fa-whatsapp"></i> بارطاجي
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="share-btn facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    </div>

                    <a href="${currentUrl}" class="tag-btn">عرض التفاصيل</a>
                </div>
            </article>
            `;
        }).join('');
    })
    .catch(err => console.error("Error loading JSON:", err));
    // نزيدو متغير ديال الداتا باش تبقى عندنا فالميموري
let allJobs = [];

fetch('wadifaa.json')
    .then(response => response.json())
    .then(data => {
        allJobs = data; // نحتفظو بالداتا فـ variable
        renderJobs(allJobs); // ندوزو الداتا لـ function باش تبان
    });

// دالة العرض (باش نقدرو نعيطو ليها شحال ما بغينا)
function renderJobs(jobs) {
    const jobsContainer = document.getElementById('dynamic-jobs');
    
    // 1. هنا كنفحصو واش كاينين نتائج قبل ما نبداو الرسم
    if (jobs.length === 0) {
        jobsContainer.innerHTML = '<p style="text-align:center; padding:20px; color: #666;">للأسف، لم نجد وظائف تطابق بحثك.</p>';
        return; // هاد الـ return كتحبس الكود باش ما يكملش لتحت
    }

    // 2. هنا كنرسمو البطائق إلا كانت المصفوفة فيها الداتا
    jobsContainer.innerHTML = jobs.map(job => `
        <article class="job-card">
            <h2><a href="details.html?id=${job.id}">${job.title}</a></h2>
            <p class="company-name">${job.company}</p>
        </article>
    `).join('');
}

// خاصية البحث
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // الفلترة هنا
    const filteredJobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm)
    );
    
    renderJobs(filteredJobs); // نعاودو نرسمو السيت بالداتا المفلترة
});
// دالة الفلترة العامة
function filterJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cityTerm = document.getElementById('citySelect').value.toLowerCase();

    const filteredJobs = allJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm);
        // نفترض أن الـ JSON ديالك فيه حقل سميتو "city"
        const matchesCity = cityTerm === "" || job.city.toLowerCase() === cityTerm;
        
        return matchesSearch && matchesCity;
    });

    renderJobs(filteredJobs);
}

// نربطوهم بـ Event Listeners
document.getElementById('searchInput').addEventListener('input', filterJobs);
document.getElementById('citySelect').addEventListener('change', filterJobs);