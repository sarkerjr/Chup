import { styled } from '@mui/material/styles';
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';

// project imports
import LoginForm from '@/page-sections/auth/LoginForm';

// assets
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LoginImg from '@/assets/images/login.jpg';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  height: '100%',
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0 4px 12px 0 rgb(0 0 0 / 5%)',
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const Login = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <StyledRoot>
      <Typography
        sx={{
          position: 'fixed',
          top: { xs: 16, sm: 24, md: 40 },
          left: { xs: 16, sm: 24, md: 40 },
        }}
      >
        LOGO
      </Typography>

      {matchUpMd && (
        <StyledSection>
          <Typography
            variant="h3"
            sx={{ px: 5, mt: 10, mb: 5, fontSize: '2rem', fontWeight: 700 }}
          >
            Hi, Welcome Back
          </Typography>
          <img src={LoginImg} alt="login" />
        </StyledSection>
      )}

      <Container maxWidth="sm">
        <StyledContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sign in
          </Typography>

          <Typography variant="body2" sx={{ mb: 5 }}>
            Don't have an account? {''}
            <Link variant="subtitle2">Register</Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ border: '1px solid rgba(145, 158, 171, 0.32)' }}
            >
              <GoogleIcon
                sx={{ width: '22px', height: '22px', color: '#DF3E30' }}
              />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ border: '1px solid rgba(145, 158, 171, 0.32)' }}
            >
              <FacebookIcon
                sx={{ width: '22px', height: '22px', color: '#1877F2' }}
              />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ border: '1px solid rgba(145, 158, 171, 0.32)' }}
            >
              <LinkedInIcon
                sx={{ width: '22px', height: '22px', color: '#006ABC' }}
              />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <LoginForm />
        </StyledContent>
      </Container>
    </StyledRoot>
  );
};

export default Login;
