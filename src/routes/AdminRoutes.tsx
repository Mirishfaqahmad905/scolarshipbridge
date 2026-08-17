import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProtectedRoute } from '../components/admin/AdminProtectedRoute';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardHome } from '../pages/admin/AdminDashboardHome';
import { AdminScholarshipsPage } from '../pages/admin/AdminScholarshipsPage';
import { AdminScholarshipEditorPage } from '../pages/admin/AdminScholarshipEditorPage';
import { AdminPostsPage } from '../pages/admin/AdminPostsPage';
import { AdminPostEditorPage } from '../pages/admin/AdminPostEditorPage';
import { AdminUniversitiesPage } from '../pages/admin/AdminUniversitiesPage';
import { AdminCountriesPage } from '../pages/admin/AdminCountriesPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminPagesPage } from '../pages/admin/AdminPagesPage';
import { AdminAboutPage } from '../pages/admin/AdminAboutPage';
import { AdminContactPage } from '../pages/admin/AdminContactPage';
import { AdminContactMessagesPage } from '../pages/admin/AdminContactMessagesPage';
import { AdminMediaPage } from '../pages/admin/AdminMediaPage';
import { AdminSocialMediaPage } from '../pages/admin/AdminSocialMediaPage';
import { AdminHomepagePage } from '../pages/admin/AdminHomepagePage';
import { AdminNavigationPage } from '../pages/admin/AdminNavigationPage';
import { AdminSeoPage } from '../pages/admin/AdminSeoPage';
import { AdminAdsPage } from '../pages/admin/AdminAdsPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminAuditLogsPage } from '../pages/admin/AdminAuditLogsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';
import { AdminProfilePage } from '../pages/admin/AdminProfilePage';
import { AdminBackupsPage } from '../pages/admin/AdminBackupsPage';

export const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Admin Login */}
      <Route path="login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes */}
      <Route
        path=""
        element={
          <AdminProtectedRoute>
            <AdminDashboardHome />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboardHome />
          </AdminProtectedRoute>
        }
      />

      {/* Scholarships CRUD */}
      <Route
        path="scholarships"
        element={
          <AdminProtectedRoute>
            <AdminScholarshipsPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="scholarships/create"
        element={
          <AdminProtectedRoute>
            <AdminScholarshipEditorPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="scholarships/edit/:id"
        element={
          <AdminProtectedRoute>
            <AdminScholarshipEditorPage />
          </AdminProtectedRoute>
        }
      />

      {/* Posts & Guides CRUD */}
      <Route
        path="posts"
        element={
          <AdminProtectedRoute>
            <AdminPostsPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="posts/create"
        element={
          <AdminProtectedRoute>
            <AdminPostEditorPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="posts/edit/:id"
        element={
          <AdminProtectedRoute>
            <AdminPostEditorPage />
          </AdminProtectedRoute>
        }
      />

      {/* Universities */}
      <Route
        path="universities"
        element={
          <AdminProtectedRoute>
            <AdminUniversitiesPage />
          </AdminProtectedRoute>
        }
      />

      {/* Countries */}
      <Route
        path="countries"
        element={
          <AdminProtectedRoute>
            <AdminCountriesPage />
          </AdminProtectedRoute>
        }
      />

      {/* Categories */}
      <Route
        path="categories"
        element={
          <AdminProtectedRoute>
            <AdminCategoriesPage />
          </AdminProtectedRoute>
        }
      />

      {/* CMS Pages */}
      <Route
        path="pages"
        element={
          <AdminProtectedRoute>
            <AdminPagesPage />
          </AdminProtectedRoute>
        }
      />

      {/* About CMS */}
      <Route
        path="about"
        element={
          <AdminProtectedRoute>
            <AdminAboutPage />
          </AdminProtectedRoute>
        }
      />

      {/* Contact Settings & Inbox */}
      <Route
        path="contact"
        element={
          <AdminProtectedRoute>
            <AdminContactPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="contact/messages"
        element={
          <AdminProtectedRoute>
            <AdminContactMessagesPage />
          </AdminProtectedRoute>
        }
      />

      {/* Base64 Media Manager */}
      <Route
        path="media"
        element={
          <AdminProtectedRoute>
            <AdminMediaPage />
          </AdminProtectedRoute>
        }
      />

      {/* 11 Social Channels */}
      <Route
        path="social-media"
        element={
          <AdminProtectedRoute>
            <AdminSocialMediaPage />
          </AdminProtectedRoute>
        }
      />

      {/* Homepage CMS Layout */}
      <Route
        path="homepage"
        element={
          <AdminProtectedRoute>
            <AdminHomepagePage />
          </AdminProtectedRoute>
        }
      />

      {/* Navigation Menus */}
      <Route
        path="navigation"
        element={
          <AdminProtectedRoute>
            <AdminNavigationPage />
          </AdminProtectedRoute>
        }
      />

      {/* SEO */}
      <Route
        path="seo"
        element={
          <AdminProtectedRoute>
            <AdminSeoPage />
          </AdminProtectedRoute>
        }
      />

      {/* Monetization & Ads */}
      <Route
        path="ads"
        element={
          <AdminProtectedRoute>
            <AdminAdsPage />
          </AdminProtectedRoute>
        }
      />

      {/* Admin Users */}
      <Route
        path="users"
        element={
          <AdminProtectedRoute>
            <AdminUsersPage />
          </AdminProtectedRoute>
        }
      />

      {/* Audit Logs */}
      <Route
        path="audit-logs"
        element={
          <AdminProtectedRoute>
            <AdminAuditLogsPage />
          </AdminProtectedRoute>
        }
      />

      {/* Settings */}
      <Route
        path="settings"
        element={
          <AdminProtectedRoute>
            <AdminSettingsPage />
          </AdminProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="profile"
        element={
          <AdminProtectedRoute>
            <AdminProfilePage />
          </AdminProtectedRoute>
        }
      />

      {/* Backups & Disaster Recovery */}
      <Route
        path="backups"
        element={
          <AdminProtectedRoute>
            <AdminBackupsPage />
          </AdminProtectedRoute>
        }
      />

      {/* Catch-all redirect to admin dashboard */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};
