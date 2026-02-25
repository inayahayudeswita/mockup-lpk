import React, { useState } from 'react';

const dokumenData = [
  { id: 'DL-001', nama: 'Surat Izin Operasional LPK', kategori: 'Legalitas LPK', penerbit: 'Kemnaker RI', noSurat: 'SK/143/2022/LPK', tanggalTerbit: '2022-03-15', tanggalExpiry: '2027-03-14', status: 'Aktif', file: 'sio_lpk_kemnaker.pdf' },
  { id: 'DL-002', nama: 'SIUP (Surat Izin Usaha Perdagangan)', kategori: 'Legalitas LPK', penerbit: 'Dinas Perizinan Kab. Bekasi', noSurat: 'SIUP/220/2021/BKS', tanggalTerbit: '2021-05-20', tanggalExpiry: '2026-05-19', status: 'Aktif', file: 'siup_lpk.pdf' },
  { id: 'DL-003', nama: 'Akta Pendirian Perusahaan', kategori: 'Legalitas LPK', penerbit: 'Notaris Hj. Sri Rahayu, S.H.', noSurat: 'Akta No. 15/2020', tanggalTerbit: '2020-01-10', tanggalExpiry: null, status: 'Permanen', file: 'akta_pendirian.pdf' },
  { id: 'DL-004', nama: 'NPWP Perusahaan', kategori: 'Legalitas LPK', penerbit: 'Dirjen Pajak', noSurat: '12.345.678.9-012.000', tanggalTerbit: '2020-01-15', tanggalExpiry: null, status: 'Permanen', file: 'npwp_lpk.pdf' },
  { id: 'DL-005', nama: 'MOU dengan JITCO (Japan Int\'l Trainee Cooperation)', kategori: 'Kerja Sama Internasional', penerbit: 'JITCO Japan', noSurat: 'MOU/JITCO/2023/LPK-001', tanggalTerbit: '2023-04-01', tanggalExpiry: '2026-03-31', status: 'Aktif', file: 'mou_jitco.pdf' },
  { id: 'DL-006', nama: 'Sertifikat Akreditasi LPK dari BAN-PNF', kategori: 'Akreditasi', penerbit: 'BAN-PNF', noSurat: 'AKRED/A/BAN-PNF/2023/LPK', tanggalTerbit: '2023-08-01', tanggalExpiry: '2028-07-31', status: 'Aktif', file: 'sertifikat_akreditasi.pdf' },
  { id: 'DL-007', nama: 'Perjanjian Kerja Sama dengan Disnaker Prov. Jabar', kategori: 'Kerja Sama Lokal', penerbit: 'Disnaker Prov. Jawa Barat', noSurat: 'PKS/DISNAKER/2024/012', tanggalTerbit: '2024-01-01', tanggalExpiry: '2025-12-31', status: 'Hampir Berakhir', file: 'pks_disnaker_jabar.pdf' },
  { id: 'DL-008', nama: 'Dokumen Registrasi Sending Organization (SO)', kategori: 'Kerja Sama Internasional', penerbit: 'OTIT Japan', noSurat: 'SO/OTIT/2022/IDN-089', tanggalTerbit: '2022-09-01', tanggalExpiry: '2025-08-31', status: 'Hampir Berakhir', file: 'registrasi_so_otit.pdf' },
  { id: 'DL-009', nama: 'Surat Keterangan Domisili Perusahaan', kategori: 'Legalitas LPK', penerbit: 'Kelurahan Jatiasih', noSurat: 'SKDP/KEL-JA/2024/055', tanggalTerbit: '2024-02-01', tanggalExpiry: '2025-01-31', status: 'Expired', file: 'skdp_2024.pdf' },
];

const statusColor = {
  'Aktif': 'bg-emerald-100 text-emerald-700',
  'Permanen': 'bg-blue-100 text-blue-700',
  'Hampir Berakhir': 'bg-orange-100 text-orange-700',
  'Expired': 'bg-red-100 text-red-700',
};

const kategoriColor = {
  'Legalitas LPK': 'bg-purple-100 text-purple-700',
  'Kerja Sama Internasional': 'bg-blue-100 text-blue-700',
  'Akreditasi': 'bg-emerald-100 text-emerald-700',
  'Kerja Sama Lokal': 'bg-orange-100 text-orange-700',
};

function getDaysLeft(expiry) {
  if (!expiry) return null;
  const diff = Math.ceil((new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function DokumenLegal() {
  const [filterKat, setFilterKat] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = dokumenData.filter(d => {
    const matchK = filterKat === 'Semua' || d.kategori === filterKat;
    const matchS = filterStatus === 'Semua' || d.status === filterStatus;
    const matchQ = d.nama.toLowerCase().includes(search.toLowerCase());
    return matchK && matchS && matchQ;
  });

  const expiredCount = dokumenData.filter(d => d.status === 'Expired').length;
  const nearExpiredCount = dokumenData.filter(d => d.status === 'Hampir Berakhir').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dokumen Legal</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola seluruh dokumen legalitas dan perizinan LPK</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Upload Dokumen
        </button>
      </div>

      {/* Alert jika ada yang expired */}
      {(expiredCount > 0 || nearExpiredCount > 0) && (
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-orange-800">Perhatian: Ada dokumen yang perlu diperbarui</p>
            <p className="text-xs text-orange-600 mt-0.5">
              {expiredCount > 0 && `${expiredCount} dokumen sudah expired. `}
              {nearExpiredCount > 0 && `${nearExpiredCount} dokumen akan segera berakhir dalam 90 hari.`}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Dokumen', val: dokumenData.length, color: 'text-gray-800' },
          { label: 'Aktif', val: dokumenData.filter(d => d.status === 'Aktif' || d.status === 'Permanen').length, color: 'text-emerald-600' },
          { label: 'Hampir Berakhir', val: nearExpiredCount, color: 'text-orange-500' },
          { label: 'Expired', val: expiredCount, color: 'text-red-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 min-w-48"
          placeholder="Cari nama dokumen..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterKat} onChange={e => setFilterKat(e.target.value)}>
          {['Semua', 'Legalitas LPK', 'Kerja Sama Internasional', 'Kerja Sama Lokal', 'Akreditasi'].map(k => <option key={k}>{k}</option>)}
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {['Semua', 'Aktif', 'Permanen', 'Hampir Berakhir', 'Expired'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nama Dokumen</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Penerbit</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">No. Surat</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Terbit</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Berlaku s/d</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">File</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(d => {
              const daysLeft = getDaysLeft(d.tanggalExpiry);
              return (
                <tr key={d.id} className={`hover:bg-gray-50 transition-colors ${d.status === 'Expired' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800 text-xs">{d.nama}</p>
                    <p className="text-gray-400 text-xs">{d.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${kategoriColor[d.kategori]}`}>{d.kategori}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{d.penerbit}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{d.noSurat}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{d.tanggalTerbit}</td>
                  <td className="px-4 py-3 text-xs">
                    {d.tanggalExpiry ? (
                      <div>
                        <p className={`font-medium ${daysLeft < 0 ? 'text-red-500' : daysLeft < 90 ? 'text-orange-500' : 'text-gray-700'}`}>
                          {d.tanggalExpiry}
                        </p>
                        {daysLeft !== null && (
                          <p className={`text-xs ${daysLeft < 0 ? 'text-red-400' : daysLeft < 90 ? 'text-orange-400' : 'text-gray-400'}`}>
                            {daysLeft < 0 ? `${Math.abs(daysLeft)} hari lalu` : `${daysLeft} hari lagi`}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">Tidak berlaku masa</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700 text-xs">📄 Lihat</button>
                      <button className="text-gray-400 hover:text-gray-600 text-xs">⬇️</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}