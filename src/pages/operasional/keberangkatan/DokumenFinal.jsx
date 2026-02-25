import React, { useState } from 'react';

const finalDokumen = [
  { id: 1, nama: 'Ahmad Fauzan Hidayat', foto: 'AF', dokumen: [
    { nama: 'Paspor', status: 'OK', expiry: '2030-09-15' },
    { nama: 'Visa Kerja TG', status: 'OK', expiry: '2027-02-10' },
    { nama: 'Kontrak Kerja', status: 'OK', expiry: null },
    { nama: 'Sertifikat JLPT N4', status: 'OK', expiry: null },
    { nama: 'Sertifikat TG Skills', status: 'OK', expiry: null },
    { nama: 'MCU Terbaru', status: 'Perlu Perbarui', expiry: '2025-06-18' },
    { nama: 'Tiket Pesawat', status: 'OK', expiry: null },
    { nama: 'Bukti Lunas LPK', status: 'OK', expiry: null },
  ]},
  { id: 2, nama: 'Dewi Rahayu Putri', foto: 'DR', dokumen: [
    { nama: 'Paspor', status: 'OK', expiry: '2029-11-05' },
    { nama: 'Visa Kerja TG', status: 'OK', expiry: '2027-02-10' },
    { nama: 'Kontrak Kerja', status: 'OK', expiry: null },
    { nama: 'Sertifikat JLPT N4', status: 'OK', expiry: null },
    { nama: 'Sertifikat TG Skills', status: 'OK', expiry: null },
    { nama: 'MCU Terbaru', status: 'OK', expiry: '2025-12-20' },
    { nama: 'Tiket Pesawat', status: 'OK', expiry: null },
    { nama: 'Bukti Lunas LPK', status: 'OK', expiry: null },
  ]},
  { id: 3, nama: 'Budi Santoso', foto: 'BS', dokumen: [
    { nama: 'Paspor', status: 'OK', expiry: '2028-04-22' },
    { nama: 'Visa Kerja TG', status: 'Menunggu', expiry: null },
    { nama: 'Kontrak Kerja', status: 'OK', expiry: null },
    { nama: 'Sertifikat JLPT N4', status: 'OK', expiry: null },
    { nama: 'Sertifikat TG Skills', status: 'OK', expiry: null },
    { nama: 'MCU Terbaru', status: 'OK', expiry: '2025-08-10' },
    { nama: 'Tiket Pesawat', status: 'OK', expiry: null },
    { nama: 'Bukti Lunas LPK', status: 'Belum Lunas', expiry: null },
  ]},
];

const docStatusColor = { OK: 'bg-green-100 text-green-700', 'Perlu Perbarui': 'bg-orange-100 text-orange-700', Menunggu: 'bg-yellow-100 text-yellow-700', 'Belum Lunas': 'bg-red-100 text-red-700' };
const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-teal-500'];

export default function DokumenFinal() {
  const [selected, setSelected] = useState(finalDokumen[0]);

  const countOK = (s) => s.dokumen.filter(d => d.status === 'OK').length;
  const totalDok = finalDokumen[0].dokumen.length;
  const siap = (s) => countOK(s) === totalDok;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dokumen Final</h1>
          <p className="text-sm text-gray-500 mt-1">Verifikasi kelengkapan dokumen akhir sebelum keberangkatan</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">↓ Export Rekap</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-3">
          {finalDokumen.map((s, i) => (
            <div key={s.id} onClick={() => setSelected(s)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition ${selected.id === s.id ? 'border-blue-300 shadow-md' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 ${avatarColors[i]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{s.foto}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{s.nama.split(' ')[0]}</p>
                  <p className="text-xs text-gray-400">{s.nama.split(' ').slice(1).join(' ')}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${siap(s) ? 'bg-green-500' : countOK(s) >= totalDok * 0.7 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${(countOK(s) / totalDok) * 100}%` }} />
                </div>
                <span className={`ml-2 text-xs font-bold ${siap(s) ? 'text-green-600' : 'text-orange-600'}`}>{countOK(s)}/{totalDok}</span>
              </div>
              <p className={`text-xs mt-1 font-medium ${siap(s) ? 'text-green-600' : 'text-orange-600'}`}>{siap(s) ? '✅ Siap' : '⚠️ Perlu perhatian'}</p>
            </div>
          ))}
        </div>

        {/* Detail */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className={`w-10 h-10 ${avatarColors[finalDokumen.findIndex(s => s.id === selected.id)]} rounded-full flex items-center justify-center text-white font-bold`}>{selected.foto}</div>
            <div>
              <p className="font-bold text-gray-800">{selected.nama}</p>
              <p className="text-xs text-gray-500">{countOK(selected)}/{totalDok} dokumen lengkap</p>
            </div>
            <div className="ml-auto">
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${siap(selected) ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {siap(selected) ? '✅ Siap Berangkat' : '⚠️ Belum Lengkap'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {selected.dokumen.map((d, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${d.status === 'OK' ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{d.nama}</p>
                  {d.expiry && <p className="text-xs text-gray-400 mt-0.5">Exp: {d.expiry}</p>}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${docStatusColor[d.status]}`}>{d.status}</span>
              </div>
            ))}
          </div>

          {!siap(selected) && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-xs font-semibold text-red-700 mb-1">Dokumen yang perlu diperhatikan:</p>
              {selected.dokumen.filter(d => d.status !== 'OK').map((d, i) => (
                <p key={i} className="text-xs text-red-600">• {d.nama}: <strong>{d.status}</strong></p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}