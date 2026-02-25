import React, { useState } from 'react';

const siswaDepartureList = [
  { id: 'SIS-0142', nama: 'Ahmad Fauzan Hidayat', foto: 'AF', jadwal: 'JDW-001', tujuan: 'Nagoya', tanggal: '10 Feb 2025' },
  { id: 'SIS-0143', nama: 'Dewi Rahayu Putri', foto: 'DR', jadwal: 'JDW-001', tujuan: 'Nagoya', tanggal: '10 Feb 2025' },
  { id: 'SIS-0146', nama: 'Budi Santoso', foto: 'BS', jadwal: 'JDW-001', tujuan: 'Nagoya', tanggal: '10 Feb 2025' },
];

const checklistTemplate = [
  { id: 1, kategori: 'Dokumen', item: 'Paspor (berlaku min. 3 tahun)', wajib: true },
  { id: 2, kategori: 'Dokumen', item: 'Visa Kerja / Visa Magang', wajib: true },
  { id: 3, kategori: 'Dokumen', item: 'Kontrak Kerja asli + terjemahan', wajib: true },
  { id: 4, kategori: 'Dokumen', item: 'Sertifikat JLPT N4', wajib: true },
  { id: 5, kategori: 'Dokumen', item: 'Sertifikat Keterampilan TG', wajib: true },
  { id: 6, kategori: 'Dokumen', item: 'MCU terbaru (< 6 bulan)', wajib: true },
  { id: 7, kategori: 'Keuangan', item: 'Bukti Pelunasan Biaya LPK', wajib: true },
  { id: 8, kategori: 'Keuangan', item: 'Uang saku awal (min. ¥50.000)', wajib: false },
  { id: 9, kategori: 'Administrasi', item: 'Formulir keberangkatan sudah diisi', wajib: true },
  { id: 10, kategori: 'Administrasi', item: 'Data kontak darurat terupdate', wajib: true },
  { id: 11, kategori: 'Kesehatan', item: 'Obat-obatan pribadi tersedia', wajib: false },
  { id: 12, kategori: 'Persiapan', item: 'Koper & barang bawaan siap', wajib: false },
  { id: 13, kategori: 'Persiapan', item: 'Pakaian musim dingin', wajib: false },
  { id: 14, kategori: 'Persiapan', item: 'Tiket dan boarding pass sudah dicetak', wajib: true },
];

const katColor = { Dokumen: 'bg-blue-50 text-blue-700', Keuangan: 'bg-green-50 text-green-700', Administrasi: 'bg-purple-50 text-purple-700', Kesehatan: 'bg-red-50 text-red-700', Persiapan: 'bg-orange-50 text-orange-700' };
const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-teal-500'];

export default function ChecklistPraBerangkat() {
  const [selected, setSelected] = useState(siswaDepartureList[0]);
  const [checked, setChecked] = useState(
    Object.fromEntries(checklistTemplate.map(c => [c.id, c.id <= 6]))
  );

  const totalWajib = checklistTemplate.filter(c => c.wajib).length;
  const checkedWajib = checklistTemplate.filter(c => c.wajib && checked[c.id]).length;
  const totalAll = Object.values(checked).filter(Boolean).length;
  const siap = checkedWajib === totalWajib;

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const groups = [...new Set(checklistTemplate.map(c => c.kategori))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Checklist Pra-Berangkat</h1>
          <p className="text-sm text-gray-500 mt-1">Verifikasi kelengkapan sebelum keberangkatan ke Jepang</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Siswa List */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">SISWA AKAN BERANGKAT</p>
          <div className="space-y-2">
            {siswaDepartureList.map((s, i) => (
              <div key={s.id} onClick={() => setSelected(s)}
                className={`bg-white rounded-xl border p-3 cursor-pointer transition ${selected.id === s.id ? 'border-blue-300 bg-blue-50' : 'border-gray-100 hover:shadow-sm'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${avatarColors[i]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{s.foto}</div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{s.nama.split(' ')[0]}</p>
                    <p className="text-xs text-gray-400">✈️ {s.tujuan} · {s.tanggal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-4 p-4 rounded-xl border-2 ${siap ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
            <p className={`font-semibold text-sm ${siap ? 'text-green-700' : 'text-yellow-700'}`}>
              {siap ? '✅ Siap Berangkat!' : '⚠️ Belum Siap'}
            </p>
            <p className={`text-xs mt-1 ${siap ? 'text-green-600' : 'text-yellow-600'}`}>
              {checkedWajib}/{totalWajib} item wajib selesai
            </p>
            <div className="mt-2 bg-white rounded-full h-2">
              <div className={`h-2 rounded-full ${siap ? 'bg-green-500' : 'bg-yellow-400'}`} style={{ width: `${(checkedWajib / totalWajib) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-gray-800">{selected.nama}</h3>
                <p className="text-xs text-gray-500">Keberangkatan: {selected.tanggal} → {selected.tujuan}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Progres</p>
                <p className="font-bold text-blue-600">{totalAll}/{checklistTemplate.length}</p>
              </div>
            </div>

            <div className="space-y-5">
              {groups.map(grup => (
                <div key={grup}>
                  <p className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-2 ${katColor[grup]}`}>{grup}</p>
                  <div className="space-y-2">
                    {checklistTemplate.filter(c => c.kategori === grup).map(item => (
                      <label key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${checked[item.id] ? 'bg-green-50 border-green-200' : 'border-gray-100 hover:bg-gray-50'}`}>
                        <div onClick={() => toggle(item.id)}
                          className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition ${checked[item.id] ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                          {checked[item.id] && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className={`text-sm flex-1 ${checked[item.id] ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{item.item}</span>
                        {item.wajib && <span className="text-xs text-red-500 font-medium flex-shrink-0">Wajib</span>}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">Reset</button>
              <button className={`flex-1 py-2 rounded-lg text-sm font-medium text-white ${siap ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}>
                {siap ? '✓ Konfirmasi Siap Berangkat' : `Belum Siap (${totalWajib - checkedWajib} item wajib)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}