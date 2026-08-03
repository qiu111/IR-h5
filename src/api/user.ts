/**
 * API Module
 * Centralized API layer using mock plugin for easy switching between mock and real implementations.
 */
import { getNav, getBanner, getArticle, getFooterPic, getCommitteePosition, mailAlerts, deleteAlertEmail, getKline } from '@/plugins/mock';

// Re-export all API functions
export {
  getNav,
  getBanner,
  getArticle,
  getFooterPic,
  getCommitteePosition,
  mailAlerts,
  deleteAlertEmail,
  getKline as fqkline
};

// Alias for backward compatibility
export const committPosition = getCommitteePosition;
export const delAlertEmail = deleteAlertEmail;
