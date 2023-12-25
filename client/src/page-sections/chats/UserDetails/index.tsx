import { FC } from 'react';
import { useTheme, Avatar, Grid, Typography } from '@mui/material';

// project imports
import SubCard from '@/components/SubCard';
import { gridSpacing } from '@/utils/const';
import { User } from '@/lib/types';

// assets
import WcIcon from '@mui/icons-material/Wc';
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import default_avatar from '@/assets/images/default-avatar.png';

interface UserDetailsProps {
  user: User;
}

const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing={gridSpacing}
      sx={{ width: '100%', maxWidth: 300, mt: '2px' }}
    >
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Avatar
              alt={
                user?.profile
                  ? `${user?.profile?.firstName} ${user?.profile?.lastName}`
                  : 'John Doe'
              }
              src={user?.profile?.profilePhoto ?? default_avatar}
              sizes="large"
              sx={{
                m: '0 auto',
                p: 1,
                width: 130,
                height: 130,
                border: '1px solid',
                borderColor: theme.palette.primary.main,
                bgcolor: 'transparent',
              }}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Typography
              component="div"
              sx={{ fontSize: '1rem', fontWeight: 600 }}
            >
              {user?.profile
                ? `${user?.profile?.firstName} $
              {user?.profile?.lastName}`
                : 'John Doe'}
            </Typography>
          </Grid>
        </Grid>
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
                sx={{ fontSize: '1rem', fontWeight: 600 }}
              >
                Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '14px', color: '#616161' }}>
                    <WcIcon
                      sx={{
                        verticalAlign: 'sub',
                        fontSize: '1.125rem',
                        mr: 0.625,
                      }}
                    />
                    {user?.profile?.gender ?? 'N/A'}
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
                    {user?.profile?.phoneNumber ?? 'N/A'}
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
                    {user?.email ?? 'N/A'}
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
