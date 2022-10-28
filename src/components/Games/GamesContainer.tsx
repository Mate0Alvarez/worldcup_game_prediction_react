import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getGames } from "../../firebase/api";
import { IGames } from "../../types/types";
import GameCard from "./GameCard";

const GamesContainer = (): JSX.Element | null => {
    const [games, setGames] = useState<IGames[] | null>([]);

    useEffect(() => {
        getGames()
            .then((result) => {
                return setGames(result || null);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "primary.dark",
                backgroundImage: "url(/background.svg)",
                backgroundSize: "cover",
                minHeight: "85vh",
                display: "flex",
                justifyContent: "center",
                pt: 2
            }}
        >
            <Grid container maxWidth="lg" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {games?.map((game: IGames, index: number) => {
                    return (
                        <Grid xs={10} md={6} key={index} item>
                            <GameCard game={game}></GameCard>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
};

export default GamesContainer;