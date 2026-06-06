import { Contract, WorkflowHistory } from "@/types/contract";

const BASE_URL =
  "http://localhost:8080/api/contracts";

export async function getContracts(
  page = 0,
  size = 10,
  search = "",
  status = ""
) {

  let url =
    `${BASE_URL}?page=${page}&size=${size}`;

  if (search) {
    url += `&search=${search}`;
  }

  if (status) {
    url += `&status=${status}`;
  }

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch contracts"
    );
  }

  return response.json();
}

export async function getContractById(
  id: string
): Promise<Contract> {

  const response =
    await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(
      "Contract not found"
    );
  }

  return response.json();
}

export async function getWorkflowHistory(
  id: string
): Promise<WorkflowHistory[]> {

  const response =
    await fetch(
      `${BASE_URL}/${id}/history`
    );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch history"
    );
  }

  return response.json();
}