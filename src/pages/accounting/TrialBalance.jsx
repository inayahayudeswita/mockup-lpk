import React, { useState } from 'react';

const trialData = [
  { kode: '1-1001', nama: 'Kas', debit: 59300000, kredit: 0 },
  { kode: '1-1002', nama: 'Kas di Bank BCA', debit: 143000000, kredit: 0 },
  { kode: '1-1003', nama: 'Kas di Bank Mandiri', debit: 28500000, kredit: 0 },
  { kode: '1-1101', nama: 'Piutang Usaha', debit: 42500000, kredit: 0 },
  { kode: '1-1201', nama: 'Perlengkapan Kantor', debit: 5200000, kredit: 0 },
  { kode: '1-2001', nama: 'Peralatan Kantor', debit: 92000000, kredit: 0 },
  { kode: '1-2901', nama: 'Akumulasi Penyusutan Peralatan', debit: 0, kredit: 17800000 },
  { kode: '2-1001', nama: 'Utang Usaha', debit: 0, kredit: 15000000 },
  { kode: '2-1002', nama: 'Utang Pajak', debit: 0, kredit: 3200000 },
  { kode: '2-1101', nama: 'Pendapatan Diterima di Muka', debit: 0, kredit: 40000000 },
  { kode: '3-1001', nama: 'Modal Disetor', debit: 0, kredit: 200000000 },
  { kode: '3-2001', nama: 'Laba Ditahan', debit: 0, kredit: 52000000 },
  { kode: '4-1001', nama: 'Pendapatan SPP', debit: 0, kredit: 15000000 },
  { kode: '4-1002', nama: 'Pendapatan Fee Penempatan', debit: 0, kredit: 22500000 },
  { kode: '4-1003', nama: 'Pendapatan Lain-lain', debit: 0, kredit: 2800000 },
  { kode: '5-1001', nama: 'Biaya Gaji & Tunjangan', debit: 40000000, kredit: 0 },
  { kode: '5-1002', nama: 'Biaya Pelatihan & Modul', debit: 3500000, kredit: 0 },
  { kode: '5-1003', nama: 'Biaya Visa & Dokumen', debit: 4200000, kredit: 0 },
  { kode: '5-1004', nama: 'Biaya Penyusutan', debit: 2800000, kredit: 0 },
  { kode: '5-1005', nama: 'Biaya Operasional Kantor', debit: 6500000, kredit: 0 },
  { kode: '5-1006', nama: 'Biaya Marketing & Promosi', debit: 8900000, kredit: 0 },
  { kode: '5-1007', nama: 'Biaya Sertifikasi JLPT', debit: 6750000, kredit: 0 },
  { kode: '5-1008', nama: 'Biaya Asuransi Siswa', debit: 11200000, kredit: 0 },
];

const fmt = (n) => n > 0 ? 'Rp ' + n.toLocaleString('id-ID') : '-';

export default function TrialBalance() {
  const [period, setPeriod] = useState('Januari 2025');

  const totalDebit = trialData.reduce((s, r) => s + r.debit, 0);
  const totalKredit = trialData.reduce((s, r) => s + r.kredit, 0);
  const balanced = totalDebit === totalKredit;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#10b981,#047857)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>⚖️</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Neraca Saldo</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Akuntansi · {period}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff' }}>
            {['Januari 2025', 'Desember 2024', 'November 2024'].map(p => <option key={p}>{p}</option>)}
          </select>
          <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📥 Ekspor</button>
        </div>
      </div>

      {/* Balance status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Debit</p>
          <p style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#16a34a', fontFamily: "'DM Mono', monospace" }}>Rp {totalDebit.toLocaleString('id-ID')}</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Kredit</p>
          <p style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#dc2626', fontFamily: "'DM Mono', monospace" }}>Rp {totalKredit.toLocaleString('id-ID')}</p>
        </div>
        <div style={{ background: balanced ? '#e6f9f0' : '#fef2f2', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: `1.5px solid ${balanced ? '#86efac' : '#fca5a5'}` }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, color: balanced ? '#0e7a4d' : '#b91c1c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status Neraca</p>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: balanced ? '#0e7a4d' : '#b91c1c' }}>
            {balanced ? '✓ Seimbang' : '⚠ Tidak Seimbang'}
          </p>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Daftar Akun</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{trialData.length} akun · Periode {period}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>Kode Akun</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>Nama Akun</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>Debit (Rp)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>Kredit (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {trialData.map((r, i) => (
                <tr key={r.kode} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }} onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'} onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafafa'}>
                  <td style={{ padding: '11px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#10b981', fontWeight: 500 }}>{r.kode}</td>
                  <td style={{ padding: '11px 16px', color: '#0f172a', fontWeight: 500 }}>{r.nama}</td>
                  <td style={{ padding: '11px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: 12, color: r.debit > 0 ? '#16a34a' : '#cbd5e1', fontWeight: r.debit > 0 ? 600 : 400 }}>{fmt(r.debit)}</td>
                  <td style={{ padding: '11px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: 12, color: r.kredit > 0 ? '#dc2626' : '#cbd5e1', fontWeight: r.kredit > 0 ? 600 : 400 }}>{fmt(r.kredit)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                <td colSpan={2} style={{ padding: '14px 16px', fontWeight: 700, fontSize: 13, color: '#0f172a' }}>TOTAL</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 14, color: '#16a34a' }}>Rp {totalDebit.toLocaleString('id-ID')}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 14, color: '#dc2626' }}>Rp {totalKredit.toLocaleString('id-ID')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}