import { invokeCloud } from '@/lib/api';
import type { Ticket } from '@/types/help';
export interface GuestAccess { id: string; token: string; reference: string; }
export interface SupportResponse { ticket: Ticket; access?: GuestAccess; notification?: string; }
export function createGuestToken() { return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(n => n.toString(16).padStart(2,'0')).join(''); }
export const supportApi = {
  create: (values: object) => invokeCloud<SupportResponse>('help-support', { action: 'create', token: createGuestToken(), ...values }),
  read: (access: GuestAccess) => invokeCloud<SupportResponse>('help-support', { action: 'read', ...access }),
  message: (access: GuestAccess, content: string) => invokeCloud<SupportResponse>('help-support', { action: 'message', ...access, content, messageId: crypto.randomUUID() }),
  handoff: (access: GuestAccess) => invokeCloud<SupportResponse>('help-support', { action: 'handoff', ...access }),
  admin: (id: string, action: string, values: object = {}) => invokeCloud<SupportResponse>('help-support-admin', { id, action, ...values }),
};
export async function fetchAdminTickets(): Promise<Ticket[]> { return invokeCloud<Ticket[]>('help-support-admin', { action: 'list' }); }
export function conversationLink(access: GuestAccess, language = 'en') { return `${window.location.origin}/${language}/support/${access.id}#access=${access.token}`; }
