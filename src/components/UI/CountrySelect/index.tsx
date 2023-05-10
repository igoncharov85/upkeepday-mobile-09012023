import React, { FC, memo } from 'react';
import { valueToEntries } from '../../../services/utils/valueToEntries.util';
import { fetchStatesAction } from '../../../store/auth/actions';
import { useAppSelector } from '../../../store/hooks';
import { dispatch } from '../../../store/store';
import { CustomSelect, IOption } from '../CustomSelect';

interface ICustomSelect {
  value: string;
  onChange: (key: string) => void;
  placeholder: string;
  label?: string;
}
export const CountrySelect: FC<ICustomSelect> = memo(
  ({ onChange, placeholder, value, label }) => {
    const { countries } = useAppSelector(state => state.auth);
    const onChangeHandle = (val: string) => {
      dispatch(fetchStatesAction(val));
      onChange && onChange(val);
    };
    return (
      <CustomSelect
        onChange={onChangeHandle}
        options={valueToEntries(countries)}
        placeholder={placeholder}
        value={value}
        label={label && label}
      />
    );
  },
);
