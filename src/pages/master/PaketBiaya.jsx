import React, { useState } from 'react';

const dummyData = [
  {
    id: 1, kode: 'PKT-TG-STD', nama: 'Paket Tokutei Ginou Standard', program: 'Tokutei Ginou', durasi: 12,
    harga: 28500000, components: [
      { nama: 'Biaya Pendaftaran & Seleksi', nilai: 500000 },
      { nama: 'Biaya Pelatihan Bahasa Jepang (12 bln)', nilai: 12000000 },
      { nama: 'Biaya Administrasi & Dokumen', nilai: 2000000 },
      { nama: 'Tes JLPT & Sertifikasi', nilai: 1500000 },
      { nama: 'Medical Check Up', nilai: 1000000 },
      { nama: 'Biaya Keberangkatan & Visa', nilai: 5000000 },
      { nama: 'Akomodasi Sementara', nilai: 2000000 },
      { nama: 'Seragam & Perlengkapan', nilai: 1500000 },
      { nama: 'Biaya Jasa LPK', nilai: 3000000 },
    ],
    status: 'Aktif', catatan: 'Termasuk biaya pengurusan visa dan tiket pesawat PP'
  },
  {
    id: 2, kode: 'PKT-TG-PRE', nama: 'Paket Tokutei Ginou Premium', program: 'Tokutei Ginou', durasi: 12,
    harga: 35000000, components: [
      { nama: 'Biaya Pendaftaran & Seleksi', nilai: 500000 },
      { nama: 'Biaya Pelatihan Bahasa Jepang Premium', nilai: 16000000 },
      { nama: 'Bimbingan Intensif 1-on-1', nilai: 3000000 },
      { nama: 'Biaya Administrasi & Dokumen', nilai: 2000000 },
      { nama: 'Tes JLPT & Sertifikasi', nilai: 2000000 },
      { nama: 'Medical Check Up Premium', nilai: 1500000 },
      { nama: 'Biaya Keberangkatan & Visa', nilai: 5000000 },
      { nama: 'Akomodasi Sementara', nilai: 2000000 },
      { nama: 'Biaya Jasa LPK', nilai: 3000000 },
    ],
    status: 'Aktif', catatan: 'Termasuk garansi penempatan dan pendampingan selama di Jepang'
  },
  {
    id: 3, kode: 'PKT-MG-STD', nama: 'Paket Magang Kenshusei Standard', program: 'Magang (Kenshusei)', durasi: 10,
    harga: 22000000, components: [
      { nama: 'Biaya Pendaftaran & Seleksi', nilai: 500000 },
      { nama: 'Biaya Pelatihan Bahasa Jepang (10 bln)', nilai: 9000000 },
      { nama: 'Biaya Administrasi & Dokumen', nilai: 2000000 },
      { nama: 'Medical Check Up', nilai: 1000000 },
      { nama: 'Biaya Keberangkatan & Visa', nilai: 5000000 },
      { nama: 'Seragam & Perlengkapan', nilai: 1500000 },
      { nama: 'Biaya Jasa LPK', nilai: 3000000 },
    ],
    status: 'Aktif', catatan: 'Program magang 3 tahun di Jepang'
  },
];

function formatRp(val) { return 'Rp ' + val.toLocaleString('id-ID'); }

export default function PaketBiaya() {
  const [showDetail, setShowDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Paket & Biaya</h1>
          <p className="text-sm text-gray-500 mt-1">Konfigurasi paket biaya program pelatihan dan keberangkatan</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Paket
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {dummyData.map(paket => (
          <div key={paket.id} className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition hover:shadow-lg ${paket.kode.includes('PRE') ? 'border-yellow-400' : 'border-gray-100'}`}>
            {paket.kode.includes('PRE') && (
              <div className="bg-yellow-400 text-center py-1.5">
                <span className="text-xs font-bold text-yellow-900">⭐ PREMIUM</span>
              </div>
            )}
            <div className="p-5">
              <div className="mb-4">
                <span className="font-mono text-xs text-gray-400">{paket.kode}</span>
                <h3 className="font-bold text-gray-800 text-base mt-0.5">{paket.nama}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{paket.program}</span>
                  <span className="text-xs text-gray-400">{paket.durasi} bulan</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-center mb-4">
                <p className="text-xs text-blue-200 mb-1">Total Biaya</p>
                <p className="text-2xl font-bold text-white">{formatRp(paket.harga)}</p>
              </div>

              <div className="space-y-1.5 mb-4">
                {paket.components.slice(0, showDetail === paket.id ? paket.components.length : 5).map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">{c.nama}</span>
                    <span className="font-medium text-gray-700">{formatRp(c.nilai)}</span>
                  </div>
                ))}
                {paket.components.length > 5 && (
                  <button onClick={() => setShowDetail(showDetail === paket.id ? null : paket.id)}
                    className="text-xs text-blue-500 hover:text-blue-700 font-medium mt-1">
                    {showDetail === paket.id ? '▲ Sembunyikan' : `▼ +${paket.components.length - 5} komponen lainnya`}
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2.5 mb-4">💡 {paket.catatan}</p>

              <div className="flex gap-2">
                <button onClick={() => { setSelected(paket); setShowModal(true); }} className="flex-1 border border-blue-200 text-blue-600 rounded-lg py-1.5 text-xs font-medium hover:bg-blue-50">Edit</button>
                <button className="flex-1 border border-red-200 text-red-500 rounded-lg py-1.5 text-xs font-medium hover:bg-red-50">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Paket Biaya' : 'Tambah Paket Biaya'}</h2>
            <div className="space-y-3">
              {[['Kode Paket', 'kode'], ['Nama Paket', 'nama']].map(([l, k]) => (
                <div key={k}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Program</label>
                <select defaultValue={selected?.program || 'Tokutei Ginou'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Tokutei Ginou</option><option>Magang (Kenshusei)</option>
                </select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-gray-500 font-medium">Durasi (bulan)</label>
                  <input type="number" defaultValue={selected?.durasi || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
                <div><label className="text-xs text-gray-500 font-medium">Total Harga (Rp)</label>
                  <input type="number" defaultValue={selected?.harga || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              </div>
              <div><label className="text-xs text-gray-500 font-medium">Catatan</label>
                <textarea defaultValue={selected?.catatan || ''} rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
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