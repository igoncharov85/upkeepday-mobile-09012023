import React, { FC, memo } from 'react';
import { valueToEntries } from '../../../services/utils/valueToEntries.util';
import { useAppSelector } from '../../../store/hooks';
import { CustomSelect, IOption } from '../CustomSelect';

interface ICustomSelect {
  value: string;
  onChange: (key: string) => void;
  placeholder: string;
  label?: string;
}
export const StateSelect: FC<ICustomSelect> = memo(
  ({ onChange, placeholder, value, label }) => {
    const { states, countries } = useAppSelector(state => state.auth);
    return (
      <CustomSelect
        onChange={onChange}
        options={valueToEntries(states)}
        placeholder={placeholder}
        value={value}
        label={label}
      />
    );
  },
);
