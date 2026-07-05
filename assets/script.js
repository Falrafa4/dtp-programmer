// Menunggu hingga seluruh dokumen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inisialisasi animasi fade-in saat di scroll (Intersection Observer)
    const observerOptions = {
        root: null, // menggunakan viewport sebagai referensi
        rootMargin: '0px',
        threshold: 0.15 // 15% elemen terlihat sebelum animasi dipicu
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Berhenti memantau setelah elemen muncul untuk efisiensi
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Fetch dan render data project dari file JSON
    fetchProjects();
});

// Fungsi asinkronus untuk mengambil data JSON
async function fetchProjects() {
    try {
        const response = await fetch('assets/projects.json');
        
        // Cek apakah response berhasil
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Memanggil fungsi render untuk masing-masing kategori
        renderProjects(data.semester1, 'semester-1-projects', 'Semester 1');
        renderProjects(data.semester2, 'semester-2-projects', 'Semester 2');
        
    } catch (error) {
        console.error('Gagal mengambil data projects:', error);
        
        // Tampilkan pesan error pada antarmuka jika gagal memuat (berguna saat file dibuka langsung tanpa Live Server)
        const errorMsg = `<p style="color: #64748b; padding: 1rem;">Gagal memuat project. Pastikan kamu membuka halaman ini menggunakan Live Server (Protokol HTTP/HTTPS) dan bukan dari direktori lokal (Protokol file://).</p>`;
        document.getElementById('semester-1-projects').innerHTML = errorMsg;
        document.getElementById('semester-2-projects').innerHTML = errorMsg;
    }
}

// Fungsi untuk me-render array project ke dalam DOM HTML
function renderProjects(projects, containerId, semesterBadge) {
    const container = document.getElementById(containerId);
    
    // Jika container tidak ditemukan, batalkan fungsi
    if (!container) return;

    // Bersihkan isi container sebelumnya (jika ada)
    container.innerHTML = '';

    projects.forEach(project => {
        // Map list tech stack menjadi tag <span>
        const techStackHTML = project.techStack.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');

        // Template string untuk card project
        const cardHTML = `
            <div class="project-card">
                <div class="project-image-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-badge">${semesterBadge}</span>
                    </div>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tech">
                        ${techStackHTML}
                    </div>
                    <div class="project-actions">
                        <a href="${project.demoUrl}" class="project-btn btn-demo" target="_blank" rel="noopener noreferrer">Demo</a>
                        <a href="${project.githubUrl}" class="project-btn btn-github" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                </div>
            </div>
        `;
        
        // Tambahkan string HTML card ke dalam container
        container.innerHTML += cardHTML;
    });
}
