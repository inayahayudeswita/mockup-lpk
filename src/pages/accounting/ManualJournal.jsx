import React, { useState } from 'react';

const dummyJournals = [
  { id: 'JNL-2025-001', tanggal: '2025-01-05', keterangan: 'Pembayaran SPP Siswa Batch 12', debit: 'Kas', kredit: 'Pendapatan SPP', nominal: 15000000, status: 'Disetujui', dibuat: 'Rina Susanti' },
  { id: 'JNL-2025-002', tanggal: '2025-01-08', keterangan: 'Pembelian Modul Pelatihan Bahasa Jepang', debit: 'Biaya Pelatihan', kredit: 'Kas', nominal: 3500000, status: 'Disetujui', dibuat: 'Budi Hartono' },
  { id: 'JNL-2025-003', tanggal: '2025-01-12', keterangan: 'Pembayaran Gaji Instruktur Bahasa Jepang', debit: 'Biaya Gaji', kredit: 'Kas', nominal: 8000000, status: 'Disetujui', dibuat: 'Rina Susanti' },
  { id: 'JNL-2025-004', tanggal: '2025-01-15', keterangan: 'Pendapatan Fee Penempatan Kerja ke Jepang', debit: 'Piutang Usaha', kredit: 'Pendapatan Fee', nominal: 22500000, status: 'Pending', dibuat: 'Agus Prasetyo' },
  { id: 'JNL-2025-005', tanggal: '2025-01-18', keterangan: 'Biaya Pengurusan Visa Siswa', debit: 'Biaya Visa & Dokumen', kredit: 'Kas', nominal: 4200000, status: 'Disetujui', dibuat: 'Budi Hartono' },
  { id: 'JNL-2025-006', tanggal: '2025-01-20', keterangan: 'Koreksi Jurnal Biaya Operasional', debit: 'Biaya Operasional', kredit: 'Biaya Administrasi', nominal: 750000, status: 'Draft', dibuat: 'Rina Susanti' },
  { id: 'JNL-2025-007', tanggal: '2025-01-25', keterangan: 'Penerimaan DP Kontrak Mitra Jepang', debit: 'Kas', kredit: 'Pendapatan Diterima di Muka', nominal: 30000000, status: 'Disetujui', dibuat: 'Agus Prasetyo' },
];

const statusColor = {
  'Disetujui': { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  'Pending': { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
  'Draft': { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' },
};

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function ManualJournal() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('Semua');

  const filtered = dummyJournals.filter(j =>
    (filter === 'Semua' || j.status === filter) &&
    (j.keterangan.toLowerCase().includes(search.toLowerCase()) || j.id.toLowerCase().includes(search.toLowerCase()))
  );

  const total = dummyJournals.reduce((a, b) => a + b.nominal, 0);
  const disetujui = dummyJournals.filter(j => j.status === 'Disetujui').reduce((a, b) => a + b.nominal, 0);
  const pending = dummyJournals.filter(j => j.status === 'Pending').length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📒</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Jurnal Manual</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Akuntansi · Periode Januari 2025</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          + Tambah Jurnal
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Transaksi', value: dummyJournals.length + ' entri', sub: 'Januari 2025', icon: '📋', color: '#3b82f6' },
          { label: 'Total Nominal', value: fmt(total), sub: 'Semua jurnal', icon: '💰', color: '#0ea5e9' },
          { label: 'Menunggu Persetujuan', value: pending + ' jurnal', sub: 'Perlu ditindaklanjuti', icon: '⏳', color: '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</p>
                <p style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
                <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{c.sub}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Input (toggle) */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, marginBottom: 24, border: '1.5px solid #3b82f620', boxShadow: '0 2px 12px rgba(59,130,246,0.08)' }}>
          <h3 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>✏️ Tambah Jurnal Baru</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {['Tanggal', 'Keterangan', 'Akun Debit', 'Akun Kredit', 'Nominal', 'Dibuat Oleh'].map((lbl, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>{lbl}</label>
                <input type={lbl === 'Tanggal' ? 'date' : lbl === 'Nominal' ? 'number' : 'text'} placeholder={lbl} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Simpan Draft</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '9px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Batal</button>
          </div>
        </div>
      )}

      {/* Filter & Search */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Cari jurnal..." style={{ flex: 1, minWidth: 200, padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
          {['Semua', 'Disetujui', 'Pending', 'Draft'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: filter === s ? '#3b82f6' : '#f1f5f9', color: filter === s ? '#fff' : '#64748b' }}>{s}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['No. Jurnal', 'Tanggal', 'Keterangan', 'Akun Debit', 'Akun Kredit', 'Nominal', 'Status', 'Dibuat'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((j, i) => {
                const sc = statusColor[j.status];
                return (
                  <tr key={j.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#3b82f6', fontWeight: 500 }}>{j.id}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{j.tanggal}</td>
                    <td style={{ padding: '13px 16px', color: '#0f172a', fontWeight: 500, maxWidth: 220 }}>{j.keterangan}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{j.debit}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{j.kredit}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 600, color: '#0f172a', fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{fmt(j.nominal)}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
                        {j.status}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#64748b' }}>{j.dibuat}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>Menampilkan {filtered.length} dari {dummyJournals.length} entri</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['←', '1', '2', '→'].map(p => <button key={p} style={{ width: 30, height: 30, border: '1px solid #e2e8f0', borderRadius: 6, background: p === '1' ? '#3b82f6' : '#fff', color: p === '1' ? '#fff' : '#475569', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}