import React from 'react';
import { useRouter } from 'next/router';
import { Box, Card, CardContent, Grid2, Typography } from '@mui/material';
import NavbarView from '@modules/layouts/Navbar';
import { ThemeProps } from '@interfaces/theme';
import { modules } from './utils/constants';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const ProfileView: React.FC<Props> = ({ toogleTheme }) => {
    const router = useRouter();

    const navigateTo = (url: string) => router.push(url);

    return (
        <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
            <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
                <Grid2 size={12}>
                    <NavbarView toogleTheme={toogleTheme} />
                </Grid2>

                {modules.map((item) => (
                    <Grid2
                        key={item.id}
                        size={{ xs: 12, sm: 4 }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height: { md: '80vh' },
                            paddingBottom: { xs: 5, md: 0 },
                            marginTop: { xs: 5, md: 0 }
                        }}
                    >
                        <div className="w-[80%] max-w-[80%] cursor-pointer" onClick={() => navigateTo(item.onclick)}>
                            <Card
                                className="pt-10 pb-10 w-full hover:bg-[#1F618D]"
                                sx={{ background: '#1C2833', borderRadius: '30px' }}
                            >
                                <CardContent className="text-center">
                                    <div>{item.icon}</div>
                                    <Typography variant="h3" component="h3" color="text.secondary">
                                        {item.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default ProfileView;
