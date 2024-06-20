import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ICarBrand } from "@/shared/types";
import cn from "classnames";

import cls from "./MuiSelect.module.scss";
import { useState } from "react";

interface Props {
  onChange: (value: string[]) => void;
  values: string[];
  current: string[];
  label: string;
  names: string[];
  disabled?: boolean;
  formClassName?: string;
}

export const MuiSelect = ({
  onChange,
  values,
  current,
  label,
  names,
  formClassName,
  disabled,
}: Props) => {
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const value: string[] = event.target.value as string[];
    onChange(value);
  };

  return (
    <FormControl className={cn(cls.form, formClassName)}>
      <InputLabel className={cls.label}>{label}</InputLabel>
      <Select
        disabled={disabled}
        multiple
        MenuProps={{ disableScrollLock: true }}
        value={current}
        label={label}
        renderValue={(selected) => selected.join(", ")}
        onChange={handleSelectChange}
      >
        {values.map((value, index) => (
          <MenuItem key={value} value={value as string}>
            {names[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
