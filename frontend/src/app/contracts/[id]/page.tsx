"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Contract,
  WorkflowHistory,
} from "@/types/contract";
import {
  getContractById,
  getWorkflowHistory,
} from "@/services/api";

export default function ContractDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [contract, setContract] =
    useState<Contract | null>(null);
  const [history, setHistory] =
    useState<WorkflowHistory[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          contractData,
          historyData,
        ] = await Promise.all([
          getContractById(id),
          getWorkflowHistory(id),
        ]);

        setContract(contractData);
        setHistory(historyData || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load contract details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "REVIEW":
        return "bg-yellow-100 text-yellow-800";
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() =>
            router.push("/contracts")
          }
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium transition flex items-center gap-1"
        >
          <span>←</span> Back to Contracts
        </button>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            <p className="mt-4 text-gray-600">
              Loading contract details...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Contract Details */}
        {!loading &&
          !error &&
          contract && (
            <>
              {/* Contract Card */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {contract.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        contract.status
                      )}`}
                    >
                      {contract.status}
                    </span>
                    <span className="text-gray-600">
                      ID: {contract.id}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Owner */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Contract Owner
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {contract.ownerName}
                      </p>
                    </div>

                    {/* Created Date */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Created Date
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {formatDate(
                          contract.createdAt
                        )}
                      </p>
                    </div>

                    {/* Updated Date */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Last Updated
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {formatDate(
                          contract.updatedAt
                        )}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Current Status
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {contract.status}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {contract.description ||
                        "No description provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Workflow History */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Workflow History
                </h2>

                {history.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No workflow history
                      available
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Previous Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            New Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Changed By
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {history.map(
                          (entry) => (
                            <tr
                              key={entry.id}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {formatDate(
                                  entry.changedAt
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {entry.previousStatus}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                                    entry.newStatus
                                  )}`}
                                >
                                  {entry.newStatus}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {entry.changedBy}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
}