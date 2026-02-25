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

const mataPelajaran = [
  { nama: 'Bahasa Jepang N4', bobot: 40 },
  { nama: 'Budaya & Etika Kerja', bobot: 20 },
  { nama: 'Teknis Bidang Kerja', bobot: 25 },
  { nama: 'K3 & Keselamatan', bobot: 15 },
];

const seed = (i, j) => Math.min(100, Math.max(50, Math.round(60 + Math.sin(i * 7 + j * 3) * 25 + Math.cos(i + j * 2) * 10)));

const nilaiData = siswaBatch.map((s, i) => ({
  ...s,
  nilai: mataPelajaran.map((m, j) => ({
    mata: m.nama,
    bobot: m.bobot,
    UTS: seed(i, j),
    UAS: seed(i + 5, j),
    tugas: seed(i + 2, j + 1),
  })),
}));

nilaiData.forEach(s => {
  s.nilai.forEach(n => {
    n.rata = Math.round((n.UTS * 0.35 + n.UAS * 0.40 + n.tugas * 0.25));
  });
  s.nilaiAkhir = Math.round(s.nilai.reduce((acc, n) => acc + n.rata * n.bobot / 100, 0));
  s.predikat = s.nilaiAkhir >= 90 ? 'A' : s.nilaiAkhir >= 80 ? 'B+' : s.nilaiAkhir >= 70 ? 'B' : s.nilaiAkhir >= 60 ? 'C' : 'D';
  s.lulus = s.nilaiAkhir >= 70;
});

const predikatColor = { A: 'bg-green-100 text-green-700', 'B+': 'bg-blue-100 text-blue-700', B: 'bg-indigo-100 text-indigo-700', C: 'bg-yellow-100 text-yellow-700', D: 'bg-red-100 text-red-700' };
const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500'];

function nilaiColor(n) { return n >= 85 ? 'text-green-600' : n >= 70 ? 'text-blue-600' : n >= 60 ? 'text-yellow-600' : 'text-red-600'; }

export default function Penilaian() {
  const [selected, setSelected] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState('B-2024-03');
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Penilaian</h1>
          <p className="text-sm text-gray-500 mt-1">Rekap nilai siswa per mata pelajaran dan evaluasi</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${editMode ? 'bg-green-600 text-white' : 'border border-gray-200 bg-white text-gray-600'}`}>
            {editMode ? '✓ Simpan Nilai' : '✎ Input Nilai'}
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">↓ Export</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
          <option>B-2024-03</option><option>B-2024-02</option><option>B-2025-01</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
          <option>Evaluasi Bulan 3 - Oktober 2024</option>
          <option>Evaluasi Bulan 2 - September 2024</option>
          <option>Evaluasi Bulan 1 - Agustus 2024</option>
        </select>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Rata-rata Kelas</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{Math.round(nilaiData.reduce((a, b) => a + b.nilaiAkhir, 0) / nilaiData.length)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Nilai Tertinggi</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{Math.max(...nilaiData.map(s => s.nilaiAkhir))}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Nilai Terendah</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{Math.min(...nilaiData.map(s => s.nilaiAkhir))}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Lulus (≥70)</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{nilaiData.filter(s => s.lulus).length}/{nilaiData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Perlu Perhatian</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{nilaiData.filter(s => !s.lulus).length}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Table */}
        <div className={`${selected ? 'col-span-2' : 'col-span-3'} bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="px-4 py-3">Siswa</th>
                {mataPelajaran.map(m => (
                  <th key={m.nama} className="px-3 py-3 text-center">
                    <div>{m.nama.split(' ').slice(0, 2).join(' ')}</div>
                    <div className="text-gray-400 font-normal">bobot {m.bobot}%</div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center">Nilai Akhir</th>
                <th className="px-4 py-3 text-center">Predikat</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {nilaiData.map((row, i) => (
                <tr key={row.id} onClick={() => setSelected(selected?.id === row.id ? null : row)}
                  className={`border-b border-gray-50 cursor-pointer hover:bg-blue-50 transition ${selected?.id === row.id ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{row.foto}</div>
                      <div>
                        <p className="font-medium text-gray-800 text-xs">{row.nama.split(' ')[0]} {row.nama.split(' ')[1]}</p>
                        <p className="text-gray-400 text-xs">{row.id}</p>
                      </div>
                    </div>
                  </td>
                  {row.nilai.map((n, j) => (
                    <td key={j} className="px-3 py-3 text-center">
                      {editMode
                        ? <input defaultValue={n.rata} className="w-14 border border-blue-200 rounded px-1 py-0.5 text-xs text-center focus:outline-none" />
                        : <span className={`font-bold text-sm ${nilaiColor(n.rata)}`}>{n.rata}</span>
                      }
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-lg font-bold ${nilaiColor(row.nilaiAkhir)}`}>{row.nilaiAkhir}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold px-2 py-1 rounded-full ${predikatColor[row.predikat]}`}>{row.predikat}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.lulus ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {row.lulus ? 'Lulus' : 'Tidak Lulus'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <div className={`w-10 h-10 ${avatarColors[nilaiData.findIndex(s => s.id === selected.id) % avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold`}>{selected.foto}</div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{selected.nama}</p>
                <p className="text-xs text-gray-500">Nilai Akhir: <span className={`font-bold ${nilaiColor(selected.nilaiAkhir)}`}>{selected.nilaiAkhir}</span> ({selected.predikat})</p>
              </div>
              <button onClick={() => setSelected(null)} className="ml-auto text-gray-400 text-xs">✕</button>
            </div>
            <div className="space-y-4">
              {selected.nilai.map((n, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">{n.mata}</span>
                    <span className={`text-xs font-bold ${nilaiColor(n.rata)}`}>{n.rata}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                    <div className={`h-1.5 rounded-full ${n.rata >= 85 ? 'bg-green-400' : n.rata >= 70 ? 'bg-blue-400' : 'bg-yellow-400'}`} style={{ width: `${n.rata}%` }} />
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>UTS: <strong>{n.UTS}</strong></span>
                    <span>UAS: <strong>{n.UAS}</strong></span>
                    <span>Tugas: <strong>{n.tugas}</strong></span>
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-4 pt-3 border-t border-gray-100 p-3 rounded-xl ${selected.lulus ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className={`text-sm font-bold ${selected.lulus ? 'text-green-700' : 'text-red-700'}`}>
                {selected.lulus ? '✓ Siswa Lulus Evaluasi' : '✗ Siswa Tidak Lulus'}
              </p>
              {!selected.lulus && <p className="text-xs text-red-600 mt-0.5">Diperlukan remedial sebelum melanjutkan tahap berikutnya.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}