import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateCompanyInput, createCompanySchema } from "schemas";

interface CompanyFormProps {
  onSubmit: (data: CreateCompanyInput) => void;
  isPending: boolean;
  defaultValues?: CreateCompanyInput | null;
}

const formSchema = createCompanySchema.shape.body;

export const CompanyForm = ({
  onSubmit,
  isPending,
  defaultValues,
}: CompanyFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCompanyInput>({
    resolver: zodResolver(formSchema),
    // pass undefined when no defaults to avoid type mismatch
    defaultValues: defaultValues ?? undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-[23rem] space-y-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Company Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-destructive mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="logoUrl">Logo URL</Label>
        <Input id="logoUrl" {...register("logoUrl")} />
        {errors.logoUrl && (
          <p className="text-destructive mt-1 text-sm">
            {errors.logoUrl.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="mt-5 w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Company
      </Button>
    </form>
  );
};
