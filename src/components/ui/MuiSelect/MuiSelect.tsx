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

interface Props<T> {
  onChange: (value: T) => void;
  values: T[];
  current: T;
  label: string;
  names: string[];
  disabled?: boolean;
  formClassName?: string;
}

export const MuiSelect = <T,>({
  onChange,
  values,
  current,
  label,
  names,
  formClassName,
}: Props<T>) => {
  const handleSelectChange = (event: SelectChangeEvent<T>) => {
    onChange(event.target.value as T);
  };

  return (
    <FormControl className={cn(formClassName)} fullWidth>
      <InputLabel className={cls.label}>{label}</InputLabel>
      <Select
        MenuProps={{ disableScrollLock: true }}
        // className={cls["MuiSelect-root"]}
        value={current}
        label={label}
        onChange={handleSelectChange}
        // onChange={(value) => onChange(e.target.value)}
      >
        {values.map((value, index) => (
          <MenuItem key={index} value={value as string}>
            {names[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
