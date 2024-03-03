"use client"
import React, { useState, useEffect } from 'react';
import getProviders from "@/actions/sales/getProvidersById";

interface RowType {
    original: {
        provider: string; // Asegúrate de que el tipo de provider sea el correcto
    };
}

interface ProviderCellProps {
    row: RowType;
}

const ProviderRow: React.FC<ProviderCellProps> = ({ row }) => {
    const [providerName, setProviderName] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const DataSchema = row.original;
            const idProvider = DataSchema.provider;

            const provider = await getProviders(idProvider);
            setProviderName(provider.provider?.name!);
        }

        fetchData();
    }, []); // Incluir 'row.original' como una dependencia de useEffect si es necesario

    return (
        <p>{providerName || "Cargando..."}</p>
    );
};


export default ProviderRow