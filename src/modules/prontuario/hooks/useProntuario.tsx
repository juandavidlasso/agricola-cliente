import { useEffect, useState } from 'react';
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { GetProntuarioResponse } from '@interfaces/prontuario';

pdfMake.vfs = pdfFonts.vfs;

type ColumnKey =
    | 'suerte'
    | 'area'
    | 'variedad'
    | 'corteNo'
    | 'fechaSiembra'
    | 'ultimoCorte'
    | 'edadCorte'
    | 'tch'
    | 'tchm'
    | 'peso'
    | 'rendimiento'
    | 'vagones'
    | 'mulas';

export const useProntuario = () => {
    const [imageBase64, setImageBase64] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<{
        [key in ColumnKey]: boolean;
    }>({
        suerte: false,
        area: false,
        variedad: false,
        corteNo: false,
        fechaSiembra: false,
        ultimoCorte: false,
        edadCorte: false,
        tch: false,
        tchm: false,
        peso: false,
        rendimiento: false,
        vagones: false,
        mulas: false
    });

    useEffect(() => {
        const loadImage = async () => {
            try {
                const response = await fetch('/logo.png'); // Ruta de la imagen dentro de public
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageBase64(reader.result as string); // Guardar la imagen en base64
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.log('Error cargando la imagen:', error);
            }
        };

        loadImage();
    }, []);

    const handleColumnChange = (column: ColumnKey) => {
        setSelectedColumns({
            ...selectedColumns,
            [column]: !selectedColumns[column]
        });
    };

    // Función para seleccionar todas las columnas
    const selectAllColumns = () => {
        setSelectedColumns({
            suerte: true,
            area: true,
            variedad: true,
            corteNo: true,
            fechaSiembra: true,
            ultimoCorte: true,
            edadCorte: true,
            tch: true,
            tchm: true,
            peso: true,
            rendimiento: true,
            vagones: true,
            mulas: true
        });
    };

    // Función para deseleccionar todas las columnas
    const deselectAllColumns = () => {
        setSelectedColumns({
            suerte: false,
            area: false,
            variedad: false,
            corteNo: false,
            fechaSiembra: false,
            ultimoCorte: false,
            edadCorte: false,
            tch: false,
            tchm: false,
            peso: false,
            rendimiento: false,
            vagones: false,
            mulas: false
        });
    };

    const generarPDF = (data: GetProntuarioResponse, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        setIsLoading(true);
        const columns: string[] = [];
        const body: any[] = [];
        const widths: string[] = [];

        if (selectedColumns.suerte) columns.push('Suerte');
        if (selectedColumns.area) columns.push('Área');
        if (selectedColumns.variedad) columns.push('Variedad');
        if (selectedColumns.corteNo) columns.push('Corte No.');
        if (selectedColumns.fechaSiembra) columns.push('Fecha Siembra');
        if (selectedColumns.ultimoCorte) columns.push('Último Corte');
        if (selectedColumns.edadCorte) columns.push('Edad Corte');
        if (selectedColumns.tch) columns.push('TCH');
        if (selectedColumns.tchm) columns.push('TCHM');
        if (selectedColumns.peso) columns.push('Peso');
        if (selectedColumns.rendimiento) columns.push('Rendimiento %');
        if (selectedColumns.vagones) columns.push('Número Vagones');
        if (selectedColumns.mulas) columns.push('Número Mulas');

        const numColumns = columns.length;

        // Ajuste dinámico de los anchos de columna
        if (numColumns <= 10) {
            // Si hay más de una columna, distribuye el espacio equitativamente
            for (let i = 0; i < numColumns; i++) {
                widths.push('*');
            }
        } else {
            // Si hay una sola columna, use 'auto' para ajustarse al contenido
            for (let i = 0; i < numColumns; i++) {
                widths.push('auto');
            }
        }

        data?.consultarProntuario.forEach((row: any) => {
            const rowData: any[] = [];
            if (selectedColumns.suerte) rowData.push(row.cortePadre?.suertePadre?.nombre);
            if (selectedColumns.area) rowData.push(row.cortePadre?.area ? row.cortePadre?.area.toFixed(2) : 0);
            if (selectedColumns.variedad) rowData.push(row.cortePadre?.suertePadre?.variedad);
            if (selectedColumns.corteNo) rowData.push(row.cortePadre?.numero);
            if (selectedColumns.fechaSiembra) rowData.push(row.cortePadre?.fecha_siembra);
            if (selectedColumns.ultimoCorte) rowData.push(row.cortePadre?.fecha_corte);

            if (selectedColumns.edadCorte) {
                const finicio = moment(row.cortePadre?.fecha_inicio);
                const fcorte = moment(row.cortePadre?.fecha_corte);
                const edadCorte = fcorte.diff(finicio, 'months', true).toFixed(1);
                rowData.push(edadCorte);
            }

            if (selectedColumns.tch) {
                const peso = row.peso ? row.peso : 0;
                const area = row.cortePadre?.area ? row.cortePadre?.area : 0;
                const TCH = Number((peso! / area!).toFixed(1));
                rowData.push(TCH);
            }

            if (selectedColumns.tchm) {
                const peso = row.peso ? row.peso : 0;
                const area = row.cortePadre?.area ? row.cortePadre?.area : 0;
                const finicio = moment(row.cortePadre?.fecha_inicio);
                const fcorte = moment(row.cortePadre?.fecha_corte);
                const edadCorte = fcorte.diff(finicio, 'months', true).toFixed(1);
                const TCHM = Number((Number((peso! / area!).toFixed(1)) / Number(edadCorte)).toFixed(1));
                rowData.push(TCHM);
            }

            if (selectedColumns.peso) rowData.push(row.peso);
            if (selectedColumns.rendimiento) rowData.push(row.rendimiento);
            if (selectedColumns.vagones) rowData.push(row.numeroVagones ?? null);
            if (selectedColumns.mulas) rowData.push(row.numeroMulas ?? null);

            body.push(rowData);
        });

        const docDefinition = {
            pageOrientation: 'landscape', // Orientación horizontal
            pageMargins: [20, 30, 20, 30], // Márgenes más pequeños para ahorrar espacio
            content: [
                {
                    image: imageBase64,
                    width: 150,
                    height: 150,
                    alignment: 'center'
                },
                { text: 'Agrícola L&M S.A.S.', fontSize: 20, bold: true, alignment: 'center' },
                { text: 'Prontuario', fontSize: 15, bold: false, alignment: 'center' },
                {
                    table: {
                        headerRows: 1,
                        widths,
                        body: [
                            columns, // Fila de encabezado
                            ...body // Filas de datos
                        ]
                    }
                }
            ]
        };

        pdfMake.createPdf(docDefinition as any).download('reporte_prontuario.pdf');
        setIsLoading(false);
    };

    return {
        selectedColumns,
        handleColumnChange,
        generarPDF,
        selectAllColumns,
        deselectAllColumns
    };
};
