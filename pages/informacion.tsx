import React from 'react';
import InformationView from '@modules/cultivos/registroDatos';
import { ThemeProps } from '@interfaces/theme';

const InformationPage = (props: { toogleTheme: (theme: ThemeProps) => void }) => (
    <InformationView toogleTheme={props.toogleTheme} />
);

export default InformationPage;
