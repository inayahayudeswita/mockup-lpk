import React, { useState } from 'react';

const assets = {
  lancar: [
    { nama: 'Kas', saldo: 59300000 },
    { nama: 'Kas di Bank BCA', saldo: 143000000 },
    { nama: 'Kas di Bank Mandiri', saldo: 28500000 },
    { nama: 'Piutang Usaha', saldo: 42500000 },
    { nama: 'Piutang Lain-lain', saldo: 8200000 },
    { nama: 'Perlengkapan Kantor', saldo: 5200000 },
  ],
  tetap: [
    { nama: 'Peralatan Kantor', saldo: 92000000 },
    { nama: 'Inventaris Kelas', saldo: 45000000 },
    { nama: 'Kendaraan Operasional', saldo: 180000000 },
    { nama: 'Akumulasi Penyusutan', saldo: -17800000 },
  ],
};

const liabilities = {
  lancar: [
    { nama: 'Utang Usaha', saldo: 15000000 },
    { nama: 'Utang Pajak', saldo: 3200000 },
    { nama: 'Beban Akrual', saldo: 4500000 },
    { nama: 'Pendapatan Diterima di Muka', saldo: 40000000 },
  ],
  jangkaPanjang: [
    { nama: 'Utang Bank BCA', saldo: 120000000 },
    { nama: 'Utang Leasing Kendaraan', saldo: 85000000 },
  ],
};

const equity = [
  { nama: 'Modal Disetor', saldo: 200000000 },
  { nama: 'Laba Ditahan', saldo: 52000000 },
  { nama: 'Laba Bersih Periode Berjalan', saldo: 62200000 },
];

const fmt = (n) => (n < 0 ? '(' : '') + 'Rp ' + Math.abs(n).toLocaleString('id-ID') + (n < 0 ? ')' : '');

function Section({ title, items, color, total }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: color + '15', borderRadius: 6, borderLeft: `3px solid ${color}`, marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 12, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
        <span style={{ fontWeight: 700, fontSize: 12, color, fontFamily: "'DM Mono', monospace" }}>{fmt(total)}</span>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px 8px 20px', borderBottom: '1px dashed #f1f5f9' }}>
          <span style={{ color: '#475569', fontSize: 13 }}>{item.nama}</span>
          <span style={{ color: item.saldo < 0 ? '#dc2626' : '#0f172a', fontWeight: 600, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{fmt(item.saldo)}</span>
        </div>
      ))}
    </div>
  );
}

export default function BalanceSheet() {
  const [period, setPeriod] = useState('Januari 2025');

  const totalAsetLancar = assets.lancar.reduce((s, r) => s + r.saldo, 0);
  const totalAsetTetap = assets.tetap.reduce((s, r) => s + r.saldo, 0);
  const totalAset = totalAsetLancar + totalAsetTetap;

  const totalLiabLancar = liabilities.lancar.reduce((s, r) => s + r.saldo, 0);
  const totalLiabPanjang = liabilities.jangkaPanjang.reduce((s, r) => s + r.saldo, 0);
  const totalLiab = totalLiabLancar + totalLiabPanjang;

  const totalEquity = equity.reduce((s, r) => s + r.saldo, 0);
  const totalLiabEquity = totalLiab + totalEquity;
  const balanced = Math.abs(totalAset - totalLiabEquity) < 1;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#6366f1,#4f46e5)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>🏛</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Neraca Keuangan</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Akuntansi · Per {period}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff' }}>
            {['Januari 2025', 'Desember 2024'].map(p => <option key={p}>{p}</option>)}
          </select>
          <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📥 Ekspor</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Aset', value: fmt(totalAset), color: '#6366f1' },
          { label: 'Total Liabilitas', value: fmt(totalLiab), color: '#dc2626' },
          { label: 'Total Ekuitas', value: fmt(totalEquity), color: '#16a34a' },
          { label: 'Status Neraca', value: balanced ? '✓ Seimbang' : '⚠ Selisih', color: balanced ? '#16a34a' : '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: c.color, fontFamily: "'DM Mono', monospace" }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Balance Sheet - 2 columns */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0f172a' }}>LPK SIMPEL INDONESIA</p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>Neraca per {period}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {/* ASET */}
          <div style={{ padding: 24, borderRight: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, padding: '10px 12px', background: 'linear-gradient(90deg,#eff6ff,#fff)', borderRadius: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>ASET</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#6366f1', fontFamily: "'DM Mono', monospace" }}>{fmt(totalAset)}</span>
            </div>
            <Section title="Aset Lancar" items={assets.lancar} color="#0ea5e9" total={totalAsetLancar} />
            <Section title="Aset Tetap (Net)" items={assets.tetap} color="#6366f1" total={totalAsetTetap} />
          </div>

          {/* LIABILITAS & EKUITAS */}
          <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, padding: '10px 12px', background: 'linear-gradient(90deg,#fef2f2,#fff)', borderRadius: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>LIABILITAS & EKUITAS</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#dc2626', fontFamily: "'DM Mono', monospace" }}>{fmt(totalLiabEquity)}</span>
            </div>
            <Section title="Liabilitas Jangka Pendek" items={liabilities.lancar} color="#f97316" total={totalLiabLancar} />
            <Section title="Liabilitas Jangka Panjang" items={liabilities.jangkaPanjang} color="#dc2626" total={totalLiabPanjang} />
            <Section title="Ekuitas" items={equity} color="#16a34a" total={totalEquity} />
          </div>
        </div>
      </div>
    </div>
  );
}