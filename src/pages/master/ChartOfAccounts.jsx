import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: '1-0000', nama: 'ASET', tipe: 'Header', kategori: 'Aset', level: 0, saldo: null, aktif: true },
  { id: 2, kode: '1-1000', nama: 'Aset Lancar', tipe: 'Header', kategori: 'Aset', level: 1, saldo: null, aktif: true },
  { id: 3, kode: '1-1100', nama: 'Kas & Setara Kas', tipe: 'Detail', kategori: 'Aset', level: 2, saldo: 145000000, aktif: true },
  { id: 4, kode: '1-1200', nama: 'Bank BCA - Operasional', tipe: 'Detail', kategori: 'Aset', level: 2, saldo: 387500000, aktif: true },
  { id: 5, kode: '1-1300', nama: 'Bank Mandiri - Payroll', tipe: 'Detail', kategori: 'Aset', level: 2, saldo: 234000000, aktif: true },
  { id: 6, kode: '1-1400', nama: 'Piutang Siswa', tipe: 'Detail', kategori: 'Aset', level: 2, saldo: 89000000, aktif: true },
  { id: 7, kode: '1-1500', nama: 'Piutang Partner Jepang', tipe: 'Detail', kategori: 'Aset', level: 2, saldo: 156000000, aktif: true },
  { id: 8, kode: '2-0000', nama: 'LIABILITAS', tipe: 'Header', kategori: 'Liabilitas', level: 0, saldo: null, aktif: true },
  { id: 9, kode: '2-1000', nama: 'Hutang Usaha', tipe: 'Detail', kategori: 'Liabilitas', level: 1, saldo: 45000000, aktif: true },
  { id: 10, kode: '2-2000', nama: 'Hutang Pajak', tipe: 'Detail', kategori: 'Liabilitas', level: 1, saldo: 12500000, aktif: true },
  { id: 11, kode: '3-0000', nama: 'MODAL', tipe: 'Header', kategori: 'Modal', level: 0, saldo: null, aktif: true },
  { id: 12, kode: '3-1000', nama: 'Modal Disetor', tipe: 'Detail', kategori: 'Modal', level: 1, saldo: 500000000, aktif: true },
  { id: 13, kode: '4-0000', nama: 'PENDAPATAN', tipe: 'Header', kategori: 'Pendapatan', level: 0, saldo: null, aktif: true },
  { id: 14, kode: '4-1000', nama: 'Pendapatan Biaya Siswa', tipe: 'Detail', kategori: 'Pendapatan', level: 1, saldo: 980000000, aktif: true },
  { id: 15, kode: '4-2000', nama: 'Pendapatan Jasa Penempatan', tipe: 'Detail', kategori: 'Pendapatan', level: 1, saldo: 450000000, aktif: true },
  { id: 16, kode: '5-0000', nama: 'BEBAN', tipe: 'Header', kategori: 'Beban', level: 0, saldo: null, aktif: true },
  { id: 17, kode: '5-1000', nama: 'Beban Gaji & Tunjangan', tipe: 'Detail', kategori: 'Beban', level: 1, saldo: 320000000, aktif: true },
  { id: 18, kode: '5-2000', nama: 'Beban Operasional Pelatihan', tipe: 'Detail', kategori: 'Beban', level: 1, saldo: 180000000, aktif: true },
  { id: 19, kode: '5-3000', nama: 'Beban Sewa Gedung', tipe: 'Detail', kategori: 'Beban', level: 1, saldo: 96000000, aktif: true },
  { id: 20, kode: '5-4000', nama: 'Beban Administrasi & Umum', tipe: 'Detail', kategori: 'Beban', level: 1, saldo: 45000000, aktif: true },
];

const kategoriColor = { Aset: 'bg-blue-50 text-blue-700', Liabilitas: 'bg-red-50 text-red-700', Modal: 'bg-purple-50 text-purple-700', Pendapatan: 'bg-green-50 text-green-700', Beban: 'bg-orange-50 text-orange-700' };

function formatRp(val) {
  if (val === null) return '-';
  return 'Rp ' + val.toLocaleString('id-ID');
}

export default function ChartOfAccounts() {
  const [search, setSearch] = useState('');
  const [filterKat, setFilterKat] = useState('Semua');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d => {
    const matchS = d.nama.toLowerCase().includes(search.toLowerCase()) || d.kode.includes(search);
    const matchK = filterKat === 'Semua' || d.kategori === filterKat;
    return matchS && matchK;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Chart of Accounts (COA)</h1>
          <p className="text-sm text-gray-500 mt-1">Daftar akun keuangan LPK SIMPEL</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Akun
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {['Aset', 'Liabilitas', 'Modal', 'Pendapatan', 'Beban'].map(k => (
          <div key={k} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{k}</p>
            <p className="text-xl font-bold text-gray-700 mt-1">{dummyData.filter(d => d.kategori === k).length}</p>
            <p className="text-xs text-gray-400">akun</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          <input type="text" placeholder="Cari kode atau nama akun..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <select value={filterKat} onChange={e => setFilterKat(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none">
            <option>Semua</option>
            {['Aset', 'Liabilitas', 'Modal', 'Pendapatan', 'Beban'].map(k => <option key={k}>{k}</option>)}
          </select>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Kode Akun</th>
              <th className="px-4 py-3">Nama Akun</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3 text-right">Saldo</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className={`border-b border-gray-50 hover:bg-gray-50 ${row.level === 0 ? 'bg-gray-50 font-bold' : ''}`}>
                <td className="px-4 py-3 font-mono text-sm text-gray-600">{row.kode}</td>
                <td className="px-4 py-3">
                  <span style={{ paddingLeft: row.level * 16 }} className={`text-gray-800 ${row.tipe === 'Header' ? 'font-semibold text-gray-900' : ''}`}>
                    {row.tipe === 'Header' ? '▸ ' : ''}{row.nama}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${kategoriColor[row.kategori]}`}>{row.kategori}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{row.tipe}</td>
                <td className="px-4 py-3 text-right font-mono text-xs text-gray-700">{formatRp(row.saldo)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.aktif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {row.aktif ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 hover:text-blue-700 text-xs mr-2">Edit</button>
                  <button className="text-red-400 hover:text-red-600 text-xs">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Akun' : 'Tambah Akun Baru'}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium">Kode Akun</label>
                  <input defaultValue={selected?.kode || ''} placeholder="1-1600" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Tipe</label>
                  <select defaultValue={selected?.tipe || 'Detail'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option>Header</option><option>Detail</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Nama Akun</label>
                <input defaultValue={selected?.nama || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Kategori</label>
                <select defaultValue={selected?.kategori || 'Aset'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  {['Aset', 'Liabilitas', 'Modal', 'Pendapatan', 'Beban'].map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
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