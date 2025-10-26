import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { useDeleteCompany, useGetCompanies } from "api";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import * as React from "react";
import { CompanyResponse } from "schemas";
import { CompanyModal } from "../components/CompanyModal";
import { DataTable } from "../components/DataTable";

export const CompaniesPage = () => {
  const companiesQuery = useGetCompanies();
  const deleteMutation = useDeleteCompany();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [companyToEdit, setCompanyToEdit] =
    React.useState<CompanyResponse | null>(null);

  const handleOpenCreateModal = () => {
    setCompanyToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (company: CompanyResponse) => {
    setCompanyToEdit(company);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this company and all its SCPIs?",
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  const columns: ColumnDef<CompanyResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "fundCount",
      header: "Fund Count",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-0 shadow-2xl">
              <DropdownMenuItem
                onClick={() => handleOpenEditModal(company)}
                className="hover:cursor-pointer"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(company.id)}
                className="text-destructive hover:cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Management Companies
        </h1>
        <Button onClick={handleOpenCreateModal}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={companiesQuery.data ?? []}
        isLoading={companiesQuery.isLoading}
        filterColumnId="name"
        filterPlaceholder="Filter by name..."
      />
      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyToEdit={companyToEdit}
      />
    </div>
  );
};
