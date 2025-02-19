import { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
// import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { FormDataFilters, meses } from '@modules/pluviometros/constants/constants';
// import { GetTotalPromedioLluviasYearResponse } from '@interfaces/lluvias';

pdfMake.vfs = pdfFonts.vfs;

export const useLluviasYear = () => {
    const [imageBase64, setImageBase64] = useState<string>('');

    useEffect(() => {
        const loadImage = async () => {
            try {
                const response = await fetch('/logo.png');
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageBase64(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.log('Error cargando la imagen:', error);
            }
        };

        loadImage();
    }, []);

    const generarPDF = (
        filtersLluvia: FormDataFilters | undefined,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
        // dataPromedio: GetTotalPromedioLluviasYearResponse
    ) => {
        setIsLoading(true);
        const widths: string[] = ['auto'];
        const days = [{}];
        const months = meses;
        // const dataBody: any[] = [];
        const dataBodyPromedio: any[] = [{ text: 'TOTAL PROMEDIO' }];

        for (let index = 0; index < months.length; index++) {
            dataBodyPromedio.push({ text: '' });
        }

        const result: any = [
            { text: 'Pluviómetro', rowSpan: 2, alignment: 'center' },
            { text: `Mes - ${filtersLluvia?.year}`, alignment: 'center', colSpan: months }
        ];

        // Agregar los objetos vacíos según la cantidad de días en el mes
        for (let i = 1; i <= months.length - 1; i++) {
            result.push({});
        }
        for (let i = 1; i <= months.length; i++) {
            widths.push('auto');
            days.push({ text: i });
        }

        // Agregar el total del mes
        result.push({ text: 'Total', rowSpan: 2, alignment: 'center' });
        widths.push('auto');
        days.push({});
        dataBodyPromedio.push({});

        const docDefinition = {
            pageOrientation: 'landscape',
            pageMargins: [20, 30, 20, 30],
            content: [
                {
                    image: imageBase64,
                    width: 150,
                    height: 150,
                    alignment: 'center'
                },
                { text: 'Agrícola L&M S.A.S.', fontSize: 20, bold: true, alignment: 'center', marginBottom: 15 },
                {
                    text: `Listado de lluvias de ${filtersLluvia?.year}`,
                    fontSize: 15,
                    bold: false,
                    alignment: 'center',
                    marginBottom: 15
                },
                {
                    table: {
                        headerRows: 2,
                        widths,
                        body: [result, days]
                    }
                }
            ]
        };

        pdfMake.createPdf(docDefinition as any).download(`reporte_lluvias_${filtersLluvia?.year}.pdf`);
        setIsLoading(false);
    };

    return {
        generarPDF
    };
};
