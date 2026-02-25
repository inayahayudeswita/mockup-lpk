import React, { useState } from 'react';

const evaluations = [
  {
    id: 'EVK-2025-001', siswa: 'Ahmad Fauzi', foto: '👨', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka',
    periode: 'Jan 2025', tgl_eval: '2025-01-28', evaluator: 'Tanaka-san (Supervisor)',
    scores: { kualitas: 88, kehadiran: 95, kerjasama: 90, komunikasi: 82, kedisiplinan: 92, inisiatif: 80 },
    total: 88, grade: 'B+', catatan: 'Performa baik, perlu meningkatkan kemampuan bahasa Jepang', rekomendasi: 'Perpanjang kontrak'
  },
  {
    id: 'EVK-2025-002', siswa: 'Siti Rahayu', foto: '👩', perusahaan: 'Toyota Industries Corp.', prefektur: 'Aichi',
    periode: 'Jan 2025', tgl_eval: '2025-01-29', evaluator: 'Suzuki-san (Supervisor)',
    scores: { kualitas: 96, kehadiran: 100, kerjasama: 95, komunikasi: 94, kedisiplinan: 98, inisiatif: 92 },
    total: 96, grade: 'A', catatan: 'Luar biasa, menjadi teladan bagi pekerja asing lainnya', rekomendasi: 'Promosi jabatan'
  },
  {
    id: 'EVK-2025-003', siswa: 'Budi Santoso', foto: '👨', perusahaan: 'Denso Corporation', prefektur: 'Aichi',
    periode: 'Jan 2025', tgl_eval: '2025-01-27', evaluator: 'Yamamoto-san (Supervisor)',
    scores: { kualitas: 72, kehadiran: 78, kerjasama: 70, komunikasi: 65, kedisiplinan: 75, inisiatif: 68 },
    total: 71, grade: 'C+', catatan: 'Ada tantangan adaptasi, perlu pendampingan lebih intensif', rekomendasi: 'Perlu pembinaan'
  },
  {
    id: 'EVK-2025-004', siswa: 'Nurul Hidayah', foto: '👩', perusahaan: 'Fujitsu Ltd.', prefektur: 'Kanagawa',
    periode: 'Jan 2025', tgl_eval: '2025-01-29', evaluator: 'Watanabe-san (Manager)',
    scores: { kualitas: 98, kehadiran: 100, kerjasama: 97, komunikasi: 98, kedisiplinan: 100, inisiatif: 95 },
    total: 98, grade: 'A+', catatan: 'Performa terbaik di divisi, mendapat penghargaan karyawan terbaik', rekomendasi: 'Promosi & perpanjangan'
  },
  {
    id: 'EVK-2025-005', siswa: 'Dewi Anggraini', foto: '👩', perusahaan: 'Hitachi Ltd.', prefektur: 'Ibaraki',
    periode: 'Jan 2025', tgl_eval: '2025-01-30', evaluator: 'Kobayashi-san (Supervisor)',
    scores: { kualitas: 85, kehadiran: 92, kerjasama: 88, komunikasi: 86, kedisiplinan: 90, inisiatif: 82 },
    total: 87, grade: 'B+', catatan: 'Adaptasi sangat baik untuk pendatang baru', rekomendasi: 'Perpanjang kontrak'
  },
];

const gradeColor = { 'A+': '#16a34a', 'A': '#0ea5e9', 'B+': '#6366f1', 'B': '#8b5cf6', 'C+': '#f59e0b', 'C': '#dc2626' };
const metricLabels = { kualitas: 'Kualitas Kerja', kehadiran: 'Kehadiran', kerjasama: 'Kerjasama Tim', komunikasi: 'Komunikasi', kedisiplinan: 'Kedisiplinan', inisiatif: 'Inisiatif' };

export default function EvaluasiKinerja() {
  const [selected, setSelected] = useState(null);

  const avgTotal = Math.round(evaluations.reduce((s, e) => s + e.total, 0) / evaluations.length);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      {/* Detail Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{selected.foto}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{selected.siswa}</h3>
                <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{selected.perusahaan} · {selected.periode}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: gradeColor[selected.grade] }}>{selected.grade}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Grade</div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: '0 0 12px', fontWeight: 700, fontSize: 13, color: '#0f172a' }}>Skor per Kriteria</p>
              {Object.entries(selected.scores).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 130, fontSize: 12, color: '#475569' }}>{metricLabels[key]}</span>
                  <div style={{ flex: 1, height: 8, background: '#f1f5f9', borderRadius: 4 }}>
                    <div style={{ width: val + '%', height: '100%', background: val >= 90 ? '#16a34a' : val >= 75 ? '#0ea5e9' : '#f59e0b', borderRadius: 4 }} />
                  </div>
                  <span style={{ width: 30, fontSize: 12, fontWeight: 700, color: '#0f172a', textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '12px 14px', marginBottom: 12 }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Catatan Evaluator ({selected.evaluator})</p>
              <p style={{ margin: 0, fontSize: 13, color: '#0f172a' }}>{selected.catatan}</p>
            </div>
            <div style={{ background: '#e6f9f0', borderRadius: 8, padding: '12px 14px', marginBottom: 16, border: '1px solid #86efac' }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, color: '#0e7a4d', fontWeight: 600 }}>Rekomendasi</p>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{selected.rekomendasi}</p>
            </div>
            <button onClick={() => setSelected(null)} style={{ width: '100%', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '10px', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#6366f1,#4f46e5)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>⭐</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Evaluasi Kinerja</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Monitoring Jepang · Penilaian oleh Supervisor Perusahaan</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>+ Input Evaluasi</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Dievaluasi', value: evaluations.length, icon: '📝', color: '#6366f1' },
          { label: 'Rata-rata Skor', value: avgTotal + '/100', icon: '📊', color: '#0ea5e9' },
          { label: 'Grade A / A+', value: evaluations.filter(e => e.grade.startsWith('A')).length, icon: '🏆', color: '#16a34a' },
          { label: 'Perlu Pembinaan', value: evaluations.filter(e => e.rekomendasi === 'Perlu pembinaan').length, icon: '⚠️', color: '#f59e0b' },
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

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {evaluations.map((e) => {
          const gc = gradeColor[e.grade] || '#475569';
          return (
            <div key={e.id} style={{ background: '#fff', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
              onMouseEnter={ev => ev.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'}
              onMouseLeave={ev => ev.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)'}
              onClick={() => setSelected(e)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{e.foto}</div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: 14 }}>{e.siswa}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>{e.prefektur} · {e.periode}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'center', background: gc + '15', borderRadius: 10, padding: '6px 10px' }}>
                  <div style={{ fontWeight: 800, fontSize: 20, color: gc }}>{e.grade}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{e.total}/100</div>
                </div>
              </div>

              {Object.entries(e.scores).slice(0, 3).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: '#94a3b8', width: 100 }}>{metricLabels[key]}</span>
                  <div style={{ flex: 1, height: 5, background: '#f1f5f9', borderRadius: 3 }}>
                    <div style={{ width: val + '%', height: '100%', background: val >= 90 ? '#16a34a' : val >= 75 ? '#6366f1' : '#f59e0b', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{val}</span>
                </div>
              ))}

              <div style={{ marginTop: 12, padding: '8px 10px', background: '#f8fafc', borderRadius: 8 }}>
                <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>💡 {e.rekomendasi}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}