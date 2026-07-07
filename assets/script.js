// Menunggu hingga seluruh dokumen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Mobile Navbar Logic (Hamburger Menu)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const navItems = document.querySelectorAll('.nav-links a');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        // Prevent body scroll when menu is open on mobile
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    if (hamburger && navLinks && navOverlay) {
        hamburger.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);
        
        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // 1. Inisialisasi animasi fade-in saat di scroll (Intersection Observer)
    const observerOptions = {
        root: null, // menggunakan viewport sebagai referensi
        rootMargin: '0px',
        threshold: 0.05 // Diubah dari 0.15 ke 0.05 agar elemen yang sangat tinggi di mobile/HP tidak tertahan transparan (putih)
    };

    if ('IntersectionObserver' in window) {
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
    } else {
        // Fallback untuk browser mobile lama yang tidak mendukung IntersectionObserver
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => el.classList.add('visible'));
    }

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
        
        // Memanggil fungsi render untuk masing-masing kategori dengan pemeriksaan keamanan (tanpa optional chaining ?. agar cocok di HP jadul)
        const sem1 = data && data.semester1;
        const sem2 = data && data.semester2;
        
        renderProjects(sem1, 'semester-1-projects', 'Semester 1');
        renderProjects(sem2, 'semester-2-projects', 'Semester 2');
        
    } catch (error) {
        console.error('Gagal mengambil data projects:', error);
        
        // Tampilkan pesan error pada antarmuka jika gagal memuat (berguna saat file dibuka langsung tanpa Live Server)
        const errorMsg = `<p style="color: #64748b; padding: 1rem;">Gagal memuat project. Pastikan kamu membuka halaman ini menggunakan Live Server (Protokol HTTP/HTTPS) dan bukan dari direktori lokal (Protokol file://).</p>`;
        const s1Container = document.getElementById('semester-1-projects');
        const s2Container = document.getElementById('semester-2-projects');
        if (s1Container) {
            s1Container.innerHTML = errorMsg;
        }
        if (s2Container) {
            s2Container.innerHTML = errorMsg;
        }
    }
}

// Fungsi untuk me-render array project ke dalam DOM HTML
function renderProjects(projects, containerId, semesterBadge) {
    const container = document.getElementById(containerId);
    
    // Jika container tidak ditemukan, batalkan fungsi
    if (!container) return;

    // Bersihkan isi container sebelumnya (jika ada)
    container.innerHTML = '';

    // Pastikan projects terdefinisi dan merupakan array sebelum dijalankan (aman dari error tanpa optional chaining)
    if (!projects || !Array.isArray(projects)) return;

    projects.forEach(project => {
        // Map list tech stack menjadi tag <span> dengan fallback jika techStack tidak didefinisikan
        const techStack = (project && project.techStack) || [];
        const techStackHTML = techStack.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');

        // Template string untuk card project
        const cardHTML = `
            <div class="project-card">
                <div class="project-image-wrapper">
                    <img src="${(project && project.image) || ''}" alt="${(project && project.title) || 'Project'}" class="project-image" loading="lazy">
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${(project && project.title) || 'Untitled'}</h3>
                        <span class="project-badge">${semesterBadge}</span>
                    </div>
                    <p class="project-desc">${(project && project.description) || ''}</p>
                    <div class="project-tech">
                        ${techStackHTML}
                    </div>
                    <div class="project-actions">
                        <a href="${(project && project.demoUrl) || '#'}" class="project-btn btn-demo" target="_blank" rel="noopener noreferrer">Demo</a>
                        <a href="${(project && project.githubUrl) || '#'}" class="project-btn btn-github" target="_blank" rel="noopener noreferrer">Source Code</a>
                    </div>
                </div>
            </div>
        `;
        
        // Tambahkan string HTML card ke dalam container
        container.innerHTML += cardHTML;
    });
}
