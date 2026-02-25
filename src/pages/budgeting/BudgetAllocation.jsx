import React, { useState } from 'react';

const allocations = [
  { id: 'ALK-001', dept: 'Operasional Akademik', pos: 'Gaji & Tunjangan Instruktur', totalAnggaran: 400000000, terpakai: 48000000, tersedia: 352000000, persen: 12 },
  { id: 'ALK-002', dept: 'Operasional Akademik', pos: 'Modul & Materi Pelatihan', totalAnggaran: 50000000, terpakai: 5000000, tersedia: 45000000, persen: 10 },
  { id: 'ALK-003', dept: 'Operasional Akademik', pos: 'Sertifikasi JLPT Siswa', totalAnggaran: 100000000, terpakai: 10000000, tersedia: 90000000, persen: 10 },
  { id: 'ALK-004', dept: 'Rekrutmen & Seleksi', pos: 'Iklan & Promosi Rekrutmen', totalAnggaran: 82000000, terpakai: 12000000, tersedia: 70000000, persen: 15 },
  { id: 'ALK-005', dept: 'Rekrutmen & Seleksi', pos: 'Tes & Seleksi Kandidat', totalAnggaran: 63000000, terpakai: 8000000, tersedia: 55000000, persen: 13 },
  { id: 'ALK-006', dept: 'Operasional Penempatan', pos: 'Biaya Visa & Imigrasi', totalAnggaran: 145000000, terpakai: 15000000, tersedia: 130000000, persen: 10 },
  { id: 'ALK-007', dept: 'Operasional Penempatan', pos: 'Asuransi Siswa ke Jepang', totalAnggaran: 180000000, terpakai: 20000000, tersedia: 160000000, persen: 11 },
  { id: 'ALK-008', dept: 'Administrasi & Umum', pos: 'Gaji Staf Administrasi', totalAnggaran: 200000000, terpakai: 20000000, tersedia: 180000000, persen: 10 },
  { id: 'ALK-009', dept: 'Administrasi & Umum', pos: 'Biaya Sewa Gedung', totalAnggaran: 150000000, terpakai: 15000000, tersedia: 135000000, persen: 10 },
  { id: 'ALK-010', dept: 'Administrasi & Umum', pos: 'Operasional Kantor', totalAnggaran: 60000000, terpakai: 6500000, tersedia: 53500000, persen: 11 },
];

const fmt = (n) => 'Rp ' + (n / 1000000).toFixed(1) + ' Jt';

const deptColors = {
  'Operasional Akademik': '#6366f1',
  'Rekrutmen & Seleksi': '#f59e0b',
  'Operasional Penempatan': '#0ea5e9',
  'Administrasi & Umum': '#10b981',
};

export default function BudgetAllocation() {
  const [filterDept, setFilterDept] = useState('Semua');
  const depts = ['Semua', ...Object.keys(deptColors)];

  const filtered = allocations.filter(a => filterDept === 'Semua' || a.dept === filterDept);
  const totalAnggaran = filtered.reduce((s, r) => s + r.totalAnggaran, 0);
  const totalTerpakai = filtered.reduce((s, r) => s + r.terpakai, 0);
  const totalTersedia = filtered.reduce((s, r) => s + r.tersedia, 0);
  const avgPct = Math.round(totalTerpakai / totalAnggaran * 100);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#f97316,#c2410c)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📊</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Alokasi Anggaran</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Budgeting · Tahun Anggaran 2025</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg,#f97316,#c2410c)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          + Alokasikan Anggaran
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Dialokasikan', value: fmt(totalAnggaran), icon: '💰', color: '#f97316' },
          { label: 'Sudah Terpakai', value: fmt(totalTerpakai), sub: avgPct + '% dari total', icon: '📤', color: '#dc2626' },
          { label: 'Masih Tersedia', value: fmt(totalTersedia), icon: '💡', color: '#16a34a' },
          { label: 'Sisa Anggaran (%)', value: (100 - avgPct) + '%', sub: 'dari total alokasi', icon: '📉', color: '#0ea5e9' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: '0 0 2px', fontSize: 17, fontWeight: 700, color: '#0f172a', fontFamily: "'DM Mono', monospace" }}>{c.value}</p>
                {c.sub && <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{c.sub}</p>}
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {depts.map(d => (
            <button key={d} onClick={() => setFilterDept(d)} style={{ padding: '7px 13px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filterDept === d ? '#f97316' : '#f1f5f9', color: filterDept === d ? '#fff' : '#64748b' }}>{d}</button>
          ))}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID', 'Departemen', 'Pos Anggaran', 'Total Dialokasikan', 'Sudah Terpakai', 'Masih Tersedia', 'Progres', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const dc = deptColors[a.dept] || '#94a3b8';
                const barColor = a.persen > 80 ? '#dc2626' : a.persen > 60 ? '#f59e0b' : '#16a34a';
                return (
                  <tr key={a.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#f97316', fontWeight: 500 }}>{a.id}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: dc + '18', color: dc, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{a.dept}</span>
                    </td>
                    <td style={{ padding: '13px 16px', fontWeight: 500, color: '#0f172a' }}>{a.pos}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{fmt(a.totalAnggaran)}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#dc2626', fontWeight: 600 }}>{fmt(a.terpakai)}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#16a34a', fontWeight: 600 }}>{fmt(a.tersedia)}</td>
                    <td style={{ padding: '13px 16px', minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3 }}>
                          <div style={{ width: a.persen + '%', height: '100%', background: barColor, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: barColor, minWidth: 28 }}>{a.persen}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                    </td>
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