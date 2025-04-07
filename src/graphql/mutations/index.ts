import { gql } from '@apollo/client';

/** USUARIOS */
export const USER_LOGIN = gql`
    mutation AutenticarUsuario($authInput: AuthInput!) {
        autenticarUsuario(authInput: $authInput) {
            token
            user {
                id_usuario
                nombre
                apellido
                email
                rol
            }
        }
    }
`;

export const USER_REGISTER = gql`
    mutation CrearUsuario($createUsuarioInput: CreateUsuarioInput!) {
        crearUsuario(createUsuarioInput: $createUsuarioInput) {
            nombre
            apellido
            email
            rol
        }
    }
`;

export const UPDATE_USER = gql`
    mutation ActualizarUsuario($updateUsuarioInput: UpdateUsuarioInput!) {
        actualizarUsuario(updateUsuarioInput: $updateUsuarioInput) {
            id_usuario
            nombre
            apellido
            email
            rol
        }
    }
`;

/** SUERTES */

export const REGISTRAR_SUERTE_RENOVADA = gql`
    mutation AgregarSuerteRenovada($createSuerteInput: CreateSuerteInput!) {
        agregarSuerteRenovada(createSuerteInput: $createSuerteInput) {
            id_suerte
            nombre
            variedad
            zona
            renovada
        }
    }
`;

export const REGISTRAR_SUERTE = gql`
    mutation AgregarSuerte($createSuerteInput: CreateSuerteInput!) {
        agregarSuerte(createSuerteInput: $createSuerteInput) {
            id_suerte
            nombre
            variedad
            zona
            renovada
        }
    }
`;

export const ACTUALIZAR_SUERTE = gql`
    mutation ActualizarSuerte($updateSuerteInput: UpdateSuerteInput!) {
        actualizarSuerte(updateSuerteInput: $updateSuerteInput) {
            id_suerte
            nombre
            variedad
            zona
            renovada
        }
    }
`;

export const ELIMINAR_SUERTE = gql`
    mutation EliminarSuerte($idSuerte: Int!) {
        eliminarSuerte(id_suerte: $idSuerte)
    }
`;

/** CORTES */

export const REGISTRAR_CORTE = gql`
    mutation AgregarCorte($createCorteInput: CreateCorteInput!) {
        agregarCorte(createCorteInput: $createCorteInput) {
            id_corte
            numero
            fecha_siembra
            fecha_inicio
            fecha_corte
            activo
            estado
            area
            suerte_id
        }
    }
`;

export const ACTUALIZAR_CORTE = gql`
    mutation ActualizarCorte($updateCorteInput: UpdateCorteInput!) {
        actualizarCorte(updateCorteInput: $updateCorteInput) {
            id_corte
            numero
            fecha_inicio
            fecha_siembra
            fecha_corte
            estado
            activo
            area
            suerte_id
        }
    }
`;

/** TABLONES */

export const REGISTRAR_TABLON = gql`
    mutation AgregarTablon($createTabloneInput: [CreateTabloneInput!]!) {
        agregarTablon(createTabloneInput: $createTabloneInput)
    }
`;

export const ACTUALIZAR_TABLON = gql`
    mutation ActualizarTablon($updateTabloneInput: UpdateTablonInput!) {
        actualizarTablon(updateTabloneInput: $updateTabloneInput) {
            id_tablon
            numero
            area
            estado
            corte_id
        }
    }
`;

export const ELIMINAR_TABLON = gql`
    mutation EliminarTablon($idTablon: Int!) {
        eliminarTablon(id_tablon: $idTablon)
    }
`;

/** LABORES */

export const REGISTRAR_LABOR = gql`
    mutation AgregarLabor($createLaboresInput: CreateLaboresInput!) {
        agregarLabor(createLaboresInput: $createLaboresInput) {
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

export const ACTUALIZAR_LABOR = gql`
    mutation ActualizarLabor($updateLaboresInput: UpdateLaboresInput!) {
        actualizarLabor(updateLaboresInput: $updateLaboresInput) {
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

export const ELIMINAR_LABOR = gql`
    mutation EliminarLabor($idLabor: Int!) {
        eliminarLabor(id_labor: $idLabor)
    }
`;

/** APLICACION HERBICIDAS */

export const REGISTAR_APLICACION_HERBICIDA = gql`
    mutation AgregarAplicacionHerbicida($createAplicacionHerbicidaInput: CreateAplicacionHerbicidaInput!) {
        agregarAplicacionHerbicida(createAplicacionHerbicidaInput: $createAplicacionHerbicidaInput) {
            id_aphe
            fecha
            tipo
        }
    }
`;

export const ACTUALIZAR_APLICACION_HERBICIDA = gql`
    mutation ActualizarAplicacionHerbicida($updateAplicacionHerbicidaInput: UpdateAplicacionHerbicidaInput!) {
        actualizarAplicacionHerbicida(updateAplicacionHerbicidaInput: $updateAplicacionHerbicidaInput) {
            id_aphe
            fecha
            tipo
        }
    }
`;

export const ELIMINAR_APLICACION_HERBICIDA = gql`
    mutation EliminarAplicacionHerbicida($idAphe: Float!) {
        eliminarAplicacionHerbicida(id_aphe: $idAphe)
    }
`;

/** TRATAMIENTOS HERBICIDA */

export const REGISTRAR_TRATAMIENTO_HERBICIDA = gql`
    mutation AgregarTratamientoHerbicida($createTratamientoHerbicidaInput: CreateTratamientoHerbicidaInput!) {
        agregarTratamientoHerbicida(createTratamientoHerbicidaInput: $createTratamientoHerbicidaInput) {
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
`;

export const ACTUALIZAR_TRATAMIENTO_HERBICIDA = gql`
    mutation ActualizarTratamientoHerbicida($updateTratamientoHerbicidaInput: UpdateTratamientoHerbicidaInput!) {
        actualizarTratamientoHerbicida(updateTratamientoHerbicidaInput: $updateTratamientoHerbicidaInput) {
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
`;

export const ELIMINAR_TRATAMIENTO_HERBICIDA = gql`
    mutation EliminarTratamientoHerbicida($idTrahe: Int!) {
        eliminarTratamientoHerbicida(id_trahe: $idTrahe)
    }
`;

/** APLICACIONES LABORES */

export const REGISTRAR_LABORES_CORTES = gql`
    mutation AgregarAplicacionLabores($createAplicacionLaboresInput: [CreateAplicacionLaboresInput!]!) {
        agregarAplicacionLabores(createAplicacionLaboresInput: $createAplicacionLaboresInput)
    }
`;

export const ELIMINAR_APLICACION_LABOR = gql`
    mutation EliminarAplicacionLabores($idAplicacionLabores: Int!) {
        eliminarAplicacionLabores(id_aplicacion_labores: $idAplicacionLabores)
    }
`;

/** APLICACIONES HERBICIDAS */

export const REGISTRAR_APLICACIONES_HERBICIDAS = gql`
    mutation AgregarAplicacionesHerbicidas($createAplicacionesHerbicidaInput: [CreateAplicacionesHerbicidaInput!]!) {
        agregarAplicacionesHerbicidas(createAplicacionesHerbicidaInput: $createAplicacionesHerbicidaInput)
    }
`;

export const ELIMINAR_APLICACIONES_HERBICIDAS = gql`
    mutation EliminarAplicacionesHerbicidas($idAplicacionesHerbicidas: Int!) {
        eliminarAplicacionesHerbicidas(id_aplicaciones_herbicidas: $idAplicacionesHerbicidas)
    }
`;

/** APLICACION FERTILIZANTE */

export const REGISTRAR_APLICACION_FERTILIZANTE = gql`
    mutation AgregarAplicacionFertilizante($createAplicacionFertilizanteInput: CreateAplicacionFertilizanteInput!) {
        agregarAplicacionFertilizante(createAplicacionFertilizanteInput: $createAplicacionFertilizanteInput) {
            id_apfe
            fecha
            tipo
        }
    }
`;

export const ACTUALIZAR_APLICACION_FERTILIZANTE = gql`
    mutation ActualizarAplicacionFertilizante($updateAplicacionFertilizanteInput: UpdateAplicacionFertilizanteInput!) {
        actualizarAplicacionFertilizante(updateAplicacionFertilizanteInput: $updateAplicacionFertilizanteInput) {
            id_apfe
            fecha
            tipo
        }
    }
`;

export const ELIMINAR_APLICACION_FERTILIZANTE = gql`
    mutation EliminarAplicacionFertilizante($idApfe: Int!) {
        eliminarAplicacionFertilizante(id_apfe: $idApfe)
    }
`;

/** TRATAMIENTO FERTILIZANTE */

export const REGISTRAR_TRATAMIENTO_FERTILIZANTE = gql`
    mutation AgregarTratamientoFertilizante($createTratamientoFertilizanteInput: CreateTratamientoFertilizanteInput!) {
        agregarTratamientoFertilizante(createTratamientoFertilizanteInput: $createTratamientoFertilizanteInput) {
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
`;

export const ACTUALIZAR_TRATAMIENTO_FERTILIZANTE = gql`
    mutation ActualizarTratamientoFertilizante($updateTratamientoFertilizanteInput: UpdateTratamientoFertilizanteInput!) {
        actualizarTratamientoFertilizante(updateTratamientoFertilizanteInput: $updateTratamientoFertilizanteInput) {
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
`;

export const ELIMINAR_TRATAMIENTO_FERTILIZANTE = gql`
    mutation EliminarTratamientoFertilizante($idTrafe: Int!) {
        eliminarTratamientoFertilizante(id_trafe: $idTrafe)
    }
`;

/** APLICACIONES FERTILIZANTES */

export const REGISTRAR_APLICACIONES_FERTILIZANTES = gql`
    mutation AgregarAplicacionesFertilizantes($createAplicacionesFertilizanteInput: [CreateAplicacionesFertilizanteInput!]!) {
        agregarAplicacionesFertilizantes(createAplicacionesFertilizanteInput: $createAplicacionesFertilizanteInput)
    }
`;

export const ELIMINAR_APLICACIONES_FERTILIZANTES = gql`
    mutation EliminarAplicacionesFertilizantes($idAplicacionesFertilizantes: Int!) {
        eliminarAplicacionesFertilizantes(id_aplicaciones_fertilizantes: $idAplicacionesFertilizantes)
    }
`;

/** PLUVIOMETROS Y LLUVIAS */

export const REGISTRAR_PLUVIOMETRO = gql`
    mutation AgregarPluviometro($createPluviometroInput: CreatePluviometroInput!) {
        agregarPluviometro(createPluviometroInput: $createPluviometroInput) {
            id_pluviometro
            nombre
            suertesAsociadas
        }
    }
`;

export const REGISTRAR_LLUVIA = gql`
    mutation AgregarLluvia($createLluviaInput: [CreateLluviaInput!]!) {
        agregarLluvia(createLluviaInput: $createLluviaInput)
    }
`;

export const ACTUALIZAR_LLUVIA = gql`
    mutation ActualizarLluvia($updateLluviaInput: UpdateLluviaInput!) {
        actualizarLluvia(updateLluviaInput: $updateLluviaInput) {
            id_lluvia
            fecha
            cantidad
        }
    }
`;

export const ELIMINAR_LLUVIA = gql`
    mutation EliminarLluvia($idLluvia: Int!) {
        eliminarLluvia(id_lluvia: $idLluvia)
    }
`;

/** TRATAMIENTO PLAGAS */

export const REGISTRAR_TRATAMIENTO_PLAGAS = gql`
    mutation AgregarTratamientoPlagas($createTratamientoPlagasInput: CreateTratamientoPlagasInput!) {
        agregarTratamientoPlagas(createTratamientoPlagasInput: $createTratamientoPlagasInput) {
            id_trapl
            producto
            unidad
            cantidad
            tiempo
        }
    }
`;

export const ACTUALIZAR_TRATAMIENTO_PLAGAS = gql`
    mutation ActualizarTratamientoPlagas($updateTratamientoPlagasInput: UpdateTratamientoPlagasInput!) {
        actualizarTratamientoPlagas(updateTratamientoPlagasInput: $updateTratamientoPlagasInput) {
            id_trapl
            producto
            unidad
            cantidad
            tiempo
        }
    }
`;

export const ELIMINAR_TRATAMIENTO_PLAGAS = gql`
    mutation EliminarTratamientoPlagas($idTrapl: Int!) {
        eliminarTratamientoPlagas(id_trapl: $idTrapl)
    }
`;

/** APLICACIONES PLAGAS */

export const REGISTRAR_APLICACION_PLAGA = gql`
    mutation AgregarAplicacionPlagas($createAplicacionPlagasInput: CreateAplicacionPlagasInput!) {
        agregarAplicacionPlagas(createAplicacionPlagasInput: $createAplicacionPlagasInput) {
            id_apla
            fecha
            corte_id
            tablon_id
            trapl_id
        }
    }
`;

export const ACTUALIZAR_APLICACION_PLAGA = gql`
    mutation ActualizarAplicacionPlagas($updateAplicacionPlagasInput: UpdateAplicacionPlagasInput!) {
        actualizarAplicacionPlagas(updateAplicacionPlagasInput: $updateAplicacionPlagasInput) {
            id_apla
            fecha
            corte_id
            tablon_id
            trapl_id
        }
    }
`;

export const ELIMINAR_APLICACION_PLAGA = gql`
    mutation EliminarAplicacionPlagas($idApla: Int!) {
        eliminarAplicacionPlagas(id_apla: $idApla)
    }
`;

/** RIEGOS */

export const REGISTRAR_RIEGO = gql`
    mutation AgregarRiego($createRiegoInput: CreateRiegoInput!) {
        agregarRiego(createRiegoInput: $createRiegoInput) {
            id_riego
            fecha
            num_riego
            corte_id
        }
    }
`;

export const ACTUALIZAR_RIEGO = gql`
    mutation ActualizarRiego($updateRiegoInput: UpdateRiegoInput!) {
        actualizarRiego(updateRiegoInput: $updateRiegoInput) {
            id_riego
            fecha
            num_riego
            corte_id
        }
    }
`;

export const ELIMINAR_RIEGO = gql`
    mutation EliminarRiego($idRiego: Int!) {
        eliminarRiego(id_riego: $idRiego)
    }
`;

/** APLICACIONES RIEGOS */

export const REGISTRAR_APLICACION_RIEGO = gql`
    mutation AgregarAplicacionRiego($createAplicacionRiegoInput: [CreateAplicacionRiegoInput!]!) {
        agregarAplicacionRiego(createAplicacionRiegoInput: $createAplicacionRiegoInput)
    }
`;

export const ELIMINAR_APLICACION_RIEGO = gql`
    mutation EliminarAplicacionRiego($ids: [Int!]!) {
        eliminarAplicacionRiego(ids: $ids)
    }
`;

/** COSECHAS */

export const REGISTRAR_COSECHA = gql`
    mutation AgregarCosecha($createCosechaInput: CreateCosechaInput!) {
        agregarCosecha(createCosechaInput: $createCosechaInput) {
            id_cosecha
            peso
            rendimiento
            numeroVagones
            numeroMulas
            nota
            corte_id
        }
    }
`;

export const ACTUALIZAR_COSECHA = gql`
    mutation ActualizarCosecha($updateCosechaInput: UpdateCosechaInput!) {
        actualizarCosecha(updateCosechaInput: $updateCosechaInput) {
            id_cosecha
            peso
            rendimiento
            numeroVagones
            numeroMulas
            nota
            corte_id
        }
    }
`;

/** APLICACIONES LLUVIAS */

export const REGISTRAR_APLICACION_LLUVIA = gql`
    mutation Mutation($createAplicacionLluviaInput: CreateAplicacionLluviaInput!) {
        agregarAplicacionLluvia(createAplicacionLluviaInput: $createAplicacionLluviaInput) {
            id_aplicacion_lluvia
            pluviometro_id
            lluvia_id
        }
    }
`;

export const ELIMINAR_APLICACION_LLUVIA = gql`
    mutation EliminarAplicacionLluvia($idAplicacionLluvia: Int!) {
        eliminarAplicacionLluvia(id_aplicacion_lluvia: $idAplicacionLluvia)
    }
`;

/********************************************* MODULO MAQUINARIA */

export const REGISTRAR_MAQUINARIA = gql`
    mutation AgregarMaquinaria($createMaquinariaInput: CreateMaquinariaInput!) {
        agregarMaquinaria(createMaquinariaInput: $createMaquinariaInput) {
            idMaquinaria
            marca
            serie
            modelo
            potencia
            color
        }
    }
`;

export const ACTUALIZAR_MAQUINARIA = gql`
    mutation ActualizarMaquinaria($updateMaquinariaInput: UpdateMaquinariaInput!) {
        actualizarMaquinaria(updateMaquinariaInput: $updateMaquinariaInput) {
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

export const REGISTRAR_INSUMO = gql`
    mutation AgregarInsumo($createInsumoInput: CreateInsumoInput!) {
        agregarInsumo(createInsumoInput: $createInsumoInput) {
            idInsumo
            nombre
            referencia
            marca
            cantidad
        }
    }
`;

export const ACTUALIZAR_INSUMO = gql`
    mutation ActualizarInsumo($updateInsumoInput: UpdateInsumoInput!) {
        actualizarInsumo(updateInsumoInput: $updateInsumoInput) {
            idInsumo
            nombre
            referencia
            marca
            cantidad
        }
    }
`;

export const ELIMINAR_INSUMO = gql`
    mutation EliminarInsumo($idInsumo: Int!) {
        eliminarInsumo(idInsumo: $idInsumo)
    }
`;

/** APLICACION MANTENIMIENTOS */

export const REGISTRAR_APLICACION_MANTENIMIENTO = gql`
    mutation AgregarAplicacionMantenimiento($createAplicacionMantenimientoInput: CreateAplicacionMantenimientoInput!) {
        agregarAplicacionMantenimiento(createAplicacionMantenimientoInput: $createAplicacionMantenimientoInput) {
            idApMant
            fecha
            nombre
            maquinariaId
        }
    }
`;

export const ACTUALIZAR_APLICACION_MANTENIMIENTO = gql`
    mutation ActualizarAplicacionMantenimiento($updateAplicacionMantenimientoInput: UpdateAplicacionMantenimientoInput!) {
        actualizarAplicacionMantenimiento(updateAplicacionMantenimientoInput: $updateAplicacionMantenimientoInput) {
            idApMant
            fecha
            nombre
            maquinariaId
        }
    }
`;

export const ELIMINAR_APLICACION_MANTENIMIENTO = gql`
    mutation EliminarAplicacionMantenimiento($idApMant: Int!) {
        eliminarAplicacionMantenimiento(idApMant: $idApMant)
    }
`;

/** MANTENIMIENTOS */

export const REGISTRAR_MANTENIMIENTOS = gql`
    mutation AgregarMantenimiento($createMantenimientoInput: [CreateMantenimientoInput!]!) {
        agregarMantenimiento(createMantenimientoInput: $createMantenimientoInput)
    }
`;

export const ACTUALIZAR_MANTENIMIENTO = gql`
    mutation ActualizarMantenimiento($updateMantenimientoInput: UpdateMantenimientoInput!) {
        actualizarMantenimiento(updateMantenimientoInput: $updateMantenimientoInput) {
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
`;

export const ELIMINAR_MANTENIMIENTO = gql`
    mutation EliminarMantenimiento($idMantenimiento: Int!) {
        eliminarMantenimiento(idMantenimiento: $idMantenimiento)
    }
`;
