import React, { useState } from 'react';

const pendingBudgets = [
  { id: 'BADJ-2025-001', nama: 'Anggaran Rekrutmen Batch 14', dept: 'Rekrutmen & Seleksi', nominal: 95000000, pengaju: 'Manajer Rekrutmen', tgl: '2025-01-20', jenis: 'Anggaran Baru', prioritas: 'Tinggi', catatan: 'Dibutuhkan untuk perluasan ke wilayah Jawa Barat' },
  { id: 'BADJ-2025-002', nama: 'Tambahan Anggaran Visa Q1', dept: 'Operasional Penempatan', nominal: 35000000, pengaju: 'Koordinator Penempatan', tgl: '2025-01-22', jenis: 'Penambahan', prioritas: 'Tinggi', catatan: 'Kenaikan biaya visa dari Kedubes Jepang' },
  { id: 'BADJ-2025-003', nama: 'Pengadaan Peralatan Lab Bahasa', dept: 'Operasional Akademik', nominal: 48000000, pengaju: 'Kepala Akademik', tgl: '2025-01-25', jenis: 'Anggaran Baru', prioritas: 'Normal', catatan: 'Lab bahasa lama sudah tidak memadai' },
  { id: 'BADJ-2025-004', nama: 'Biaya Event Pameran Pendidikan', dept: 'Rekrutmen & Seleksi', nominal: 22000000, pengaju: 'Manajer Marketing', tgl: '2025-01-27', jenis: 'Anggaran Baru', prioritas: 'Rendah', catatan: 'Partisipasi di Education Expo Bandung 2025' },
];

const historyBudgets = [
  { id: 'BADJ-2024-018', nama: 'Anggaran Gaji Instruktur Tambahan', dept: 'Operasional Akademik', nominal: 60000000, status: 'Disetujui', diproses: 'Direktur Keuangan', tgl_proses: '2024-12-15' },
  { id: 'BADJ-2024-019', nama: 'Pengadaan Seragam Siswa Batch 13', dept: 'Administrasi', nominal: 18000000, status: 'Disetujui', diproses: 'Direktur Keuangan', tgl_proses: '2024-12-18' },
  { id: 'BADJ-2024-020', nama: 'Biaya Study Tour ke Jepang', dept: 'Operasional Akademik', nominal: 250000000, status: 'Ditolak', diproses: 'Direktur Utama', tgl_proses: '2024-12-20' },
];

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');
const prioritasColor = { 'Tinggi': { bg: '#fef2f2', text: '#b91c1c' }, 'Normal': { bg: '#f0f9ff', text: '#0369a1' }, 'Rendah': { bg: '#f0fdf4', text: '#166534' } };
const jenisColor = { 'Anggaran Baru': { bg: '#eff6ff', text: '#1d4ed8' }, 'Penambahan': { bg: '#fff7ed', text: '#c2410c' } };

export default function BudgetApproval() {
  const [tab, setTab] = useState('pending');
  const [detail, setDetail] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#f43f5e,#be123c)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>🔖</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Persetujuan Anggaran</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Budgeting · Pengajuan Menunggu Tindakan</p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Menunggu Review', value: pendingBudgets.length, icon: '⏳', color: '#f59e0b' },
          { label: 'Total Nilai Pengajuan', value: 'Rp ' + (pendingBudgets.reduce((s, r) => s + r.nominal, 0) / 1000000).toFixed(0) + ' Jt', icon: '💰', color: '#f43f5e' },
          { label: 'Prioritas Tinggi', value: pendingBudgets.filter(b => b.prioritas === 'Tinggi').length, icon: '🔴', color: '#dc2626' },
          { label: 'Disetujui Bulan Ini', value: historyBudgets.filter(h => h.status === 'Disetujui').length, icon: '✅', color: '#16a34a' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: typeof c.value === 'number' ? 26 : 16, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700 }}>{detail.nama}</h3>
            <p style={{ margin: '0 0 20px', fontSize: 12, color: '#94a3b8' }}>{detail.id} · {detail.tgl}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[['Departemen', detail.dept], ['Jenis', detail.jenis], ['Pengaju', detail.pengaju], ['Nominal', fmt(detail.nominal)]].map(([k, v]) => (
                <div key={k} style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{k}</p>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{v}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px', marginBottom: 16 }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Catatan Pengajuan</p>
              <p style={{ margin: 0, fontSize: 13, color: '#0f172a' }}>{detail.catatan}</p>
            </div>
            <textarea placeholder="Catatan persetujuan / penolakan..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: 13, outline: 'none', resize: 'none', height: 80, boxSizing: 'border-box', marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ flex: 1, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>✓ Setujui</button>
              <button style={{ flex: 1, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>✗ Tolak</button>
              <button onClick={() => setDetail(null)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: '0 20px' }}>
          {[{ key: 'pending', label: `⏳ Pending (${pendingBudgets.length})` }, { key: 'history', label: '📋 Riwayat' }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '14px 18px', border: 'none', background: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: tab === t.key ? '#f43f5e' : '#94a3b8', borderBottom: tab === t.key ? '2px solid #f43f5e' : '2px solid transparent', marginBottom: -1 }}>{t.label}</button>
          ))}
        </div>

        {tab === 'pending' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID', 'Nama Pengajuan', 'Departemen', 'Jenis', 'Nominal', 'Pengaju', 'Tgl Pengajuan', 'Prioritas', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingBudgets.map((b) => {
                const pc = prioritasColor[b.prioritas];
                const jc = jenisColor[b.jenis];
                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#f43f5e', fontWeight: 500 }}>{b.id}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 600, color: '#0f172a', maxWidth: 180 }}>{b.nama}</td>
                    <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12 }}>{b.dept}</td>
                    <td style={{ padding: '13px 16px' }}><span style={{ background: jc.bg, color: jc.text, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{b.jenis}</span></td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{fmt(b.nominal)}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{b.pengaju}</td>
                    <td style={{ padding: '13px 16px', color: '#64748b' }}>{b.tgl}</td>
                    <td style={{ padding: '13px 16px' }}><span style={{ background: pc.bg, color: pc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{b.prioritas}</span></td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', gap: 5 }}>
                        <button onClick={() => setDetail(b)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Review</button>
                        <button style={{ background: '#e6f9f0', color: '#0e7a4d', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>✓</button>
                        <button style={{ background: '#fef2f2', color: '#b91c1c', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>✗</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {tab === 'history' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID', 'Nama Pengajuan', 'Departemen', 'Nominal', 'Diproses Oleh', 'Tgl Proses', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historyBudgets.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{b.id}</td>
                  <td style={{ padding: '13px 16px', fontWeight: 500, color: '#0f172a' }}>{b.nama}</td>
                  <td style={{ padding: '13px 16px', color: '#475569' }}>{b.dept}</td>
                  <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{fmt(b.nominal)}</td>
                  <td style={{ padding: '13px 16px', color: '#475569' }}>{b.diproses}</td>
                  <td style={{ padding: '13px 16px', color: '#64748b' }}>{b.tgl_proses}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ background: b.status === 'Disetujui' ? '#e6f9f0' : '#fef2f2', color: b.status === 'Disetujui' ? '#0e7a4d' : '#b91c1c', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}