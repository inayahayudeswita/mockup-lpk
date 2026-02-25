import React, { useState } from 'react';

const masalahList = [
  { id: 'MSL-2025-001', siswa: 'Budi Santoso', foto: '👨', perusahaan: 'Denso Corporation', prefektur: 'Aichi', tgl: '2025-01-22', kategori: 'Komunikasi', deskripsi: 'Kesulitan berkomunikasi dengan supervisor Jepang, sering terjadi miskomunikasi terkait instruksi kerja', dampak: 'Penurunan produktivitas', prioritas: 'Tinggi', status: 'Dalam Proses', penanganan: 'Dijadwalkan mediasi dengan perusahaan tgl 5 Feb 2025', koordinator: 'Budi Hartono' },
  { id: 'MSL-2025-002', siswa: 'Hendra Wijaya', foto: '👨', perusahaan: 'Kobe Steel Ltd.', prefektur: 'Hyogo', tgl: '2025-01-18', kategori: 'Kesehatan', deskripsi: 'Sakit maag akut, perlu rawat jalan selama 2 minggu. Belum tahu pasti jenis penyakitnya', dampak: 'Absen kerja berkepanjangan', prioritas: 'Darurat', status: 'Dalam Proses', penanganan: 'Sudah koordinasi dengan klinik lokal, menunggu hasil pemeriksaan', koordinator: 'Budi Hartono' },
  { id: 'MSL-2025-003', siswa: 'Dewi Anggraini', foto: '👩', perusahaan: 'Hitachi Ltd.', prefektur: 'Ibaraki', tgl: '2025-01-25', kategori: 'Kerinduan', deskripsi: 'Mengeluh sangat merindukan keluarga, sulit berkonsentrasi bekerja. Kondisi psikologis membutuhkan perhatian', dampak: 'Penurunan semangat kerja', prioritas: 'Normal', status: 'Dipantau', penanganan: 'Disarankan bergabung komunitas TKI di wilayah Ibaraki', koordinator: 'Rina Susanti' },
  { id: 'MSL-2025-004', siswa: 'Rizky Pratama', foto: '👨', perusahaan: 'Panasonic Holdings', prefektur: 'Osaka', tgl: '2025-01-28', kategori: 'Administrasi', deskripsi: 'Kartu Residence (Zairyu Card) hampir expired, perlu perpanjangan segera sebelum tgl 15 Feb 2025', dampak: 'Risiko ilegal secara status imigrasi', prioritas: 'Tinggi', status: 'Menunggu Tindak Lanjut', penanganan: 'LPK sedang menghubungi perusahaan untuk fasilitasi perpanjangan', koordinator: 'Agus Prasetyo' },
  { id: 'MSL-2024-028', siswa: 'Nurul Hidayah', foto: '👩', perusahaan: 'Fujitsu Ltd.', prefektur: 'Kanagawa', tgl: '2024-11-10', kategori: 'Keuangan', deskripsi: 'Laptop kerja rusak, butuh biaya perbaikan ¥45,000 namun tidak tercover asuransi. Meminta bantuan perusahaan', dampak: 'Gangguan pekerjaan IT', prioritas: 'Normal', status: 'Selesai', penanganan: 'Perusahaan setuju menanggung biaya penggantian laptop', koordinator: 'Agus Prasetyo' },
];

const prioritasConfig = {
  'Darurat': { bg: '#fef2f2', text: '#b91c1c', icon: '🚨' },
  'Tinggi': { bg: '#fff7e6', text: '#92580a', icon: '⚠️' },
  'Normal': { bg: '#f0f9ff', text: '#0369a1', icon: 'ℹ️' },
};

const statusConfig = {
  'Dalam Proses': { bg: '#eff6ff', text: '#1d4ed8' },
  'Dipantau': { bg: '#fff7e6', text: '#92580a' },
  'Menunggu Tindak Lanjut': { bg: '#fdf4ff', text: '#7e22ce' },
  'Selesai': { bg: '#e6f9f0', text: '#0e7a4d' },
};

const kategoriColor = {
  'Komunikasi': '#6366f1', 'Kesehatan': '#dc2626', 'Kerinduan': '#ec4899',
  'Administrasi': '#f59e0b', 'Keuangan': '#0ea5e9',
};

export default function LaporanMasalah() {
  const [showForm, setShowForm] = useState(false);
  const [filterPrioritas, setFilterPrioritas] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = masalahList.filter(m =>
    (filterPrioritas === 'Semua' || m.prioritas === filterPrioritas) &&
    (filterStatus === 'Semua' || m.status === filterStatus)
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#dc2626,#991b1b)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>🚩</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Laporan Masalah</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Kendala & Penanganan Siswa</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg,#dc2626,#991b1b)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          + Laporkan Masalah
        </button>
      </div>

      {/* Alert Darurat */}
      {masalahList.filter(m => m.prioritas === 'Darurat' && m.status !== 'Selesai').map(m => (
        <div key={m.id} style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 12, padding: '14px 20px', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 22 }}>🚨</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 2px', fontWeight: 700, color: '#b91c1c', fontSize: 14 }}>DARURAT: {m.siswa} — {m.kategori}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#dc2626' }}>{m.deskripsi}</p>
          </div>
          <button style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontFamily: 'inherit', fontWeight: 600, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>Tangani</button>
        </div>
      ))}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Laporan', value: masalahList.length, icon: '📋', color: '#dc2626' },
          { label: 'Status Darurat', value: masalahList.filter(m => m.prioritas === 'Darurat').length, icon: '🚨', color: '#dc2626' },
          { label: 'Dalam Proses', value: masalahList.filter(m => m.status === 'Dalam Proses').length, icon: '🔄', color: '#3b82f6' },
          { label: 'Sudah Selesai', value: masalahList.filter(m => m.status === 'Selesai').length, icon: '✅', color: '#16a34a' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, marginBottom: 24, border: '1.5px solid #dc262620', boxShadow: '0 2px 12px rgba(220,38,38,0.08)' }}>
          <h3 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 700 }}>🚩 Laporkan Masalah Baru</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {['Nama Siswa', 'Perusahaan', 'Prefektur', 'Tanggal', 'Kategori', 'Prioritas'].map((lbl, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>{lbl}</label>
                {lbl === 'Kategori' ? (
                  <select style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none' }}>
                    {['Komunikasi', 'Kesehatan', 'Kerinduan', 'Administrasi', 'Keuangan', 'Keamanan'].map(k => <option key={k}>{k}</option>)}
                  </select>
                ) : lbl === 'Prioritas' ? (
                  <select style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none' }}>
                    {['Normal', 'Tinggi', 'Darurat'].map(k => <option key={k}>{k}</option>)}
                  </select>
                ) : (
                  <input type={lbl === 'Tanggal' ? 'date' : 'text'} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                )}
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>Deskripsi Masalah</label>
              <textarea rows={3} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Kirim Laporan</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Batal</button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        {['Semua', 'Darurat', 'Tinggi', 'Normal'].map(p => (
          <button key={p} onClick={() => setFilterPrioritas(p)} style={{ padding: '7px 13px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filterPrioritas === p ? '#dc2626' : '#fff', color: filterPrioritas === p ? '#fff' : '#64748b', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>{p}</button>
        ))}
        <div style={{ width: 1, background: '#e2e8f0', margin: '0 4px' }} />
        {['Semua', 'Dalam Proses', 'Dipantau', 'Selesai'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '7px 13px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filterStatus === s ? '#6366f1' : '#fff', color: filterStatus === s ? '#fff' : '#64748b', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>{s}</button>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {filtered.map((m) => {
          const pc = prioritasConfig[m.prioritas];
          const sc = statusConfig[m.status];
          const kc = kategoriColor[m.kategori] || '#94a3b8';
          return (
            <div key={m.id} style={{ background: '#fff', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: m.prioritas === 'Darurat' ? '1.5px solid #fca5a5' : '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{m.foto}</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>{m.siswa}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{m.perusahaan} · {m.prefektur}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ background: pc.bg, color: pc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{pc.icon} {m.prioritas}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#94a3b8' }}>{m.id}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <span style={{ background: kc + '15', color: kc, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>📌 {m.kategori}</span>
                <span style={{ background: sc.bg, color: sc.text, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{m.status}</span>
                <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>{m.tgl}</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{m.deskripsi}</p>
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 12px', marginBottom: 12, display: 'flex', gap: 6 }}>
                <span style={{ fontSize: 12, color: '#16a34a' }}>🔧</span>
                <span style={{ fontSize: 12, color: '#475569' }}>{m.penanganan}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#64748b' }}>👤 {m.koordinator}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                  {m.status !== 'Selesai' && <button style={{ background: '#e6f9f0', color: '#0e7a4d', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>✓ Selesai</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}