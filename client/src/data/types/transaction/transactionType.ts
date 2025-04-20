export interface ReqTransactionType {
  patientName: string;
  patientId: string;
  treatmentId: string[];
  date: string;
  medicationId: string[];
  cost: number;
}
