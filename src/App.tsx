/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';
import { AdminRoutes } from './routes/AdminRoutes';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { ScholarshipDetailPage } from './pages/ScholarshipDetailPage';
import { CountriesDirectoryPage } from './pages/CountriesDirectoryPage';
import { CountryDetailPage } from './pages/CountryDetailPage';
import { UniversitiesPage } from './pages/UniversitiesPage';
import { NewsGuidesPage } from './pages/NewsGuidesPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { CalendarPage } from './pages/CalendarPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage, ContactPage, PrivacyPolicyPage } from './pages/AboutContactPages';

// Scroll to top component on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main layout wrapper that determines public vs admin view shell
const MainLayout: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <div id="scholarbridge-admin-root" className="min-h-screen bg-slate-100 font-sans text-slate-900 antialiased">
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div id="scholarbridge-app-root" className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Ticker Notification Banner */}
      <AnnouncementBar />

      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/scholarships/:slug" element={<ScholarshipDetailPage />} />
          <Route path="/category/:slug" element={<ScholarshipsPage />} />
          <Route path="/countries" element={<CountriesDirectoryPage />} />
          <Route path="/countries/:slug" element={<CountryDetailPage />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/news" element={<NewsGuidesPage />} />
          <Route path="/guides" element={<NewsGuidesPage />} />
          <Route path="/guides/:slug" element={<NewsDetailPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<PrivacyPolicyPage />} />
          <Route path="/disclaimer" element={<AboutPage />} />
          
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer with Directory Links & Trust Badges */}
      <Footer />

      {/* Global Interactive Notification Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
