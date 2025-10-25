import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Slider } from "@workspace/ui/components/slider";
import { X } from "lucide-react";
import * as React from "react";

export interface ScpiFilterState {
  searchQuery: string;
  types: string[];
  minRate: number;
  maxPartPrice: number;
  maxInvestment: number;
}

interface ScpiFiltersProps {
  filters: ScpiFilterState;
  onFilterChange: (newFilters: ScpiFilterState) => void;
  availableTypes: string[];
}

export const ScpiFilters = ({
  filters,
  onFilterChange,
  availableTypes,
}: ScpiFiltersProps) => {
  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.types, type]
      : filters.types.filter((t) => t !== type);
    onFilterChange({ ...filters, types: newTypes });
  };

  const handleReset = () => {
    // Also reset the new filter values
    onFilterChange({
      searchQuery: "",
      types: [],
      minRate: 0,
      maxPartPrice: 5000,
      maxInvestment: 20000,
    });
  };

  return (
    <div className="space-y-5">
      {/* Search Filter */}
      <div>
        <Label htmlFor="search" className="font-semibold">
          Search by Name
        </Label>
        <Input
          id="search"
          placeholder="e.g., Corum Origin"
          value={filters.searchQuery}
          onChange={(e) =>
            onFilterChange({ ...filters, searchQuery: e.target.value })
          }
          className="mt-2"
        />
      </div>

      {/* Type Filter */}
      <div>
        <Label className="font-semibold">Category</Label>
        <div className="mt-2 space-y-2">
          {availableTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onCheckedChange={(checked) => handleTypeChange(type, !!checked)}
              />
              <Label
                htmlFor={`type-${type}`}
                className="font-normal capitalize"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution Rate Filter */}
      <div>
        <Label htmlFor="rate-slider" className="font-semibold">
          Min. Distribution Rate
        </Label>
        <div className="mt-2 flex items-center gap-4">
          <Slider
            id="rate-slider"
            min={0}
            max={10}
            step={0.5}
            value={[filters.minRate]}
            onValueChange={(value) =>
              // @ts-ignore
              onFilterChange({ ...filters, minRate: value[0] })
            }
          />
          <span className="w-16 text-right text-sm font-bold">
            {filters.minRate.toFixed(1)} %
          </span>
        </div>
      </div>

      {/* Part Price Filter --- */}
      <div>
        <Label htmlFor="price-slider" className="font-semibold">
          Max. Part Price
        </Label>
        <div className="mt-2 flex items-center gap-4">
          <Slider
            id="price-slider"
            min={0}
            max={5000}
            step={100}
            value={[filters.maxPartPrice]}
            onValueChange={(value) =>
              // @ts-ignore
              onFilterChange({ ...filters, maxPartPrice: value[0] })
            }
          />
          <span className="w-20 text-right text-sm font-bold">
            {filters.maxPartPrice} €
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="investment-slider" className="font-semibold">
          Max. Minimum Investment
        </Label>
        <div className="mt-2 flex items-center gap-4">
          <Slider
            id="investment-slider"
            min={0}
            max={20000}
            step={500}
            value={[filters.maxInvestment]}
            onValueChange={(value) =>
              // @ts-ignore
              onFilterChange({ ...filters, maxInvestment: value[0] })
            }
          />
          <span className="w-20 text-right text-sm font-bold">
            {filters.maxInvestment} €
          </span>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="ghost"
        onClick={handleReset}
        className="text-muted-foreground hover:text-foreground w-full justify-start"
      >
        <X className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
};
