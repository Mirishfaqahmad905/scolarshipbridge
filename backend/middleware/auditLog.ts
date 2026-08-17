import { Request } from 'express';
import { JsonDatabase } from '../services/jsonDatabase';
import { AuditLogRecord } from '../types';

export async function logAdminAction(params: {
  adminId: string;
  username: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: any;
  req?: Request;
}): Promise<void> {
  try {
    const ipAddress =
      (params.req?.headers['x-forwarded-for'] as string) ||
      params.req?.socket?.remoteAddress ||
      '127.0.0.1';

    const userAgent = params.req?.headers['user-agent'] || 'internal';

    const logEntry: AuditLogRecord = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      adminId: params.adminId,
      username: params.username,
      action: params.action,
      resource: params.resource,
      resourceId: params.resourceId,
      details: params.details,
      timestamp: new Date().toISOString(),
      ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
      userAgent
    };

    await JsonDatabase.create('auditLogs', logEntry);
  } catch (err) {
    console.error('[AuditLog] Failed to record log entry:', err);
  }
}
