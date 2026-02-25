import React, { useState } from 'react';

const pendingApprovals = [
  { id: 'JNL-2025-004', tanggal: '2025-01-15', keterangan: 'Pendapatan Fee Penempatan Kerja ke Jepang', nominal: 22500000, dibuat: 'Agus Prasetyo', divisi: 'Finance', prioritas: 'Tinggi' },
  { id: 'JNL-2025-008', tanggal: '2025-01-22', keterangan: 'Biaya Sertifikasi JLPT Siswa Batch 12', nominal: 6750000, dibuat: 'Dewi Rahayu', divisi: 'Akademik', prioritas: 'Normal' },
  { id: 'JNL-2025-009', tanggal: '2025-01-24', keterangan: 'Pembayaran Asuransi Siswa ke Jepang', nominal: 11200000, dibuat: 'Budi Hartono', divisi: 'Operasional', prioritas: 'Tinggi' },
  { id: 'JNL-2025-010', tanggal: '2025-01-27', keterangan: 'Pengembalian Dana Siswa Mengundurkan Diri', nominal: 3500000, dibuat: 'Rina Susanti', divisi: 'Finance', prioritas: 'Normal' },
  { id: 'JNL-2025-011', tanggal: '2025-01-29', keterangan: 'Biaya Marketing & Promosi Rekrutmen', nominal: 8900000, dibuat: 'Agus Prasetyo', divisi: 'Marketing', prioritas: 'Rendah' },
];

const history = [
  { id: 'JNL-2025-001', tanggal: '2025-01-05', keterangan: 'Pembayaran SPP Siswa Batch 12', nominal: 15000000, disetujui: 'Direktur Keuangan', tgl_setuju: '2025-01-06', status: 'Disetujui' },
  { id: 'JNL-2025-002', tanggal: '2025-01-08', keterangan: 'Pembelian Modul Pelatihan Bahasa Jepang', nominal: 3500000, disetujui: 'Direktur Keuangan', tgl_setuju: '2025-01-09', status: 'Disetujui' },
  { id: 'JNL-2025-003', tanggal: '2025-01-12', keterangan: 'Pembayaran Gaji Instruktur Bahasa Jepang', nominal: 8000000, disetujui: 'Direktur Keuangan', tgl_setuju: '2025-01-12', status: 'Disetujui' },
  { id: 'JNL-2025-006', tanggal: '2025-01-20', keterangan: 'Koreksi Jurnal Biaya Operasional', nominal: 750000, disetujui: '-', tgl_setuju: '2025-01-21', status: 'Ditolak' },
];

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');
const prioritasColor = { 'Tinggi': { bg: '#fef2f2', text: '#b91c1c' }, 'Normal': { bg: '#f0f9ff', text: '#0369a1' }, 'Rendah': { bg: '#f0fdf4', text: '#166534' } };

export default function JournalApproval() {
  const [selected, setSelected] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === pendingApprovals.length ? [] : pendingApprovals.map(j => j.id));

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>✅</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Persetujuan Jurnal</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Akuntansi · Menunggu Tindakan Anda</p>
        </div>
        {selected.length > 0 && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              ✓ Setujui ({selected.length})
            </button>
            <button style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              ✗ Tolak ({selected.length})
            </button>
          </div>
        )}
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Menunggu Persetujuan', value: pendingApprovals.length, icon: '⏳', color: '#f59e0b', sub: 'jurnal pending' },
          { label: 'Total Nilai Pending', value: fmt(pendingApprovals.reduce((a, b) => a + b.nominal, 0)), icon: '💰', color: '#3b82f6', sub: 'perlu disetujui' },
          { label: 'Prioritas Tinggi', value: pendingApprovals.filter(j => j.prioritas === 'Tinggi').length, icon: '🔴', color: '#dc2626', sub: 'segera ditangani' },
          { label: 'Disetujui Bulan Ini', value: history.filter(h => h.status === 'Disetujui').length, icon: '✅', color: '#16a34a', sub: 'transaksi' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: '0 0 2px', fontSize: typeof c.value === 'number' ? 26 : 16, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
                <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{c.sub}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs + Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: '0 20px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            {[{ key: 'pending', label: `⏳ Pending (${pendingApprovals.length})` }, { key: 'history', label: '📋 Riwayat' }].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: '14px 18px', border: 'none', background: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: activeTab === t.key ? '#f59e0b' : '#94a3b8', borderBottom: activeTab === t.key ? '2px solid #f59e0b' : '2px solid transparent', marginBottom: -1 }}>{t.label}</button>
            ))}
          </div>
        </div>

        {activeTab === 'pending' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '12px 16px' }}>
                  <input type="checkbox" checked={selected.length === pendingApprovals.length} onChange={toggleAll} />
                </th>
                {['No. Jurnal', 'Tanggal', 'Keterangan', 'Nominal', 'Dibuat Oleh', 'Divisi', 'Prioritas', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map((j) => {
                const pc = prioritasColor[j.prioritas];
                const isSelected = selected.includes(j.id);
                return (
                  <tr key={j.id} style={{ borderBottom: '1px solid #f8fafc', background: isSelected ? '#fefce8' : '' }} onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#f8fafc'; }} onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = ''; }}>
                    <td style={{ padding: '13px 16px' }}><input type="checkbox" checked={isSelected} onChange={() => toggleSelect(j.id)} /></td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#f59e0b', fontWeight: 500 }}>{j.id}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{j.tanggal}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 500, color: '#0f172a', maxWidth: 200 }}>{j.keterangan}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{fmt(j.nominal)}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{j.dibuat}</td>
                    <td style={{ padding: '13px 16px' }}><span style={{ background: '#f1f5f9', color: '#475569', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{j.divisi}</span></td>
                    <td style={{ padding: '13px 16px' }}><span style={{ background: pc.bg, color: pc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{j.prioritas}</span></td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={{ background: '#e6f9f0', color: '#0e7a4d', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>✓ Setuju</button>
                        <button style={{ background: '#fef2f2', color: '#b91c1c', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>✗ Tolak</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {activeTab === 'history' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['No. Jurnal', 'Tanggal', 'Keterangan', 'Nominal', 'Diproses Oleh', 'Tgl. Proses', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((j) => (
                <tr key={j.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#475569', fontWeight: 500 }}>{j.id}</td>
                  <td style={{ padding: '13px 16px', color: '#475569' }}>{j.tanggal}</td>
                  <td style={{ padding: '13px 16px', fontWeight: 500, color: '#0f172a', maxWidth: 200 }}>{j.keterangan}</td>
                  <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{fmt(j.nominal)}</td>
                  <td style={{ padding: '13px 16px', color: '#475569' }}>{j.disetujui}</td>
                  <td style={{ padding: '13px 16px', color: '#64748b' }}>{j.tgl_setuju}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ background: j.status === 'Disetujui' ? '#e6f9f0' : '#fef2f2', color: j.status === 'Disetujui' ? '#0e7a4d' : '#b91c1c', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{j.status}</span>
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