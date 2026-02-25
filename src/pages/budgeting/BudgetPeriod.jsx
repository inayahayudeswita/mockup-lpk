import React, { useState } from 'react';

const periods = [
  { id: 'BP-2025', nama: 'Anggaran Tahun 2025', mulai: '2025-01-01', selesai: '2025-12-31', total: 2400000000, status: 'Aktif', disetujui: 'Direktur Utama', tgl_setuju: '2024-12-20', revisi: 1 },
  { id: 'BP-2024', nama: 'Anggaran Tahun 2024', mulai: '2024-01-01', selesai: '2024-12-31', total: 1950000000, status: 'Ditutup', disetujui: 'Direktur Utama', tgl_setuju: '2023-12-15', revisi: 2 },
  { id: 'BP-2024-Q2', nama: 'Anggaran Tambahan Q2 2024', mulai: '2024-04-01', selesai: '2024-06-30', total: 350000000, status: 'Ditutup', disetujui: 'Direktur Keuangan', tgl_setuju: '2024-03-28', revisi: 0 },
  { id: 'BP-2025-Q1', nama: 'Anggaran Khusus Rekrutmen Q1 2025', mulai: '2025-01-01', selesai: '2025-03-31', total: 180000000, status: 'Aktif', disetujui: 'Direktur Operasional', tgl_setuju: '2024-12-28', revisi: 0 },
  { id: 'BP-2026', nama: 'Draft Anggaran Tahun 2026', mulai: '2026-01-01', selesai: '2026-12-31', total: 2800000000, status: 'Draft', disetujui: '-', tgl_setuju: '-', revisi: 0 },
];

const fmt = (n) => 'Rp ' + (n / 1000000).toFixed(0) + ' Jt';
const statusColor = {
  'Aktif': { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  'Ditutup': { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' },
  'Draft': { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
};

export default function BudgetPeriod() {
  const [showForm, setShowForm] = useState(false);

  const aktif = periods.filter(p => p.status === 'Aktif').length;
  const totalActive = periods.filter(p => p.status === 'Aktif').reduce((s, r) => s + r.total, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#06b6d4,#0891b2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📅</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Periode Anggaran</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Budgeting · Manajemen Periode Anggaran</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg,#06b6d4,#0891b2)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          + Buat Periode Baru
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Periode', value: periods.length, icon: '📋', color: '#06b6d4' },
          { label: 'Periode Aktif', value: aktif, icon: '✅', color: '#16a34a' },
          { label: 'Total Anggaran Aktif', value: fmt(totalActive), icon: '💰', color: '#6366f1' },
          { label: 'Draft Menunggu', value: periods.filter(p => p.status === 'Draft').length, icon: '⏳', color: '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: typeof c.value === 'number' ? 26 : 17, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, marginBottom: 24, border: '1.5px solid #06b6d420', boxShadow: '0 2px 12px rgba(6,182,212,0.08)' }}>
          <h3 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>📅 Buat Periode Anggaran Baru</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {['Nama Periode', 'Tanggal Mulai', 'Tanggal Selesai', 'Total Anggaran (Rp)', 'Keterangan', 'Disetujui Oleh'].map((lbl, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>{lbl}</label>
                <input type={lbl.includes('Tanggal') ? 'date' : lbl.includes('Total') ? 'number' : 'text'} placeholder={lbl} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button style={{ background: '#06b6d4', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Simpan</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Batal</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID Periode', 'Nama Periode', 'Tanggal Mulai', 'Tanggal Selesai', 'Total Anggaran', 'Revisi', 'Disetujui', 'Status', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((p) => {
                const sc = statusColor[p.status];
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#06b6d4', fontWeight: 500 }}>{p.id}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 600, color: '#0f172a' }}>{p.nama}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{p.mulai}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{p.selesai}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{fmt(p.total)}</td>
                    <td style={{ padding: '13px 16px', textAlign: 'center' }}><span style={{ background: p.revisi > 0 ? '#fff7e6' : '#f1f5f9', color: p.revisi > 0 ? '#92580a' : '#94a3b8', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>Rev {p.revisi}</span></td>
                    <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12 }}>{p.disetujui}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', gap: 5 }}>
                        <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Detail</button>
                        {p.status !== 'Ditutup' && <button style={{ background: '#fef2f2', color: '#b91c1c', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Tutup</button>}
                      </div>
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