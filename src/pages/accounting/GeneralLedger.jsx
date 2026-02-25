import React, { useState } from 'react';

const accounts = [
  { kode: '1-1001', nama: 'Kas', kategori: 'Aset', saldoAwal: 45000000, mutasiDebit: 52500000, mutasiKredit: 38200000, saldoAkhir: 59300000 },
  { kode: '1-1002', nama: 'Kas di Bank BCA', kategori: 'Aset', saldoAwal: 120000000, mutasiDebit: 85000000, mutasiKredit: 62000000, saldoAkhir: 143000000 },
  { kode: '1-1101', nama: 'Piutang Usaha', kategori: 'Aset', saldoAwal: 35000000, mutasiDebit: 22500000, mutasiKredit: 15000000, saldoAkhir: 42500000 },
  { kode: '1-2001', nama: 'Peralatan Kantor', kategori: 'Aset', saldoAwal: 80000000, mutasiDebit: 12000000, mutasiKredit: 0, saldoAkhir: 92000000 },
  { kode: '1-2901', nama: 'Akumulasi Penyusutan', kategori: 'Aset', saldoAwal: -15000000, mutasiDebit: 0, mutasiKredit: 2800000, saldoAkhir: -17800000 },
  { kode: '2-1001', nama: 'Utang Usaha', kategori: 'Liabilitas', saldoAwal: -18000000, mutasiDebit: 8000000, mutasiKredit: 5000000, saldoAkhir: -15000000 },
  { kode: '2-1101', nama: 'Pendapatan Diterima di Muka', kategori: 'Liabilitas', saldoAwal: -10000000, mutasiDebit: 0, mutasiKredit: 30000000, saldoAkhir: -40000000 },
  { kode: '3-1001', nama: 'Modal Disetor', kategori: 'Ekuitas', saldoAwal: -200000000, mutasiDebit: 0, mutasiKredit: 0, saldoAkhir: -200000000 },
  { kode: '4-1001', nama: 'Pendapatan SPP', kategori: 'Pendapatan', saldoAwal: 0, mutasiDebit: 0, mutasiKredit: 15000000, saldoAkhir: -15000000 },
  { kode: '4-1002', nama: 'Pendapatan Fee Penempatan', kategori: 'Pendapatan', saldoAwal: 0, mutasiDebit: 0, mutasiKredit: 22500000, saldoAkhir: -22500000 },
  { kode: '5-1001', nama: 'Biaya Gaji', kategori: 'Beban', saldoAwal: 0, mutasiDebit: 40000000, mutasiKredit: 0, saldoAkhir: 40000000 },
  { kode: '5-1002', nama: 'Biaya Pelatihan', kategori: 'Beban', saldoAwal: 0, mutasiDebit: 3500000, mutasiKredit: 0, saldoAkhir: 3500000 },
  { kode: '5-1003', nama: 'Biaya Visa & Dokumen', kategori: 'Beban', saldoAwal: 0, mutasiDebit: 4200000, mutasiKredit: 0, saldoAkhir: 4200000 },
  { kode: '5-1004', nama: 'Biaya Penyusutan', kategori: 'Beban', saldoAwal: 0, mutasiDebit: 2800000, mutasiKredit: 0, saldoAkhir: 2800000 },
];

const fmt = (n) => {
  const abs = Math.abs(n).toLocaleString('id-ID');
  return (n < 0 ? '(' : '') + 'Rp ' + abs + (n < 0 ? ')' : '');
};

const kategoriColor = {
  'Aset': { bg: '#eff6ff', text: '#1d4ed8' },
  'Liabilitas': { bg: '#fef2f2', text: '#b91c1c' },
  'Ekuitas': { bg: '#f0fdf4', text: '#166534' },
  'Pendapatan': { bg: '#f0fdfa', text: '#0e7a5c' },
  'Beban': { bg: '#fff7ed', text: '#c2410c' },
};

export default function GeneralLedger() {
  const [search, setSearch] = useState('');
  const [filterKat, setFilterKat] = useState('Semua');

  const filtered = accounts.filter(a =>
    (filterKat === 'Semua' || a.kategori === filterKat) &&
    (a.nama.toLowerCase().includes(search.toLowerCase()) || a.kode.includes(search))
  );

  const totalDebit = accounts.reduce((s, a) => s + a.mutasiDebit, 0);
  const totalKredit = accounts.reduce((s, a) => s + a.mutasiKredit, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📊</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Buku Besar</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Akuntansi · Periode Januari 2025</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📥 Ekspor Excel</button>
          <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>🖨 Cetak</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Akun', value: accounts.length, icon: '#', color: '#0ea5e9' },
          { label: 'Total Mutasi Debit', value: fmt(totalDebit), icon: '↑', color: '#16a34a' },
          { label: 'Total Mutasi Kredit', value: fmt(totalKredit), icon: '↓', color: '#dc2626' },
          { label: 'Selisih', value: fmt(totalDebit - totalKredit), icon: '=', color: totalDebit === totalKredit ? '#16a34a' : '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a', fontFamily: "'DM Mono', monospace" }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: c.color }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Cari akun..." style={{ flex: 1, minWidth: 200, padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
          {['Semua', 'Aset', 'Liabilitas', 'Ekuitas', 'Pendapatan', 'Beban'].map(k => (
            <button key={k} onClick={() => setFilterKat(k)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: filterKat === k ? '#0ea5e9' : '#f1f5f9', color: filterKat === k ? '#fff' : '#64748b' }}>{k}</button>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Kode Akun', 'Nama Akun', 'Kategori', 'Saldo Awal', 'Mutasi Debit', 'Mutasi Kredit', 'Saldo Akhir'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: h.includes('Saldo') || h.includes('Mutasi') ? 'right' : 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const kc = kategoriColor[a.kategori] || {};
                return (
                  <tr key={a.kode} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#0ea5e9', fontWeight: 500 }}>{a.kode}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 600, color: '#0f172a' }}>{a.nama}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: kc.bg, color: kc.text, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{a.kategori}</span>
                    </td>
                    <td style={{ padding: '13px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#475569' }}>{fmt(a.saldoAwal)}</td>
                    <td style={{ padding: '13px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#16a34a', fontWeight: 600 }}>{a.mutasiDebit > 0 ? fmt(a.mutasiDebit) : '-'}</td>
                    <td style={{ padding: '13px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#dc2626', fontWeight: 600 }}>{a.mutasiKredit > 0 ? fmt(a.mutasiKredit) : '-'}</td>
                    <td style={{ padding: '13px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{fmt(a.saldoAkhir)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                <td colSpan={3} style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a', fontSize: 13 }}>Total</td>
                <td style={{ padding: '12px 16px' }} />
                <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontWeight: 700, color: '#16a34a', fontSize: 13 }}>{fmt(totalDebit)}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: "'DM Mono', monospace", fontWeight: 700, color: '#dc2626', fontSize: 13 }}>{fmt(totalKredit)}</td>
                <td style={{ padding: '12px 16px' }} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}