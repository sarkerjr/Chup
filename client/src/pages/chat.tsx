import {
  Box,
  Button,
  Container,
  Card,
  Paper,
  Typography,
  Grid,
  Input,
} from '@mui/material';
import { blue } from '@mui/material/colors';

const textBg = blue[500];

const Chat = () => {
  return (
    <Container sx={{ m: 0.5 }}>
      <Paper back elevation={3}>
        <Box height="85vh" sx={{ p: 1, mb: 0.5 }}>
          <Card fullWidth sx={{ bgcolor: textBg }}>
            <Typography sx={{ color: 'white', m: 0.5 }}>Testing</Typography>
          </Card>
        </Box>
      </Paper>
      <Grid
        container
        flexDirection="row"
        flexGrow=""
        fullWidth
        sx={{ mx: 0.5, mt: 1 }}
        xs={12}
      >
        <Grid item xs={9} sx={{ mr: 0.5 }}>
          <Input fullWidth placeholder="message" />
        </Grid>
        <Grid item xs>
          <Button variant="contained">Send</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
