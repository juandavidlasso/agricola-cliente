import { gql } from '@apollo/client';

/** USUARIOS */
export const GET_USER = gql`
    query ObtenerUsuario($idUsuario: Int!) {
        obtenerUsuario(id_usuario: $idUsuario) {
            id_usuario
            nombre
            apellido
            email
        }
    }
`;

/** SUERTES */
export const OBTENER_SUERTES_RENOVADAS = gql`
    query ObtenerSuertesRenovadas {
        obtenerSuertesRenovadas {
            id_suerte
            nombre
            variedad
            zona
            renovada
        }
    }
`;

export const OBTENER_SUERTE = gql`
    query ObtenerSuerte($idSuerte: Int!) {
        obtenerSuerte(id_suerte: $idSuerte) {
            id_suerte
            nombre
            variedad
            zona
            renovada
        }
    }
`;

export const OBTENER_AREA_SUERTE = gql`
    query Query($idSuerte: Int!) {
        obtenerAreaSuerte(id_suerte: $idSuerte)
    }
`;

export const OBTENER_SUERTES_RENOVADAS_CORTES = gql`
    query ObtenerSuertesRenovadasYCortes {
        obtenerSuertesRenovadasYCortes {
            id_suerte
            nombre
            listcortes {
                id_corte
                numero
                fecha_inicio
                fecha_corte
            }
        }
    }
`;

/** CORTES */

export const OBTENER_CORTES_RENOVADOS = gql`
    query ObtenerCortesRenovados($nombre: String!) {
        obtenerCortesRenovados(nombre: $nombre) {
            id_corte
            numero
            fecha_inicio
            fecha_siembra
            fecha_corte
            activo
            estado
            suerte_id
        }
    }
`;

export const OBTENER_CORTES_POR_SUERTE = gql`
    query Query($idSuerte: Int!) {
        obtenerCortesPorSuerte(id_suerte: $idSuerte)
    }
`;

export const OBTENER_CORTE = gql`
    query ObtenerCorte($idCorte: Int!) {
        obtenerCorte(id_corte: $idCorte) {
            id_corte
            numero
            fecha_inicio
            fecha_siembra
            fecha_corte
            activo
            estado
            area
            suerte_id
        }
    }
`;

export const OBTENER_CORTE_ACTUAL = gql`
    query ObtenerCorteActual($idSuerte: Int!) {
        obtenerCorteActual(id_suerte: $idSuerte) {
            numero
            fecha_inicio
        }
    }
`;

/** TABLONES */

export const OBTENER_TABLONES_CORTE = gql`
    query ObtenerTablonesPorCorte($idCorte: Int!) {
        obtenerTablonesPorCorte(id_corte: $idCorte) {
            id_tablon
            numero
            area
            estado
            corte_id
        }
    }
`;

export const OBTENER_TABLONES_SUERTE = gql`
    query Query($idSuerte: Int!) {
        countTablonesPorSuerte(id_suerte: $idSuerte)
    }
`;

export const OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS = gql`
    query ObtenerTablonesYAplicacionesPlagas($idCorte: Int!) {
        obtenerTablonesYAplicacionesPlagas(id_corte: $idCorte) {
            id_tablon
            numero
            area
            estado
            corte_id
            listAplicacionesPlagas {
                id_apla
                fecha
                corte_id
                tablon_id
                trapl_id
                tratamientoPlagaPadre {
                    id_trapl
                    producto
                    unidad
                    cantidad
                    tiempo
                }
            }
        }
    }
`;

export const OBTENER_TOTAL_HECTAREAS_SUERTE = gql`
    query ObtenerTotalHectareasSuertes {
        obtenerTotalHectareasSuertes {
            area
        }
    }
`;

/** LABORES */

export const OBTENER_LABORES = gql`
    query ObtenerLabores {
        obtenerLabores {
            id_labor
            fecha
            actividad
            equipo
            estado
            pases
            aplico
            costo
            nota
        }
    }
`;

export const OBTENER_LABOR = gql`
    query ObtenerLabor($laborId: Int!) {
        obtenerLabor(labor_id: $laborId) {
            id_labor
            fecha
            actividad
            equipo
            estado
            pases
            aplico
            costo
            nota
        }
    }
`;

/** APLICACION HERBICIDAS */

export const OBTENER_APLICACIONES_HERBICIDAS = gql`
    query ObtenerAplicacionesHerbicidas {
        obtenerAplicacionesHerbicidas {
            id_aphe
            fecha
            tipo
            listTratamientoHerbicida {
                id_trahe
                producto
                dosis
                presentacion
                valor
                aplico
                nota
                aphe_id
            }
        }
    }
`;

/** APLICACIONES LABORES */

export const OBTENER_APLICACIONES_LABORES = gql`
    query ObtenerAplicacionesLabores($corteId: Int!) {
        obtenerAplicacionesLabores(corte_id: $corteId) {
            id_aplicacion_labores
            corte_id
            labor_id
            labor {
                id_labor
                fecha
                actividad
                equipo
                estado
                pases
                aplico
                costo
                nota
                suertes
            }
        }
    }
`;

/** APLICACIONES HERBICIDAS */

export const OBTENER_APLICACIONES_HERBICIDAS_CORTE = gql`
    query ObtenerAplicacionesHerbicidasCorte($corteId: Int!) {
        obtenerAplicacionesHerbicidasCorte(corte_id: $corteId) {
            id_aplicaciones_herbicidas
            corte_id
            aphe_id
            suertes
            aplicacionHerbicida {
                id_aphe
                fecha
                tipo
                listTratamientoHerbicida {
                    id_trahe
                    producto
                    dosis
                    presentacion
                    valor
                    aplico
                    nota
                    aphe_id
                }
            }
        }
    }
`;

/** APLICACION FERTILIZANTE */

export const OBTENER_APLICACIONES_FERTILIZANTES = gql`
    query ObtenerAplicacionesFertilizantes {
        obtenerAplicacionesFertilizantes {
            id_apfe
            fecha
            tipo
            suertes
            listTratamientoFertilizante {
                id_trafe
                producto
                dosis
                presentacion
                valor
                aplico
                nota
                apfe_id
            }
        }
    }
`;

/** APLICACIONES FERTILIZANTES	*/

export const OBTENER_APLICACIONES_FERTILIZANTES_CORTE = gql`
    query ObtenerAplicacionesFertilizantesCorte($corteId: Int!) {
        obtenerAplicacionesFertilizantesCorte(corte_id: $corteId) {
            id_aplicaciones_fertilizantes
            corte_id
            apfe_id
            aplicacionFertilizante {
                id_apfe
                fecha
                tipo
                listTratamientoFertilizante {
                    id_trafe
                    producto
                    dosis
                    presentacion
                    valor
                    aplico
                    nota
                    apfe_id
                }
            }
        }
    }
`;

/** PLUVIOMETROS Y LLUVIAS */

export const OBTENER_PLUVIOMETROS_Y_LLUVIAS = gql`
    query ObtenerPluviometrosYLluvias($filterLluviasInput: FilterLluviasInput!) {
        obtenerPluviometrosYLluvias(filterLluviasInput: $filterLluviasInput) {
            id_pluviometro
            nombre
            suertesAsociadas
            totalMes
            listAplicacionesLluvias {
                id_aplicacion_lluvia
                pluviometro_id
                lluvia_id
                lluviaPadre {
                    id_lluvia
                    fecha
                    cantidad
                }
            }
        }
    }
`;

export const OBTENER_LLUVIAS_YEAR = gql`
    query ObtenerLluviasYear($year: Float!) {
        obtenerLluviasYear(year: $year) {
            id_pluviometro
            nombre
            suertesAsociadas
            totalMes
            listAplicacionesLluvias {
                id_aplicacion_lluvia
                pluviometro_id
                lluvia_id
                lluviaPadre {
                    id_lluvia
                    fecha
                    cantidad
                }
            }
        }
    }
`;

/** TRATAMIENTO PLAGAS */

export const OBTENER_TRATAMIENTO_PLAGAS = gql`
    query ObtenerTratamientoPlagas {
        obtenerTratamientoPlagas {
            id_trapl
            producto
            unidad
            cantidad
            tiempo
        }
    }
`;

/** SUERTES Y CORTES Y TABLONES ACTIVOS PARA APLICAR PLAGAS */

export const OBTENER_SUERTES_CORTES_TABLONES_PLAGAS = gql`
    query ObtenerSuertesRenovadasCortesTablones {
        obtenerSuertesRenovadasCortesTablones {
            id_suerte
            nombre
            listcortes {
                id_corte
                numero
                suerte_id
                listTablones {
                    id_tablon
                    numero
                    area
                    corte_id
                }
            }
        }
    }
`;

/** RIEGOS */

export const OBTENER_RIEGOS_CORTE = gql`
    query ObtenerRiegosCorte($corteId: Int!) {
        obtenerRiegosCorte(corte_id: $corteId) {
            id_riego
            fecha
            num_riego
            corte_id
            listAplicacionesRiegos {
                id_apriego
                riego_id
                tablon_id
                num_tablon
            }
        }
    }
`;

export const OBTENER_RIEGO_MAYOR = gql`
    query Query($corteId: Int!) {
        obtenerRiegosMayor(corte_id: $corteId)
    }
`;

/** COSECHAS */

export const OBTENER_COSECHA_CORTE = gql`
    query ObtenerCosechaCorte($idCorte: Int!) {
        obtenerCosechaCorte(id_corte: $idCorte) {
            id_cosecha
            peso
            rendimiento
            numeroMulas
            numeroVagones
            nota
            corte_id
            cortePadre {
                id_corte
                numero
                listTablones {
                    id_tablon
                    numero
                    area
                    estado
                    corte_id
                }
            }
        }
    }
`;

/** LLUVIAS */

export const OBTENER_LLUVIAS = gql`
    query ObtenerLluvias {
        obtenerLluvias {
            id_lluvia
            fecha
            cantidad
        }
    }
`;

/** REPORTES LLUVIAS */

export const OBTENER_RESUMEN_LLUVIAS_YEAR = gql`
    query ObtenerResumenLluviasYear($year: Int!) {
        obtenerResumenLluviasYear(year: $year) {
            pluviometro_id
            fecha
            cantidad
        }
    }
`;

export const OBTENER_PROMEDIO_LLUVIAS_YEAR = gql`
    query ObtenerPromedioLluvias($year: Int!) {
        obtenerPromedioLluvias(year: $year) {
            fecha
            cantidad
        }
    }
`;

/** PRONTUARIO */

export const OBTENER_PRONTUARIO = gql`
    query ConsultarProntuario($prontuarioInput: ProntuarioInput!) {
        consultarProntuario(prontuarioInput: $prontuarioInput) {
            id_cosecha
            peso
            rendimiento
            numeroVagones
            numeroMulas
            cortePadre {
                id_corte
                numero
                fecha_siembra
                fecha_inicio
                fecha_corte
                area
                suertePadre {
                    id_suerte
                    nombre
                    area
                    variedad
                }
            }
        }
    }
`;

/** DATOS ACTUALES */

export const OBTENER_DATOS_ACTUALES = gql`
    query ObtenerDatosActuales($nombres: String!) {
        obtenerDatosActuales(nombres: $nombres) {
            id_suerte
            nombre
            variedad
            zona
            area
            renovada
            createdAt
            listcortes {
                id_corte
                numero
                fecha_inicio
                listTablones {
                    id_tablon
                    numero
                    area
                    estado
                    corte_id
                }
            }
        }
    }
`;

/********************************************* MODULO MAQUINARIA */

export const OBTENER_MAQUINARIAS = gql`
    query ObtenerMaquinarias {
        obtenerMaquinarias {
            idMaquinaria
            marca
            serie
            modelo
            potencia
            color
        }
    }
`;

/** INSUMOS */

export const OBTENER_INSUMOS = gql`
    query ObtenerInsumos {
        obtenerInsumos {
            idInsumo
            nombre
            referencia
            marca
            cantidad
        }
    }
`;

/** APLICACIONES MANTENIMIENTO */

export const OBTENER_APLICACIONES_MANTENIMIENTO = gql`
    query ObtenerAplicacionesMantenimiento($maquinariaId: Int!) {
        obtenerAplicacionesMantenimiento(maquinariaId: $maquinariaId) {
            idApMant
            fecha
            nombre
            maquinariaId
            listMantenimientos {
                idMantenimiento
                detalle
                horaCambio
                proximoCambio
                tipoCambio
                cantidad
                insumoId
                ApMantId
            }
        }
    }
`;
