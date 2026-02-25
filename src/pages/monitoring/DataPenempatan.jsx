import React, { useState } from 'react';

const placements = [
  { id: 'PNM-2025-001', nama: 'Ahmad Fauzi', foto: '👨', asal: 'Bandung', perusahaan: 'Yamaha Motor Co., Ltd.', kota: 'Shizuoka', prefektur: 'Shizuoka', bidang: 'Manufaktur', mulai: '2025-01-10', selesai: '2027-01-10', gaji: 185000, status: 'Aktif', koordinator: 'Budi Hartono' },
  { id: 'PNM-2025-002', nama: 'Siti Rahayu', foto: '👩', asal: 'Surabaya', perusahaan: 'Toyota Industries Corp.', kota: 'Nagoya', prefektur: 'Aichi', bidang: 'Manufaktur', mulai: '2025-01-15', selesai: '2027-01-15', gaji: 192000, status: 'Aktif', koordinator: 'Rina Susanti' },
  { id: 'PNM-2025-003', nama: 'Budi Santoso', foto: '👨', asal: 'Yogyakarta', perusahaan: 'Denso Corporation', kota: 'Kariya', prefektur: 'Aichi', bidang: 'Manufaktur', mulai: '2025-01-20', selesai: '2027-01-20', gaji: 178000, status: 'Aktif', koordinator: 'Budi Hartono' },
  { id: 'PNM-2025-004', nama: 'Dewi Anggraini', foto: '👩', asal: 'Semarang', perusahaan: 'Hitachi Ltd.', kota: 'Ibaraki', prefektur: 'Ibaraki', bidang: 'Elektronik', mulai: '2025-02-01', selesai: '2027-02-01', gaji: 195000, status: 'Aktif', koordinator: 'Rina Susanti' },
  { id: 'PNM-2025-005', nama: 'Rizky Pratama', foto: '👨', asal: 'Malang', perusahaan: 'Panasonic Holdings Corp.', kota: 'Osaka', prefektur: 'Osaka', bidang: 'Elektronik', mulai: '2025-02-05', selesai: '2027-02-05', gaji: 188000, status: 'Aktif', koordinator: 'Agus Prasetyo' },
  { id: 'PNM-2024-018', nama: 'Nurul Hidayah', foto: '👩', asal: 'Medan', perusahaan: 'Fujitsu Ltd.', kota: 'Kawasaki', prefektur: 'Kanagawa', bidang: 'IT', mulai: '2024-08-01', selesai: '2026-08-01', gaji: 210000, status: 'Aktif', koordinator: 'Agus Prasetyo' },
  { id: 'PNM-2024-012', nama: 'Hendra Wijaya', foto: '👨', asal: 'Jakarta', perusahaan: 'Kobe Steel Ltd.', kota: 'Kobe', prefektur: 'Hyogo', bidang: 'Manufaktur', mulai: '2024-06-15', selesai: '2026-06-15', gaji: 182000, status: 'Cuti', koordinator: 'Budi Hartono' },
  { id: 'PNM-2024-009', nama: 'Putri Lestari', foto: '👩', asal: 'Makassar', perusahaan: 'Nissan Motor Co., Ltd.', kota: 'Yokohama', prefektur: 'Kanagawa', bidang: 'Manufaktur', mulai: '2024-04-01', selesai: '2026-04-01', gaji: 190000, status: 'Selesai', koordinator: 'Rina Susanti' },
];

const statusColor = {
  'Aktif': { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  'Cuti': { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
  'Selesai': { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' },
};

const bidangColor = {
  'Manufaktur': { bg: '#eff6ff', text: '#1d4ed8' },
  'Elektronik': { bg: '#f0fdf4', text: '#166534' },
  'IT': { bg: '#fdf4ff', text: '#7e22ce' },
};

export default function DataPenempatan() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = placements.filter(p =>
    (filterStatus === 'Semua' || p.status === filterStatus) &&
    (p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.perusahaan.toLowerCase().includes(search.toLowerCase()) ||
      p.prefektur.toLowerCase().includes(search.toLowerCase()))
  );

  const aktif = placements.filter(p => p.status === 'Aktif').length;
  const avgGaji = Math.round(placements.filter(p => p.status === 'Aktif').reduce((s, r) => s + r.gaji, 0) / aktif);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#e11d48,#9f1239)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>✈️</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Data Penempatan</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Siswa Aktif di Jepang</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg,#e11d48,#9f1239)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          + Tambah Penempatan
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Siswa di Jepang', value: aktif, sub: 'sedang aktif bekerja', icon: '🇯🇵', color: '#e11d48' },
          { label: 'Rata-rata Gaji', value: '¥' + avgGaji.toLocaleString(), sub: 'per bulan', icon: '💴', color: '#0ea5e9' },
          { label: 'Prefektur Terbanyak', value: 'Aichi', sub: '2 siswa', icon: '📍', color: '#6366f1' },
          { label: 'Kontrak Berakhir <3 Bln', value: placements.filter(p => { const diff = (new Date(p.selesai) - new Date()) / (1000 * 60 * 60 * 24 * 30); return diff < 3 && diff > 0; }).length, sub: 'segera diperpanjang', icon: '⏰', color: '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
                <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{c.sub}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Cari nama, perusahaan, prefektur..." style={{ flex: 1, minWidth: 220, padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
          {['Semua', 'Aktif', 'Cuti', 'Selesai'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: filterStatus === s ? '#e11d48' : '#f1f5f9', color: filterStatus === s ? '#fff' : '#64748b' }}>{s}</button>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID', 'Siswa', 'Perusahaan', 'Kota / Prefektur', 'Bidang', 'Mulai Kerja', 'Akhir Kontrak', 'Gaji (¥/bln)', 'Status', 'Koordinator'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const sc = statusColor[p.status];
                const bc = bidangColor[p.bidang] || { bg: '#f1f5f9', text: '#475569' };
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#e11d48', fontWeight: 500 }}>{p.id}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 32, height: 32, background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{p.foto}</div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{p.nama}</p>
                          <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{p.asal}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px', fontWeight: 500, color: '#0f172a', maxWidth: 180, whiteSpace: 'nowrap' }}>{p.perusahaan}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <p style={{ margin: 0, color: '#0f172a', fontWeight: 500, fontSize: 13 }}>{p.kota}</p>
                      <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>Prefektur {p.prefektur}</p>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: bc.bg, color: bc.text, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{p.bidang}</span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12 }}>{p.mulai}</td>
                    <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12 }}>{p.selesai}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0f172a' }}>¥{p.gaji.toLocaleString()}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />{p.status}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12 }}>{p.koordinator}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>Menampilkan {filtered.length} dari {placements.length} data</span>
        </div>
      </div>
    </div>
  );
}