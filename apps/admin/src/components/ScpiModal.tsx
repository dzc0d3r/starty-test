import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useCreateScpi, useUpdateScpi } from "api";
import { CompanyResponse, CreateScpiInput, SCPIResponse } from "schemas";
import { ScpiForm } from "./ScpiForm";

interface ScpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  scpiToEdit?: SCPIResponse | null;
  companies: CompanyResponse[];
}

/** convert SCPIResponse (server shape) -> CreateScpiInput (form shape)
 *  This maps `null` numeric fields to `undefined` and extracts `managementCompanyId`.
 */
const mapScpiResponseToCreateInput = (s: SCPIResponse): CreateScpiInput => {
  return {
    name: s.name,
    type: s.type,
    managementCompanyId: s.managementCompany?.id,
    // numeric fields: convert `null` -> `undefined`
    capitalization: s.capitalization ?? undefined,
    distributionRate: s.distributionRate ?? undefined,
    subscriptionMinimum: s.subscriptionMinimum ?? undefined,
    partPrice: s.partPrice ?? undefined,
    occupancyRate: s.occupancyRate ?? undefined,
  } as CreateScpiInput;
};

export const ScpiModal = ({
  isOpen,
  onClose,
  scpiToEdit,
  companies,
}: ScpiModalProps) => {
  const createMutation = useCreateScpi();
  const updateMutation = useUpdateScpi();

  const isEditing = !!scpiToEdit;
  const mutation = isEditing ? updateMutation : createMutation;

  const handleSubmit = (data: CreateScpiInput) => {
    if (isEditing && scpiToEdit) {
      // `data` is CreateScpiInput (no id), so combining with id is safe
      updateMutation.mutate(
        { id: scpiToEdit.id, ...data },
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit SCPI" : "Create New SCPI"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the SCPI. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {companies.length > 0 ? (
          <ScpiForm
            onSubmit={handleSubmit}
            isPending={mutation.isPending}
            defaultValues={
              scpiToEdit ? mapScpiResponseToCreateInput(scpiToEdit) : undefined
            }
            companies={companies}
          />
        ) : (
          <div>Loading company data...</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
