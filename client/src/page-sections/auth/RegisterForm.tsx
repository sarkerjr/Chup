import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

// assets
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Inputs {
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHERS';
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHERS']),
    phone: z
      .string()
      .regex(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){4,}$/,
        'Invalid phone number!'
      ),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long!'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: 'MALE',
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Box overflow="scroll">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('firstName')}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message?.toString()}
              label="First Name"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName')}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message?.toString()}
              label="Last Name"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message?.toString()}
              label="Email address"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register('password')}
              error={Boolean(errors.password)}
              helperText={errors.password?.message?.toString()}
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register('confirmPassword')}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message?.toString()}
              label="Confirm Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register('phone')}
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message?.toString()}
              label="Phone Number"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.gender)}>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Gender">
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHERS">Others</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>
                {errors.gender?.message?.toString()}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterForm;
