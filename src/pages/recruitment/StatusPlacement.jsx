import React, { useState } from 'react';

const statusData = [
  { id: 'SP-001', siswa: 'Nurul Hidayah', foto: 'NH', perusahaan: 'Suzuki Motor Corp.', prefektur: 'Hamamatsu', posisi: 'Operator Produksi', program: 'Magang', tanggalMasuk: '2024-06-02', tanggalSelesai: '2025-06-01', bulanBerjalan: 9, totalBulan: 12, gaji: '¥135,000', statusKerja: 'Aktif', evaluasiTerakhir: 'Sangat Baik', masalah: null, keterangan: 'Performa sangat baik, disiplin tinggi' },
  { id: 'SP-002', siswa: 'Dewi Lestari', foto: 'DL', perusahaan: 'Honda Motor Co., Ltd.', prefektur: 'Saitama', posisi: 'Operator Produksi', program: 'Magang', tanggalMasuk: '2025-02-16', tanggalSelesai: '2026-02-15', bulanBerjalan: 1, totalBulan: 12, gaji: '¥135,000', statusKerja: 'Aktif', evaluasiTerakhir: 'Baik', masalah: null, keterangan: 'Baru masuk, adaptasi baik' },
  { id: 'SP-003', siswa: 'Bagas Prasetyo', foto: 'BP', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka', posisi: 'Operator Produksi', program: 'Magang', tanggalMasuk: '2024-03-10', tanggalSelesai: '2025-03-09', bulanBerjalan: 11, totalBulan: 12, gaji: '¥135,000', statusKerja: 'Aktif', evaluasiTerakhir: 'Cukup', masalah: 'Kesulitan komunikasi', keterangan: 'Perlu pendampingan komunikasi bahasa Jepang' },
  { id: 'SP-004', siswa: 'Indah Ramadhani', foto: 'IR', perusahaan: 'Panasonic Corp.', prefektur: 'Osaka', posisi: 'QC Inspector', program: 'Tokutei Ginou', tanggalMasuk: '2023-08-01', tanggalSelesai: '2026-07-31', bulanBerjalan: 19, totalBulan: 36, gaji: '¥190,000', statusKerja: 'Aktif', evaluasiTerakhir: 'Sangat Baik', masalah: null, keterangan: 'Kandidat terbaik, dipertimbangkan perpanjangan' },
  { id: 'SP-005', siswa: 'Wahyu Santoso', foto: 'WS', perusahaan: 'Toyota Housing Corp.', prefektur: 'Aichi', posisi: 'Konstruksi', program: 'SSW', tanggalMasuk: '2023-04-05', tanggalSelesai: '2026-04-04', bulanBerjalan: 23, totalBulan: 36, gaji: '¥180,000', statusKerja: 'Bermasalah', evaluasiTerakhir: 'Kurang', masalah: 'Konflik dengan rekan kerja, tidak hadir 3 hari', keterangan: 'Perlu mediasi segera' },
];

const statusColor = {
  'Aktif': 'bg-emerald-100 text-emerald-700',
  'Bermasalah': 'bg-red-100 text-red-700',
  'Selesai': 'bg-gray-100 text-gray-600',
  'Kembali ke Indonesia': 'bg-blue-100 text-blue-700',
};

const evaluasiColor = {
  'Sangat Baik': 'text-emerald-600',
  'Baik': 'text-blue-600',
  'Cukup': 'text-yellow-600',
  'Kurang': 'text-red-500',
};

export default function StatusPlacement() {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selected, setSelected] = useState(null);

  const filtered = statusData.filter(d => filterStatus === 'Semua' || d.statusKerja === filterStatus);
  const bermasalah = statusData.filter(d => d.masalah);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Status Placement</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor status dan perkembangan TKI yang sedang aktif di Jepang</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">📊 Export Laporan</button>
      </div>

      {/* Alert Masalah */}
      {bermasalah.length > 0 && (
        <div className="mb-5 bg-red-50 border border-red-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🚨</span>
            <p className="font-bold text-red-800 text-sm">{bermasalah.length} TKI memerlukan perhatian segera</p>
          </div>
          {bermasalah.map(m => (
            <div key={m.id} className="flex items-center justify-between bg-red-100 rounded-lg px-3 py-2 mt-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-300 text-red-800 flex items-center justify-center text-xs font-bold">{m.foto}</div>
                <div>
                  <p className="text-xs font-semibold text-red-800">{m.siswa} — {m.perusahaan}</p>
                  <p className="text-xs text-red-600">{m.masalah}</p>
                </div>
              </div>
              <button className="text-xs bg-red-600 text-white px-2.5 py-1 rounded-lg hover:bg-red-700">Tangani</button>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Aktif', val: statusData.filter(d => d.statusKerja === 'Aktif').length, icon: '🇯🇵', color: 'text-emerald-600' },
          { label: 'Bermasalah', val: statusData.filter(d => d.statusKerja === 'Bermasalah').length, icon: '⚠️', color: 'text-red-600' },
          { label: 'Akan Selesai (≤3 Bln)', val: statusData.filter(d => d.totalBulan - d.bulanBerjalan <= 3).length, icon: '⏳', color: 'text-orange-500' },
          { label: 'Evaluasi "Sangat Baik"', val: statusData.filter(d => d.evaluasiTerakhir === 'Sangat Baik').length, icon: '⭐', color: 'text-yellow-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-1"><span>{s.icon}</span><p className="text-xs text-gray-500">{s.label}</p></div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-4">
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {['Semua', 'Aktif', 'Bermasalah', 'Selesai'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map(d => {
          const sisaBulan = d.totalBulan - d.bulanBerjalan;
          const progres = Math.round((d.bulanBerjalan / d.totalBulan) * 100);
          return (
            <div key={d.id} className={`bg-white rounded-xl border shadow-sm p-5 ${d.statusKerja === 'Bermasalah' ? 'border-red-300' : 'border-gray-200'}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center font-bold flex-shrink-0">{d.foto}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="font-bold text-gray-800">{d.siswa}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500 mt-0.5">
                        <span>🏭 {d.perusahaan}</span>
                        <span>🇯🇵 {d.prefektur}</span>
                        <span>💼 {d.posisi}</span>
                        <span>💴 {d.gaji}/bln</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[d.statusKerja]}`}>{d.statusKerja}</span>
                      <span className={`text-xs font-semibold ${evaluasiColor[d.evaluasiTerakhir]}`}>⭐ {d.evaluasiTerakhir}</span>
                    </div>
                  </div>

                  {/* Progress Kontrak */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Masa Kontrak: {d.bulanBerjalan}/{d.totalBulan} bulan</span>
                      <span className={sisaBulan <= 3 ? 'text-orange-500 font-medium' : 'text-gray-500'}>{sisaBulan} bulan tersisa</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${progres >= 90 ? 'bg-orange-400' : 'bg-emerald-500'}`} style={{ width: `${progres}%` }}></div>
                    </div>
                  </div>

                  {/* Keterangan */}
                  <div className={`rounded-lg p-2.5 mb-3 text-xs ${d.masalah ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                    {d.masalah ? (
                      <p className="text-red-700 font-medium">⚠️ Masalah: {d.masalah}</p>
                    ) : (
                      <p className="text-gray-600">📝 {d.keterangan}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Kontrak s/d: <strong className="text-gray-700">{d.tanggalSelesai}</strong></span>
                    <div className="flex gap-2">
                      {d.masalah && <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 font-medium">🆘 Mediasi</button>}
                      {sisaBulan <= 3 && <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 font-medium">🔄 Perpanjang</button>}
                      <button className="border border-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-50" onClick={() => setSelected(d)}>Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center font-bold">{selected.foto}</div>
              <div>
                <h2 className="font-bold text-gray-800">{selected.siswa}</h2>
                <p className="text-sm text-gray-500">{selected.perusahaan} · {selected.prefektur}</p>
              </div>
              <button onClick={() => setSelected(null)} className="ml-auto text-gray-400 text-xl">✕</button>
            </div>
            <div className="space-y-1.5 text-sm mb-4">
              {[['ID', selected.id], ['Program', selected.program], ['Posisi', selected.posisi], ['Gaji', selected.gaji], ['Mulai Kerja', selected.tanggalMasuk], ['Selesai Kontrak', selected.tanggalSelesai], ['Evaluasi', selected.evaluasiTerakhir], ['Status', selected.statusKerja]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium text-gray-800">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">📝 Tambah Catatan</button>
              <button className="border border-gray-200 text-sm px-4 py-2 rounded-lg text-gray-600" onClick={() => setSelected(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}