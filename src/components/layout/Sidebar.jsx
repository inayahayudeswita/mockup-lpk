import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, ClipboardCheck, Briefcase, Plane,
  Activity, Wallet, Database, Shield, FileText, Settings, ChevronRight,
  ChevronLeft
} from 'lucide-react';

const menu = [
  { label: 'Beranda', icon: LayoutDashboard, path: '/' },

  {
    label: 'Pendaftaran & Seleksi',
    icon: Users,
    children: [
      { label: 'Calon Peserta', path: '/pendaftaran/calon-peserta' },
      { label: 'Verifikasi Dokumen', path: '/pendaftaran/verifikasi-dokumen' },
      { label: 'Tes Awal', path: '/pendaftaran/tes-awal' },
      { label: 'Keputusan Seleksi', path: '/pendaftaran/keputusan-seleksi' },
    ],
  },

  {
    label: 'Manajemen Akademik',
    icon: BookOpen,
    children: [
      { label: 'Data Peserta', path: '/akademik/data-peserta' },
      { label: 'Manajemen Kelas', path: '/akademik/manajemen-kelas' },
      { label: 'Jadwal Pembelajaran', path: '/akademik/jadwal' },
      { label: 'Absensi', path: '/akademik/absensi' },
      { label: 'Nilai & Evaluasi', path: '/akademik/nilai' },
    ],
  },

  {
    label: 'Ujian & Sertifikasi',
    icon: ClipboardCheck,
    children: [
      { label: 'Ujian Internal', path: '/ujian/ujian-internal' },
      { label: 'Simulasi Bahasa', path: '/ujian/simulasi-bahasa' },
      { label: 'Hasil Ujian', path: '/ujian/hasil-ujian' },
      { label: 'Sertifikat', path: '/ujian/sertifikat' },
    ],
  },

  {
    label: 'Penyaluran Jepang',
    icon: Briefcase,
    children: [
      { label: 'Peserta Siap Salur', path: '/penyaluran/peserta-siap' },
      { label: 'Job Order', path: '/penyaluran/job-order' },
      { label: 'Matching', path: '/penyaluran/matching' },
      { label: 'Interview', path: '/penyaluran/interview' },
      { label: 'Hasil Seleksi', path: '/penyaluran/hasil-seleksi' },
    ],
  },

  {
    label: 'Administrasi Keberangkatan',
    icon: Plane,
    children: [
      { label: 'Dokumen Keberangkatan', path: '/keberangkatan/dokumen' },
      { label: 'Monitoring Timeline', path: '/keberangkatan/timeline' },
      { label: 'Final Briefing', path: '/keberangkatan/briefing' },
      { label: 'Status Keberangkatan', path: '/keberangkatan/status' },
    ],
  },

  {
    label: 'Monitoring Pasca Penempatan',
    icon: Activity,
    children: [
      { label: 'Data Penempatan', path: '/monitoring/data-penempatan' },
      { label: 'Evaluasi Kinerja', path: '/monitoring/evaluasi-kinerja' },
      { label: 'Laporan Masalah', path: '/monitoring/laporan-masalah' },
      { label: 'Perpanjangan Kontrak', path: '/monitoring/perpanjangan' },
    ],
  },

  {
    label: 'Keuangan',
    icon: Wallet,
    children: [
      { label: 'Biaya Pendidikan', path: '/keuangan/biaya' },
      { label: 'Pembayaran', path: '/keuangan/pembayaran' },
      { label: 'Invoice', path: '/keuangan/invoice' },
      { label: 'Laporan Keuangan', path: '/keuangan/laporan' },
    ],
  },

  {
    label: 'Master Data',
    icon: Database,
    children: [
      { label: 'Program Pelatihan', path: '/master/program' },
      { label: 'Kurikulum', path: '/master/kurikulum' },
      { label: 'Bidang Kerja', path: '/master/bidang-kerja' },
      { label: 'Mitra Jepang', path: '/master/mitra' },
      { label: 'Tahun Angkatan', path: '/master/angkatan' },
    ],
  },

  {
    label: 'Manajemen User',
    icon: Shield,
    children: [
      { label: 'Admin', path: '/user/admin' },
      { label: 'Instruktur', path: '/user/instruktur' },
      { label: 'Role & Permission', path: '/user/role' },
      { label: 'Audit Log', path: '/user/audit' },
    ],
  },

  {
    label: 'Laporan',
    icon: FileText,
    children: [
      { label: 'Peserta', path: '/laporan/peserta' },
      { label: 'Akademik', path: '/laporan/akademik' },
      { label: 'Penyaluran', path: '/laporan/penyaluran' },
      { label: 'Export Data', path: '/laporan/export' },
    ],
  },

  {
    label: 'Pengaturan',
    icon: Settings,
    children: [
      { label: 'Profil LPK', path: '/pengaturan/profil' },
      { label: 'Template Dokumen', path: '/pengaturan/template' },
      { label: 'Notifikasi', path: '/pengaturan/notifikasi' },
      { label: 'Backup', path: '/pengaturan/backup' },
    ],
  },
];

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const newOpenMenus = {};
    menu.forEach((item) => {
      if (item.children?.some((child) => child.path === location.pathname)) {
        newOpenMenus[item.label] = true;
      }
    });
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  const toggleMenu = (label) => {
    if (!isCollapsed) {
      setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    }
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 shadow-sm transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:z-30
          ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-white">L</span>
                </div>
                <div>
                  <span className="font-bold text-lg text-gray-800 block leading-tight">LPK</span>
                  <span className="text-xs text-gray-500">Dashboard</span>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md mx-auto">
                <span className="text-xl font-bold text-white">L</span>
              </div>
            )}

            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {menu.map((item, i) => {
              const Icon = item.icon;
              const isActiveParent = item.children
                ? item.children.some((child) => child.path === location.pathname)
                : location.pathname === item.path;

              if (item.children) {
                return (
                  <div key={i} className="mb-1">
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActiveParent ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                      } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                      title={isCollapsed ? item.label : ''}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActiveParent ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                        {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${openMenus[item.label] ? 'rotate-90' : ''} ${isActiveParent ? 'text-blue-600' : 'text-gray-400'}`}
                        />
                      )}
                    </button>

                    {!isCollapsed && (
                      <div className={`overflow-hidden transition-all duration-300 ${openMenus[item.label] ? 'max-h-96 mt-1' : 'max-h-0'}`}>
                        <div className="ml-3 pl-3 border-l-2 border-gray-100">
                          {item.children.map((child, ci) => (
                            <NavLink
                              key={ci}
                              to={child.path}
                              onClick={onClose}
                              className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                                  isActive ? 'bg-blue-500 text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={i}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-1 group ${isActive ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'} ${isCollapsed ? 'justify-center' : ''}`
                  }
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          {!isCollapsed ? (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Admin</p>
                  <p className="text-xs text-gray-500 truncate">admin@lpk.com</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md mx-auto">
                A
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
