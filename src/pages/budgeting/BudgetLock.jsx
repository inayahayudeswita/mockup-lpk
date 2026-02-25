import React, { useState } from 'react';

const lockStatus = [
  { dept: 'Operasional Akademik', icon: '🎓', color: '#6366f1', periode: 'Jan 2025', status: 'Terkunci', tgl_kunci: '2025-01-31', dikunci: 'Direktur Keuangan', alasan: 'Periode Jan 2025 selesai & telah diaudit' },
  { dept: 'Rekrutmen & Seleksi', icon: '🔍', color: '#f59e0b', periode: 'Jan 2025', status: 'Terkunci', tgl_kunci: '2025-01-31', dikunci: 'Direktur Keuangan', alasan: 'Periode Jan 2025 selesai & telah diaudit' },
  { dept: 'Operasional Penempatan', icon: '✈️', color: '#0ea5e9', periode: 'Jan 2025', status: 'Terbuka', tgl_kunci: '-', dikunci: '-', alasan: 'Masih ada transaksi pending' },
  { dept: 'Administrasi & Umum', icon: '🏢', color: '#10b981', periode: 'Jan 2025', status: 'Terkunci', tgl_kunci: '2025-01-31', dikunci: 'Direktur Keuangan', alasan: 'Periode Jan 2025 selesai & telah diaudit' },
  { dept: 'IT & Sistem Informasi', icon: '💻', color: '#8b5cf6', periode: 'Jan 2025', status: 'Terbuka', tgl_kunci: '-', dikunci: '-', alasan: 'Menunggu rekonsiliasi faktur' },
];

const lockHistory = [
  { periode: 'Desember 2024', tgl_kunci: '2024-12-31', dikunci: 'Direktur Keuangan', dept_terkunci: 5, total_dept: 5 },
  { periode: 'November 2024', tgl_kunci: '2024-11-30', dikunci: 'Direktur Keuangan', dept_terkunci: 5, total_dept: 5 },
  { periode: 'Oktober 2024', tgl_kunci: '2024-10-31', dikunci: 'Direktur Keuangan', dept_terkunci: 5, total_dept: 5 },
  { periode: 'Q3 2024 (Tambahan)', tgl_kunci: '2024-10-05', dikunci: 'Direktur Utama', dept_terkunci: 5, total_dept: 5 },
];

export default function BudgetLock() {
  const [confirmLock, setConfirmLock] = useState(null);
  const terkunci = lockStatus.filter(l => l.status === 'Terkunci').length;
  const total = lockStatus.length;
  const allLocked = terkunci === total;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#475569,#1e293b)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>🔒</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Kunci Anggaran</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Budgeting · Manajemen Periode Kunci</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {!allLocked && (
            <button style={{ background: 'linear-gradient(135deg,#475569,#1e293b)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              🔒 Kunci Semua Dept
            </button>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      {confirmLock && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 420 }}>
            <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 12 }}>🔒</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, textAlign: 'center' }}>Konfirmasi Penguncian</h3>
            <p style={{ margin: '0 0 20px', fontSize: 13, color: '#64748b', textAlign: 'center' }}>
              Anda akan mengunci anggaran <strong>{confirmLock.dept}</strong> untuk periode <strong>{confirmLock.periode}</strong>. Setelah dikunci, tidak ada perubahan yang dapat dilakukan tanpa membuka kembali.
            </p>
            <div style={{ background: '#fef2f2', borderRadius: 8, padding: '10px 14px', marginBottom: 20, border: '1px solid #fca5a5' }}>
              <p style={{ margin: 0, fontSize: 12, color: '#b91c1c', fontWeight: 600 }}>⚠️ Tindakan ini memerlukan persetujuan Direktur Keuangan</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmLock(null)} style={{ flex: 1, background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '10px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Batal</button>
              <button onClick={() => setConfirmLock(null)} style={{ flex: 1, background: '#1e293b', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🔒 Ya, Kunci</button>
            </div>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Departemen', value: total, icon: '🏢', color: '#475569' },
          { label: 'Sudah Terkunci', value: terkunci, icon: '🔒', color: '#16a34a' },
          { label: 'Masih Terbuka', value: total - terkunci, icon: '🔓', color: '#f59e0b' },
          { label: 'Status Periode', value: allLocked ? 'Lengkap' : 'Belum Lengkap', icon: allLocked ? '✅' : '⏳', color: allLocked ? '#16a34a' : '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: typeof c.value === 'number' ? 26 : 16, fontWeight: 700, color: c.color }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Status per Dept */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Status Kunci per Departemen · Periode Jan 2025</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Departemen', 'Periode', 'Status', 'Tanggal Dikunci', 'Dikunci Oleh', 'Alasan', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lockStatus.map((l, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{l.icon}</span>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{l.dept}</span>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', color: '#475569' }}>{l.periode}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ background: l.status === 'Terkunci' ? '#f1f5f9' : '#fff7e6', color: l.status === 'Terkunci' ? '#475569' : '#92580a', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      {l.status === 'Terkunci' ? '🔒' : '🔓'} {l.status}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12 }}>{l.tgl_kunci}</td>
                  <td style={{ padding: '13px 16px', color: '#475569' }}>{l.dikunci}</td>
                  <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12, maxWidth: 200 }}>{l.alasan}</td>
                  <td style={{ padding: '13px 16px' }}>
                    {l.status === 'Terbuka' ? (
                      <button onClick={() => setConfirmLock(l)} style={{ background: '#1e293b', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>🔒 Kunci</button>
                    ) : (
                      <button style={{ background: '#fef2f2', color: '#b91c1c', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>🔓 Buka</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lock History */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Riwayat Penguncian Periode</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Periode', 'Tanggal Kunci', 'Dikunci Oleh', 'Dept Terkunci', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lockHistory.map((h, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                <td style={{ padding: '13px 16px', fontWeight: 600, color: '#0f172a' }}>{h.periode}</td>
                <td style={{ padding: '13px 16px', color: '#475569' }}>{h.tgl_kunci}</td>
                <td style={{ padding: '13px 16px', color: '#475569' }}>{h.dikunci}</td>
                <td style={{ padding: '13px 16px', textAlign: 'center' }}><span style={{ background: '#e6f9f0', color: '#0e7a4d', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>{h.dept_terkunci}/{h.total_dept}</span></td>
                <td style={{ padding: '13px 16px' }}><span style={{ background: '#e6f9f0', color: '#0e7a4d', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>🔒 Lengkap</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}