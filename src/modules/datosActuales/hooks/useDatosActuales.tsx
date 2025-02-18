import { useState } from 'react';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { GetDatosActualesResponse } from '@interfaces/datosActuales';

pdfMake.vfs = pdfFonts.vfs;

type ColumnKey = 'suerte' | 'area' | 'variedad' | 'zona' | 'fecha' | 'tch' | 'edad' | 'corte';

export const useDatosActuales = () => {
    const [selectedColumns, setSelectedColumns] = useState<{
        [key in ColumnKey]: boolean;
    }>({
        suerte: false,
        area: false,
        variedad: false,
        zona: false,
        fecha: false,
        tch: false,
        edad: false,
        corte: false
    });

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
            zona: true,
            fecha: true,
            tch: true,
            edad: true,
            corte: true
        });
    };

    // Función para deseleccionar todas las columnas
    const deselectAllColumns = () => {
        setSelectedColumns({
            suerte: false,
            area: false,
            variedad: false,
            zona: false,
            fecha: false,
            tch: false,
            edad: false,
            corte: false
        });
    };

    // Función para generar el PDF
    const generarPDF = (data: GetDatosActualesResponse, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        setIsLoading(true);
        const columns: string[] = [];
        const body: any[] = [];
        const widths: string[] = [];

        // Construir las columnas visibles basadas en la selección
        if (selectedColumns.suerte) columns.push('Suerte');
        if (selectedColumns.area) columns.push('Área');
        if (selectedColumns.variedad) columns.push('Variedad');
        if (selectedColumns.zona) columns.push('Zona Agroecológica');
        if (selectedColumns.fecha) columns.push('Fecha Último Corte');
        if (selectedColumns.tch) columns.push('Último TCH');
        if (selectedColumns.edad) columns.push('Edad Actual (meses)');
        if (selectedColumns.corte) columns.push('# Corte Actual');

        // Ajuste dinámico de los anchos de columna
        const numColumns = columns.length;
        if (numColumns <= 6) {
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

        // Crear el cuerpo de la tabla con los datos seleccionados
        data?.obtenerDatosActuales.forEach((row: any) => {
            const rowData: any[] = [];
            if (selectedColumns.suerte) rowData.push(row.nombre);
            if (selectedColumns.area) {
                const areaActual =
                    row.listcortes?.[0].listTablones?.length === 0
                        ? 0
                        : row.listcortes?.[0].listTablones?.reduce((acc: any, rc: any) => acc + rc.area, 0);
                rowData.push(areaActual?.toFixed(2));
            }
            if (selectedColumns.variedad) rowData.push(row.variedad);
            if (selectedColumns.zona) rowData.push(row.zona);
            if (selectedColumns.fecha) rowData.push(row.createdAt);
            if (selectedColumns.tch) {
                const peso = row.area ? row.area : 0;
                const areaCorte = Number(row.renovada);
                const TCH = Number((peso! / areaCorte!).toFixed(1));
                rowData.push(TCH);
            }
            if (selectedColumns.edad) {
                const now = dayjs().format('YYYY-MM-DD');
                const dateStart = dayjs(row.listcortes?.[0].fecha_inicio).format('YYYY-MM-DD');
                const edadActual = dayjs(now).diff(dayjs(dateStart), 'month', true).toFixed(1);
                rowData.push(edadActual);
            }
            if (selectedColumns.corte) rowData.push(row.listcortes?.[0].numero);

            body.push(rowData);
        });

        const docDefinition = {
            pageMargins: [20, 30, 20, 30],
            content: [
                { text: 'Agrícola L&M S.A.S.', fontSize: 20, bold: true, alignment: 'center' },
                { text: 'Datos Actuales', fontSize: 15, bold: false, alignment: 'center' },
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

        pdfMake.createPdf(docDefinition as any).download('reporte_datos_actuales.pdf');
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
