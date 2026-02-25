import React, { useState } from 'react';

const returnData = [
  { id: 'KPL-2025-001', siswa: 'Putri Lestari', foto: '👩', asal: 'Makassar', perusahaan: 'Nissan Motor Co., Ltd.', prefektur: 'Kanagawa', tgl_masuk: '2024-04-01', tgl_pulang: '2026-04-01', estimasi_kepulangan: '2026-03-25', alasan: 'Kontrak selesai, menikah', rencana: 'Berwirausaha', status: 'Terjadwal', tabungan: 12500000, oleh_oleh: 'Pengalaman + Sertifikat JLPT N3', koordinator: 'Rina Susanti' },
  { id: 'KPL-2025-002', siswa: 'Rudi Setiawan', foto: '👨', asal: 'Surabaya', perusahaan: 'Mitsubishi Electric Corp.', prefektur: 'Tokyo', tgl_masuk: '2022-07-01', tgl_pulang: '2025-02-15', estimasi_kepulangan: '2025-02-15', alasan: 'Kontrak selesai (3 tahun)', rencana: 'Bekerja di perusahaan Jepang di Indonesia', status: 'Sedang Proses', tabungan: 38000000, oleh_oleh: 'JLPT N2 + 3 Tahun Pengalaman', koordinator: 'Agus Prasetyo' },
  { id: 'KPL-2024-018', siswa: 'Maya Sari', foto: '👩', asal: 'Yogyakarta', perusahaan: 'Canon Inc.', prefektur: 'Tokyo', tgl_masuk: '2021-09-01', tgl_pulang: '2024-09-01', estimasi_kepulangan: '2024-09-05', alasan: 'Kontrak selesai', rencana: 'Melanjutkan S2', status: 'Sudah Pulang', tabungan: 42000000, oleh_oleh: 'JLPT N2, Pengalaman 3 Tahun', koordinator: 'Budi Hartono' },
  { id: 'KPL-2024-012', siswa: 'Agus Trianto', foto: '👨', asal: 'Medan', perusahaan: 'Kyocera Corporation', prefektur: 'Kyoto', tgl_masuk: '2022-03-15', tgl_pulang: '2024-06-30', estimasi_kepulangan: '2024-07-02', alasan: 'Kontrak diakhiri lebih awal (sakit)', rencana: 'Pengobatan & pemulihan', status: 'Sudah Pulang', tabungan: 22000000, oleh_oleh: 'Pengalaman 2 Tahun', koordinator: 'Rina Susanti' },
  { id: 'KPL-2025-003', siswa: 'Lina Hartati', foto: '👩', asal: 'Bandung', perusahaan: 'Panasonic Holdings', prefektur: 'Osaka', tgl_masuk: '2023-11-01', tgl_pulang: '2025-11-01', estimasi_kepulangan: '2025-10-28', alasan: 'Kontrak selesai (2 tahun)', rencana: 'Belum diputuskan', status: 'Terjadwal', tabungan: 0, oleh_oleh: '-', koordinator: 'Agus Prasetyo' },
];

const statusConfig = {
  'Sudah Pulang': { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  'Sedang Proses': { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  'Terjadwal': { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
};

const fmt = (n) => n > 0 ? 'Rp ' + n.toLocaleString('id-ID') : '-';

export default function DataKepulangan() {
  const [filter, setFilter] = useState('Semua');

  const filtered = returnData.filter(r => filter === 'Semua' || r.status === filter);
  const sudahPulang = returnData.filter(r => r.status === 'Sudah Pulang').length;
  const avgTabungan = Math.round(returnData.filter(r => r.tabungan > 0).reduce((s, r) => s + r.tabungan, 0) / returnData.filter(r => r.tabungan > 0).length);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>🏠</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Data Kepulangan</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Rekap Kepulangan Siswa ke Indonesia</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>+ Catat Kepulangan</button>
      </div>

      {/* Alert: Segera Pulang */}
      {returnData.filter(r => r.status === 'Sedang Proses').map(r => (
        <div key={r.id} style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 12, padding: '12px 20px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>✈️</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 2px', fontWeight: 700, color: '#1d4ed8', fontSize: 14 }}>{r.siswa} — Estimasi Kepulangan {r.estimasi_kepulangan}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#3b82f6' }}>{r.perusahaan} · Alasan: {r.alasan}</p>
          </div>
          <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontFamily: 'inherit', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Persiapkan Penerimaan</button>
        </div>
      ))}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Data Kepulangan', value: returnData.length, icon: '📋', color: '#8b5cf6' },
          { label: 'Sudah Pulang', value: sudahPulang, icon: '🏠', color: '#16a34a' },
          { label: 'Rata-rata Tabungan', value: fmt(avgTabungan), icon: '💰', color: '#0ea5e9' },
          { label: 'Terjadwal Pulang', value: returnData.filter(r => r.status === 'Terjadwal').length, icon: '📅', color: '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: typeof c.value === 'number' ? 26 : 16, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter + Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 10 }}>
          {['Semua', 'Sudah Pulang', 'Sedang Proses', 'Terjadwal'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '7px 13px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filter === s ? '#8b5cf6' : '#f1f5f9', color: filter === s ? '#fff' : '#64748b' }}>{s}</button>
          ))}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID', 'Siswa', 'Asal', 'Perusahaan', 'Tgl Masuk', 'Tgl Pulang', 'Alasan', 'Rencana Pasca', 'Tabungan', 'Pencapaian', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const sc = statusConfig[r.status];
                return (
                  <tr key={r.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#8b5cf6', fontWeight: 500 }}>{r.id}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{r.foto}</span>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{r.siswa}</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{r.asal}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569', maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.perusahaan}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569' }}>{r.tgl_masuk}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{r.tgl_pulang}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569', maxWidth: 140 }}>{r.alasan}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569' }}>{r.rencana}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: r.tabungan > 0 ? '#16a34a' : '#94a3b8' }}>{fmt(r.tabungan)}</td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569', maxWidth: 160 }}>{r.oleh_oleh}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />{r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>Menampilkan {filtered.length} dari {returnData.length} data</span>
        </div>
      </div>
    </div>
  );
}