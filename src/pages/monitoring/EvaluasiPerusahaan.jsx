import React, { useState } from 'react';

const companies = [
  {
    id: 'EVP-001', perusahaan: 'Yamaha Motor Co., Ltd.', icon: '🏭', kota: 'Shizuoka', prefektur: 'Shizuoka',
    bidang: 'Manufaktur', jumlah_siswa: 1, kontrak_sejak: '2022-04-01',
    scores: { lingkungan: 88, gaji: 85, fasilitas: 90, manajemen: 82, karir: 80 },
    total: 85, status: 'Mitra Baik', catatan: 'Perusahaan kooperatif, fasilitas memadai, manajemen responsif', rekomendasi: 'Lanjutkan kemitraan'
  },
  {
    id: 'EVP-002', perusahaan: 'Toyota Industries Corp.', icon: '🚗', kota: 'Nagoya', prefektur: 'Aichi',
    bidang: 'Manufaktur', jumlah_siswa: 2, kontrak_sejak: '2021-01-15',
    scores: { lingkungan: 96, gaji: 94, fasilitas: 98, manajemen: 95, karir: 92 },
    total: 95, status: 'Mitra Prioritas', catatan: 'Salah satu mitra terbaik, selalu on-time bayar gaji dan ada program karir jelas', rekomendasi: 'Perbanyak penempatan'
  },
  {
    id: 'EVP-003', perusahaan: 'Denso Corporation', icon: '⚙️', kota: 'Kariya', prefektur: 'Aichi',
    bidang: 'Manufaktur', jumlah_siswa: 1, kontrak_sejak: '2023-06-01',
    scores: { lingkungan: 72, gaji: 78, fasilitas: 75, manajemen: 65, karir: 70 },
    total: 72, status: 'Perlu Evaluasi', catatan: 'Ada laporan kesulitan komunikasi, perlu mediasi dengan manajemen', rekomendasi: 'Evaluasi lanjutan'
  },
  {
    id: 'EVP-004', perusahaan: 'Hitachi Ltd.', icon: '💡', kota: 'Ibaraki', prefektur: 'Ibaraki',
    bidang: 'Elektronik', jumlah_siswa: 1, kontrak_sejak: '2022-09-01',
    scores: { lingkungan: 90, gaji: 92, fasilitas: 88, manajemen: 91, karir: 86 },
    total: 89, status: 'Mitra Baik', catatan: 'Perusahaan besar dengan sistem kerja yang teratur dan gaji kompetitif', rekomendasi: 'Lanjutkan kemitraan'
  },
  {
    id: 'EVP-005', perusahaan: 'Fujitsu Ltd.', icon: '💻', kota: 'Kawasaki', prefektur: 'Kanagawa',
    bidang: 'IT', jumlah_siswa: 1, kontrak_sejak: '2020-03-01',
    scores: { lingkungan: 95, gaji: 98, fasilitas: 96, manajemen: 97, karir: 98 },
    total: 97, status: 'Mitra Prioritas', catatan: 'Mitra premium, menyediakan pelatihan internal dan jalur karir yang excellent', rekomendasi: 'Perbanyak penempatan'
  },
];

const statusConfig = {
  'Mitra Prioritas': { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  'Mitra Baik': { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  'Perlu Evaluasi': { bg: '#fef2f2', text: '#b91c1c', dot: '#dc2626' },
};
const metricLabels = { lingkungan: 'Lingk. Kerja', gaji: 'Kelayakan Gaji', fasilitas: 'Fasilitas', manajemen: 'Manajemen', karir: 'Peluang Karir' };

export default function EvaluasiPerusahaan() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('Semua');

  const filtered = companies.filter(c => filter === 'Semua' || c.status === filter);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      {/* Detail Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: '#f0f9ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{selected.icon}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{selected.perusahaan}</h3>
                <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{selected.kota}, {selected.prefektur} · {selected.bidang}</p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: selected.total >= 90 ? '#16a34a' : selected.total >= 75 ? '#0ea5e9' : '#f59e0b' }}>{selected.total}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Skor</div>
              </div>
            </div>
            {Object.entries(selected.scores).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ width: 130, fontSize: 12, color: '#475569' }}>{metricLabels[key]}</span>
                <div style={{ flex: 1, height: 8, background: '#f1f5f9', borderRadius: 4 }}>
                  <div style={{ width: val + '%', height: '100%', background: val >= 90 ? '#16a34a' : val >= 75 ? '#0ea5e9' : '#f59e0b', borderRadius: 4 }} />
                </div>
                <span style={{ width: 30, fontSize: 12, fontWeight: 700, textAlign: 'right', color: '#0f172a' }}>{val}</span>
              </div>
            ))}
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '12px 14px', margin: '16px 0 12px' }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Catatan</p>
              <p style={{ margin: 0, fontSize: 13 }}>{selected.catatan}</p>
            </div>
            <div style={{ background: '#e6f9f0', borderRadius: 8, padding: '10px 14px', marginBottom: 16, border: '1px solid #86efac' }}>
              <p style={{ margin: '0 0 3px', fontSize: 11, color: '#0e7a4d', fontWeight: 600 }}>Rekomendasi</p>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{selected.rekomendasi}</p>
            </div>
            <button onClick={() => setSelected(null)} style={{ width: '100%', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '10px', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#f97316,#c2410c)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>🏢</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Evaluasi Perusahaan Mitra</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Penilaian Kualitas Mitra Penempatan</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg,#f97316,#c2410c)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>+ Input Evaluasi</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Mitra', value: companies.length, icon: '🏢', color: '#f97316' },
          { label: 'Mitra Prioritas', value: companies.filter(c => c.status === 'Mitra Prioritas').length, icon: '⭐', color: '#3b82f6' },
          { label: 'Rata-rata Skor', value: Math.round(companies.reduce((s, c) => s + c.total, 0) / companies.length), icon: '📊', color: '#16a34a' },
          { label: 'Perlu Evaluasi', value: companies.filter(c => c.status === 'Perlu Evaluasi').length, icon: '⚠️', color: '#dc2626' },
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

      {/* Filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {['Semua', 'Mitra Prioritas', 'Mitra Baik', 'Perlu Evaluasi'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: filter === s ? '#f97316' : '#fff', color: filter === s ? '#fff' : '#64748b', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>{s}</button>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map((c) => {
          const sc = statusConfig[c.status];
          const scoreColor = c.total >= 90 ? '#16a34a' : c.total >= 75 ? '#0ea5e9' : '#f59e0b';
          return (
            <div key={c.id} style={{ background: '#fff', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)'}
              onClick={() => setSelected(c)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 42, height: 42, background: '#f8fafc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.icon}</div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{c.perusahaan}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{c.prefektur} · {c.bidang}</p>
                  </div>
                </div>
                <div style={{ background: scoreColor + '15', borderRadius: 10, padding: '6px 10px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: 20, color: scoreColor }}>{c.total}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>skor</div>
                </div>
              </div>

              {Object.entries(c.scores).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: '#94a3b8', width: 90 }}>{metricLabels[key]}</span>
                  <div style={{ flex: 1, height: 5, background: '#f1f5f9', borderRadius: 3 }}>
                    <div style={{ width: val + '%', height: '100%', background: val >= 90 ? '#16a34a' : val >= 75 ? '#0ea5e9' : '#f59e0b', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{val}</span>
                </div>
              ))}

              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />{c.status}
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{c.jumlah_siswa} siswa aktif</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}