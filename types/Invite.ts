export interface Invite {
  _id: string;
  id: string;
  dateExpected: string;
  timeExpected: string;
  guest: string;
  code: string;
  status: boolean;
  validUntil: string;
  created_at: string;
  codeType: string;
}
