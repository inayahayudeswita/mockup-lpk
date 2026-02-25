import React, { useState } from 'react';

const kpiData = [
  { label: 'Total Siswa Terdaftar', value: 124, target: 150, satuan: 'siswa', icon: '👥', trend: '+12 dari bulan lalu' },
  { label: 'Siswa Aktif Belajar', value: 87, target: 100, satuan: 'siswa', icon: '📚', trend: '+5 dari bulan lalu' },
  { label: 'Tingkat Kehadiran Rata-rata', value: 93.2, target: 95, satuan: '%', icon: '📅', trend: '+1.2% dari bulan lalu' },
  { label: 'Lulusan Bulan Ini', value: 14, target: 20, satuan: 'siswa', icon: '🎓', trend: 'On track' },
  { label: 'Tingkat Kelulusan', value: 82, target: 85, satuan: '%', icon: '📊', trend: 'Perlu peningkatan' },
  { label: 'TKI Aktif di Jepang', value: 5, target: 10, satuan: 'orang', icon: '🇯🇵', trend: '+2 bulan ini' },
];

const aktivitasMingguan = [
  { minggu: 'Minggu 1', kehadiran: 94, kuis: 82, pelatihan: 40 },
  { minggu: 'Minggu 2', kehadiran: 91, kuis: 87, pelatihan: 42 },
  { minggu: 'Minggu 3', kehadiran: 96, kuis: 89, pelatihan: 45 },
  { minggu: 'Minggu 4', kehadiran: 93, kuis: 85, pelatihan: 41 },
];

const instrukturData = [
  { nama: 'Sensei Hiroshi Tanaka', bidang: 'Bahasa Jepang N5-N4', kelas: 4, siswa: 42, rating: 4.8, kehadiran: 100 },
  { nama: 'Sensei Yuki Yamamoto', bidang: 'Bahasa Jepang N3-Kaiwa', kelas: 3, siswa: 28, rating: 4.9, kehadiran: 100 },
  { nama: 'Pak Budi Hartono', bidang: 'Teknis Manufaktur', kelas: 2, siswa: 30, rating: 4.5, kehadiran: 95 },
  { nama: 'Bu Sari Dewi', bidang: 'Budaya & Etika Kerja Jepang', kelas: 3, siswa: 55, rating: 4.7, kehadiran: 98 },
];

const masalahData = [
  { id: 'M001', jenis: 'Akademik', deskripsi: '3 siswa nilai bahasa di bawah 70, perlu remedial', prioritas: 'Tinggi', status: 'Ditangani' },
  { id: 'M002', jenis: 'Kehadiran', deskripsi: '2 siswa absen >20%, perlu pemanggilan orang tua', prioritas: 'Tinggi', status: 'Proses' },
  { id: 'M003', jenis: 'Dokumen', deskripsi: 'Paspor 5 siswa batch Feb belum jadi', prioritas: 'Normal', status: 'Proses' },
  { id: 'M004', jenis: 'Fasilitas', deskripsi: 'AC Ruang Kelas B rusak, perlu perbaikan', prioritas: 'Normal', status: 'Menunggu' },
];

const statusMasalahColor = {
  'Ditangani': 'bg-emerald-100 text-emerald-700',
  'Proses': 'bg-yellow-100 text-yellow-700',
  'Menunggu': 'bg-gray-100 text-gray-500',
};

export default function ReportOperasional() {
  const [tab, setTab] = useState('kpi');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Operasional</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard performa operasional LPK SIMPEL — Februari 2025</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">📥 Export</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white rounded-xl border border-gray-200 p-1 w-fit">
        {[['kpi', '📊 KPI'], ['aktivitas', '📅 Aktivitas'], ['instruktur', '👨‍🏫 Instruktur'], ['masalah', '⚠️ Masalah']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{label}</button>
        ))}
      </div>

      {/* KPI Tab */}
      {tab === 'kpi' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiData.map((k, i) => {
            const pct = Math.min(Math.round((k.value / k.target) * 100), 100);
            const isOnTarget = k.value >= k.target * 0.9;
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{k.icon}</span>
                  <p className="text-xs text-gray-500">{k.label}</p>
                </div>
                <div className="flex items-end justify-between mb-2">
                  <p className={`text-3xl font-bold ${isOnTarget ? 'text-gray-800' : 'text-orange-500'}`}>{k.value}{k.satuan === '%' ? '%' : ''}</p>
                  <p className="text-xs text-gray-400">Target: {k.target}{k.satuan === '%' ? '%' : ` ${k.satuan}`}</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className={`h-2 rounded-full ${pct >= 90 ? 'bg-emerald-500' : pct >= 70 ? 'bg-blue-500' : 'bg-yellow-400'}`} style={{ width: `${pct}%` }}></div>
                </div>
                <p className={`text-xs ${isOnTarget ? 'text-emerald-600' : 'text-orange-500'}`}>{k.trend}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Aktivitas Tab */}
      {tab === 'aktivitas' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Aktivitas Mingguan — Februari 2025</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-left">Minggu</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-left">Kehadiran</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-left">Rata Nilai Kuis</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-left">Sesi Pelatihan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {aktivitasMingguan.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{d.minggu}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div className={`h-2 rounded-full ${d.kehadiran >= 93 ? 'bg-emerald-500' : 'bg-yellow-400'}`} style={{ width: `${d.kehadiran}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-gray-700">{d.kehadiran}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${d.kuis >= 85 ? 'text-emerald-600' : 'text-blue-600'}`}>{d.kuis}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-800">{d.pelatihan} sesi</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Instruktur Tab */}
      {tab === 'instruktur' && (
        <div className="space-y-4">
          {instrukturData.map((inst, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 text-white flex items-center justify-center font-bold">{inst.nama.split(' ').slice(-1)[0].charAt(0)}{inst.nama.split(' ')[0].charAt(0)}</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{inst.nama}</p>
                  <p className="text-sm text-gray-500">{inst.bidang}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {[['Kelas', inst.kelas], ['Siswa', inst.siswa], ['Rating', `⭐ ${inst.rating}`], ['Kehadiran', `${inst.kehadiran}%`]].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-xs text-gray-400">{k}</p>
                      <p className="font-bold text-gray-800 text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Masalah Tab */}
      {tab === 'masalah' && (
        <div className="space-y-3">
          {masalahData.map(m => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 text-sm font-bold flex-shrink-0">⚠️</div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{m.jenis}</span>
                    <span className={`text-xs font-medium ${m.prioritas === 'Tinggi' ? 'text-red-500' : 'text-gray-500'}`}>{m.prioritas === 'Tinggi' ? '🔴' : '🟡'} {m.prioritas}</span>
                  </div>
                  <p className="text-sm text-gray-800">{m.deskripsi}</p>
                </div>
              </div>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusMasalahColor[m.status]}`}>{m.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}