import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
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

// project imports
import { RegisterInputType, ErrorData, ErrorDetail } from '@/lib/types';
import { RegisterSchema } from '@/lib/validation';
import { useRegisterUserMutation } from '@/store/services/auth.service';

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

type FieldNames =
  | 'email'
  | 'password'
  | 'root'
  | 'firstName'
  | 'lastName'
  | 'gender'
  | 'phoneNumber'
  | 'confirmPassword';

const defaultValues: RegisterInputType = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  gender: 'MALE',
  phoneNumber: '',
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, { error, isLoading, isSuccess, isError }] =
    useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  useEffect(() => {
    const errorData = getErrorData(error);
    if (errorData?.details) {
      errorData.details.forEach((error: ErrorDetail) => {
        setError(error.field as FieldNames, { message: error.message });
      });
    }
  }, [error]);

  /**
   * @description Get error response from error object
   * @param error
   * @returns error response or null
   */
  const getErrorData = (
    error: FetchBaseQueryError | SerializedError | undefined
  ) => {
    if (error && 'data' in error) {
      const errorData = error.data as ErrorData;
      return errorData ?? null;
    }
  };

  const onSubmit: SubmitHandler<RegisterInputType> = (data) => {
    registerUser(data);
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
              {...register('phoneNumber')}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message?.toString()}
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
            {isSuccess && (
              <Typography color="green">
                Registration is complete. Please log in.
              </Typography>
            )}

            {isError && !getErrorData(error)?.details && (
              <Typography color="red">
                {getErrorData(error)?.message}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={isLoading}
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
