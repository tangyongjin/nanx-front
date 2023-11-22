import { InputProps } from 'antd/es/input';
export interface IPasswordProps extends Omit<InputProps, 'onChange'> {
    checkStrength: boolean;
    onChange: (value: InputProps['value']) => void;
}
