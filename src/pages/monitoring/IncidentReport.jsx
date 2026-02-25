import React, { useState } from 'react';

const incidents = [
  { id: 'INC-2025-001', siswa: 'Hendra Wijaya', foto: '👨', perusahaan: 'Kobe Steel Ltd.', prefektur: 'Hyogo', tgl: '2025-01-18', tgl_dilaporkan: '2025-01-19', jenis: 'Kecelakaan Kerja', severity: 'Sedang', deskripsi: 'Terjatuh saat memindahkan material di area gudang, mengalami luka di lutut kiri. Langsung dilarikan ke klinik perusahaan.', korban: 'Luka ringan (lutut), rawat jalan', tindakan: 'Pertolongan pertama dilakukan, dirujuk ke klinik, laporan ke BPJS TKI sudah dibuat', status: 'Dalam Penanganan', dilaporkan_ke: 'Supervisor, HR Perusahaan, LPK, BPJS TKI' },
  { id: 'INC-2024-019', siswa: 'Budi Santoso', foto: '👨', perusahaan: 'Denso Corporation', prefektur: 'Aichi', tgl: '2024-12-05', tgl_dilaporkan: '2024-12-06', jenis: 'Konflik dengan Rekan', severity: 'Ringan', deskripsi: 'Terjadi perselisihan verbal dengan pekerja Jepang terkait penempatan area kerja. Dipicu oleh miskomunikasi instruksi.', korban: 'Tidak ada korban fisik, dampak psikologis ringan', tindakan: 'Mediasi dilakukan oleh HR perusahaan, kedua pihak berdamai', status: 'Selesai', dilaporkan_ke: 'HR Perusahaan, LPK' },
  { id: 'INC-2024-015', siswa: 'Ahmad Fauzi', foto: '👨', perusahaan: 'Yamaha Motor', prefektur: 'Shizuoka', tgl: '2024-11-20', tgl_dilaporkan: '2024-11-21', jenis: 'Kecelakaan Kerja', severity: 'Ringan', deskripsi: 'Tangan tersayat komponen tajam saat perakitan, mendapat pertolongan pertama di lokasi.', korban: 'Luka kecil, tidak perlu rawat inap', tindakan: 'First aid di tempat, lapor ke supervisor, klaim asuransi diproses', status: 'Selesai', dilaporkan_ke: 'Supervisor, HR, LPK' },
  { id: 'INC-2024-008', siswa: 'Putri Lestari', foto: '👩', perusahaan: 'Nissan Motor', prefektur: 'Kanagawa', tgl: '2024-09-10', tgl_dilaporkan: '2024-09-11', jenis: 'Masalah Akomodasi', severity: 'Sedang', deskripsi: 'Kebocoran di kamar asrama menyebabkan kerusakan barang pribadi senilai ±¥30,000. Perusahaan belum responsif.', korban: 'Kerusakan properti', tindakan: 'Sudah dibuat surat tuntutan ke perusahaan, menunggu ganti rugi', status: 'Selesai', dilaporkan_ke: 'Perusahaan, LPK' },
];

const severityConfig = {
  'Ringan': { bg: '#f0fdf4', text: '#166534', dot: '#16a34a' },
  'Sedang': { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
  'Berat': { bg: '#fef2f2', text: '#b91c1c', dot: '#dc2626' },
};
const statusConfig = {
  'Dalam Penanganan': { bg: '#eff6ff', text: '#1d4ed8' },
  'Selesai': { bg: '#e6f9f0', text: '#0e7a4d' },
};
const jenisColor = {
  'Kecelakaan Kerja': '#dc2626', 'Konflik dengan Rekan': '#f59e0b',
  'Masalah Akomodasi': '#6366f1', 'Penipuan': '#0ea5e9',
};

export default function IncidentReport() {
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      {/* Detail Modal */}
      {detail && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: '#fef2f2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🚨</div>
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{detail.id} — {detail.jenis}</h3>
                <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{detail.siswa} · {detail.perusahaan}</p>
              </div>
              <span style={{ marginLeft: 'auto', background: severityConfig[detail.severity].bg, color: severityConfig[detail.severity].text, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{detail.severity}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[['Prefektur', detail.prefektur], ['Tgl Kejadian', detail.tgl], ['Tgl Dilaporkan', detail.tgl_dilaporkan], ['Status', detail.status]].map(([k, v]) => (
                <div key={k} style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px' }}>
                  <p style={{ margin: '0 0 3px', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{k}</p>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{v}</p>
                </div>
              ))}
            </div>
            {[['📋 Deskripsi Kejadian', detail.deskripsi], ['🏥 Korban / Kerugian', detail.korban], ['🔧 Tindakan yang Diambil', detail.tindakan], ['📢 Dilaporkan Kepada', detail.dilaporkan_ke]].map(([label, val]) => (
              <div key={label} style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
                <p style={{ margin: '0 0 4px', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{label}</p>
                <p style={{ margin: 0, fontSize: 13, color: '#0f172a' }}>{val}</p>
              </div>
            ))}
            <button onClick={() => setDetail(null)} style={{ width: '100%', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '10px', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>Tutup</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#ef4444,#b91c1c)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>🚨</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Incident Report</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Laporan Kejadian & Insiden</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg,#ef4444,#b91c1c)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>+ Buat Incident Report</button>
      </div>

      {/* Alert Active */}
      {incidents.filter(i => i.status === 'Dalam Penanganan').map(inc => (
        <div key={inc.id} style={{ background: '#fff5f5', border: '1.5px solid #fca5a5', borderRadius: 12, padding: '14px 20px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🚨</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 2px', fontWeight: 700, color: '#b91c1c', fontSize: 14 }}>{inc.id} — {inc.jenis} · {inc.siswa}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#dc2626' }}>{inc.perusahaan} · Terjadi {inc.tgl} · Sedang ditangani</p>
          </div>
          <button onClick={() => setDetail(inc)} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontFamily: 'inherit', fontWeight: 600, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>Lihat Detail</button>
        </div>
      ))}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Insiden', value: incidents.length, icon: '📋', color: '#ef4444' },
          { label: 'Dalam Penanganan', value: incidents.filter(i => i.status === 'Dalam Penanganan').length, icon: '🔄', color: '#f59e0b' },
          { label: 'Kecelakaan Kerja', value: incidents.filter(i => i.jenis === 'Kecelakaan Kerja').length, icon: '🤕', color: '#dc2626' },
          { label: 'Sudah Selesai', value: incidents.filter(i => i.status === 'Selesai').length, icon: '✅', color: '#16a34a' },
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

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Semua Incident Report</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ID', 'Siswa', 'Jenis Insiden', 'Tingkat', 'Tgl Kejadian', 'Deskripsi Singkat', 'Status', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => {
                const sv = severityConfig[inc.severity];
                const sc = statusConfig[inc.status];
                const jc = jenisColor[inc.jenis] || '#94a3b8';
                return (
                  <tr key={inc.id} style={{ borderBottom: '1px solid #f8fafc', background: inc.status === 'Dalam Penanganan' ? '#fffbfb' : '' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = inc.status === 'Dalam Penanganan' ? '#fffbfb' : ''}>
                    <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#ef4444', fontWeight: 500 }}>{inc.id}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span>{inc.foto}</span>
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{inc.siswa}</p>
                          <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{inc.prefektur}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: jc + '18', color: jc, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>{inc.jenis}</span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sv.bg, color: sv.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sv.dot, display: 'inline-block' }} />{inc.severity}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12 }}>{inc.tgl}</td>
                    <td style={{ padding: '13px 16px', color: '#475569', fontSize: 12, maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inc.deskripsi}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>{inc.status}</span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <button onClick={() => setDetail(inc)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Detail</button>
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