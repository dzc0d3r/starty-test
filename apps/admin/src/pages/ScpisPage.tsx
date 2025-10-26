import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { useDeleteScpi, useGetCompanies, useGetScpis } from "api";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import * as React from "react";
import { SCPIResponse } from "schemas";
import { DataTable } from "../components/DataTable";
import { ScpiModal } from "../components/ScpiModal";

export const ScpisPage = () => {
  const scpisQuery = useGetScpis();
  const companiesQuery = useGetCompanies();
  const deleteMutation = useDeleteScpi();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [scpiToEdit, setScpiToEdit] = React.useState<SCPIResponse | null>(null);

  const handleOpenCreateModal = () => {
    setScpiToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (scpi: SCPIResponse) => {
    setScpiToEdit(scpi);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this SCPI?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns: ColumnDef<SCPIResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorFn: (row) => row.managementCompany.name,
      id: "managementCompany",
      header: "Management Company",
    },
    {
      accessorKey: "type",
      header: "Category",
    },
    {
      accessorKey: "partPrice",
      header: "Part Price",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("partPrice"));
        const formatted = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Added",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-0 shadow-2xl">
            <DropdownMenuItem
              onClick={() => handleOpenEditModal(row.original)}
              className="hover:cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original.id)}
              className="text-destructive focus:bg-destructive/10 hover:cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const isLoading = scpisQuery.isLoading || companiesQuery.isLoading;

  return (
    <div className="animate-in fade-in-0 space-y-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Manage SCPIs</h1>
        <Button onClick={handleOpenCreateModal}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add SCPI
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={scpisQuery.data ?? []}
        isLoading={isLoading}
        filterColumnId="name"
        filterPlaceholder="Filter by SCPI name..."
      />
      <ScpiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scpiToEdit={scpiToEdit}
        companies={companiesQuery.data ?? []}
      />
    </div>
  );
};
