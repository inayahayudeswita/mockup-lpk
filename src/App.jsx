import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';

// System & Security
import UserManagement from './pages/system/UserManagement';
import RoleManagement from './pages/system/RoleManagement';
import PermissionManagement from './pages/system/PermissionManagement';
import ApprovalMatrix from './pages/system/ApprovalMatrix';
import AccessControl from './pages/system/AccessControl';
import ActivityLog from './pages/system/ActivityLog';

// Master Data
import Cabang from './pages/master/Cabang';
import CostCenter from './pages/master/CostCenter';
import ChartOfAccounts from './pages/master/ChartOfAccounts';
import FiscalPeriod from './pages/master/FiscalPeriod';
import Program from './pages/master/Program';
import BatchAngkatan from './pages/master/BatchAngkatan';
import Instruktur from './pages/master/Instruktur';
import SkillSertifikasi from './pages/master/SkillSertifikasi';
import PartnerJepang from './pages/master/PartnerJepang';
import PerusahaanJepang from './pages/master/PerusahaanJepang';
import LokasiJepang from './pages/master/LokasiJepang';
import JenisDokumen from './pages/master/JenisDokumen';
import PaketBiaya from './pages/master/PaketBiaya';

// Operasional Siswa - Manajemen Siswa
import ProfilSiswa from './pages/operasional/siswa/ProfilSiswa';
import StatusJourney from './pages/operasional/siswa/StatusJourney';
import DokumenSiswa from './pages/operasional/siswa/DokumenSiswa';
import CatatanIssue from './pages/operasional/siswa/CatatanIssue';

// Operasional Siswa - Training Progress
import Absensi from './pages/operasional/training/Absensi';
import Penilaian from './pages/operasional/training/Penilaian';
import Evaluasi from './pages/operasional/training/Evaluasi';

// Operasional Siswa - Keberangkatan
import JadwalKeberangkatan from './pages/operasional/keberangkatan/JadwalKeberangkatan';
import ChecklistPraBerangkat from './pages/operasional/keberangkatan/ChecklistPraBerangkat';
import DetailPenerbangan from './pages/operasional/keberangkatan/DetailPenerbangan';
import DokumenFinal from './pages/operasional/keberangkatan/DokumenFinal';
import StatusKeberangkatan from './pages/operasional/keberangkatan/StatusKeberangkatan';
import KonfirmasiBerangkat from './pages/operasional/keberangkatan/KonfirmasiBerangkat';

// Recruitment & Matching Jepang
import PoolKandidat from './pages/recruitment/PoolKandidat';
import JadwalInterview from './pages/recruitment/JadwalInterview';
import HasilInterview from './pages/recruitment/HasilInterview';
import ApprovalKandidat from './pages/recruitment/ApprovalKandidat';
import PlacementJepang from './pages/recruitment/PlacementJepang';
import StatusPlacement from './pages/recruitment/StatusPlacement';

// Dokumen & Legal
import DokumenLegal from './pages/dokumen/DokumenLegal';
import ApprovalDokumen from './pages/dokumen/ApprovalDokumen';
import KontrakSiswa from './pages/dokumen/KontrakSiswa';
import KontrakPerusahaan from './pages/dokumen/KontrakPerusahaan';
import VersiHistori from './pages/dokumen/VersiHistori';
import ReminderExpired from './pages/dokumen/ReminderExpired';

// Monitoring Jepang
import StatusKerjaSiswa from './pages/monitoring/StatusKerjaSiswa';
import CheckinBerkala from './pages/monitoring/CheckinBerkala';
import EvaluasiPerusahaan from './pages/monitoring/EvaluasiPerusahaan';
import IncidentReport from './pages/monitoring/IncidentReport';
import DataKepulangan from './pages/monitoring/DataKepulangan';
import DataPenempatan from './pages/monitoring/DataPenempatan';
import EvaluasiKinerja from './pages/monitoring/EvaluasiKinerja';
import LaporanMasalah from './pages/monitoring/LaporanMasalah';
import PerpanjanganKontrak from './pages/monitoring/PerpanjanganKontrak';

// Budgeting & Control
import BudgetPeriod from './pages/budgeting/BudgetPeriod';
import BudgetPlanning from './pages/budgeting/BudgetPlanning';
import BudgetAllocation from './pages/budgeting/BudgetAllocation';
import BudgetApproval from './pages/budgeting/BudgetApproval';
import BudgetRevision from './pages/budgeting/BudgetRevision';
import BudgetMonitoring from './pages/budgeting/BudgetMonitoring';
import BudgetLock from './pages/budgeting/BudgetLock';

// Finance (Cashflow)
import BillingInvoice from './pages/finance/BillingInvoice';
import VirtualAccount from './pages/finance/VirtualAccount';
import PaymentMonitoring from './pages/finance/PaymentMonitoring';
import RequestDisbursement from './pages/finance/RequestDisbursement';
import ApprovalDisbursement from './pages/finance/ApprovalDisbursement';
import CashIn from './pages/finance/CashIn';
import CashOut from './pages/finance/CashOut';

// Accounting
import AutoJournal from './pages/accounting/AutoJournal';
import ManualJournal from './pages/accounting/ManualJournal';
import JournalApproval from './pages/accounting/JournalApproval';
import GeneralLedger from './pages/accounting/GeneralLedger';
import TrialBalance from './pages/accounting/TrialBalance';
import ProfitLoss from './pages/accounting/ProfitLoss';
import BalanceSheet from './pages/accounting/BalanceSheet';

// Reporting & Analytics
import ReportOperasional from './pages/reporting/ReportOperasional';
import ReportAkademik from './pages/reporting/ReportAkademik';
import ReportPlacement from './pages/reporting/ReportPlacement';
import ReportBudget from './pages/reporting/ReportBudget';
import ReportCashflow from './pages/reporting/ReportCashflow';
import ReportKeuangan from './pages/reporting/ReportKeuangan';
import ExportData from './pages/reporting/ExportData';

// Integration & Settings
import PaymentGateway from './pages/settings/PaymentGateway';
import EmailGateway from './pages/settings/EmailGateway';
import TelegramGateway from './pages/settings/TelegramGateway';
import TemplateDokumen from './pages/settings/TemplateDokumen';
import SLAReminder from './pages/settings/SLAReminder';
import BackupRestore from './pages/settings/BackupRestore';
import CompliancePolicy from './pages/settings/CompliancePolicy';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1f2937',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            padding: '16px',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />

      <Routes>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* System & Security */}
          <Route path="/system/user" element={<UserManagement />} />
          <Route path="/system/role" element={<RoleManagement />} />
          <Route path="/system/permission" element={<PermissionManagement />} />
          <Route path="/system/approval-matrix" element={<ApprovalMatrix />} />
          <Route path="/system/access-control" element={<AccessControl />} />
          <Route path="/system/activity-log" element={<ActivityLog />} />

          {/* Master Data */}
          <Route path="/master/cabang" element={<Cabang />} />
          <Route path="/master/cost-center" element={<CostCenter />} />
          <Route path="/master/coa" element={<ChartOfAccounts />} />
          <Route path="/master/fiscal-period" element={<FiscalPeriod />} />
          <Route path="/master/program" element={<Program />} />
          <Route path="/master/batch" element={<BatchAngkatan />} />
          <Route path="/master/instruktur" element={<Instruktur />} />
          <Route path="/master/skill" element={<SkillSertifikasi />} />
          <Route path="/master/partner" element={<PartnerJepang />} />
          <Route path="/master/perusahaan" element={<PerusahaanJepang />} />
          <Route path="/master/lokasi" element={<LokasiJepang />} />
          <Route path="/master/jenis-dokumen" element={<JenisDokumen />} />
          <Route path="/master/paket-biaya" element={<PaketBiaya />} />

          {/* Operasional Siswa - Manajemen Siswa */}
          <Route path="/operasional/siswa/profil" element={<ProfilSiswa />} />
          <Route path="/operasional/siswa/journey" element={<StatusJourney />} />
          <Route path="/operasional/siswa/dokumen" element={<DokumenSiswa />} />
          <Route path="/operasional/siswa/catatan" element={<CatatanIssue />} />

          {/* Operasional Siswa - Training Progress */}
          <Route path="/operasional/training/absensi" element={<Absensi />} />
          <Route path="/operasional/training/penilaian" element={<Penilaian />} />
          <Route path="/operasional/training/evaluasi" element={<Evaluasi />} />

          {/* Operasional Siswa - Keberangkatan */}
          <Route path="/operasional/keberangkatan/jadwal" element={<JadwalKeberangkatan />} />
          <Route path="/operasional/keberangkatan/checklist" element={<ChecklistPraBerangkat />} />
          <Route path="/operasional/keberangkatan/penerbangan" element={<DetailPenerbangan />} />
          <Route path="/operasional/keberangkatan/dokumen-final" element={<DokumenFinal />} />
          <Route path="/operasional/keberangkatan/status" element={<StatusKeberangkatan />} />
          <Route path="/operasional/keberangkatan/konfirmasi" element={<KonfirmasiBerangkat />} />

          {/* Recruitment & Matching Jepang */}
          <Route path="/recruitment/pool" element={<PoolKandidat />} />
          <Route path="/recruitment/interview-jadwal" element={<JadwalInterview />} />
          <Route path="/recruitment/interview-hasil" element={<HasilInterview />} />
          <Route path="/recruitment/approval" element={<ApprovalKandidat />} />
          <Route path="/recruitment/placement" element={<PlacementJepang />} />
          <Route path="/recruitment/status" element={<StatusPlacement />} />

          {/* Dokumen & Legal */}
          <Route path="/dokumen/legal" element={<DokumenLegal />} />
          <Route path="/dokumen/approval" element={<ApprovalDokumen />} />
          <Route path="/dokumen/kontrak-siswa" element={<KontrakSiswa />} />
          <Route path="/dokumen/kontrak-perusahaan" element={<KontrakPerusahaan />} />
          <Route path="/dokumen/histori" element={<VersiHistori />} />
          <Route path="/dokumen/reminder" element={<ReminderExpired />} />

         {/* Monitoring Jepang */}
          <Route path="/monitoring/status-kerja" element={<StatusKerjaSiswa />} />
          <Route path="/monitoring/checkin" element={<CheckinBerkala />} />
          <Route path="/monitoring/evaluasi-perusahaan" element={<EvaluasiPerusahaan />} />
          <Route path="/monitoring/evaluasi-kinerja" element={<EvaluasiKinerja />} />
          <Route path="/monitoring/incident" element={<IncidentReport />} />
          <Route path="/monitoring/laporan-masalah" element={<LaporanMasalah />} />
          <Route path="/monitoring/penempatan" element={<DataPenempatan />} />
          <Route path="/monitoring/perpanjangan-kontrak" element={<PerpanjanganKontrak />} />
          <Route path="/monitoring/kepulangan" element={<DataKepulangan />} />
                    

          {/* Budgeting & Control */}
          <Route path="/budgeting/period" element={<BudgetPeriod />} />
          <Route path="/budgeting/planning" element={<BudgetPlanning />} />
          <Route path="/budgeting/allocation" element={<BudgetAllocation />} />
          <Route path="/budgeting/approval" element={<BudgetApproval />} />
          <Route path="/budgeting/revision" element={<BudgetRevision />} />
          <Route path="/budgeting/monitoring" element={<BudgetMonitoring />} />
          <Route path="/budgeting/lock" element={<BudgetLock />} />

          {/* Finance (Cashflow) */}
          <Route path="/finance/billing" element={<BillingInvoice />} />
          <Route path="/finance/virtual-account" element={<VirtualAccount />} />
          <Route path="/finance/payment" element={<PaymentMonitoring />} />
          <Route path="/finance/disbursement-request" element={<RequestDisbursement />} />
          <Route path="/finance/disbursement-approval" element={<ApprovalDisbursement />} />
          <Route path="/finance/cash-in" element={<CashIn />} />
          <Route path="/finance/cash-out" element={<CashOut />} />

          {/* Accounting */}
          <Route path="/accounting/auto-journal" element={<AutoJournal />} />
          <Route path="/accounting/manual-journal" element={<ManualJournal />} />
          <Route path="/accounting/journal-approval" element={<JournalApproval />} />
          <Route path="/accounting/ledger" element={<GeneralLedger />} />
          <Route path="/accounting/trial-balance" element={<TrialBalance />} />
          <Route path="/accounting/profit-loss" element={<ProfitLoss />} />
          <Route path="/accounting/balance-sheet" element={<BalanceSheet />} />

          {/* Reporting & Analytics */}
          <Route path="/reporting/operasional" element={<ReportOperasional />} />
          <Route path="/reporting/akademik" element={<ReportAkademik />} />
          <Route path="/reporting/placement" element={<ReportPlacement />} />
          <Route path="/reporting/budget" element={<ReportBudget />} />
          <Route path="/reporting/cashflow" element={<ReportCashflow />} />
          <Route path="/reporting/keuangan" element={<ReportKeuangan />} />
          <Route path="/reporting/export" element={<ExportData />} />

          {/* Integration & Settings */}
          <Route path="/settings/payment-gateway" element={<PaymentGateway />} />
          <Route path="/settings/email-gateway" element={<EmailGateway />} />
          <Route path="/settings/telegram-gateway" element={<TelegramGateway />} />
          <Route path="/settings/template" element={<TemplateDokumen />} />
          <Route path="/settings/sla" element={<SLAReminder />} />
          <Route path="/settings/backup" element={<BackupRestore />} />
          <Route path="/settings/compliance" element={<CompliancePolicy />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;