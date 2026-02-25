import React, { useState } from 'react';

const dummyData = [
  { id: 'JDW-001', batch: 'B-2024-02', program: 'Tokutei Ginou', tanggalBerangkat: '2025-02-10', bandara: 'Soekarno-Hatta (CGK)', kota: 'Jakarta', tujuan: 'Nagoya (NGO)', maskapai: 'Garuda Indonesia', noPenerbangan: 'GA-880', jamBerangkat: '08:30', jamTiba: '16:45', jumlahSiswa: 12, statusJadwal: 'Konfirmasi', pic: 'Budi Hartono' },
  { id: 'JDW-002', batch: 'B-2024-03', program: 'Magang (Kenshusei)', tanggalBerangkat: '2025-03-05', bandara: 'Soekarno-Hatta (CGK)', kota: 'Jakarta', tujuan: 'Tokyo (NRT)', maskapai: 'Japan Airlines', noPenerbangan: 'JL-725', jamBerangkat: '10:00', jamTiba: '18:20', jumlahSiswa: 8, statusJadwal: 'Pending', pic: 'Admin Jakarta' },
  { id: 'JDW-003', batch: 'B-2024-02', program: 'Tokutei Ginou', tanggalBerangkat: '2025-02-10', bandara: 'Juanda (SUB)', kota: 'Surabaya', tujuan: 'Osaka (KIX)', maskapai: 'ANA', noPenerbangan: 'NH-836', jamBerangkat: '14:00', jamTiba: '21:30', jumlahSiswa: 6, statusJadwal: 'Konfirmasi', pic: 'Dewi Rahayu' },
  { id: 'JDW-004', batch: 'B-2025-01', program: 'Tokutei Ginou', tanggalBerangkat: '2025-07-20', bandara: 'Soekarno-Hatta (CGK)', kota: 'Jakarta', tujuan: 'Sapporo (CTS)', maskapai: 'Garuda Indonesia', noPenerbangan: 'GA-882', jamBerangkat: '09:00', jamTiba: '17:30', jumlahSiswa: 0, statusJadwal: 'Draft', pic: 'Admin Pusat' },
];

const statusColor = { Konfirmasi: 'bg-green-100 text-green-700', Pending: 'bg-yellow-100 text-yellow-700', Draft: 'bg-gray-100 text-gray-500', Batal: 'bg-red-100 text-red-700' };
const programColor = { 'Tokutei Ginou': 'bg-blue-100 text-blue-700', 'Magang (Kenshusei)': 'bg-purple-100 text-purple-700' };

export default function JadwalKeberangkatan() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jadwal Keberangkatan</h1>
          <p className="text-sm text-gray-500 mt-1">Daftar jadwal penerbangan keberangkatan siswa ke Jepang</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Jadwal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Jadwal</p><p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Terkonfirmasi</p><p className="text-2xl font-bold text-green-600 mt-1">{dummyData.filter(d => d.statusJadwal === 'Konfirmasi').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Menunggu Konfirmasi</p><p className="text-2xl font-bold text-yellow-600 mt-1">{dummyData.filter(d => d.statusJadwal === 'Pending').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Siswa Berangkat</p><p className="text-2xl font-bold text-purple-600 mt-1">{dummyData.reduce((a, b) => a + b.jumlahSiswa, 0)}</p></div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {dummyData.map(row => (
          <div key={row.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">✈️</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-400">{row.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[row.statusJadwal]}`}>{row.statusJadwal}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${programColor[row.program]}`}>{row.program}</span>
                  </div>
                  <p className="font-bold text-gray-800 mt-0.5">{row.batch} → {row.tujuan}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{row.tanggalBerangkat}</p>
                <p className="text-xs text-gray-400 mt-0.5">Tanggal Berangkat</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4 py-4 border-y border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Bandara Asal</p>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">🛫 {row.bandara}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Maskapai & Nomor</p>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">{row.maskapai}</p>
                <p className="text-xs text-gray-500 font-mono">{row.noPenerbangan}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Jam Berangkat → Tiba</p>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">{row.jamBerangkat} → {row.jamTiba}</p>
                <p className="text-xs text-gray-400">WIB → JST</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Jumlah Siswa</p>
                <p className="font-bold text-blue-600 text-xl mt-0.5">{row.jumlahSiswa} <span className="text-sm font-normal text-gray-500">siswa</span></p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">👤 PIC: <strong>{row.pic}</strong></p>
              <div className="flex gap-2">
                <button onClick={() => { setSelected(row); setShowModal(true); }} className="border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50">Edit</button>
                {row.statusJadwal === 'Pending' && <button className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700">Konfirmasi</button>}
                <button className="border border-blue-200 text-blue-600 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50">Detail Siswa</button>
                <button className="text-red-400 text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Jadwal' : 'Tambah Jadwal Keberangkatan'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Batch', 'batch'], ['Program', 'program'], ['Maskapai', 'maskapai'], ['No. Penerbangan', 'noPenerbangan'], ['Bandara Asal', 'bandara'], ['Tujuan', 'tujuan']].map(([l, k]) => (
                <div key={k}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Tanggal Berangkat</label>
                <input type="date" defaultValue={selected?.tanggalBerangkat || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Jam Berangkat</label>
                <input type="time" defaultValue={selected?.jamBerangkat || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Jam Tiba</label>
                <input type="time" defaultValue={selected?.jamTiba || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div><label className="text-xs text-gray-500 font-medium">PIC</label>
                <input defaultValue={selected?.pic || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}