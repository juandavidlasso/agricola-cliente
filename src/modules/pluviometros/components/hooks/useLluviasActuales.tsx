import { useContext, useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { GetLluviasActualesReportResponse } from '@interfaces/lluvias';
import { GetPluviometrosYLuviasResponse } from '@interfaces/pluviometros';

pdfMake.vfs = pdfFonts.vfs;

export const useLluviasActuales = () => {
    const [imageBase64, setImageBase64] = useState<string>('');
    const { arrayPluviometros } = useContext(PluviometroContext);

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
        year: number,
        month: string,
        getDaysActualMonth: () => number,
        data: GetPluviometrosYLuviasResponse,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setIsLoading(true);
        const widths: string[] = ['auto'];
        const daysInMonth = getDaysActualMonth();
        const dataBody: any[] = [];

        for (let index = 0; index < data.obtenerPluviometrosYLluvias.length; index++) {
            // Total del mes
            // const totalMes = Number(data.obtenerPluviometrosYLluvias[index].suertesAsociadas).toFixed(0);
            const totalMes = 0;

            // Creo array de dias para cantidad
            const daysQuantity: any[] = [];
            for (let i = 1; i <= daysInMonth; i++) {
                daysQuantity.push({ text: '' });
            }

            if (data.obtenerPluviometrosYLluvias[index].listAplicacionesLluvias!.length > 0) {
                for (let i = 0; i < data.obtenerPluviometrosYLluvias[index].listAplicacionesLluvias!.length; i++) {
                    const { fecha, cantidad } = data.obtenerPluviometrosYLluvias[index].listAplicacionesLluvias![i].lluviaPadre!;
                    const fechaAplicacion = fecha!.split('-')[2];
                    daysQuantity[Number(fechaAplicacion) - 1].text = `${cantidad}`;
                }
            }

            // Creo cada fila
            dataBody.push([
                {
                    stack: [
                        `${data.obtenerPluviometrosYLluvias[index].nombre}`,
                        {
                            ul: [
                                arrayPluviometros.length === 0
                                    ? ''
                                    : arrayPluviometros.map((asociadas) =>
                                          asociadas.nombre === data.obtenerPluviometrosYLluvias[index].nombre
                                              ? asociadas.suertesAsociadas === ''
                                                  ? ''
                                                  : `Suerte ${asociadas.suertesAsociadas}`
                                              : ''
                                      )
                            ]
                        }
                    ]
                },
                ...daysQuantity,
                { text: `${totalMes}` }
            ]);
        }

        let result: any = [
            { text: 'Pluviómetro', rowSpan: 2, alignment: 'center' },
            { text: `${month} - ${year}`, alignment: 'center', colSpan: daysInMonth }
        ];
        let days = [{}];

        // Agregar los objetos vacíos según la cantidad de días en el mes
        for (let i = 1; i <= daysInMonth - 1; i++) {
            result.push({});
        }
        for (let i = 1; i <= daysInMonth; i++) {
            widths.push('auto');
            days.push({ text: i });
        }

        // Agregar el total del mes
        result.push({ text: 'Total mes', rowSpan: 2, alignment: 'center' });
        widths.push('auto');
        days.push({});

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
                { text: `Listado de lluvias de ${month}`, fontSize: 15, bold: false, alignment: 'center', marginBottom: 15 },
                {
                    table: {
                        headerRows: 2,
                        widths,
                        body: [result, days, ...dataBody]
                    }
                }
            ]
        };

        pdfMake.createPdf(docDefinition as any).download(`reporte_lluvias_${month}_${year}.pdf`);
        setIsLoading(false);
    };

    return {
        generarPDF
    };
};
