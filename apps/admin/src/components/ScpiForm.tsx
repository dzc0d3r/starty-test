import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { CompanyResponse, CreateScpiInput, createScpiSchema } from "schemas";

interface ScpiFormProps {
  onSubmit: (data: CreateScpiInput) => void;
  isPending: boolean;
  defaultValues?: CreateScpiInput | null;
  companies: CompanyResponse[];
}

const formSchema = createScpiSchema.shape.body;

export const ScpiForm = ({
  onSubmit,
  isPending,
  defaultValues,
  companies,
}: ScpiFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateScpiInput>({
    resolver: zodResolver(formSchema),
    // use undefined when no defaults — passing {} caused type mismatch
    defaultValues: defaultValues ?? undefined,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-[25rem] space-y-4 overflow-y-auto pr-4"
    >
      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">SCPI Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-destructive mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Management Company Dropdown */}
      <div className="fex-col flex gap-2">
        <Label htmlFor="managementCompanyId">Management Company</Label>
        <Select
          onValueChange={(value) => setValue("managementCompanyId", value)}
          defaultValue={defaultValues?.managementCompanyId}
        >
          <SelectTrigger className="flex-1 flex-grow">
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.managementCompanyId && (
          <p className="text-destructive mt-1 text-sm">
            {errors.managementCompanyId.message}
          </p>
        )}
      </div>

      {/* Type */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="type">Category / Type</Label>
        <Input id="type" placeholder="e.g., Rendement" {...register("type")} />
        {errors.type && (
          <p className="text-destructive mt-1 text-sm">{errors.type.message}</p>
        )}
      </div>

      {/* Other Fields in a Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="partPrice">Part Price (€)</Label>
          <Input
            id="partPrice"
            type="number"
            {...register("partPrice", { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="distributionRate">Distribution Rate (%)</Label>
          <Input
            id="distributionRate"
            type="number"
            step="0.01"
            {...register("distributionRate", { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="subscriptionMinimum">Min. Subscription (Parts)</Label>
          <Input
            id="subscriptionMinimum"
            type="number"
            {...register("subscriptionMinimum", { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="capitalization">Capitalization (M€)</Label>
          <Input
            id="capitalization"
            type="number"
            {...register("capitalization", { valueAsNumber: true })}
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save SCPI
      </Button>
    </form>
  );
};
