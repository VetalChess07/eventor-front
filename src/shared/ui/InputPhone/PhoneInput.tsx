import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input';

type Props = MuiTelInputProps & {
  value: string;
  label: string;
};

export function PhoneInput({ value, label, ...rest }: Props) {
  return (
    <MuiTelInput
      value={value}
      defaultCountry="RU"
      fullWidth
      {...rest}
      onlyCountries={[
        'RU',
        'KZ',
        'BY',
        'UZ',
        'KG',
        'AM',
        'AZ',
        'GE',
        'MD',
        'TJ',
        'TM',
      ]}
    />
  );
}

export default PhoneInput;
