import React, { useState } from 'react';

const siswaBatch = [
  { id: 'SIS-0142', nama: 'Ahmad Fauzan Hidayat', foto: 'AF' },
  { id: 'SIS-0143', nama: 'Dewi Rahayu Putri', foto: 'DR' },
  { id: 'SIS-0144', nama: 'Rizki Maulana', foto: 'RM' },
  { id: 'SIS-0145', nama: 'Siti Nurhaliza', foto: 'SN' },
  { id: 'SIS-0146', nama: 'Budi Santoso', foto: 'BS' },
  { id: 'SIS-0147', nama: 'Mega Wulandari', foto: 'MW' },
  { id: 'SIS-0148', nama: 'Dimas Pratama', foto: 'DP' },
  { id: 'SIS-0149', nama: 'Reni Anggraini', foto: 'RA' },
];

const hariKerja = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'];
const generateAbsensi = (seed) => {
  const options = ['H', 'H', 'H', 'H', 'I', 'A', 'S', 'H'];
  return Array.from({ length: 22 }, (_, i) => options[(seed * 3 + i * 7) % options.length]);
};

const absensiData = siswaBatch.map((s, idx) => ({
  ...s,
  record: generateAbsensi(idx),
}));

const statusAbsensi = { H: 'Hadir', I: 'Izin', S: 'Sakit', A: 'Alpa' };
const statusColor = { H: 'bg-green-500', I: 'bg-blue-400', S: 'bg-yellow-400', A: 'bg-red-400' };
const statusBg = { H: 'bg-green-100 text-green-700', I: 'bg-blue-100 text-blue-700', S: 'bg-yellow-100 text-yellow-700', A: 'bg-red-100 text-red-700' };
const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500'];

const dates = Array.from({ length: 22 }, (_, i) => {
  const d = new Date(2024, 9, i + 1);
  return { day: d.getDate(), label: hariKerja[d.getDay() === 0 ? 4 : d.getDay() - 1] || '—' };
});

export default function Absensi() {
  const [selectedBatch, setSelectedBatch] = useState('B-2024-03');
  const [selectedMata, setSelectedMata] = useState('Bahasa Jepang N4');
  const [showInput, setShowInput] = useState(false);
  const [todayAbsensi, setTodayAbsensi] = useState(Object.fromEntries(siswaBatch.map(s => [s.id, 'H'])));

  const mataList = ['Bahasa Jepang N4', 'Teknis Manufaktur', 'Budaya Jepang', 'K3'];

  const getStats = (record) => ({
    H: record.filter(r => r === 'H').length,
    I: record.filter(r => r === 'I').length,
    S: record.filter(r => r === 'S').length,
    A: record.filter(r => r === 'A').length,
    pct: Math.round((record.filter(r => r === 'H').length / record.length) * 100),
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Absensi</h1>
          <p className="text-sm text-gray-500 mt-1">Rekap kehadiran siswa per mata pelajaran</p>
        </div>
        <button onClick={() => setShowInput(!showInput)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${showInput ? 'bg-gray-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {showInput ? '← Rekap' : '✓ Input Absensi Hari Ini'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div>
          <label className="text-xs text-gray-500 font-medium mr-2">Batch</label>
          <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
            <option>B-2024-03</option><option>B-2024-02</option><option>B-2025-01</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium mr-2">Mata Pelajaran</label>
          <select value={selectedMata} onChange={e => setSelectedMata(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
            {mataList.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium mr-2">Periode</label>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
            <option>Oktober 2024</option><option>September 2024</option><option>Agustus 2024</option>
          </select>
        </div>
      </div>

      {showInput ? (
        /* Input Absensi Mode */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">Input Absensi Hari Ini</h3>
              <p className="text-xs text-gray-500 mt-0.5">Rabu, 16 Oktober 2024 · {selectedMata} · {selectedBatch}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setTodayAbsensi(Object.fromEntries(siswaBatch.map(s => [s.id, 'H'])))}
                className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">Semua Hadir</button>
              <button className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg font-medium">Simpan Absensi</button>
            </div>
          </div>
          <div className="space-y-3">
            {siswaBatch.map((s, i) => (
              <div key={s.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                <div className={`w-9 h-9 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{s.foto}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{s.nama}</p>
                  <p className="text-xs text-gray-400">{s.id}</p>
                </div>
                <div className="flex gap-2">
                  {['H', 'I', 'S', 'A'].map(code => (
                    <button key={code} onClick={() => setTodayAbsensi({ ...todayAbsensi, [s.id]: code })}
                      className={`w-10 h-8 rounded-lg text-xs font-bold transition ${todayAbsensi[s.id] === code ? `${statusColor[code]} text-white` : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      {code}
                    </button>
                  ))}
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full font-medium min-w-16 text-center ${statusBg[todayAbsensi[s.id]]}`}>{statusAbsensi[todayAbsensi[s.id]]}</div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <label className="text-xs text-gray-500 font-medium">Catatan Kelas (opsional)</label>
            <textarea rows={2} placeholder="Catatan pertemuan hari ini..." className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
          </div>
        </div>
      ) : (
        /* Rekap Mode */
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[['Total Hadir', 'H', 'text-green-600'], ['Izin', 'I', 'text-blue-600'], ['Sakit', 'S', 'text-yellow-600'], ['Alpa', 'A', 'text-red-600']].map(([label, code, color]) => (
              <div key={code} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className={`w-8 h-8 ${statusColor[code]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>{code}</div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className={`font-bold ${color}`}>{absensiData.reduce((acc, s) => acc + getStats(s.record)[code], 0)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-3 text-xs text-gray-500">
            {Object.entries(statusAbsensi).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <div className={`w-4 h-4 ${statusColor[k]} rounded flex items-center justify-center text-white text-xs font-bold`}>{k}</div>
                <span>{v}</span>
              </div>
            ))}
          </div>

          {/* Rekap Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-gray-500 sticky left-0 bg-white min-w-40">Siswa</th>
                  {dates.map((d, i) => (
                    <th key={i} className="px-1 py-3 text-center text-gray-400 font-normal w-8">
                      <div className="text-xs text-gray-300">{d.label}</div>
                      <div className="font-semibold text-gray-600">{d.day}</div>
                    </th>
                  ))}
                  <th className="px-3 py-3 text-center text-gray-500">H</th>
                  <th className="px-3 py-3 text-center text-gray-500">I</th>
                  <th className="px-3 py-3 text-center text-gray-500">S</th>
                  <th className="px-3 py-3 text-center text-gray-500">A</th>
                  <th className="px-3 py-3 text-center text-gray-500">%</th>
                </tr>
              </thead>
              <tbody>
                {absensiData.map((row, i) => {
                  const stats = getStats(row.record);
                  return (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2.5 sticky left-0 bg-white">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{row.foto}</div>
                          <span className="font-medium text-gray-700 text-xs whitespace-nowrap">{row.nama.split(' ')[0]}</span>
                        </div>
                      </td>
                      {row.record.map((r, j) => (
                        <td key={j} className="px-0.5 py-2.5 text-center">
                          <div className={`w-6 h-6 mx-auto ${statusColor[r]} rounded flex items-center justify-center text-white text-xs font-bold`}>{r}</div>
                        </td>
                      ))}
                      <td className="px-3 py-2.5 text-center font-bold text-green-600">{stats.H}</td>
                      <td className="px-3 py-2.5 text-center font-bold text-blue-500">{stats.I}</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-500">{stats.S}</td>
                      <td className="px-3 py-2.5 text-center font-bold text-red-500">{stats.A}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`font-bold text-xs ${stats.pct >= 80 ? 'text-green-600' : stats.pct >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{stats.pct}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}