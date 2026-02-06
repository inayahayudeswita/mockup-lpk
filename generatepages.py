import os

BASE_DIR = os.path.join("src", "pages")

pages = {
    "Dashboard": "Dashboard.jsx",

    "pendaftaran": {
        "CalonPeserta.jsx": "Calon Peserta",
        "VerifikasiDokumen.jsx": "Verifikasi Dokumen",
        "TesAwal.jsx": "Tes Awal",
        "KeputusanSeleksi.jsx": "Keputusan Seleksi",
    },

    "akademik": {
        "DataPeserta.jsx": "Data Peserta",
        "ManajemenKelas.jsx": "Manajemen Kelas",
        "JadwalPembelajaran.jsx": "Jadwal Pembelajaran",
        "Absensi.jsx": "Absensi",
        "NilaiEvaluasi.jsx": "Nilai Evaluasi",
    },

    "ujian": {
        "UjianInternal.jsx": "Ujian Internal",
        "SimulasiBahasa.jsx": "Simulasi Bahasa",
        "HasilUjian.jsx": "Hasil Ujian",
        "Sertifikat.jsx": "Sertifikat",
    },

    "penyaluran": {
        "PesertaSiapSalur.jsx": "Peserta Siap Salur",
        "JobOrder.jsx": "Job Order",
        "Matching.jsx": "Matching",
        "Interview.jsx": "Interview",
        "HasilSeleksi.jsx": "Hasil Seleksi",
    },

    "keberangkatan": {
        "DokumenKeberangkatan.jsx": "Dokumen Keberangkatan",
        "MonitoringTimeline.jsx": "Monitoring Timeline",
        "FinalBriefing.jsx": "Final Briefing",
        "StatusKeberangkatan.jsx": "Status Keberangkatan",
    },

    "monitoring": {
        "DataPenempatan.jsx": "Data Penempatan",
        "EvaluasiKinerja.jsx": "Evaluasi Kinerja",
        "LaporanMasalah.jsx": "Laporan Masalah",
        "PerpanjanganKontrak.jsx": "Perpanjangan Kontrak",
    },

    "keuangan": {
        "BiayaPendidikan.jsx": "Biaya Pendidikan",
        "Pembayaran.jsx": "Pembayaran",
        "Invoice.jsx": "Invoice",
        "LaporanKeuangan.jsx": "Laporan Keuangan",
    },

    "master": {
        "ProgramPelatihan.jsx": "Program Pelatihan",
        "Kurikulum.jsx": "Kurikulum",
        "BidangKerja.jsx": "Bidang Kerja",
        "MitraJepang.jsx": "Mitra Jepang",
        "TahunAngkatan.jsx": "Tahun Angkatan",
    },

    "user": {
        "Admin.jsx": "Admin",
        "Instruktur.jsx": "Instruktur",
        "RolePermission.jsx": "Role & Permission",
        "AuditLog.jsx": "Audit Log",
    },

    "laporan": {
        "LaporanPeserta.jsx": "Laporan Peserta",
        "LaporanAkademik.jsx": "Laporan Akademik",
        "LaporanPenyaluran.jsx": "Laporan Penyaluran",
        "ExportData.jsx": "Export Data",
    },

    "pengaturan": {
        "ProfilLPK.jsx": "Profil LPK",
        "TemplateDokumen.jsx": "Template Dokumen",
        "Notifikasi.jsx": "Notifikasi",
        "Backup.jsx": "Backup",
    },
}

TEMPLATE = """import React from 'react';

export default function {component}() {{
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p>Halaman {title}</p>
    </div>
  );
}}
"""

def create_file(path, component, title):
    if os.path.exists(path):
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(TEMPLATE.format(component=component, title=title))

def main():
    os.makedirs(BASE_DIR, exist_ok=True)

    # Dashboard
    dashboard_path = os.path.join(BASE_DIR, "Dashboard.jsx")
    create_file(dashboard_path, "Dashboard", "Dashboard")

    # Other pages
    for folder, files in pages.items():
        if folder == "Dashboard":
            continue

        folder_path = os.path.join(BASE_DIR, folder)
        os.makedirs(folder_path, exist_ok=True)

        for filename, title in files.items():
            component = filename.replace(".jsx", "")
            file_path = os.path.join(folder_path, filename)
            create_file(file_path, component, title)

    print("✅ Semua halaman berhasil digenerate!")

if __name__ == "__main__":
    main()
