"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Contract } from "@/types/contract";
import { getContracts } from "@/services/api";

export default function ContractsPage() {
    const router = useRouter();
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination state
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    // Filter state
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(0); // Reset to first page on search
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    // Fetch contracts
    useEffect(() => {
        const fetchContracts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getContracts(
                    page,
                    size,
                    debouncedSearch,
                    status
                );

                setContracts(data.content || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch contracts"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchContracts();
    }, [page, debouncedSearch, status, size]);

    const handleStatusChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setStatus(e.target.value);
        setPage(0); // Reset to first page on filter change
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
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
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Contracts
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Manage and track all contracts
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Search by title or owner..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>npm install --save-dev @testing-library/react


                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        >
                            <option value="">All Statuses</option>
                            <option value="DRAFT">Draft</option>
                            <option value="REVIEW">Review</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                        <p className="mt-4 text-gray-600">
                            Loading contracts...
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

                {/* Empty State */}
                {!loading &&
                    !error &&
                    contracts.length === 0 && (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No contracts found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your search or
                                filter criteria
                            </p>
                        </div>
                    )}

                {/* Contracts Table */}
                {!loading && !error && contracts.length > 0 && (
                    <>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Contract Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Owner
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                Created Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {contracts.map((contract) => (
                                            <tr
                                                key={contract.id}
                                                onClick={() =>
                                                    router.push(
                                                        `/contracts/${contract.id}`
                                                    )
                                                }
                                                className="hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-blue-600 hover:underline">
                                                    {contract.title}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {contract.ownerName}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                            contract.status
                                                        )}`}
                                                    >
                                                        {contract.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {formatDate(
                                                        contract.createdAt
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Page {page + 1} of{" "}
                                {totalPages || 1}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        setPage((p) =>
                                            p > 0 ? p - 1 : p
                                        )
                                    }
                                    disabled={page === 0}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        setPage((p) =>
                                            p < (totalPages || 1) - 1
                                                ? p + 1
                                                : p
                                        )
                                    }
                                    disabled={
                                        page >=
                                        (totalPages || 1) - 1
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
