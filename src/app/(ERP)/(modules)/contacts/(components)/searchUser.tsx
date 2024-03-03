import React, { ChangeEvent } from 'react';
import { Input } from "@/components/ui/input"
// Definir el tipo de las props del componente de input
type FilterInputProps = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const searchUser: React.FC<FilterInputProps> = ({ value, onChange }) => {
    return (
        <Input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Ingrese el tipo de filtro"
        />
    )
}

export default searchUser