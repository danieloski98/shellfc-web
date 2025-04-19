import React, { useState } from 'react';
import { Input, Text } from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useFormikContext } from 'formik';
import { toaster } from "@/components/ui/toaster"

interface CustomInputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, label, type = 'text', placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormikContext<any>();

    if (!formik) {
        throw new Error('CustomInput must be used within a FormikProvider');
    }

    const { values, handleChange, handleBlur, touched, errors } = formik;
    const error = touched[name] && errors[name];

    const handleClick = () => setShowPassword(!showPassword);

    return (
        <div style={{ position: 'relative' }}>
            <Text mb={2} fontSize="sm" fontWeight="medium" color="black">{label}</Text>
            <div style={{ position: 'relative' }}>
                <Input
                    name={name}
                    value={values[name] || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={type === 'password' && !showPassword ? 'password' : 'text'}
                    placeholder={placeholder}
                    _invalid={{ borderColor: 'red.500' }}
                    pr={type === 'password' ? '40px' : undefined}
                    borderColor={error ? 'red.500' : undefined}
                    _placeholder={{ color: 'grey' }}
                    borderRadius={'10px'}
                    height={'55px'}
                    px="10px"
                    color='grey'
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleClick}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                )}
            </div>
            {error && (
                <Text color="red.500" fontSize="sm" mt={1}>{error as string}</Text>
            )}
        </div>
    );
};

export default CustomInput;
