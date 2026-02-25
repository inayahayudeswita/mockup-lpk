import React, { useState } from 'react';

const renewals = [
  { id: 'PRK-2025-001', siswa: 'Nurul Hidayah', foto: '👩', perusahaan: 'Fujitsu Ltd.', prefektur: 'Kanagawa', kontrak_lama: '2020-03-01', kontrak_selesai: '2026-03-01', durasi_baru: 12, gaji_baru: 230000, kenaikan: 20000, status: 'Disetujui', tgl_pengajuan: '2025-01-20', tgl_ttd: '2025-01-25', catatan: 'Perpanjangan atas permintaan perusahaan karena kinerja excellent' },
  { id: 'PRK-2025-002', siswa: 'Siti Rahayu', foto: '👩', perusahaan: 'Toyota Industries Corp.', prefektur: 'Aichi', kontrak_lama: '2025-01-15', kontrak_selesai: '2027-01-15', durasi_baru: 24, gaji_baru: 215000, kenaikan: 23000, status: 'Menunggu TTD', tgl_pengajuan: '2025-01-28', tgl_ttd: '-', catatan: 'Perusahaan sudah setuju, menunggu tanda tangan siswa' },
  { id: 'PRK-2025-003', siswa: 'Ahmad Fauzi', foto: '👨', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka', kontrak_lama: '2025-01-10', kontrak_selesai: '2027-01-10', durasi_baru: 12, gaji_baru: 200000, kenaikan: 15000, status: 'Dalam Negosiasi', tgl_pengajuan: '2025-01-25', tgl_ttd: '-', catatan: 'Negosiasi kenaikan gaji masih berlangsung' },
  { id: 'PRK-2024-021', siswa: 'Putri Lestari', foto: '👩', perusahaan: 'Nissan Motor Co., Ltd.', prefektur: 'Kanagawa', kontrak_lama: '2024-04-01', kontrak_selesai: '2026-04-01', durasi_baru: 0, gaji_baru: 0, kenaikan: 0, status: 'Ditolak Siswa', tgl_pengajuan: '2024-12-10', tgl_ttd: '-', catatan: 'Siswa memilih pulang ke Indonesia untuk menikah' },
  { id: 'PRK-2024-015', siswa: 'Hendra Wijaya', foto: '👨', perusahaan: 'Kobe Steel Ltd.', prefektur: 'Hyogo', kontrak_lama: '2024-06-15', kontrak_selesai: '2026-06-15', durasi_baru: 12, gaji_baru: 190000, kenaikan: 8000, status: 'Disetujui', tgl_pengajuan: '2024-12-01', tgl_ttd: '2024-12-20', catatan: 'Perpanjangan standar 1 tahun' },
];

const statusConfig = {
  'Disetujui': { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  'Menunggu TTD': { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
  'Dalam Negosiasi': { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  'Ditolak Siswa': { bg: '#fef2f2', text: '#b91c1c', dot: '#dc2626' },
};

export default function PerpanjanganKontrak() {
  const [filter, setFilter] = useState('Semua');
  const [showForm, setShowForm] = useState(false);

  const filtered = renewals.filter(r => filter === 'Semua' || r.status === filter);
  const disetujui = renewals.filter(r => r.status === 'Disetujui').length;
  const menunggu = renewals.filter(r => r.status === 'Menunggu TTD' || r.status === 'Dalam Negosiasi').length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#0ea5e9,#0369a1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📄</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Perpanjangan Kontrak</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Negosiasi & Pembaruan Kontrak Kerja</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg,#0ea5e9,#0369a1)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>+ Ajukan Perpanjangan</button>
      </div>

      {/* Alert */}
      {renewals.filter(r => r.status === 'Menunggu TTD').map(r => (
        <div key={r.id} style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 12, padding: '12px 20px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>⏰</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 2px', fontWeight: 700, color: '#92580a', fontSize: 14 }}>Menunggu Tanda Tangan: {r.siswa}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#a16207' }}>{r.catatan} · {r.perusahaan}</p>
          </div>
          <button style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontFamily: 'inherit', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Ingatkan Siswa</button>
        </div>
      ))}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Pengajuan', value: renewals.length, icon: '📋', color: '#0ea5e9' },
          { label: 'Berhasil Diperpanjang', value: disetujui, icon: '✅', color: '#16a34a' },
          { label: 'Sedang Diproses', value: menunggu, icon: '🔄', color: '#f59e0b' },
          { label: 'Ditolak / Pulang', value: renewals.filter(r => r.status === 'Ditolak Siswa').length, icon: '↩️', color: '#dc2626' },
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
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, marginBottom: 24, border: '1.5px solid #0ea5e920' }}>
          <h3 style={{ margin: '0 0 18px', fontWeight: 700, fontSize: 15 }}>📄 Ajukan Perpanjangan Kontrak</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {['Nama Siswa', 'Perusahaan', 'Prefektur', 'Kontrak Berakhir', 'Durasi Baru (bulan)', 'Gaji Baru (¥/bulan)'].map((lbl, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>{lbl}</label>
                <input type={lbl.includes('Kontrak') ? 'date' : lbl.includes('Durasi') || lbl.includes('Gaji') ? 'number' : 'text'} placeholder={lbl} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>Catatan</label>
              <textarea rows={2} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button style={{ background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Kirim Pengajuan</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Batal</button>
          </div>
        </div>
      )}

      {/* Filter + Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 10 }}>
          {['Semua', 'Disetujui', 'Menunggu TTD', 'Dalam Negosiasi', 'Ditolak Siswa'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '7px 13px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filter === s ? '#0ea5e9' : '#f1f5f9', color: filter === s ? '#fff' : '#64748b' }}>{s}</button>
          ))}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID', 'Siswa', 'Perusahaan', 'Kontrak Berakhir', 'Durasi Baru', 'Gaji Baru (¥)', 'Kenaikan', 'Tgl Pengajuan', 'Status', 'Catatan'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const sc = statusConfig[r.status];
                return (
                  <tr key={r.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#0ea5e9', fontWeight: 500 }}>{r.id}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span>{r.foto}</span>
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{r.siswa}</p>
                          <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{r.prefektur}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569', maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.perusahaan}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569' }}>{r.kontrak_selesai}</td>
                    <td style={{ padding: '13px 16px', color: r.durasi_baru > 0 ? '#0f172a' : '#94a3b8', fontWeight: 600 }}>{r.durasi_baru > 0 ? r.durasi_baru + ' bln' : '-'}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: r.gaji_baru > 0 ? '#0f172a' : '#94a3b8' }}>{r.gaji_baru > 0 ? '¥' + r.gaji_baru.toLocaleString() : '-'}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: r.kenaikan > 0 ? '#16a34a' : '#94a3b8' }}>{r.kenaikan > 0 ? '+¥' + r.kenaikan.toLocaleString() : '-'}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569' }}>{r.tgl_pengajuan}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />{r.status}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 11, color: '#64748b', maxWidth: 180 }}>{r.catatan}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}