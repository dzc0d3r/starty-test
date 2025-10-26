import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useCreateCompany, useUpdateCompany } from "api";
import { CompanyResponse, CreateCompanyInput } from "schemas";
import { CompanyForm } from "./CompanyForm";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyToEdit?: CompanyResponse | null;
}

/** Map server CompanyResponse -> CreateCompanyInput (form shape)
 *  Convert null -> undefined so react-hook-form types align.
 */
const mapCompanyResponseToCreateInput = (
  c: CompanyResponse,
): CreateCompanyInput => {
  return {
    name: c.name,
    description: c.description ?? undefined,
    logoUrl: c.logoUrl ?? undefined,
    address: c.address ?? undefined,
    totalAssetsUnderManagement: c.totalAssetsUnderManagement ?? undefined,
    fundCount: c.fundCount ?? undefined,
    majorityShareholder: c.majorityShareholder ?? undefined,
  } as CreateCompanyInput;
};

export const CompanyModal = ({
  isOpen,
  onClose,
  companyToEdit,
}: CompanyModalProps) => {
  const createMutation = useCreateCompany();
  const updateMutation = useUpdateCompany();

  const isEditing = !!companyToEdit;
  const mutation = isEditing ? updateMutation : createMutation;

  const handleSubmit = (data: CreateCompanyInput) => {
    if (isEditing && companyToEdit) {
      // data is CreateCompanyInput (no id) so this won't duplicate `id`
      updateMutation.mutate(
        { id: companyToEdit.id, ...data },
        {
          onSuccess: onClose,
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: onClose,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[30rem]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Company" : "Create New Company"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CompanyForm
          onSubmit={handleSubmit}
          isPending={mutation.isPending}
          defaultValues={
            companyToEdit
              ? mapCompanyResponseToCreateInput(companyToEdit)
              : undefined
          }
        />
      </DialogContent>
    </Dialog>
  );
};
