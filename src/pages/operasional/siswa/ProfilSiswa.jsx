import React, { useState } from 'react';

const siswa = {
  id: 'SIS-2024-0142',
  nama: 'Ahmad Fauzan Hidayat',
  foto: null,
  nik: '3201234567890001',
  tempatLahir: 'Cianjur',
  tanggalLahir: '2000-05-14',
  jenisKelamin: 'Laki-laki',
  agama: 'Islam',
  golonganDarah: 'O',
  tinggi: 170,
  berat: 65,
  alamat: 'Jl. Raya Cipanas No. 45 RT 003/RW 007, Kel. Cipanas, Kec. Pacet',
  kabupaten: 'Cianjur',
  provinsi: 'Jawa Barat',
  hp: '0812-3456-7890',
  email: 'ahmad.fauzan@gmail.com',
  pendidikan: 'SMA Negeri 1 Pacet',
  jurusan: 'IPA',
  tahunLulus: 2018,
  pengalaman: 'Pernah bekerja di bengkel las selama 2 tahun',
  namaAyah: 'Suherman',
  namaIbu: 'Siti Aisyah',
  hpDarurat: '0813-9988-7766',
  program: 'Tokutei Ginou',
  bidangKerja: 'Manufaktur & Produksi',
  batch: 'B-2024-03',
  cabang: 'Jakarta',
  tanggalDaftar: '2024-06-10',
  statusJourney: 'Pelatihan',
  nilaiJLPT: 'N4',
  skorBahasa: 82,
  paspor: 'A1234567',
  expPaspor: '2030-09-15',
  pembayaran: 75,
};

const journeySteps = [
  { label: 'Pendaftaran', status: 'done', tanggal: '10 Jun 2024' },
  { label: 'Seleksi', status: 'done', tanggal: '15 Jun 2024' },
  { label: 'Pelatihan', status: 'active', tanggal: 'Sedang berjalan' },
  { label: 'Sertifikasi', status: 'pending', tanggal: '-' },
  { label: 'Matching', status: 'pending', tanggal: '-' },
  { label: 'Berangkat', status: 'pending', tanggal: '-' },
];

const tabs = ['Profil', 'Keluarga & Darurat', 'Program & Akademik', 'Dokumen'];

export default function ProfilSiswa() {
  const [activeTab, setActiveTab] = useState('Profil');
  const [editMode, setEditMode] = useState(false);

  const avatar = siswa.nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profil Siswa</h1>
          <p className="text-sm text-gray-500 mt-1">Detail informasi data diri siswa</p>
        </div>
        <div className="flex gap-2">
          <button className="border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">← Kembali</button>
          <button onClick={() => setEditMode(!editMode)} className={`px-4 py-2 rounded-lg text-sm font-medium ${editMode ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            {editMode ? '✓ Simpan' : '✎ Edit Data'}
          </button>
        </div>
      </div>

      {/* Top Card - Identity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{siswa.nama}</h2>
                <p className="text-sm text-gray-500 font-mono">{siswa.id}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">● {siswa.statusJourney}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{siswa.program}</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{siswa.batch}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Progress Pembayaran</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-32 bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${siswa.pembayaran}%` }} />
                  </div>
                  <span className="font-bold text-green-600">{siswa.pembayaran}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Tracker */}
        <div className="mt-5 pt-5 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-3">JOURNEY SISWA</p>
          <div className="flex items-center">
            {journeySteps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step.status === 'done' ? 'bg-green-500 border-green-500 text-white' : step.status === 'active' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                    {step.status === 'done' ? '✓' : i + 1}
                  </div>
                  <p className={`text-xs mt-1 font-medium ${step.status === 'active' ? 'text-blue-600' : step.status === 'done' ? 'text-green-600' : 'text-gray-400'}`}>{step.label}</p>
                  <p className="text-xs text-gray-400">{step.tanggal}</p>
                </div>
                {i < journeySteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-6 ${step.status === 'done' ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-white rounded-xl p-1 shadow-sm border border-gray-100 w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === t ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Profil' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4 text-sm">DATA PRIBADI</h3>
            <div className="space-y-3">
              {[
                ['NIK', siswa.nik], ['Tempat Lahir', siswa.tempatLahir], ['Tanggal Lahir', siswa.tanggalLahir],
                ['Jenis Kelamin', siswa.jenisKelamin], ['Agama', siswa.agama], ['Gol. Darah', siswa.golonganDarah],
                ['Tinggi Badan', siswa.tinggi + ' cm'], ['Berat Badan', siswa.berat + ' kg'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs text-gray-400 w-32">{label}</span>
                  {editMode
                    ? <input defaultValue={value} className="flex-1 text-xs border-b border-blue-200 focus:outline-none text-gray-800 text-right" />
                    : <span className="text-xs font-medium text-gray-800">{value}</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4 text-sm">KONTAK & DOMISILI</h3>
            <div className="space-y-3">
              {[
                ['No. HP', siswa.hp], ['Email', siswa.email], ['Alamat', siswa.alamat],
                ['Kabupaten', siswa.kabupaten], ['Provinsi', siswa.provinsi],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <span className="text-xs text-gray-400 w-24 flex-shrink-0">{label}</span>
                  {editMode
                    ? <input defaultValue={value} className="flex-1 text-xs border-b border-blue-200 focus:outline-none text-gray-800" />
                    : <span className="text-xs font-medium text-gray-800 text-right">{value}</span>}
                </div>
              ))}
            </div>
            <h3 className="font-semibold text-gray-700 mb-4 mt-5 text-sm">PENDIDIKAN TERAKHIR</h3>
            <div className="space-y-3">
              {[['Sekolah', siswa.pendidikan], ['Jurusan', siswa.jurusan], ['Tahun Lulus', siswa.tahunLulus]].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs text-gray-400 w-24">{label}</span>
                  <span className="text-xs font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Keluarga & Darurat' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 max-w-xl">
          <h3 className="font-semibold text-gray-700 mb-4 text-sm">DATA KELUARGA</h3>
          <div className="space-y-3">
            {[['Nama Ayah', siswa.namaAyah], ['Nama Ibu', siswa.namaIbu], ['No. HP Darurat', siswa.hpDarurat]].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-xs text-gray-400 w-36">{l}</span>
                <span className="text-xs font-medium text-gray-800">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Program & Akademik' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4 text-sm">DATA PROGRAM</h3>
            <div className="space-y-3">
              {[['Program', siswa.program], ['Bidang Kerja', siswa.bidangKerja], ['Batch', siswa.batch], ['Cabang', siswa.cabang], ['Tgl. Daftar', siswa.tanggalDaftar]].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-xs text-gray-400 w-32">{l}</span>
                  <span className="text-xs font-medium text-gray-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4 text-sm">NILAI & SERTIFIKASI</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-xs text-gray-400">JLPT</span><span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">{siswa.nilaiJLPT}</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Skor Bahasa</span><span className="text-xs font-bold text-blue-600">{siswa.skorBahasa}/100</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${siswa.skorBahasa}%` }} />
              </div>
              <div className="flex justify-between mt-2"><span className="text-xs text-gray-400">No. Paspor</span><span className="text-xs font-medium text-gray-800 font-mono">{siswa.paspor}</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-400">Exp. Paspor</span><span className="text-xs font-medium text-gray-800">{siswa.expPaspor}</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Dokumen' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Lihat tab Dokumen Siswa untuk detail dokumen lengkap.</p>
        </div>
      )}
    </div>
  );
}