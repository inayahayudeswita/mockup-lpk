import React, { useState } from 'react';

const monitoring = [
  { dept: 'Operasional Akademik', icon: '🎓', color: '#6366f1', anggaran: 620000000, realisasi: 63000000, persen: 10.2, proyeksi: 640000000, status: 'Aman' },
  { dept: 'Rekrutmen & Seleksi', icon: '🔍', color: '#f59e0b', anggaran: 480000000, realisasi: 62000000, persen: 12.9, proyeksi: 510000000, status: 'Perhatian' },
  { dept: 'Operasional Penempatan', icon: '✈️', color: '#0ea5e9', anggaran: 750000000, realisasi: 46200000, persen: 6.2, proyeksi: 720000000, status: 'Aman' },
  { dept: 'Administrasi & Umum', icon: '🏢', color: '#10b981', anggaran: 360000000, realisasi: 41500000, persen: 11.5, proyeksi: 365000000, status: 'Aman' },
  { dept: 'IT & Sistem Informasi', icon: '💻', color: '#8b5cf6', anggaran: 190000000, realisasi: 38000000, persen: 20.0, proyeksi: 225000000, status: 'Peringatan' },
];

const monthlyData = [
  { bulan: 'Jan', anggaran: 200000000, realisasi: 185000000 },
  { bulan: 'Feb', anggaran: 200000000, realisasi: 172000000 },
  { bulan: 'Mar', anggaran: 200000000, realisasi: 0 },
  { bulan: 'Apr', anggaran: 200000000, realisasi: 0 },
];

const fmt = (n) => 'Rp ' + (n / 1000000).toFixed(1) + ' Jt';
const statusConfig = {
  'Aman': { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  'Perhatian': { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
  'Peringatan': { bg: '#fef2f2', text: '#b91c1c', dot: '#dc2626' },
};

export default function BudgetMonitoring() {
  const totalAnggaran = monitoring.reduce((s, r) => s + r.anggaran, 0);
  const totalRealisasi = monitoring.reduce((s, r) => s + r.realisasi, 0);
  const totalPct = (totalRealisasi / totalAnggaran * 100).toFixed(1);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📡</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Monitoring Anggaran</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Budgeting · Real-time · Tahun Anggaran 2025</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📥 Laporan</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Anggaran 2025', value: fmt(totalAnggaran), icon: '💰', color: '#0ea5e9' },
          { label: 'Total Realisasi YTD', value: fmt(totalRealisasi), sub: totalPct + '% dari total', icon: '📤', color: '#f97316' },
          { label: 'Sisa Anggaran', value: fmt(totalAnggaran - totalRealisasi), sub: (100 - Number(totalPct)).toFixed(1) + '% tersedia', icon: '💡', color: '#16a34a' },
          { label: 'Status Dept Peringatan', value: monitoring.filter(m => m.status === 'Peringatan').length + ' dept', sub: 'perlu perhatian', icon: '⚠️', color: '#dc2626' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: '0 0 2px', fontSize: 16, fontWeight: 700, color: '#0f172a', fontFamily: "'DM Mono', monospace" }}>{c.value}</p>
                {c.sub && <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{c.sub}</p>}
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Dept Monitoring */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Realisasi per Departemen</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>YTD Jan 2025</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Departemen', 'Anggaran Total', 'Realisasi YTD', 'Proyeksi Akhir Tahun', 'Penyerapan', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: h.includes('Penyerapan') ? 'center' : 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monitoring.map((m, i) => {
                const sc = statusConfig[m.status];
                const barColor = m.persen > 15 ? '#dc2626' : m.persen > 12 ? '#f59e0b' : '#16a34a';
                const overBudget = m.proyeksi > m.anggaran;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{m.icon}</span>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{m.dept}</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{fmt(m.anggaran)}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#f97316', fontWeight: 600 }}>{fmt(m.realisasi)}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: overBudget ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
                      {fmt(m.proyeksi)} {overBudget && <span style={{ fontSize: 10, background: '#fef2f2', color: '#dc2626', borderRadius: 4, padding: '1px 5px' }}>Over!</span>}
                    </td>
                    <td style={{ padding: '13px 16px', minWidth: 160 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 8, background: '#f1f5f9', borderRadius: 4 }}>
                          <div style={{ width: Math.min(m.persen, 100) + '%', height: '100%', background: barColor, borderRadius: 4, transition: 'width 0.5s' }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: barColor, minWidth: 36 }}>{m.persen}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
                        {m.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Progress */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', padding: 24 }}>
        <p style={{ margin: '0 0 20px', fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Progres Realisasi Bulanan vs Anggaran</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {monthlyData.map((m, i) => {
            const pct = m.realisasi > 0 ? Math.round(m.realisasi / m.anggaran * 100) : 0;
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', height: 120, background: '#f8fafc', borderRadius: 8, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ width: '45%', background: '#e2e8f0', height: '80%', marginLeft: '10%', borderRadius: '4px 4px 0 0' }} title={'Anggaran: ' + fmt(m.anggaran)} />
                  <div style={{ width: '45%', background: pct > 0 ? '#0ea5e9' : '#f1f5f9', height: pct + '%', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' }} title={'Realisasi: ' + fmt(m.realisasi)} />
                </div>
                <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{m.bulan}</p>
                {m.realisasi > 0 && <p style={{ margin: 0, fontSize: 11, color: '#0ea5e9', fontWeight: 600 }}>{pct}%</p>}
                {m.realisasi === 0 && <p style={{ margin: 0, fontSize: 11, color: '#cbd5e1' }}>-</p>}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, background: '#e2e8f0', borderRadius: 2 }} /><span style={{ fontSize: 12, color: '#64748b' }}>Anggaran</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, background: '#0ea5e9', borderRadius: 2 }} /><span style={{ fontSize: 12, color: '#64748b' }}>Realisasi</span></div>
        </div>
      </div>
    </div>
  );
}