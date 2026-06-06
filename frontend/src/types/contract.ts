export interface Contract {
  id: string;
  title: string;
  description: string;
  status: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowHistory {
  id: string;
  previousStatus: string;
  newStatus: string;
  changedBy: string;
  changedAt: string;
  contractId: string;
}