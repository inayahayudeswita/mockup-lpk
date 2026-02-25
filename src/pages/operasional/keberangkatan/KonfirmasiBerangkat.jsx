import React, { useState } from 'react';

const konfirmasiData = [
  { id: 'SIS-0142', nama: 'Ahmad Fauzan Hidayat', foto: 'AF', jadwal: 'GA-880 · 10 Feb 2025', tujuan: 'Nagoya', dokumenFinal: true, pembayaranLunas: true, checklistOK: false, konfirmasiSiswa: true, tandaTangan: true, statusKonfirmasi: 'Menunggu Checklist' },
  { id: 'SIS-0143', nama: 'Dewi Rahayu Putri', foto: 'DR', jadwal: 'GA-880 · 10 Feb 2025', tujuan: 'Nagoya', dokumenFinal: true, pembayaranLunas: true, checklistOK: true, konfirmasiSiswa: true, tandaTangan: true, statusKonfirmasi: 'Terkonfirmasi' },
  { id: 'SIS-0146', nama: 'Budi Santoso', foto: 'BS', jadwal: 'GA-880 · 10 Feb 2025', tujuan: 'Nagoya', dokumenFinal: false, pembayaranLunas: false, checklistOK: false, konfirmasiSiswa: false, tandaTangan: false, statusKonfirmasi: 'Belum Siap' },
];

const statusColor = { 'Terkonfirmasi': 'bg-green-100 text-green-700', 'Menunggu Checklist': 'bg-yellow-100 text-yellow-700', 'Belum Siap': 'bg-red-100 text-red-700' };
const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-teal-500'];

export default function KonfirmasiBerangkat() {
  const [selected, setSelected] = useState(konfirmasiData[0]);
  const [showModal, setShowModal] = useState(false);

  const gateItems = [
    { key: 'dokumenFinal', label: 'Dokumen Final Lengkap' },
    { key: 'pembayaranLunas', label: 'Pembayaran Lunas' },
    { key: 'checklistOK', label: 'Checklist Pra-Berangkat OK' },
    { key: 'konfirmasiSiswa', label: 'Konfirmasi dari Siswa' },
    { key: 'tandaTangan', label: 'Tanda Tangan Surat Keberangkatan' },
  ];

  const passedGates = gateItems.filter(g => selected[g.key]).length;
  const allPassed = passedGates === gateItems.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Konfirmasi Berangkat</h1>
          <p className="text-sm text-gray-500 mt-1">Verifikasi final sebelum penerbangan siswa ke Jepang</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">✓ Konfirmasi Massal</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Siswa</p><p className="text-2xl font-bold text-blue-600">{konfirmasiData.length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-green-500"><p className="text-xs text-gray-500">Terkonfirmasi</p><p className="text-2xl font-bold text-green-600">{konfirmasiData.filter(d => d.statusKonfirmasi === 'Terkonfirmasi').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-red-400"><p className="text-xs text-gray-500">Belum Siap</p><p className="text-2xl font-bold text-red-600">{konfirmasiData.filter(d => d.statusKonfirmasi !== 'Terkonfirmasi').length}</p></div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-3">
          {konfirmasiData.map((s, i) => (
            <div key={s.id} onClick={() => setSelected(s)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition ${selected.id === s.id ? 'border-blue-300 shadow-md' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 ${avatarColors[i]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{s.foto}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{s.nama.split(' ')[0]}</p>
                  <p className="text-xs text-gray-400">{s.tujuan}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[s.statusKonfirmasi]}`}>{s.statusKonfirmasi}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gate Detail */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className={`w-10 h-10 ${avatarColors[konfirmasiData.findIndex(s => s.id === selected.id)]} rounded-full flex items-center justify-center text-white font-bold`}>{selected.foto}</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800">{selected.nama}</p>
              <p className="text-xs text-gray-500">{selected.jadwal}</p>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusColor[selected.statusKonfirmasi]}`}>{selected.statusKonfirmasi}</span>
          </div>

          {/* Gate Checklist */}
          <p className="text-xs font-semibold text-gray-500 mb-3">GATE KONFIRMASI ({passedGates}/{gateItems.length})</p>
          <div className="space-y-3 mb-6">
            {gateItems.map((g, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${selected[g.key] ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${selected[g.key] ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <span className="text-white text-xs font-bold">{selected[g.key] ? '✓' : i + 1}</span>
                </div>
                <span className={`flex-1 text-sm ${selected[g.key] ? 'text-gray-700' : 'text-gray-400'}`}>{g.label}</span>
                <span className={`text-xs font-medium ${selected[g.key] ? 'text-green-600' : 'text-gray-400'}`}>{selected[g.key] ? 'Selesai' : 'Belum'}</span>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-500">Progres Konfirmasi</span>
              <span className="font-bold text-sm text-gray-700">{passedGates}/{gateItems.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className={`h-3 rounded-full transition-all ${allPassed ? 'bg-green-500' : passedGates >= 3 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${(passedGates / gateItems.length) * 100}%` }} />
            </div>
          </div>

          <button className={`w-full py-3 rounded-xl text-sm font-semibold transition ${allPassed ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {allPassed ? '✅ Konfirmasi Keberangkatan' : `⚠️ Selesaikan ${gateItems.length - passedGates} item lagi`}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Konfirmasi Massal</h2>
            <p className="text-sm text-gray-500 mb-4">Konfirmasi keberangkatan untuk semua siswa yang telah memenuhi semua gate.</p>
            <div className="space-y-2 mb-4">
              {konfirmasiData.map((s, i) => (
                <div key={s.id} className={`flex items-center gap-3 p-2 rounded-lg ${s.statusKonfirmasi === 'Terkonfirmasi' ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <div className={`w-7 h-7 ${avatarColors[i]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{s.foto}</div>
                  <span className="text-sm flex-1">{s.nama}</span>
                  <span className={`text-xs ${statusColor[s.statusKonfirmasi]} px-2 py-0.5 rounded-full`}>{s.statusKonfirmasi}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-green-600 text-white rounded-lg py-2 text-sm font-medium">Konfirmasi yang Siap</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}