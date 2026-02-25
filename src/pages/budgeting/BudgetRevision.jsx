import React, { useState } from 'react';

const revisions = [
  { id: 'REV-2025-001', tanggal: '2025-01-18', dept: 'Operasional Penempatan', pos: 'Biaya Visa & Imigrasi', alasan: 'Kenaikan biaya visa Jepang per Januari 2025 sebesar 25%', sebelum: 145000000, sesudah: 181250000, selisih: 36250000, status: 'Disetujui', diproses: 'Direktur Keuangan' },
  { id: 'REV-2025-002', tanggal: '2025-01-22', dept: 'Rekrutmen & Seleksi', pos: 'Iklan & Promosi Rekrutmen', alasan: 'Penambahan paket iklan digital untuk perluasan area rekrutmen ke Sulawesi', sebelum: 82000000, sesudah: 118000000, selisih: 36000000, status: 'Pending', diproses: '-' },
  { id: 'REV-2025-003', tanggal: '2025-01-25', dept: 'IT & Sistem Informasi', pos: 'Langganan Software & SaaS', alasan: 'Penambahan lisensi sistem manajemen LPK modul baru', sebelum: 60000000, sesudah: 90000000, selisih: 30000000, status: 'Pending', diproses: '-' },
  { id: 'REV-2025-004', tanggal: '2025-01-10', dept: 'Administrasi & Umum', pos: 'Biaya Akomodasi Tamu', alasan: 'Efisiensi: anggaran terlalu besar, dipangkas', sebelum: 24000000, sesudah: 14000000, selisih: -10000000, status: 'Disetujui', diproses: 'Direktur Keuangan' },
  { id: 'REV-2025-005', tanggal: '2025-01-28', dept: 'Operasional Akademik', pos: 'Biaya Sertifikasi Tambahan', alasan: 'Penambahan siswa batch 13 melebihi proyeksi awal', sebelum: 100000000, sesudah: 130000000, selisih: 30000000, status: 'Ditolak', diproses: 'Direktur Keuangan' },
];

const fmt = (n) => 'Rp ' + Math.abs(n).toLocaleString('id-ID');
const statusColor = {
  'Disetujui': { bg: '#e6f9f0', text: '#0e7a4d' },
  'Pending': { bg: '#fff7e6', text: '#92580a' },
  'Ditolak': { bg: '#fef2f2', text: '#b91c1c' },
};

export default function BudgetRevision() {
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = revisions.filter(r => filterStatus === 'Semua' || r.status === filterStatus);
  const totalTambah = revisions.filter(r => r.selisih > 0 && r.status === 'Disetujui').reduce((s, r) => s + r.selisih, 0);
  const totalKurang = Math.abs(revisions.filter(r => r.selisih < 0 && r.status === 'Disetujui').reduce((s, r) => s + r.selisih, 0));

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#ec4899,#be185d)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>✏️</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Revisi Anggaran</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Budgeting · Tahun Anggaran 2025</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg,#ec4899,#be185d)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          + Ajukan Revisi
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Revisi', value: revisions.length, icon: '📝', color: '#ec4899' },
          { label: 'Menunggu Persetujuan', value: revisions.filter(r => r.status === 'Pending').length, icon: '⏳', color: '#f59e0b' },
          { label: 'Tambahan Disetujui', value: fmt(totalTambah), icon: '↑', color: '#dc2626' },
          { label: 'Pengurangan Disetujui', value: fmt(totalKurang), icon: '↓', color: '#16a34a' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: typeof c.value === 'number' ? 26 : 15, fontWeight: 700, color: '#0f172a', fontFamily: typeof c.value !== 'number' ? "'DM Mono', monospace" : 'inherit' }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: c.color }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, marginBottom: 24, border: '1.5px solid #ec489920', boxShadow: '0 2px 12px rgba(236,72,153,0.08)' }}>
          <h3 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>✏️ Ajukan Revisi Anggaran</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {['Tanggal Pengajuan', 'Departemen', 'Pos Anggaran', 'Nominal Sebelum (Rp)', 'Nominal Sesudah (Rp)', 'Alasan Revisi'].map((lbl, i) => (
              <div key={i} style={{ gridColumn: lbl === 'Alasan Revisi' ? '1 / -1' : 'auto' }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>{lbl}</label>
                {lbl === 'Alasan Revisi' ? (
                  <textarea placeholder={lbl} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'none', height: 80 }} />
                ) : (
                  <input type={lbl.includes('Nominal') ? 'number' : lbl.includes('Tanggal') ? 'date' : 'text'} placeholder={lbl} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button style={{ background: '#ec4899', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Kirim Pengajuan</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Batal</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 10 }}>
          {['Semua', 'Disetujui', 'Pending', 'Ditolak'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filterStatus === s ? '#ec4899' : '#f1f5f9', color: filterStatus === s ? '#fff' : '#64748b' }}>{s}</button>
          ))}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID Revisi', 'Tgl', 'Dept', 'Pos Anggaran', 'Sebelum', 'Sesudah', 'Selisih', 'Alasan', 'Status', 'Diproses'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const sc = statusColor[r.status];
                return (
                  <tr key={r.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#ec4899', fontWeight: 500 }}>{r.id}</td>
                    <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12 }}>{r.tanggal}</td>
                    <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12 }}>{r.dept}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 500, color: '#0f172a', maxWidth: 160 }}>{r.pos}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#475569' }}>{fmt(r.sebelum)}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{fmt(r.sesudah)}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: r.selisih > 0 ? '#dc2626' : '#16a34a' }}>
                      {r.selisih > 0 ? '+' : '-'}{fmt(r.selisih)}
                    </td>
                    <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12, maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={r.alasan}>{r.alasan}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{r.status}</span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12 }}>{r.diproses}</td>
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