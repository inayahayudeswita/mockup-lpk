import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Shield, Database, Briefcase,
  FileText, Activity, PieChart, DollarSign, BookOpen, BarChart2,
  Settings, ChevronRight, ChevronLeft, GraduationCap
} from 'lucide-react';

const menu = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
    // Direct link — no children. Sub-sections are widgets inside the Dashboard page itself.
  },

  {
    label: 'System & Security',
    icon: Shield,
    children: [
      { label: 'User Management', path: '/system/user' },
      { label: 'Role Management', path: '/system/role' },
      { label: 'Permission Management', path: '/system/permission' },
      { label: 'Approval Matrix', path: '/system/approval-matrix' },
      { label: 'Access Control', path: '/system/access-control' },
      { label: 'Activity Log', path: '/system/activity-log' },
    ],
  },

  {
    label: 'Master Data',
    icon: Database,
    children: [
      { label: 'Cabang', path: '/master/cabang' },
      { label: 'Cost Center', path: '/master/cost-center' },
      { label: 'Chart of Accounts', path: '/master/coa' },
      { label: 'Fiscal Period', path: '/master/fiscal-period' },
      { label: 'Program', path: '/master/program' },
      { label: 'Batch / Angkatan', path: '/master/batch' },
      { label: 'Instruktur', path: '/master/instruktur' },
      { label: 'Skill & Sertifikasi', path: '/master/skill' },
      { label: 'Partner Jepang', path: '/master/partner' },
      { label: 'Perusahaan Jepang', path: '/master/perusahaan' },
      { label: 'Lokasi Jepang', path: '/master/lokasi' },
      { label: 'Jenis Dokumen', path: '/master/jenis-dokumen' },
      { label: 'Paket & Biaya', path: '/master/paket-biaya' },
    ],
  },

  {
    label: 'Operasional Siswa',
    icon: GraduationCap,
    children: [
      { label: '— Manajemen Siswa', isHeader: true },
      { label: 'Profil Siswa', path: '/operasional/siswa/profil' },
      { label: 'Status Journey', path: '/operasional/siswa/journey' },
      { label: 'Dokumen Siswa', path: '/operasional/siswa/dokumen' },
      { label: 'Catatan & Issue', path: '/operasional/siswa/catatan' },
      { label: '— Training Progress', isHeader: true },
      { label: 'Absensi', path: '/operasional/training/absensi' },
      { label: 'Penilaian', path: '/operasional/training/penilaian' },
      { label: 'Evaluasi', path: '/operasional/training/evaluasi' },
      { label: '— Keberangkatan', isHeader: true },
      { label: 'Jadwal Keberangkatan', path: '/operasional/keberangkatan/jadwal' },
      { label: 'Checklist Pra-Berangkat', path: '/operasional/keberangkatan/checklist' },
      { label: 'Detail Penerbangan', path: '/operasional/keberangkatan/penerbangan' },
      { label: 'Dokumen Final', path: '/operasional/keberangkatan/dokumen-final' },
      { label: 'Status Keberangkatan', path: '/operasional/keberangkatan/status' },
      { label: 'Konfirmasi Berangkat', path: '/operasional/keberangkatan/konfirmasi' },
    ],
  },

  {
    label: 'Recruitment & Matching',
    icon: Briefcase,
    children: [
      { label: 'Pool Kandidat', path: '/recruitment/pool' },
      { label: 'Jadwal Interview', path: '/recruitment/interview-jadwal' },
      { label: 'Hasil Interview', path: '/recruitment/interview-hasil' },
      { label: 'Approval Kandidat', path: '/recruitment/approval' },
      { label: 'Placement ke Jepang', path: '/recruitment/placement' },
      { label: 'Status Placement', path: '/recruitment/status' },
    ],
  },

  {
    label: 'Dokumen & Legal',
    icon: FileText,
    children: [
      { label: 'Dokumen Legal', path: '/dokumen/legal' },
      { label: 'Approval Dokumen', path: '/dokumen/approval' },
      { label: 'Kontrak Siswa', path: '/dokumen/kontrak-siswa' },
      { label: 'Kontrak Perusahaan', path: '/dokumen/kontrak-perusahaan' },
      { label: 'Versi & Histori', path: '/dokumen/histori' },
      { label: 'Reminder Expired', path: '/dokumen/reminder' },
    ],
  },

  {
    label: 'Monitoring Jepang',
    icon: Activity,
    children: [
      { label: 'Status Kerja Siswa', path: '/monitoring/status-kerja' },
      { label: 'Check-in Berkala', path: '/monitoring/checkin' },
      { label: 'Evaluasi Perusahaan', path: '/monitoring/evaluasi-perusahaan' },
      { label: 'Evaluasi Kinerja', path: '/monitoring/evaluasi-kinerja' },
      { label: 'Incident Report', path: '/monitoring/incident' },
      { label: 'Laporan Masalah', path: '/monitoring/laporan-masalah' },
      { label: 'Data Penempatan', path: '/monitoring/penempatan' },
      { label: 'Perpanjangan Kontrak', path: '/monitoring/perpanjangan-kontrak' },
      { label: 'Data Kepulangan', path: '/monitoring/kepulangan' },
    ],
  },

  {
    label: 'Budgeting & Control',
    icon: PieChart,
    children: [
      { label: 'Budget Period', path: '/budgeting/period' },
      { label: 'Budget Planning', path: '/budgeting/planning' },
      { label: 'Budget Allocation', path: '/budgeting/allocation' },
      { label: 'Budget Approval', path: '/budgeting/approval' },
      { label: 'Budget Revision', path: '/budgeting/revision' },
      { label: 'Budget Monitoring', path: '/budgeting/monitoring' },
      { label: 'Budget Lock', path: '/budgeting/lock' },
    ],
  },

  {
    label: 'Finance (Cashflow)',
    icon: DollarSign,
    children: [
      { label: 'Billing & Invoice', path: '/finance/billing' },
      { label: 'Virtual Account', path: '/finance/virtual-account' },
      { label: 'Payment Monitoring', path: '/finance/payment' },
      { label: 'Request Disbursement', path: '/finance/disbursement-request' },
      { label: 'Approval Disbursement', path: '/finance/disbursement-approval' },
      { label: 'Cash In', path: '/finance/cash-in' },
      { label: 'Cash Out', path: '/finance/cash-out' },
    ],
  },

  {
    label: 'Accounting',
    icon: BookOpen,
    children: [
      { label: 'Auto Journal', path: '/accounting/auto-journal' },
      { label: 'Manual Journal', path: '/accounting/manual-journal' },
      { label: 'Journal Approval', path: '/accounting/journal-approval' },
      { label: 'General Ledger', path: '/accounting/ledger' },
      { label: 'Trial Balance', path: '/accounting/trial-balance' },
      { label: 'Profit & Loss', path: '/accounting/profit-loss' },
      { label: 'Balance Sheet', path: '/accounting/balance-sheet' },
    ],
  },

  {
    label: 'Reporting & Analytics',
    icon: BarChart2,
    children: [
      { label: 'Operasional', path: '/reporting/operasional' },
      { label: 'Akademik', path: '/reporting/akademik' },
      { label: 'Placement Jepang', path: '/reporting/placement' },
      { label: 'Budget vs Actual', path: '/reporting/budget' },
      { label: 'Cashflow', path: '/reporting/cashflow' },
      { label: 'Keuangan', path: '/reporting/keuangan' },
      { label: 'Export PDF / Excel', path: '/reporting/export' },
    ],
  },

  {
    label: 'Integration & Settings',
    icon: Settings,
    children: [
      { label: 'Payment Gateway', path: '/settings/payment-gateway' },
      { label: 'Email Gateway', path: '/settings/email-gateway' },
      { label: 'Telegram Gateway', path: '/settings/telegram-gateway' },
      { label: 'Template Dokumen', path: '/settings/template' },
      { label: 'SLA & Reminder', path: '/settings/sla' },
      { label: 'Backup & Restore', path: '/settings/backup' },
      { label: 'Compliance & Policy', path: '/settings/compliance' },
    ],
  },
];

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const newOpenMenus = {};
    menu.forEach((item) => {
      // Check if current path matches main path or any child
      if (item.path && location.pathname === item.path) {
        newOpenMenus[item.label] = true;
      }
      if (item.children?.some((child) => child.path && child.path === location.pathname)) {
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
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 shadow-sm transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:z-30
          ${isCollapsed ? 'w-20' : 'w-72'}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white">H</span>
                </div>
                <div>
                  <span className="font-bold text-base text-gray-800 block leading-tight">HAYASA-LPK</span>
                  <span className="text-xs text-gray-400">Portal Internal</span>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md mx-auto">
                <span className="text-lg font-bold text-white">H</span>
              </div>
            )}

            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
            {menu.map((item, i) => {
              const Icon = item.icon;
              const isActiveParent = item.children
                ? item.children.some((child) => child.path && child.path === location.pathname)
                : false;

              const isOpen2 = openMenus[item.label];

              // ── Direct link (no children) ──────────────────────────
              if (!item.children) {
                return (
                  <NavLink
                    key={i}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group mb-0.5
                      ${isActive ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                      ${isCollapsed ? 'justify-center' : ''}`
                    }
                    title={isCollapsed ? item.label : ''}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        {!isCollapsed && <span className="text-sm font-semibold truncate">{item.label}</span>}
                      </>
                    )}
                  </NavLink>
                );
              }

              // ── Expandable group (has children) ────────────────────
              return (
                <div key={i}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group text-left
                      ${isActiveParent ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                      ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActiveParent ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                      {!isCollapsed && (
                        <span className="text-sm font-semibold truncate">{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronRight
                        className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen2 ? 'rotate-90' : ''} text-gray-400`}
                      />
                    )}
                  </button>

                  {/* Children */}
                  {!isCollapsed && (
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen2 ? 'max-h-[600px] mt-0.5' : 'max-h-0'}`}>
                      <div className="ml-4 pl-3 border-l border-gray-100 space-y-0.5 py-1">
                        {item.children.map((child, ci) => {
                          if (child.isHeader) {
                            return (
                              <p key={ci} className="px-2 pt-2 pb-0.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                {child.label.replace('— ', '')}
                              </p>
                            );
                          }
                          return (
                            <NavLink
                              key={ci}
                              to={child.path}
                              onClick={onClose}
                              className={({ isActive }) =>
                                `block px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                                  isActive
                                    ? 'bg-blue-500 text-white font-medium shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          {!isCollapsed ? (
            <div className="p-3 border-t border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">Admin</p>
                  <p className="text-xs text-gray-400 truncate">admin@hayasa-lpk.com</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 border-t border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow mx-auto">
                A
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}