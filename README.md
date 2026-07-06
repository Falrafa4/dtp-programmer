# DTP Programmer Showcase

Website *single-page* (satu halaman) untuk menampilkan *showcase* hasil project pembelajaran siswa DTP Programmer SMK Telkom Sidoarjo tahun ajaran 2025/2026. Website ini dirancang agar terlihat modern, profesional, responsif, serta mudah dipahami oleh pengunjung.

## Features

- **Modern & Clean UI**: Desain minimalis dengan dominasi warna putih dan aksen biru (`#2563eb`).
- **Responsive Mobile-First**: Tampilan optimal di berbagai ukuran layar perangkat, dilengkapi dengan interaksi *hamburger menu sidebar*.
- **Smooth Animations**: Menggunakan *Intersection Observer* untuk efek *fade-in* yang halus saat pengunjung melakukan *scroll*.
- **Dynamic Content Loading**: Data *showcase project* di-*render* secara otomatis dari file JSON, sehingga memudahkan proses pembaruan konten tanpa perlu menyentuh struktur HTML.
- **Vanilla Stack**: Dibangun 100% menggunakan HTML semantik, CSS murni, dan JavaScript murni tanpa ketergantungan *library* pihak ketiga seperti Bootstrap atau jQuery.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON (`assets/projects.json`)
- **Typography**: Google Fonts (Poppins)
- **Icons**: Simple Icons (SVG)

## Project Structure

```text
dtp-programmer/
├── index.html           # Struktur semantik utama website
├── README.md            # Dokumentasi project
└── assets/
    ├── style.css        # Desain, layout, dan animasi CSS
    ├── script.js        # Logika interaksi navigasi & fetch API
    ├── projects.json    # Data source untuk daftar project (database JSON)
    └── icons/           # Kumpulan file aset ikon SVG
```

## Running the Project

Website ini menggunakan `fetch()` API untuk mengambil data *showcase project* dari file `projects.json`. Oleh karena masalah keamanan browser (CORS policy), website ini **tidak akan merender data JSON jika dijalankan langsung lewat protokol lokal (`file://`)**.

Anda diwajibkan untuk membukanya menggunakan *Local Web Server*. Cara termudah adalah melalui **Visual Studio Code**:

1. Buka folder root `dtp-programmer` di **VS Code**.
2. Pastikan ekstensi **Live Server** (oleh Ritwick Dey) sudah terinstal.
3. Buka atau klik kanan pada file `index.html`.
4. Pilih opsi **"Open with Live Server"**.
5. Website akan otomatis dijalankan di *default browser* Anda (biasanya `http://127.0.0.1:5500`).

## How to Update Projects

Untuk menambah, menghapus, atau mengubah urutan project pada daftar *Showcase*, Anda tidak perlu mengubah file `index.html`. Cukup ubah file data `assets/projects.json`.

Contoh struktur data JSON yang digunakan:

```json
{
  "id": 5,
  "title": "Nama Project Keren",
  "description": "Aplikasi berbasis web untuk blablabla.",
  "image": "assets/images/screenshot-project.jpg",
  "techStack": ["Next.js", "TailwindCSS"],
  "demoUrl": "https://link-demo-project.com",
  "githubUrl": "https://github.com/username/repo-name"
}
```

Masukkan data di bawah properti kategori array `"semester1"` atau `"semester2"`, dan website akan otomatis membuat *card UI*-nya di layar pengguna.

## License / Credits

&copy; 2026 DTP Programmer SMK Telkom Sidoarjo
