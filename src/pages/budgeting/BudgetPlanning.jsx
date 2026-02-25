import React, { useState } from 'react';

const deptBudgets = [
  {
    dept: 'Operasional Akademik',
    icon: '🎓',
    color: '#6366f1',
    total: 620000000,
    items: [
      { nama: 'Gaji & Tunjangan Instruktur', jan: 40000000, q2: 120000000, q3: 120000000, q4: 120000000 },
      { nama: 'Modul & Materi Pelatihan', jan: 5000000, q2: 15000000, q3: 15000000, q4: 15000000 },
      { nama: 'Sertifikasi JLPT Siswa', jan: 10000000, q2: 30000000, q3: 30000000, q4: 30000000 },
      { nama: 'Peralatan Kelas & Lab', jan: 5000000, q2: 15000000, q3: 10000000, q4: 10000000 },
    ],
  },
  {
    dept: 'Rekrutmen & Seleksi',
    icon: '🔍',
    color: '#f59e0b',
    total: 480000000,
    items: [
      { nama: 'Iklan & Promosi Rekrutmen', jan: 12000000, q2: 30000000, q3: 25000000, q4: 15000000 },
      { nama: 'Tes & Seleksi Kandidat', jan: 8000000, q2: 20000000, q3: 20000000, q4: 15000000 },
      { nama: 'Event Campus Hiring', jan: 5000000, q2: 20000000, q3: 20000000, q4: 10000000 },
    ],
  },
  {
    dept: 'Operasional Penempatan',
    icon: '✈️',
    color: '#0ea5e9',
    total: 750000000,
    items: [
      { nama: 'Biaya Visa & Imigrasi', jan: 15000000, q2: 50000000, q3: 50000000, q4: 30000000 },
      { nama: 'Asuransi Siswa', jan: 20000000, q2: 60000000, q3: 60000000, q4: 40000000 },
      { nama: 'Transportasi & Akomodasi', jan: 10000000, q2: 25000000, q3: 25000000, q4: 15000000 },
      { nama: 'Dokumen Legal & Notaris', jan: 5000000, q2: 15000000, q3: 15000000, q4: 10000000 },
    ],
  },
  {
    dept: 'Administrasi & Umum',
    icon: '🏢',
    color: '#10b981',
    total: 360000000,
    items: [
      { nama: 'Gaji Staf Administrasi', jan: 20000000, q2: 60000000, q3: 60000000, q4: 60000000 },
      { nama: 'Biaya Sewa Gedung', jan: 15000000, q2: 45000000, q3: 45000000, q4: 45000000 },
      { nama: 'Listrik, Air, Internet', jan: 5000000, q2: 15000000, q3: 15000000, q4: 15000000 },
    ],
  },
];

const fmt = (n) => n >= 1000000 ? (n / 1000000).toFixed(0) + ' Jt' : (n / 1000).toFixed(0) + ' Rb';

export default function BudgetPlanning() {
  const [expandedDept, setExpandedDept] = useState('Operasional Akademik');

  const totalBudget = deptBudgets.reduce((s, d) => s + d.total, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#a855f7,#7e22ce)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📝</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Perencanaan Anggaran</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Budgeting · Tahun Anggaran 2025</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>+ Tambah Pos</button>
          <button style={{ background: 'linear-gradient(135deg,#a855f7,#7e22ce)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Ajukan untuk Persetujuan</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {deptBudgets.map((d, i) => {
          const pct = Math.round((d.total / totalBudget) * 100);
          return (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', cursor: 'pointer', borderTop: `3px solid ${d.color}` }} onClick={() => setExpandedDept(d.dept)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 22 }}>{d.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: d.color, background: d.color + '15', padding: '2px 8px', borderRadius: 20 }}>{pct}%</span>
              </div>
              <p style={{ margin: '0 0 2px', fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.dept}</p>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#0f172a', fontFamily: "'DM Mono', monospace" }}>Rp {(d.total / 1000000).toFixed(0)} Jt</p>
              <div style={{ marginTop: 10, height: 4, background: '#f1f5f9', borderRadius: 2 }}>
                <div style={{ width: pct + '%', height: '100%', background: d.color, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dept Detail */}
      {deptBudgets.map(d => (
        <div key={d.dept} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden', marginBottom: 12 }}>
          <div
            onClick={() => setExpandedDept(expandedDept === d.dept ? null : d.dept)}
            style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: expandedDept === d.dept ? d.color + '08' : '#fff' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{d.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{d.dept}</span>
              <span style={{ background: d.color + '18', color: d.color, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{d.items.length} pos anggaran</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 14, color: d.color }}>Rp {(d.total / 1000000).toFixed(0)} Jt</span>
              <span style={{ color: '#94a3b8', fontSize: 16 }}>{expandedDept === d.dept ? '▲' : '▼'}</span>
            </div>
          </div>
          {expandedDept === d.dept && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Pos Anggaran', 'Jan 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Total'].map((h, i) => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: i > 0 ? 'right' : 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.items.map((item, i) => {
                    const total = item.jan + item.q2 + item.q3 + item.q4;
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                        <td style={{ padding: '11px 16px', color: '#475569', fontWeight: 500 }}>{item.nama}</td>
                        {[item.jan, item.q2, item.q3, item.q4].map((v, vi) => (
                          <td key={vi} style={{ padding: '11px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#0f172a' }}>{fmt(v)}</td>
                        ))}
                        <td style={{ padding: '11px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: d.color }}>{fmt(total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* Total */}
      <div style={{ background: '#0f172a', borderRadius: 14, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: 15 }}>TOTAL ANGGARAN 2025</span>
        <span style={{ color: '#a78bfa', fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 20 }}>Rp {(totalBudget / 1000000000).toFixed(2)} M</span>
      </div>
    </div>
  );
}