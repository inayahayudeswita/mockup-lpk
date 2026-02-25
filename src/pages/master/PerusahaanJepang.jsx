import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'PR-001', nama: 'Tanaka Seisakusho Co., Ltd', bidang: 'Manufaktur - Mesin', prefektur: 'Aichi', kota: 'Nagoya', skala: 'Menengah', jumlahKaryawan: 250, gajiAwal: 180000, kontak: 'Tanaka Hiroshi', email: 'tanaka.h@tanaka-ss.co.jp', telp: '+81-52-987-6543', status: 'Aktif', kapasitas: 12, terisi: 9 },
  { id: 2, kode: 'PR-002', nama: 'Sakura Nouji Kumiai', bidang: 'Pertanian', prefektur: 'Hokkaido', kota: 'Sapporo', skala: 'Besar', jumlahKaryawan: 800, gajiAwal: 165000, kontak: 'Yamamoto Kenji', email: 'yamamoto@sakura-nouji.jp', telp: '+81-11-123-4567', status: 'Aktif', kapasitas: 20, terisi: 18 },
  { id: 3, kode: 'PR-003', nama: 'Yamamura Kaigo Center', bidang: 'Perawatan Lansia', prefektur: 'Osaka', kota: 'Osaka', skala: 'Kecil', jumlahKaryawan: 85, gajiAwal: 175000, kontak: 'Yamamura Akiko', email: 'yamamura@kaigo.jp', telp: '+81-6-2222-3333', status: 'Aktif', kapasitas: 8, terisi: 6 },
  { id: 4, kode: 'PR-004', nama: 'Kobe Steel Construction Inc', bidang: 'Konstruksi', prefektur: 'Hyogo', kota: 'Kobe', skala: 'Besar', jumlahKaryawan: 1200, gajiAwal: 195000, kontak: 'Ito Ryuichi', email: 'ito@kobeconstruct.jp', telp: '+81-78-456-7890', status: 'Aktif', kapasitas: 15, terisi: 12 },
  { id: 5, kode: 'PR-005', nama: 'Suzuki Fisheries Corp', bidang: 'Perikanan', prefektur: 'Miyagi', kota: 'Sendai', skala: 'Menengah', jumlahKaryawan: 320, gajiAwal: 160000, kontak: 'Suzuki Masato', email: 'suzuki@sf-corp.jp', telp: '+81-22-345-6789', status: 'Aktif', kapasitas: 10, terisi: 7 },
  { id: 6, kode: 'PR-006', nama: 'Kyushu Niku Processing Ltd', bidang: 'Makanan & Minuman', prefektur: 'Fukuoka', kota: 'Fukuoka', skala: 'Menengah', jumlahKaryawan: 180, gajiAwal: 168000, kontak: 'Nakamura Jun', email: 'nakamura@kyushu-niku.co.jp', telp: '+81-92-567-8901', status: 'Tidak Aktif', kapasitas: 6, terisi: 0 },
];

function formatYen(v) { return '¥' + v.toLocaleString(); }

export default function PerusahaanJepang() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.bidang.toLowerCase().includes(search.toLowerCase()) ||
    d.prefektur.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Perusahaan Jepang</h1>
          <p className="text-sm text-gray-500 mt-1">Database perusahaan penerima pekerja dari LPK SIMPEL</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Perusahaan
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Perusahaan</p><p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Aktif</p><p className="text-2xl font-bold text-green-600 mt-1">{dummyData.filter(d => d.status === 'Aktif').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Kapasitas</p><p className="text-2xl font-bold text-purple-600 mt-1">{dummyData.reduce((a, b) => a + b.kapasitas, 0)}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Slot Terisi</p><p className="text-2xl font-bold text-orange-600 mt-1">{dummyData.reduce((a, b) => a + b.terisi, 0)}</p></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <input type="text" placeholder="Cari perusahaan, bidang, prefektur..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Perusahaan</th>
              <th className="px-4 py-3">Bidang</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Skala</th>
              <th className="px-4 py-3">Gaji Awal</th>
              <th className="px-4 py-3">Kapasitas</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => {
              const fillPct = Math.round((row.terisi / row.kapasitas) * 100);
              return (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800 text-xs">{row.nama}</p>
                    <p className="text-gray-400 text-xs font-mono">{row.kode}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.bidang}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">🗾 {row.kota}, {row.prefektur}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${row.skala === 'Besar' ? 'bg-blue-100 text-blue-700' : row.skala === 'Menengah' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{row.skala}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700">{formatYen(row.gajiAwal)}/bln</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${fillPct >= 90 ? 'bg-red-400' : fillPct >= 70 ? 'bg-yellow-400' : 'bg-green-400'}`} style={{ width: `${fillPct}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{row.terisi}/{row.kapasitas}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 text-xs mr-2">Edit</button>
                    <button className="text-red-400 text-xs">Hapus</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Perusahaan' : 'Tambah Perusahaan Jepang'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Kode', 'kode'], ['Nama Perusahaan', 'nama'], ['Bidang', 'bidang'], ['Prefektur', 'prefektur'], ['Kota', 'kota'], ['Nama Kontak', 'kontak'], ['Email', 'email'], ['Telepon', 'telp']].map(([l, k]) => (
                <div key={k} className={k === 'nama' ? 'col-span-2' : ''}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Skala</label>
                <select defaultValue={selected?.skala || 'Menengah'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Kecil</option><option>Menengah</option><option>Besar</option>
                </select></div>
              <div><label className="text-xs text-gray-500 font-medium">Gaji Awal (¥)</label>
                <input type="number" defaultValue={selected?.gajiAwal || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Kapasitas</label>
                <input type="number" defaultValue={selected?.kapasitas || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
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