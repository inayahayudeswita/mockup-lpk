import React, { useState } from 'react';

const placementData = [
  { id: 'PL-2025-001', siswa: 'Doni Setiawan', foto: 'DS', nik: '3201030303930003', perusahaan: 'Mitsubishi Electric', prefektur: 'Tokyo', posisi: 'Teknisi Elektronik', program: 'SSW', gaji: '¥200,000/bln', tanggalBerangkat: '2025-04-01', tanggalTiba: '2025-04-02', masaKontrak: '36 Bulan', dokumen: { paspor: true, coe: true, visa: true, kontrak: true, mcu: true, tiket: true }, tahapan: 'Selesai - Siap Berangkat', progres: 100 },
  { id: 'PL-2025-002', siswa: 'Ahmad Fauzi', foto: 'AF', nik: '3201010101900001', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka', posisi: 'Operator Produksi', program: 'Magang', gaji: '¥135,000/bln', tanggalBerangkat: '2025-03-01', tanggalTiba: '2025-03-02', masaKontrak: '12 Bulan', dokumen: { paspor: true, coe: true, visa: false, kontrak: true, mcu: true, tiket: false }, tahapan: 'Proses Visa', progres: 70 },
  { id: 'PL-2025-003', siswa: 'Dewi Lestari', foto: 'DL', nik: '3201040404940004', perusahaan: 'Honda Motor Co., Ltd.', prefektur: 'Saitama', posisi: 'Operator Produksi', program: 'Magang', gaji: '¥135,000/bln', tanggalBerangkat: '2025-02-15', tanggalTiba: '2025-02-16', masaKontrak: '12 Bulan', dokumen: { paspor: true, coe: true, visa: true, kontrak: true, mcu: true, tiket: true }, tahapan: 'Sudah Berangkat', progres: 100 },
  { id: 'PL-2025-004', siswa: 'Nurul Hidayah', foto: 'NH', nik: '3201060606960006', perusahaan: 'Suzuki Motor Corp.', prefektur: 'Hamamatsu', posisi: 'Operator Produksi', program: 'Magang', gaji: '¥135,000/bln', tanggalBerangkat: '2024-06-01', tanggalTiba: '2024-06-02', masaKontrak: '12 Bulan', dokumen: { paspor: true, coe: true, visa: true, kontrak: true, mcu: true, tiket: true }, tahapan: 'Aktif di Jepang', progres: 100 },
  { id: 'PL-2025-005', siswa: 'Rendi Pratama', foto: 'RP', nik: '3201070707970007', perusahaan: 'Toyota Housing Corp.', prefektur: 'Aichi', posisi: 'Pekerja Konstruksi', program: 'SSW', gaji: '¥180,000/bln', tanggalBerangkat: '2025-05-01', tanggalTiba: '2025-05-02', masaKontrak: '36 Bulan', dokumen: { paspor: true, coe: false, visa: false, kontrak: true, mcu: true, tiket: false }, tahapan: 'Proses COE', progres: 45 },
];

const tahapanColor = {
  'Proses COE': 'bg-blue-100 text-blue-700',
  'Proses Visa': 'bg-yellow-100 text-yellow-700',
  'Selesai - Siap Berangkat': 'bg-purple-100 text-purple-700',
  'Sudah Berangkat': 'bg-emerald-100 text-emerald-700',
  'Aktif di Jepang': 'bg-green-100 text-green-800',
};

function DokChecklist({ label, done }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${done ? 'text-emerald-600' : 'text-gray-400'}`}>
      <span>{done ? '✅' : '⬜'}</span>
      <span>{label}</span>
    </div>
  );
}

export default function PlacementJepang() {
  const [filterTahap, setFilterTahap] = useState('Semua');
  const [selected, setSelected] = useState(null);

  const filtered = placementData.filter(p => filterTahap === 'Semua' || p.tahapan === filterTahap);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Placement ke Perusahaan Jepang</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau proses penempatan siswa ke perusahaan mitra di Jepang</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">+ Tambah Placement</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Placement', val: placementData.length, icon: '📋', color: 'text-gray-800' },
          { label: 'Proses Dokumen', val: placementData.filter(p => !['Sudah Berangkat', 'Aktif di Jepang'].includes(p.tahapan)).length, icon: '📄', color: 'text-blue-600' },
          { label: 'Aktif di Jepang', val: placementData.filter(p => p.tahapan === 'Aktif di Jepang').length, icon: '🇯🇵', color: 'text-emerald-600' },
          { label: 'Siap Berangkat', val: placementData.filter(p => p.tahapan === 'Selesai - Siap Berangkat').length, icon: '✈️', color: 'text-purple-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-1"><span>{s.icon}</span><p className="text-xs text-gray-500">{s.label}</p></div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-4">
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterTahap} onChange={e => setFilterTahap(e.target.value)}>
          {['Semua', 'Proses COE', 'Proses Visa', 'Selesai - Siap Berangkat', 'Sudah Berangkat', 'Aktif di Jepang'].map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Placement Cards */}
      <div className="space-y-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">{p.foto}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-bold text-gray-800">{p.siswa}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500 mt-0.5">
                      <span>🏭 {p.perusahaan}</span>
                      <span>🇯🇵 {p.prefektur}</span>
                      <span>💼 {p.posisi}</span>
                      <span>💴 {p.gaji}</span>
                    </div>
                  </div>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${tahapanColor[p.tahapan]}`}>{p.tahapan}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progres Keberangkatan</span>
                    <span className="font-medium">{p.progres}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full transition-all ${p.progres === 100 ? 'bg-emerald-500' : p.progres >= 60 ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{ width: `${p.progres}%` }}></div>
                  </div>
                </div>

                {/* Dokumen Checklist */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3 bg-gray-50 rounded-lg p-3">
                  <DokChecklist label="Paspor" done={p.dokumen.paspor} />
                  <DokChecklist label="COE" done={p.dokumen.coe} />
                  <DokChecklist label="Visa" done={p.dokumen.visa} />
                  <DokChecklist label="Kontrak" done={p.dokumen.kontrak} />
                  <DokChecklist label="MCU" done={p.dokumen.mcu} />
                  <DokChecklist label="Tiket" done={p.dokumen.tiket} />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>✈️ Rencana Berangkat: <strong>{p.tanggalBerangkat}</strong> · Kontrak: <strong>{p.masaKontrak}</strong></span>
                  <button className="text-blue-500 hover:text-blue-700 font-medium" onClick={() => setSelected(p)}>Detail →</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-lg">{selected.foto}</div>
              <div>
                <h2 className="font-bold text-gray-800">{selected.siswa}</h2>
                <p className="text-sm text-gray-500">{selected.perusahaan}</p>
              </div>
              <button onClick={() => setSelected(null)} className="ml-auto text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              {[['ID', selected.id], ['NIK', selected.nik], ['Program', selected.program], ['Posisi', selected.posisi], ['Prefektur', `🇯🇵 ${selected.prefektur}`], ['Gaji', selected.gaji], ['Tgl Berangkat', selected.tanggalBerangkat], ['Masa Kontrak', selected.masaKontrak]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium text-gray-800">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Kelengkapan Dokumen</p>
              <div className="grid grid-cols-3 gap-2">
                {[['Paspor', selected.dokumen.paspor], ['COE', selected.dokumen.coe], ['Visa', selected.dokumen.visa], ['Kontrak', selected.dokumen.kontrak], ['MCU', selected.dokumen.mcu], ['Tiket', selected.dokumen.tiket]].map(([k, v]) => (
                  <DokChecklist key={k} label={k} done={v} />
                ))}
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">📝 Update Status Dokumen</button>
          </div>
        </div>
      )}
    </div>
  );
}