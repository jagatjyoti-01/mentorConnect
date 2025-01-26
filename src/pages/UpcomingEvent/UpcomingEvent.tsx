import { Grid, Box,styled } from "@mui/material";
import Upcomingcard from "../../components/cards/Upcomingcard";

const UpcomingEvent = () => {

    const Container2 = styled(Box)({
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    });


    return (
        <>

            <div style={{ maxWidth: '100%',minHeight:'80vh',paddingBottom:'140px' }}>
                <Box sx={{ marginTop: 3, paddingLeft: '0px' }}>

                    <Container2 sx={{ paddingLeft: 2, paddingRight: '0px' }}>
                        <Grid spacing={2} container>
                            <Upcomingcard></Upcomingcard>
                        </Grid>
                        <Box display="flex" alignItems="center" justifyContent="center">

                        </Box>
                    </Container2>
                </Box>

            </div>

        </>
    );
};
export default UpcomingEvent;
