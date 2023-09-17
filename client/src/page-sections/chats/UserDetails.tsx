import { FC } from 'react';
import {
  useTheme,
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

// Import your custom components and assets here
import AvatarStatus from './AvatarStatus';
import SubCard from '@/components/SubCard';
import { gridSpacing } from '@/utils/const';

// assets
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
// TODOL Fix this import error
import default_avatar from '@/assets/images/users/avatar-1.png';

interface UserDetailsProps {
  user: {
    name: string;
    avatar: string;
    online_status: string;
    role: string;
  };
}

const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={gridSpacing} sx={{ width: '100%', maxWidth: 300 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent
            sx={{
              textAlign: 'center',
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Avatar
                  alt={user?.name}
                  src={user?.avatar || default_avatar}
                  sx={{
                    m: '0 auto',
                    width: 130,
                    height: 130,
                    border: '1px solid',
                    borderColor: theme.palette.primary.main,
                    p: 1,
                    bgcolor: 'transparent',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <AvatarStatus status={user?.online_status} />
                <Typography variant="caption" component="div" color="#9e9e9e">
                  {user?.online_status.replaceAll('_', ' ')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="div"
                  sx={{ fontSize: '14px', fontWeight: 600 }}
                >
                  {user?.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="div"
                  sx={{ fontSize: '14px', color: '#616161' }}
                >
                  {user?.role}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <SubCard
          sx={{
            background: theme.palette.grey[50],
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                component="div"
                sx={{ fontSize: '14px', fontWeight: 600 }}
              >
                Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '14px', color: '#616161' }}>
                    <PinDropTwoToneIcon
                      sx={{
                        verticalAlign: 'sub',
                        fontSize: '1.125rem',
                        mr: 0.625,
                      }}
                    />
                    Rangpur, Bangladesh.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '14px', color: '#616161' }}>
                    <PhoneTwoToneIcon
                      sx={{
                        verticalAlign: 'sub',
                        fontSize: '1.125rem',
                        mr: 0.625,
                      }}
                    />
                    +8801725869541
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '14px', color: '#616161' }}>
                    <EmailTwoToneIcon
                      sx={{
                        verticalAlign: 'sub',
                        fontSize: '1.125rem',
                        mr: 0.625,
                      }}
                    />
                    user@gmail.com
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default UserDetails;
