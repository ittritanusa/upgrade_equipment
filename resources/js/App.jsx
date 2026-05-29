import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/Utils/Contexts/AuthContext';
import { ThemeProvider } from '@/Utils/Contexts/ThemeContext';
import queryClient from '@/Utils/Libs/QueryClient';

// Landing Page
import LandingPage from '@/Pages/Landing/landing_page';
import TentangKami from '@/Pages/Landing/about_us';
import Layanan from '@/Pages/Landing/service_page';
import Proyek from '@/Pages/Landing/portfolio_project';
import Berita from '@/Pages/Landing/news_article';
import Kontak from '@/Pages/Landing/contact_page';

// Auth
import Login from '@/Pages/Auth/Login/Login';

// Not Found
import NotFoundPage from '@/Pages/NotFound/NotFoundPage';

// Dashboard
import Dashboard from '@/Pages/Admin/Dashboard/Dashboard';

// Master Data Departemen
import DataDepartemen from '@/Pages/Admin/MasterData/Departemen/departemen';
import CreateDataDepartemen from '@/Pages/Admin/MasterData/Departemen/create_departemen';
import EditDataDepartemen from '@/Pages/Admin/MasterData/Departemen/edit_departemen';
import DetailDataDepartemen from '@/Pages/Admin/MasterData/Departemen/detail_departemen';

// Master Data Jabatan
import DataJabatan from '@/Pages/Admin/MasterData/Jabatan/jabatan';
import CreateDataJabatan from '@/Pages/Admin/MasterData/Jabatan/create_jabatan';
import EditDataJabatan from '@/Pages/Admin/MasterData/Jabatan/edit_jabatan';
import DetailDataJabatan from '@/Pages/Admin/MasterData/Jabatan/detail_jabatan';

// Master Data Employees
import DataEmployees from '@/Pages/Admin/MasterData/Employees/employees';
import CreateDataEmployees from '@/Pages/Admin/MasterData/Employees/create_employees';
import EditDataEmployees from '@/Pages/Admin/MasterData/Employees/edit_employees';
import DetailDataEmployees from '@/Pages/Admin/MasterData/Employees/detail_employees';

// Master Data Supplier / Vendor
import DataVendor from '@/Pages/Admin/MasterData/Vendor/vendor';
import CreateDataVendor from '@/Pages/Admin/MasterData/Vendor/create_vendor';
import EditDataVendor from '@/Pages/Admin/MasterData/Vendor/edit_vendor';
import DetailDataVendor from '@/Pages/Admin/MasterData/Vendor/detail_vendor';

// Master Data Leave Reason
import DataLeaveReason from '@/Pages/Admin/MasterData/LeaveReason/leave_reason';
import CreateDataLeaveReason from '@/Pages/Admin/MasterData/LeaveReason/create_leave_reason';
import EditDataLeaveReason from '@/Pages/Admin/MasterData/LeaveReason/edit_leave_reason';
import DetailDataLeaveReason from '@/Pages/Admin/MasterData/LeaveReason/detail_leave_reason';

// Master Data Cash & Bank
import DataCashBank from '@/Pages/Admin/MasterData/CashBank/cash_bank';
import CreateDataCashBank from '@/Pages/Admin/MasterData/CashBank/create_cash_bank';
import EditDataCashBank from '@/Pages/Admin/MasterData/CashBank/edit_cash_bank';
import DetailDataCashBank from '@/Pages/Admin/MasterData/CashBank/detail_cash_bank';

// Module Projects
import Project from '@/Pages/Admin/Project/Project';
import CreateProject from '@/Pages/Admin/Project/CreateProject';
import DetailProject from '@/Pages/Admin/Project/DetailProject';

// Module Budget & RAB
import RABProject from '@/Pages/Admin/Budget/Rab/rab_project';
import CreateRABProject from '@/Pages/Admin/Budget/Rab/create_rab_project';
import DetailRABProject from '@/Pages/Admin/Budget/Rab/detail_rab_project';

import RealisasiBudget from '@/Pages/Admin/Budget/RealisasiBudget/realisasi_budget';
import CreateRealisasiBudget from '@/Pages/Admin/Budget/RealisasiBudget/create_realisasi_budget';
import DetailRealisasiBudget from '@/Pages/Admin/Budget/RealisasiBudget/detail_realisasi_budget';

// Module Procurement
import PurchaseRequest from '@/Pages/Admin/Procurement/PR/Purchase_request';
import CreatePurchaseRequest from '@/Pages/Admin/Procurement/PR/create_purchase_request';
import DetailPurchaseRequest from '@/Pages/Admin/Procurement/PR/detail_purchase_request';

import RequestQuotation from '@/Pages/Admin/Procurement/RFQ/request_quotation';
import CreateRequestQuotation from '@/Pages/Admin/Procurement/RFQ/create_request_quotation';
import DetailRequestQuotation from '@/Pages/Admin/Procurement/RFQ/detail_request_quotation';

import VendorSelection from '@/Pages/Admin/Procurement/Vendor/vendor_selection';
import ProsesVendorSelection from '@/Pages/Admin/Procurement/Vendor/proses_vendor_selection';
import BeritaAcaraVendorSelection from '@/Pages/Admin/Procurement/Vendor/ba_vendor_selection';

import PurchaseOrder from '@/Pages/Admin/Procurement/PO/purchase_order';
import CreatePurchaseOrder from '@/Pages/Admin/Procurement/PO/create_purchase_order';
import DetailPurchaseOrder from '@/Pages/Admin/Procurement/PO/detail_purchase_order';

// Module Inventory & Warehouse
import DashboardInventory from '@/Pages/Admin/Inventory/Dashboard/dashboard';

import MasterItemMaterial from '@/Pages/Admin/Inventory/MasterData/item_material';
import CreateMasterItemMaterial from '@/Pages/Admin/Inventory/MasterData/create_item_material';
import EditMasterItemMaterial from '@/Pages/Admin/Inventory/MasterData/edit_item_material';
import DetailMasterItemMaterial from '@/Pages/Admin/Inventory/MasterData/detail_item_material';

import KategoriSatuan from '@/Pages/Admin/Inventory/KategoriSatuan/kategori_satuan';
import TambahHierarkiKelompok from '@/Pages/Admin/Inventory/KategoriSatuan/create_hierarki_kelompok';
import EditHierarkiKelompok from '@/Pages/Admin/Inventory/KategoriSatuan/edit_hierarki_kelompok';
import TambahSatuan from '@/Pages/Admin/Inventory/KategoriSatuan/create_satuan';
import EditSatuan from '@/Pages/Admin/Inventory/KategoriSatuan/edit_satuan';

import GoodsReceipt from '@/Pages/Admin/Inventory/GR/goods_receipt';
import TambahGoodsReceipt from '@/Pages/Admin/Inventory/GR/create_goods_receipt';
import EditGoodsReceipt from '@/Pages/Admin/Inventory/GR/edit_goods_receipt';
import DetailGoodsReceipt from '@/Pages/Admin/Inventory/GR/detail_goods_receipt';
import PrintGoodsReceipt from '@/Pages/Admin/Inventory/GR/print_goods_receipt';

import GoodsIssue from '@/Pages/Admin/Inventory/GI/goods_issue';
import CreateGoodsIssue from '@/Pages/Admin/Inventory/GI/create_goods_issue';
import EditGoodsIssue from '@/Pages/Admin/Inventory/GI/edit_goods_issue';
import DetailGoodsIssue from '@/Pages/Admin/Inventory/GI/detail_goods_issue';
import PrintGoodsIssue from '@/Pages/Admin/Inventory/GI/print_goods_issue';

import StockOpname from '@/Pages/Admin/Inventory/Stock/stock_opname';
import StockAdjustment from '@/Pages/Admin/Inventory/Stock/stock_adjustment';
import CreateStockAdjustment from '@/Pages/Admin/Inventory/Stock/create_stock_adjustment';
import DetailStockAdjustment from '@/Pages/Admin/Inventory/Stock/detail_stock_adjustment';

import InterWarehouseTf from '@/Pages/Admin/Inventory/InterWahouseTransfer/stock_transfer';
import CreateInterWarehouseTf from '@/Pages/Admin/Inventory/InterWahouseTransfer/create_stock_transfer';
import DetailInterWarehouseTf from '@/Pages/Admin/Inventory/InterWahouseTransfer/detail_stock_transfer';
import PrintInterWarehouseTf from '@/Pages/Admin/Inventory/InterWahouseTransfer/print_stock_transfer';

import WarehouseManagement from '@/Pages/Admin/Inventory/Warehouse/warehouse';
import CreateWarehouseManagement from '@/Pages/Admin/Inventory/Warehouse/create_warehouse';
import EditWarehouseManagement from '@/Pages/Admin/Inventory/Warehouse/edit_warehouse';
import DetailWarehouseManagement from '@/Pages/Admin/Inventory/Warehouse/detail_warehouse';

// Module Accounting & Finance
import FinanceDashboard from '@/Pages/Admin/Finance/Dashboard/dashboard';

import FinanceCOA from '@/Pages/Admin/Finance/COA/coa';
import CreateFinanceCOA from '@/Pages/Admin/Finance/COA/create_coa';
import EditFinanceCOA from '@/Pages/Admin/Finance/COA/edit_coa';
import DetailFinanceCOA from '@/Pages/Admin/Finance/COA/detail_coa';

import JournalEntry from '@/Pages/Admin/Finance/Journal/journal_entry';
import CreateJournalEntry from '@/Pages/Admin/Finance/Journal/create_journal_entry';
import EditJournalEntry from '@/Pages/Admin/Finance/Journal/edit_journal_entry';
import DetailJournalEntry from '@/Pages/Admin/Finance/Journal/detail_journal_entry';
import PrintJournalEntry from '@/Pages/Admin/Finance/Journal/print_journal_entry';

import GeneralLedger from '@/Pages/Admin/Finance/GL/general_ledger';

import AccountReceivable from '@/Pages/Admin/Finance/AR/account_receivable';
import CreateAccountReceivable from '@/Pages/Admin/Finance/AR/create_invoice';
import DetailAccountReceivable from '@/Pages/Admin/Finance/AR/detail_account_receivable';
import EditAccountReceivable from '@/Pages/Admin/Finance/AR/edit_invoice';

import AccountPayable from '@/Pages/Admin/Finance/AP/account_payable';
import CreateAccountPayable from '@/Pages/Admin/Finance/AP/create_account_payable';
import EditAccountPayable from '@/Pages/Admin/Finance/AP/edit_account_payable';
import DetailAccountPayable from '@/Pages/Admin/Finance/AP/detail_account_payable';

import PettyCash from '@/Pages/Admin/Finance/PettyCash/petty_cash';
import CreatePettyCash from '@/Pages/Admin/Finance/PettyCash/create_petty_cash';
import EditPettyCash from '@/Pages/Admin/Finance/PettyCash/edit_petty_cash';
import DetailPettyCash from '@/Pages/Admin/Finance/PettyCash/detail_petty_cash';

// Module Tax Management
import TaxDashboard from '@/Pages/Admin/Tax/Dashboard/Dashboard';

import TaxPayment from '@/Pages/Admin/Tax/Payment/tax_payment';
import CreateTaxPayment from '@/Pages/Admin/Tax/Payment/create_tax_payment';
import EditTaxPayment from '@/Pages/Admin/Tax/Payment/edit_tax_payment';

// Module HR & Manpower
import HRDashboard from '@/Pages/Admin/HR/Dashboard/dashboard';

import LeaveManagement from '@/Pages/Admin/HR/LeaveManagement/leave';
import CreateLeaveManagement from '@/Pages/Admin/HR/LeaveManagement/create_leave';

import EmployeeManagement from '@/Pages/Admin/HR/Employee/employee';
import CreateEmployeeManagement from '@/Pages/Admin/HR/Employee/create_employee';
import EditEmployeeManagement from '@/Pages/Admin/HR/Employee/edit_employee';
import DetailEmployeeManagement from '@/Pages/Admin/HR/Employee/detail_employee';

import Attandance from '@/Pages/Admin/HR/Attandance/attandance';
import CreateAttandance from '@/Pages/Admin/HR/Attandance/create_attandance';

import Payroll from '@/Pages/Admin/HR/Payroll/payroll';
import CreatePayroll from '@/Pages/Admin/HR/Payroll/create_payroll';

import KPISetting from '@/Pages/Admin/HR/KPI/kpi_setting';
import CreateKPISetting from '@/Pages/Admin/HR/KPI/create_kpi_setting';
import EditKPISetting from '@/Pages/Admin/HR/KPI/edit_kpi_setting';
import DetailKPISetting from '@/Pages/Admin/HR/KPI/detail_kpi_setting';

import KPIMonitoring from '@/Pages/Admin/HR/KPI/kpi_monitoring';
import DetailKPIMonitoring from '@/Pages/Admin/HR/KPI/detail_kpi_monitoring';

// Module Reports & Analytics
import ReportAnalytics from '@/Pages/Admin/Report/report_analytics';

import '../css/app.css';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/portal/dashboard" replace /> : children;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<GuestRoute><LandingPage /></GuestRoute>} />
                <Route path="/tentang-kami" element={<GuestRoute><TentangKami /></GuestRoute>} />
                <Route path="/layanan" element={<GuestRoute><Layanan /></GuestRoute>} />
                <Route path="/proyek" element={<GuestRoute><Proyek /></GuestRoute>} />
                <Route path="/berita" element={<GuestRoute><Berita /></GuestRoute>} />
                <Route path="/kontak" element={<GuestRoute><Kontak /></GuestRoute>} />

                <Route path="/employee-portal" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/portal/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Master Data Departemen */}
                <Route path="/portal/master/departments" element={<ProtectedRoute><DataDepartemen /></ProtectedRoute>} />
                <Route path="/portal/master/departments/create" element={<ProtectedRoute><CreateDataDepartemen /></ProtectedRoute>} />
                <Route path="/portal/master/departments/edit" element={<ProtectedRoute><EditDataDepartemen /></ProtectedRoute>} />
                <Route path="/portal/master/departments/detail" element={<ProtectedRoute><DetailDataDepartemen /></ProtectedRoute>} />

                {/* Master Data Jabatan */}
                <Route path="/portal/master/jabatan" element={<ProtectedRoute><DataJabatan /></ProtectedRoute>} />
                <Route path="/portal/master/jabatan/create" element={<ProtectedRoute><CreateDataJabatan /></ProtectedRoute>} />
                <Route path="/portal/master/jabatan/edit" element={<ProtectedRoute><EditDataJabatan /></ProtectedRoute>} />
                <Route path="/portal/master/jabatan/detail" element={<ProtectedRoute><DetailDataJabatan /></ProtectedRoute>} />

                {/* Master Data Employee */}
                <Route path="/portal/master/employees" element={<ProtectedRoute><DataEmployees /></ProtectedRoute>} />
                <Route path="/portal/master/employees/create" element={<ProtectedRoute><CreateDataEmployees /></ProtectedRoute>} />
                <Route path="/portal/master/employees/edit" element={<ProtectedRoute><EditDataEmployees /></ProtectedRoute>} />
                <Route path="/portal/master/employees/detail" element={<ProtectedRoute><DetailDataEmployees /></ProtectedRoute>} />
                
                {/* Master Data Supplier / Vendor */}
                <Route path="/portal/master/vendors" element={<ProtectedRoute><DataVendor /></ProtectedRoute>} />
                <Route path="/portal/master/vendors/create" element={<ProtectedRoute><CreateDataVendor /></ProtectedRoute>} />
                <Route path="/portal/master/vendors/edit" element={<ProtectedRoute><EditDataVendor /></ProtectedRoute>} />
                <Route path="/portal/master/vendors/detail" element={<ProtectedRoute><DetailDataVendor /></ProtectedRoute>} />
                
                {/* Master Data Alasan Cuti */}
                <Route path="/portal/master/leave-reasons" element={<ProtectedRoute><DataLeaveReason /></ProtectedRoute>} />
                <Route path="/portal/master/leave-reasons/create" element={<ProtectedRoute><CreateDataLeaveReason /></ProtectedRoute>} />
                <Route path="/portal/master/leave-reasons/edit" element={<ProtectedRoute><EditDataLeaveReason /></ProtectedRoute>} />
                <Route path="/portal/master/leave-reasons/detail" element={<ProtectedRoute><DetailDataLeaveReason /></ProtectedRoute>} />
                
                {/* Master Data Cash & Bank */}
                <Route path="/portal/master/cash-bank" element={<ProtectedRoute><DataCashBank /></ProtectedRoute>} />
                <Route path="/portal/master/cash-bank/create" element={<ProtectedRoute><CreateDataCashBank /></ProtectedRoute>} />
                <Route path="/portal/master/cash-bank/edit" element={<ProtectedRoute><EditDataCashBank /></ProtectedRoute>} />
                <Route path="/portal/master/cash-bank/detail" element={<ProtectedRoute><DetailDataCashBank /></ProtectedRoute>} />

                {/* Module Project */}
                <Route path="/portal/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
                <Route path="/portal/project/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                <Route path="/portal/project/detail" element={<ProtectedRoute><DetailProject /></ProtectedRoute>} />

                {/* Module Budget & RAB */}
                <Route path="/portal/budget/rab-project" element={<ProtectedRoute><RABProject /></ProtectedRoute>} />
                <Route path="/portal/budget/rab-project/create" element={<ProtectedRoute><CreateRABProject /></ProtectedRoute>} />
                <Route path="/portal/budget/rab-project/detail" element={<ProtectedRoute><DetailRABProject /></ProtectedRoute>} />

                <Route path="/portal/budget/realisasi" element={<ProtectedRoute><RealisasiBudget /></ProtectedRoute>} />
                <Route path="/portal/budget/realisasi/create" element={<ProtectedRoute><CreateRealisasiBudget /></ProtectedRoute>} />
                <Route path="/portal/budget/realisasi/detail" element={<ProtectedRoute><DetailRealisasiBudget /></ProtectedRoute>} />

                {/* Module Procurement */}
                <Route path="/portal/purchase-request" element={<ProtectedRoute><PurchaseRequest /></ProtectedRoute>} />
                <Route path="/portal/purchase-request/create" element={<ProtectedRoute><CreatePurchaseRequest /></ProtectedRoute>} />
                <Route path="/portal/purchase-request/detail" element={<ProtectedRoute><DetailPurchaseRequest /></ProtectedRoute>} />
                
                <Route path="/portal/request-quotation" element={<ProtectedRoute><RequestQuotation /></ProtectedRoute>} />
                <Route path="/portal/request-quotation/create" element={<ProtectedRoute><CreateRequestQuotation /></ProtectedRoute>} />
                <Route path="/portal/request-quotation/detail" element={<ProtectedRoute><DetailRequestQuotation /></ProtectedRoute>} />
                
                <Route path="/portal/vendor-selection" element={<ProtectedRoute><VendorSelection /></ProtectedRoute>} />
                <Route path="/portal/vendor-selection/proses" element={<ProtectedRoute><ProsesVendorSelection /></ProtectedRoute>} />
                <Route path="/portal/vendor-selection/berita-acara" element={<ProtectedRoute><BeritaAcaraVendorSelection /></ProtectedRoute>} />\
                
                <Route path="/portal/purchase-order" element={<ProtectedRoute><PurchaseOrder /></ProtectedRoute>} />
                <Route path="/portal/purchase-order/create" element={<ProtectedRoute><CreatePurchaseOrder /></ProtectedRoute>} />
                <Route path="/portal/purchase-order/detail" element={<ProtectedRoute><DetailPurchaseOrder /></ProtectedRoute>} />

                {/* Inventory & Warehouse */}
                <Route path="/portal/inventory/dashboard" element={<ProtectedRoute><DashboardInventory /></ProtectedRoute>} />

                <Route path="/portal/inventory/master-item" element={<ProtectedRoute><MasterItemMaterial /></ProtectedRoute>} />
                <Route path="/portal/inventory/master-item/create" element={<ProtectedRoute><CreateMasterItemMaterial /></ProtectedRoute>} />
                <Route path="/portal/inventory/master-item/edit" element={<ProtectedRoute><EditMasterItemMaterial /></ProtectedRoute>} />
                <Route path="/portal/inventory/master-item/detail" element={<ProtectedRoute><DetailMasterItemMaterial /></ProtectedRoute>} />
                
                <Route path="/portal/inventory/category-unit" element={<ProtectedRoute><KategoriSatuan /></ProtectedRoute>} />
                <Route path="/portal/inventory/category-unit/create-hierarki" element={<ProtectedRoute><TambahHierarkiKelompok /></ProtectedRoute>} />
                <Route path="/portal/inventory/category-unit/edit-hierarki" element={<ProtectedRoute><EditHierarkiKelompok /></ProtectedRoute>} />
                <Route path="/portal/inventory/category-unit/create-satuan" element={<ProtectedRoute><TambahSatuan /></ProtectedRoute>} />
                <Route path="/portal/inventory/category-unit/edit-satuan" element={<ProtectedRoute><EditSatuan /></ProtectedRoute>} />
                
                <Route path="/portal/inventory/goods-receipt" element={<ProtectedRoute><GoodsReceipt /></ProtectedRoute>} />
                <Route path="/portal/inventory/goods-receipt/create" element={<ProtectedRoute><TambahGoodsReceipt /></ProtectedRoute>} />
                <Route path="/portal/inventory/goods-receipt/edit" element={<ProtectedRoute><EditGoodsReceipt /></ProtectedRoute>} />
                <Route path="/portal/inventory/goods-receipt/detail" element={<ProtectedRoute><DetailGoodsReceipt /></ProtectedRoute>} />
                <Route path="/portal/inventory/goods-receipt/print" element={<ProtectedRoute><PrintGoodsReceipt /></ProtectedRoute>} />
                
                <Route path="/portal/inventory/goods-issue" element={<ProtectedRoute><GoodsIssue /></ProtectedRoute>} />
                <Route path="/portal/inventory/goods-issue/create" element={<ProtectedRoute><CreateGoodsIssue /></ProtectedRoute>} />
                <Route path="/portal/inventory/goods-issue/edit" element={<ProtectedRoute><EditGoodsIssue /></ProtectedRoute>} />
                <Route path="/portal/inventory/goods-issue/detail" element={<ProtectedRoute><DetailGoodsIssue /></ProtectedRoute>} />
                <Route path="/portal/inventory/goods-issue/print" element={<ProtectedRoute><PrintGoodsIssue /></ProtectedRoute>} />
                
                <Route path="/portal/inventory/stock-opname" element={<ProtectedRoute><StockOpname /></ProtectedRoute>} />
                <Route path="/portal/inventory/stock-adjustment" element={<ProtectedRoute><StockAdjustment /></ProtectedRoute>} />
                <Route path="/portal/inventory/stock-adjustment/create" element={<ProtectedRoute><CreateStockAdjustment /></ProtectedRoute>} />
                <Route path="/portal/inventory/stock-adjustment/detail" element={<ProtectedRoute><DetailStockAdjustment /></ProtectedRoute>} />
                
                <Route path="/portal/inventory/inter-warehouse-transfer" element={<ProtectedRoute><InterWarehouseTf /></ProtectedRoute>} />
                <Route path="/portal/inventory/inter-warehouse-transfer/create" element={<ProtectedRoute><CreateInterWarehouseTf /></ProtectedRoute>} />
                <Route path="/portal/inventory/inter-warehouse-transfer/detail" element={<ProtectedRoute><DetailInterWarehouseTf /></ProtectedRoute>} />
                <Route path="/portal/inventory/inter-warehouse-transfer/print" element={<ProtectedRoute><PrintInterWarehouseTf /></ProtectedRoute>} />
                
                <Route path="/portal/inventory/warehouse" element={<ProtectedRoute><WarehouseManagement /></ProtectedRoute>} />
                <Route path="/portal/inventory/warehouse/create" element={<ProtectedRoute><CreateWarehouseManagement /></ProtectedRoute>} />
                <Route path="/portal/inventory/warehouse/edit" element={<ProtectedRoute><EditWarehouseManagement /></ProtectedRoute>} />
                <Route path="/portal/inventory/warehouse/detail" element={<ProtectedRoute><DetailWarehouseManagement /></ProtectedRoute>} />
                
                <Route path="/portal/finance/dashboard" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />

                <Route path="/portal/finance/coa" element={<ProtectedRoute><FinanceCOA /></ProtectedRoute>} />
                <Route path="/portal/finance/coa/create" element={<ProtectedRoute><CreateFinanceCOA /></ProtectedRoute>} />
                <Route path="/portal/finance/coa/edit" element={<ProtectedRoute><EditFinanceCOA /></ProtectedRoute>} />
                <Route path="/portal/finance/coa/detail" element={<ProtectedRoute><DetailFinanceCOA /></ProtectedRoute>} />
                
                <Route path="/portal/finance/journal-entry" element={<ProtectedRoute><JournalEntry /></ProtectedRoute>} />
                <Route path="/portal/finance/journal-entry/create" element={<ProtectedRoute><CreateJournalEntry /></ProtectedRoute>} />
                <Route path="/portal/finance/journal-entry/edit" element={<ProtectedRoute><EditJournalEntry /></ProtectedRoute>} />
                <Route path="/portal/finance/journal-entry/detail" element={<ProtectedRoute><DetailJournalEntry /></ProtectedRoute>} />
                <Route path="/portal/finance/journal-entry/print" element={<ProtectedRoute><PrintJournalEntry /></ProtectedRoute>} />
                
                <Route path="/portal/finance/general-ledger" element={<ProtectedRoute><GeneralLedger /></ProtectedRoute>} />
                
                <Route path="/portal/finance/account-receivable" element={<ProtectedRoute><AccountReceivable /></ProtectedRoute>} />
                <Route path="/portal/finance/account-receivable/create-invoice" element={<ProtectedRoute><CreateAccountReceivable /></ProtectedRoute>} />
                <Route path="/portal/finance/account-receivable/detail" element={<ProtectedRoute><DetailAccountReceivable /></ProtectedRoute>} />
                <Route path="/portal/finance/account-receivable/edit-invoice" element={<ProtectedRoute><EditAccountReceivable /></ProtectedRoute>} />
                
                <Route path="/portal/finance/account-payable" element={<ProtectedRoute><AccountPayable /></ProtectedRoute>} />
                <Route path="/portal/finance/account-payable/create" element={<ProtectedRoute><CreateAccountPayable /></ProtectedRoute>} />
                <Route path="/portal/finance/account-payable/edit" element={<ProtectedRoute><EditAccountPayable /></ProtectedRoute>} />
                <Route path="/portal/finance/account-payable/detail" element={<ProtectedRoute><DetailAccountPayable /></ProtectedRoute>} />

                <Route path="/portal/finance/petty-cash" element={<ProtectedRoute><PettyCash /></ProtectedRoute>} />
                <Route path="/portal/finance/petty-cash/create" element={<ProtectedRoute><CreatePettyCash /></ProtectedRoute>} />
                <Route path="/portal/finance/petty-cash/edit" element={<ProtectedRoute><EditPettyCash /></ProtectedRoute>} />
                <Route path="/portal/finance/petty-cash/detail" element={<ProtectedRoute><DetailPettyCash /></ProtectedRoute>} />

                {/* Module Tax Management */}
                <Route path="/portal/tax/dashboard" element={<ProtectedRoute><TaxDashboard /></ProtectedRoute>} />
                
                <Route path="/portal/tax/payment" element={<ProtectedRoute><TaxPayment /></ProtectedRoute>} />
                <Route path="/portal/tax/payment/create" element={<ProtectedRoute><CreateTaxPayment /></ProtectedRoute>} />
                <Route path="/portal/tax/payment/edit" element={<ProtectedRoute><EditTaxPayment /></ProtectedRoute>} />

                {/* Module HR & Manpower */}
                <Route path="/portal/manpower/dashboard" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
                
                <Route path="/portal/manpower/master-leave" element={<ProtectedRoute><LeaveManagement /></ProtectedRoute>} />
                <Route path="/portal/manpower/master-leave/create" element={<ProtectedRoute><CreateLeaveManagement /></ProtectedRoute>} />
                
                <Route path="/portal/manpower/employee" element={<ProtectedRoute><EmployeeManagement /></ProtectedRoute>} />
                <Route path="/portal/manpower/employee/create" element={<ProtectedRoute><CreateEmployeeManagement /></ProtectedRoute>} />
                <Route path="/portal/manpower/employee/edit" element={<ProtectedRoute><EditEmployeeManagement /></ProtectedRoute>} />
                <Route path="/portal/manpower/employee/detail" element={<ProtectedRoute><DetailEmployeeManagement /></ProtectedRoute>} />
                
                <Route path="/portal/manpower/attendance" element={<ProtectedRoute><Attandance /></ProtectedRoute>} />
                <Route path="/portal/manpower/attendance/create" element={<ProtectedRoute><CreateAttandance /></ProtectedRoute>} />
                
                <Route path="/portal/manpower/payroll" element={<ProtectedRoute><Payroll /></ProtectedRoute>} />
                <Route path="/portal/manpower/payroll/create" element={<ProtectedRoute><CreatePayroll /></ProtectedRoute>} />
                
                <Route path="/portal/manpower/kpi-setting" element={<ProtectedRoute><KPISetting /></ProtectedRoute>} />
                <Route path="/portal/manpower/kpi-setting/create" element={<ProtectedRoute><CreateKPISetting /></ProtectedRoute>} />
                <Route path="/portal/manpower/kpi-setting/edit" element={<ProtectedRoute><EditKPISetting /></ProtectedRoute>} />
                <Route path="/portal/manpower/kpi-setting/detail" element={<ProtectedRoute><DetailKPISetting /></ProtectedRoute>} />
                
                <Route path="/portal/manpower/kpi-monitoring" element={<ProtectedRoute><KPIMonitoring /></ProtectedRoute>} />
                <Route path="/portal/manpower/kpi-monitoring/detail" element={<ProtectedRoute><DetailKPIMonitoring /></ProtectedRoute>} />
                
                <Route path="/portal/reports" element={<ProtectedRoute><ReportAnalytics /></ProtectedRoute>} />

                <Route path="*" element={<GlobalNotFoundHandler />} />
            </Routes>
        </BrowserRouter>
    );
}

function GlobalNotFoundHandler() {
    const { isAuthenticated } = useAuth();

    // Jika sudah login, bungkus dengan ProtectedRoute agar ada Sidebar/Navbar
    if (isAuthenticated) {
        return (
            <ProtectedRoute>
                <NotFoundPage />
            </ProtectedRoute>
        );
    }

    // Jika belum login, tampilkan halaman 404 polos (tanpa sidebar/dashboard layout)
    return <NotFoundPage />;
}

const el = document.getElementById('app');
if (el) {
    createRoot(el).render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
