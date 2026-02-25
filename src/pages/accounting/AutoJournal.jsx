import React, { useState } from 'react';

const autoRules = [
  { id: 'AR-001', nama: 'Jurnal Pembayaran SPP Otomatis', trigger: 'Pembayaran SPP Masuk', debit: 'Kas', kredit: 'Pendapatan SPP', frekuensi: 'Per Transaksi', status: 'Aktif', terakhirJalan: '2025-01-28' },
  { id: 'AR-002', nama: 'Jurnal Gaji Bulanan Instruktur', trigger: 'Tanggal 25 setiap bulan', debit: 'Biaya Gaji', kredit: 'Kas', frekuensi: 'Bulanan', status: 'Aktif', terakhirJalan: '2025-01-25' },
  { id: 'AR-003', nama: 'Jurnal Penyusutan Peralatan', trigger: 'Akhir Bulan', debit: 'Biaya Penyusutan', kredit: 'Akumulasi Penyusutan', frekuensi: 'Bulanan', status: 'Aktif', terakhirJalan: '2025-01-31' },
  { id: 'AR-004', nama: 'Jurnal Fee Penempatan Otomatis', trigger: 'Konfirmasi Penempatan Kerja', debit: 'Piutang Fee', kredit: 'Pendapatan Fee Penempatan', frekuensi: 'Per Transaksi', status: 'Aktif', terakhirJalan: '2025-01-22' },
  { id: 'AR-005', nama: 'Jurnal Amortisasi Biaya Ditangguhkan', trigger: 'Awal Bulan', debit: 'Biaya Amortisasi', kredit: 'Biaya Ditangguhkan', frekuensi: 'Bulanan', status: 'Nonaktif', terakhirJalan: '2024-12-01' },
  { id: 'AR-006', nama: 'Jurnal Rekonsiliasi Bank Otomatis', trigger: 'Import Data Bank', debit: 'Kas di Bank', kredit: 'Kas', frekuensi: 'Per Transaksi', status: 'Aktif', terakhirJalan: '2025-01-30' },
];

const recentLogs = [
  { waktu: '2025-01-28 09:14', rule: 'Jurnal Pembayaran SPP Otomatis', jumlah: 3, nominal: 4500000, hasil: 'Berhasil' },
  { waktu: '2025-01-27 14:30', rule: 'Jurnal Fee Penempatan Otomatis', jumlah: 1, nominal: 7500000, hasil: 'Berhasil' },
  { waktu: '2025-01-25 08:00', rule: 'Jurnal Gaji Bulanan Instruktur', jumlah: 5, nominal: 40000000, hasil: 'Berhasil' },
  { waktu: '2025-01-31 23:59', rule: 'Jurnal Penyusutan Peralatan', jumlah: 8, nominal: 2800000, hasil: 'Berhasil' },
  { waktu: '2025-01-30 10:05', rule: 'Jurnal Rekonsiliasi Bank Otomatis', jumlah: 12, nominal: 0, hasil: 'Berhasil' },
  { waktu: '2025-01-20 11:22', rule: 'Jurnal Penyusutan Peralatan', jumlah: 8, nominal: 2800000, hasil: 'Gagal' },
];

const fmt = (n) => n ? 'Rp ' + n.toLocaleString('id-ID') : '-';

export default function AutoJournal() {
  const [activeTab, setActiveTab] = useState('rules');

  const aktif = autoRules.filter(r => r.status === 'Aktif').length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>⚙️</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Jurnal Otomatis</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Akuntansi · Aturan & Riwayat Eksekusi</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          + Tambah Aturan
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Aturan', value: autoRules.length, icon: '📐', color: '#8b5cf6' },
          { label: 'Aturan Aktif', value: aktif, icon: '✅', color: '#16a34a' },
          { label: 'Jurnal Dibuat Bulan Ini', value: '29', icon: '📄', color: '#0ea5e9' },
          { label: 'Terakhir Dijalankan', value: 'Hari ini', icon: '🕐', color: '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: '0 20px' }}>
          {[{ key: 'rules', label: '📐 Aturan Jurnal' }, { key: 'log', label: '📋 Riwayat Eksekusi' }].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: '14px 18px', border: 'none', background: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: activeTab === t.key ? '#8b5cf6' : '#94a3b8', borderBottom: activeTab === t.key ? '2px solid #8b5cf6' : '2px solid transparent', marginBottom: -1 }}>{t.label}</button>
          ))}
        </div>

        {activeTab === 'rules' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID', 'Nama Aturan', 'Trigger', 'Akun Debit', 'Akun Kredit', 'Frekuensi', 'Terakhir Jalan', 'Status', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {autoRules.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#8b5cf6', fontWeight: 500 }}>{r.id}</td>
                  <td style={{ padding: '13px 16px', fontWeight: 600, color: '#0f172a', maxWidth: 180 }}>{r.nama}</td>
                  <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12 }}>{r.trigger}</td>
                  <td style={{ padding: '13px 16px', color: '#475569' }}>{r.debit}</td>
                  <td style={{ padding: '13px 16px', color: '#475569' }}>{r.kredit}</td>
                  <td style={{ padding: '13px 16px' }}><span style={{ background: '#f1f5f9', color: '#475569', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{r.frekuensi}</span></td>
                  <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12 }}>{r.terakhirJalan}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ background: r.status === 'Aktif' ? '#e6f9f0' : '#fef2f2', color: r.status === 'Aktif' ? '#0e7a4d' : '#b91c1c', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', color: '#475569', fontFamily: 'inherit' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'log' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Waktu', 'Nama Aturan', 'Jml. Jurnal', 'Total Nominal', 'Hasil'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((l, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#475569' }}>{l.waktu}</td>
                  <td style={{ padding: '13px 16px', fontWeight: 500, color: '#0f172a' }}>{l.rule}</td>
                  <td style={{ padding: '13px 16px', color: '#475569', textAlign: 'center' }}>{l.jumlah}</td>
                  <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{fmt(l.nominal)}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ background: l.hasil === 'Berhasil' ? '#e6f9f0' : '#fef2f2', color: l.hasil === 'Berhasil' ? '#0e7a4d' : '#b91c1c', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>
                      {l.hasil === 'Berhasil' ? '✓ ' : '✗ '}{l.hasil}
                    </span>
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