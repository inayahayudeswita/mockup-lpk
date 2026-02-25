import React, { useState } from 'react';

const checkins = [
  { id: 'CHK-2025-031', siswa: 'Ahmad Fauzi', foto: '👨', perusahaan: 'Yamaha Motor', prefektur: 'Shizuoka', tanggal: '2025-01-28', metode: 'WhatsApp', kondisi: 'Baik', kendala: 'Tidak ada', rencana: 'Melanjutkan pekerjaan normal', koordinator: 'Budi Hartono', status: 'Selesai' },
  { id: 'CHK-2025-032', siswa: 'Siti Rahayu', foto: '👩', perusahaan: 'Toyota Industries', prefektur: 'Aichi', tanggal: '2025-01-29', metode: 'Video Call', kondisi: 'Sangat Baik', kendala: 'Tidak ada', rencana: 'Ada kemungkinan perpanjangan kontrak', koordinator: 'Rina Susanti', status: 'Selesai' },
  { id: 'CHK-2025-033', siswa: 'Budi Santoso', foto: '👨', perusahaan: 'Denso Corporation', prefektur: 'Aichi', tanggal: '2025-01-27', metode: 'Telepon', kondisi: 'Cukup', kendala: 'Kesulitan komunikasi dengan supervisor', rencana: 'Akan diadakan mediasi dengan perusahaan', koordinator: 'Budi Hartono', status: 'Follow Up' },
  { id: 'CHK-2025-034', siswa: 'Dewi Anggraini', foto: '👩', perusahaan: 'Hitachi Ltd.', prefektur: 'Ibaraki', tanggal: '2025-01-30', metode: 'WhatsApp', kondisi: 'Baik', kendala: 'Rindu keluarga (normal)', rencana: 'Disarankan ikut komunitas TKI di Ibaraki', koordinator: 'Rina Susanti', status: 'Selesai' },
  { id: 'CHK-2025-035', siswa: 'Nurul Hidayah', foto: '👩', perusahaan: 'Fujitsu Ltd.', prefektur: 'Kanagawa', tanggal: '2025-01-29', metode: 'Video Call', kondisi: 'Sangat Baik', kendala: 'Tidak ada', rencana: 'Diskusi peluang promosi jabatan', koordinator: 'Agus Prasetyo', status: 'Selesai' },
  { id: 'CHK-2025-036', siswa: 'Hendra Wijaya', foto: '👨', perusahaan: 'Kobe Steel Ltd.', prefektur: 'Hyogo', tanggal: '2025-01-20', metode: 'Telepon', kondisi: 'Kurang Baik', kendala: 'Sakit, sedang rawat jalan di klinik lokal', rencana: 'Pemantauan kondisi kesehatan, koordinasi dengan perusahaan', koordinator: 'Budi Hartono', status: 'Darurat' },
];

const upcoming = [
  { siswa: 'Rizky Pratama', foto: '👨', perusahaan: 'Panasonic', prefektur: 'Osaka', jadwal: '2025-02-02', koordinator: 'Agus Prasetyo', metode: 'WhatsApp' },
  { siswa: 'Ahmad Fauzi', foto: '👨', perusahaan: 'Yamaha Motor', prefektur: 'Shizuoka', jadwal: '2025-02-04', koordinator: 'Budi Hartono', metode: 'Video Call' },
  { siswa: 'Siti Rahayu', foto: '👩', perusahaan: 'Toyota Industries', prefektur: 'Aichi', jadwal: '2025-02-05', koordinator: 'Rina Susanti', metode: 'WhatsApp' },
];

const statusConfig = {
  'Selesai': { bg: '#e6f9f0', text: '#0e7a4d' },
  'Follow Up': { bg: '#fff7e6', text: '#92580a' },
  'Darurat': { bg: '#fef2f2', text: '#b91c1c' },
};

const kondisiColor = {
  'Sangat Baik': '#16a34a', 'Baik': '#0ea5e9', 'Cukup': '#f59e0b', 'Kurang Baik': '#dc2626',
};

export default function CheckinBerkala() {
  const [tab, setTab] = useState('riwayat');

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#10b981,#047857)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📞</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Check-in Berkala</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Komunikasi Rutin dengan Siswa</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg,#10b981,#047857)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          + Catat Check-in
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Check-in Bulan Ini', value: checkins.length, icon: '📞', color: '#10b981' },
          { label: 'Status Darurat', value: checkins.filter(c => c.status === 'Darurat').length, icon: '🚨', color: '#dc2626' },
          { label: 'Follow Up Dibutuhkan', value: checkins.filter(c => c.status === 'Follow Up').length, icon: '📋', color: '#f59e0b' },
          { label: 'Jadwal Mendatang', value: upcoming.length, icon: '📅', color: '#6366f1' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Darurat */}
      {checkins.filter(c => c.status === 'Darurat').map(c => (
        <div key={c.id} style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 12, padding: '14px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🚨</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 2px', fontWeight: 700, color: '#b91c1c', fontSize: 14 }}>Situasi Darurat: {c.siswa}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#dc2626' }}>{c.kendala} · Koordinator: {c.koordinator} · {c.tanggal}</p>
          </div>
          <button style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Tangani Sekarang</button>
        </div>
      ))}

      {/* Tabs */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: '0 20px' }}>
          {[{ key: 'riwayat', label: '📋 Riwayat Check-in' }, { key: 'jadwal', label: `📅 Jadwal Mendatang (${upcoming.length})` }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '14px 18px', border: 'none', background: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: tab === t.key ? '#10b981' : '#94a3b8', borderBottom: tab === t.key ? '2px solid #10b981' : '2px solid transparent', marginBottom: -1 }}>{t.label}</button>
          ))}
        </div>

        {tab === 'riwayat' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['ID', 'Siswa', 'Perusahaan', 'Tgl Check-in', 'Metode', 'Kondisi', 'Kendala', 'Rencana Tindak Lanjut', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {checkins.map((c) => {
                  const sc = statusConfig[c.status];
                  const kc = kondisiColor[c.kondisi] || '#475569';
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f8fafc', background: c.status === 'Darurat' ? '#fff5f5' : '' }} onMouseEnter={e => e.currentTarget.style.background = c.status === 'Darurat' ? '#fff5f5' : '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = c.status === 'Darurat' ? '#fff5f5' : ''}>
                      <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#10b981', fontWeight: 500 }}>{c.id}</td>
                      <td style={{ padding: '13px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 18 }}>{c.foto}</span>
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{c.siswa}</p>
                            <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{c.prefektur}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569' }}>{c.perusahaan}</td>
                      <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569' }}>{c.tanggal}</td>
                      <td style={{ padding: '13px 16px' }}><span style={{ background: '#f1f5f9', color: '#475569', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{c.metode}</span></td>
                      <td style={{ padding: '13px 16px' }}><span style={{ color: kc, fontWeight: 700, fontSize: 12 }}>{c.kondisi}</span></td>
                      <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569', maxWidth: 180 }}>{c.kendala}</td>
                      <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569', maxWidth: 200 }}>{c.rencana}</td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{c.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'jadwal' && (
          <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {upcoming.map((u, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: 16, border: '1.5px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{u.foto}</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>{u.siswa}</p>
                    <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{u.perusahaan} · {u.prefektur}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span style={{ background: '#e6f9f0', color: '#0e7a4d', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>📅 {u.jadwal}</span>
                  <span style={{ background: '#eff6ff', color: '#1d4ed8', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{u.metode}</span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: 12, color: '#64748b' }}>Koordinator: {u.koordinator}</p>
                <button style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, padding: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Mulai Check-in</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}