import React, { useState } from 'react';

const pendapatan = [
  { nama: 'Pendapatan SPP Siswa', jan: 15000000, feb: 18000000, mar: 16500000 },
  { nama: 'Fee Penempatan Kerja ke Jepang', jan: 22500000, feb: 45000000, mar: 30000000 },
  { nama: 'Pendapatan Tes & Seleksi', jan: 4500000, feb: 3000000, mar: 6000000 },
  { nama: 'Pendapatan Sertifikasi JLPT', jan: 0, feb: 7500000, mar: 0 },
  { nama: 'Pendapatan Lain-lain', jan: 2800000, feb: 1500000, mar: 2200000 },
];

const beban = [
  { nama: 'Biaya Gaji & Tunjangan Staf', jan: 40000000, feb: 40000000, mar: 42000000 },
  { nama: 'Biaya Gaji Instruktur', jan: 8000000, feb: 8000000, mar: 8000000 },
  { nama: 'Biaya Pelatihan & Modul', jan: 3500000, feb: 4200000, mar: 3800000 },
  { nama: 'Biaya Visa & Pengurusan Dokumen', jan: 4200000, feb: 8400000, mar: 5600000 },
  { nama: 'Biaya Sertifikasi Siswa', jan: 6750000, feb: 0, mar: 6750000 },
  { nama: 'Biaya Asuransi Siswa', jan: 11200000, feb: 22400000, mar: 11200000 },
  { nama: 'Biaya Marketing & Promosi', jan: 8900000, feb: 5000000, mar: 7500000 },
  { nama: 'Biaya Operasional Kantor', jan: 6500000, feb: 6500000, mar: 6500000 },
  { nama: 'Biaya Penyusutan', jan: 2800000, feb: 2800000, mar: 2800000 },
];

const fmt = (n) => 'Rp ' + Math.abs(n).toLocaleString('id-ID');
const months = ['jan', 'feb', 'mar'];
const monthLabels = { jan: 'Jan 2025', feb: 'Feb 2025', mar: 'Mar 2025' };

export default function ProfitLoss() {
  const [month, setMonth] = useState('jan');

  const totalPendapatan = pendapatan.reduce((s, r) => s + r[month], 0);
  const totalBeban = beban.reduce((s, r) => s + r[month], 0);
  const labaKotor = totalPendapatan - totalBeban;
  const pajak = Math.max(0, labaKotor * 0.11);
  const labaBersih = labaKotor - pajak;

  const margin = totalPendapatan > 0 ? ((labaBersih / totalPendapatan) * 100).toFixed(1) : 0;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#f97316,#ea580c)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📈</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Laporan Laba Rugi</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Akuntansi · {monthLabels[month]}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {months.map(m => (
            <button key={m} onClick={() => setMonth(m)} style={{ padding: '9px 16px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer', background: month === m ? '#f97316' : '#f1f5f9', color: month === m ? '#fff' : '#64748b' }}>{monthLabels[m]}</button>
          ))}
          <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📥 Ekspor</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Pendapatan', value: fmt(totalPendapatan), change: '+12%', up: true, color: '#16a34a' },
          { label: 'Total Beban', value: fmt(totalBeban), change: '+5%', up: false, color: '#dc2626' },
          { label: labaBersih >= 0 ? 'Laba Bersih' : 'Rugi Bersih', value: fmt(labaBersih), change: labaBersih >= 0 ? '+8%' : '-', up: labaBersih >= 0, color: labaBersih >= 0 ? '#16a34a' : '#dc2626' },
          { label: 'Margin Laba', value: margin + '%', change: 'vs bulan lalu', up: Number(margin) > 0, color: Number(margin) > 0 ? '#f97316' : '#dc2626' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
            <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: c.color, fontFamily: "'DM Mono', monospace" }}>{c.value}</p>
            <p style={{ margin: 0, fontSize: 12, color: c.up ? '#16a34a' : '#dc2626' }}>{c.up ? '▲' : '▼'} {c.change}</p>
          </div>
        ))}
      </div>

      {/* PL Report */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#0f172a' }}>LPK SIMPEL INDONESIA</p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>Laporan Laba Rugi · Periode {monthLabels[month]}</p>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Pendapatan */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '8px 12px', background: '#f0fdf4', borderRadius: 8, borderLeft: '4px solid #16a34a' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>PENDAPATAN</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#16a34a', fontFamily: "'DM Mono', monospace" }}>{fmt(totalPendapatan)}</span>
            </div>
            {pendapatan.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 12px 9px 24px', borderBottom: '1px dashed #f1f5f9' }}>
                <span style={{ color: '#475569', fontSize: 13 }}>{r.nama}</span>
                <span style={{ color: '#0f172a', fontWeight: 600, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{r[month] > 0 ? fmt(r[month]) : '-'}</span>
              </div>
            ))}
          </div>

          {/* Beban */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '8px 12px', background: '#fef2f2', borderRadius: 8, borderLeft: '4px solid #dc2626' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>BEBAN OPERASIONAL</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#dc2626', fontFamily: "'DM Mono', monospace" }}>{fmt(totalBeban)}</span>
            </div>
            {beban.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 12px 9px 24px', borderBottom: '1px dashed #f1f5f9' }}>
                <span style={{ color: '#475569', fontSize: 13 }}>{r.nama}</span>
                <span style={{ color: '#0f172a', fontWeight: 600, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{fmt(r[month])}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          {[
            { label: 'Laba (Rugi) Kotor', value: labaKotor, bg: '#f8fafc', bold: false },
            { label: 'Pajak Penghasilan (11%)', value: -pajak, bg: '#f8fafc', bold: false },
            { label: labaBersih >= 0 ? 'LABA BERSIH' : 'RUGI BERSIH', value: labaBersih, bg: labaBersih >= 0 ? '#e6f9f0' : '#fef2f2', bold: true },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 12px', background: s.bg, borderRadius: 8, marginBottom: 8, borderLeft: s.bold ? `4px solid ${labaBersih >= 0 ? '#16a34a' : '#dc2626'}` : 'none' }}>
              <span style={{ fontWeight: s.bold ? 700 : 600, fontSize: s.bold ? 15 : 13, color: '#0f172a' }}>{s.label}</span>
              <span style={{ fontWeight: 700, fontSize: s.bold ? 16 : 13, color: s.value >= 0 ? '#16a34a' : '#dc2626', fontFamily: "'DM Mono', monospace" }}>
                {s.value < 0 ? '(' : ''}{fmt(Math.abs(s.value))}{s.value < 0 ? ')' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}