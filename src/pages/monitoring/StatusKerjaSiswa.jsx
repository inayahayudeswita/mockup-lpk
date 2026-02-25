import React, { useState } from 'react';

const siswaList = [
  { id: 'PNM-2025-001', nama: 'Ahmad Fauzi', foto: '👨', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka', masuk: '2025-01-10', checkin: '2025-01-28', statusKerja: 'Normal', jam_kerja: 168, lembur: 12, absen: 0, kinerja: 92, catatan: '' },
  { id: 'PNM-2025-002', nama: 'Siti Rahayu', foto: '👩', perusahaan: 'Toyota Industries Corp.', prefektur: 'Aichi', masuk: '2025-01-15', checkin: '2025-01-29', statusKerja: 'Normal', jam_kerja: 172, lembur: 20, absen: 0, kinerja: 96, catatan: '' },
  { id: 'PNM-2025-003', nama: 'Budi Santoso', foto: '👨', perusahaan: 'Denso Corporation', prefektur: 'Aichi', masuk: '2025-01-20', checkin: '2025-01-27', statusKerja: 'Perlu Perhatian', jam_kerja: 140, lembur: 0, absen: 2, kinerja: 74, catatan: 'Absen 2 hari tanpa keterangan, sudah dihubungi' },
  { id: 'PNM-2025-004', nama: 'Dewi Anggraini', foto: '👩', perusahaan: 'Hitachi Ltd.', prefektur: 'Ibaraki', masuk: '2025-02-01', checkin: '2025-01-30', statusKerja: 'Normal', jam_kerja: 88, lembur: 8, absen: 0, kinerja: 89, catatan: '' },
  { id: 'PNM-2025-005', nama: 'Rizky Pratama', foto: '👨', perusahaan: 'Panasonic Holdings Corp.', prefektur: 'Osaka', masuk: '2025-02-05', checkin: '2025-01-30', statusKerja: 'Normal', jam_kerja: 80, lembur: 4, absen: 0, kinerja: 88, catatan: '' },
  { id: 'PNM-2024-018', nama: 'Nurul Hidayah', foto: '👩', perusahaan: 'Fujitsu Ltd.', prefektur: 'Kanagawa', masuk: '2024-08-01', checkin: '2025-01-29', statusKerja: 'Terbaik', jam_kerja: 175, lembur: 18, absen: 0, kinerja: 98, catatan: 'Mendapat pujian dari supervisor Jepang' },
  { id: 'PNM-2024-012', nama: 'Hendra Wijaya', foto: '👨', perusahaan: 'Kobe Steel Ltd.', prefektur: 'Hyogo', masuk: '2024-06-15', checkin: '2025-01-20', statusKerja: 'Cuti', jam_kerja: 0, lembur: 0, absen: 10, kinerja: 0, catatan: 'Cuti sakit, sudah lapor ke LPK' },
];

const statusConfig = {
  'Normal': { bg: '#e6f9f0', text: '#0e7a4d', icon: '✅' },
  'Perlu Perhatian': { bg: '#fff7e6', text: '#92580a', icon: '⚠️' },
  'Terbaik': { bg: '#eff6ff', text: '#1d4ed8', icon: '🌟' },
  'Cuti': { bg: '#f1f5f9', text: '#475569', icon: '💤' },
};

function KinerjaBar({ value }) {
  const color = value >= 90 ? '#16a34a' : value >= 75 ? '#f59e0b' : value === 0 ? '#cbd5e1' : '#dc2626';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, minWidth: 60 }}>
        <div style={{ width: value + '%', height: '100%', background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 28 }}>{value > 0 ? value : '-'}</span>
    </div>
  );
}

export default function StatusKerjaSiswa() {
  const [filter, setFilter] = useState('Semua');
  const [selected, setSelected] = useState(null);

  const filtered = siswaList.filter(s => filter === 'Semua' || s.statusKerja === filter);
  const perhatian = siswaList.filter(s => s.statusKerja === 'Perlu Perhatian').length;
  const avgKinerja = Math.round(siswaList.filter(s => s.kinerja > 0).reduce((a, b) => a + b.kinerja, 0) / siswaList.filter(s => s.kinerja > 0).length);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      {/* Detail Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{selected.foto}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{selected.nama}</h3>
                <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{selected.perusahaan}</p>
              </div>
              <span style={{ marginLeft: 'auto', background: statusConfig[selected.statusKerja].bg, color: statusConfig[selected.statusKerja].text, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>
                {statusConfig[selected.statusKerja].icon} {selected.statusKerja}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                ['Prefektur', selected.prefektur],
                ['Tanggal Masuk', selected.masuk],
                ['Jam Kerja (Jan)', selected.jam_kerja + ' jam'],
                ['Lembur (Jan)', selected.lembur + ' jam'],
                ['Hari Absen', selected.absen + ' hari'],
                ['Skor Kinerja', selected.kinerja > 0 ? selected.kinerja + '/100' : '-'],
              ].map(([k, v]) => (
                <div key={k} style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px' }}>
                  <p style={{ margin: '0 0 3px', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{k}</p>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{v}</p>
                </div>
              ))}
            </div>
            {selected.catatan && (
              <div style={{ background: '#fff7e6', borderRadius: 8, padding: '10px 12px', marginBottom: 16, border: '1px solid #fde68a' }}>
                <p style={{ margin: '0 0 3px', fontSize: 11, color: '#92580a', fontWeight: 600 }}>📝 Catatan</p>
                <p style={{ margin: 0, fontSize: 13, color: '#78350f' }}>{selected.catatan}</p>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ flex: 1, background: '#e11d48', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📞 Hubungi Siswa</button>
              <button onClick={() => setSelected(null)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>👷</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Status Kerja Siswa</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Update Terakhir: 30 Jan 2025</p>
        </div>
        <button style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📥 Ekspor Laporan</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Siswa Aktif', value: siswaList.length, icon: '👥', color: '#0ea5e9' },
          { label: 'Rata-rata Kinerja', value: avgKinerja + '/100', icon: '📊', color: '#16a34a' },
          { label: 'Perlu Perhatian', value: perhatian, icon: '⚠️', color: '#f59e0b' },
          { label: 'Siswa Terbaik', value: siswaList.filter(s => s.statusKerja === 'Terbaik').length, icon: '🌟', color: '#6366f1' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{c.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: c.color + '15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['Semua', 'Normal', 'Terbaik', 'Perlu Perhatian', 'Cuti'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filter === s ? '#0ea5e9' : '#f1f5f9', color: filter === s ? '#fff' : '#64748b' }}>{s}</button>
          ))}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Siswa', 'Perusahaan', 'Prefektur', 'Jam Kerja', 'Lembur', 'Absen', 'Kinerja', 'Status', 'Check-in Terakhir', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const sc = statusConfig[s.statusKerja];
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 32, height: 32, background: '#f0f9ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{s.foto}</div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{s.nama}</p>
                          <p style={{ margin: 0, fontSize: 11, color: '#94a3b8', fontFamily: "'DM Mono', monospace" }}>{s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#475569', maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.perusahaan}</td>
                    <td style={{ padding: '13px 16px', color: '#475569' }}>{s.prefektur}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{s.jam_kerja > 0 ? s.jam_kerja + 'j' : '-'}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: s.lembur > 0 ? '#f59e0b' : '#cbd5e1', fontWeight: 600 }}>{s.lembur > 0 ? '+' + s.lembur + 'j' : '-'}</td>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: s.absen > 0 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>{s.absen > 0 ? s.absen + ' hari' : '0'}</td>
                    <td style={{ padding: '13px 16px', minWidth: 120 }}><KinerjaBar value={s.kinerja} /></td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{sc.icon} {s.statusKerja}</span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#64748b', fontSize: 12 }}>{s.checkin}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <button onClick={() => setSelected(s)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Detail</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}