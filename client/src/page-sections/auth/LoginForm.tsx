import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

import {
  Link,
  Stack,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';

// assets
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

// project imports
import { LoginSchema } from '@/lib/validation';
import { ErrorDetail, ErrorData } from '@/lib/types';
import { useLoginUserMutation } from '@/store/services/auth.service';

interface Inputs {
  email: string;
  password: string;
}

type LoginSchemaType = z.infer<typeof LoginSchema>;
type FieldNames = 'email' | 'password' | 'root';
const defaultValues: LoginSchemaType = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const [loginUser, { error, isLoading, isError }] = useLoginUserMutation();

  useEffect(() => {
    const errorData = getErrorData(error);
    if (errorData?.details) {
      errorData.details.forEach((error: ErrorDetail) => {
        setError(error.field as FieldNames, { message: error.message });
      });
    }
  }, [error]);

  // Get error response from error object
  const getErrorData = (
    error: FetchBaseQueryError | SerializedError | undefined
  ) => {
    if (error && 'data' in error) {
      const errorData = error.data as ErrorData;
      return errorData ?? null;
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginUser(data);
  };

  return (
    <form>
      <Stack spacing={3}>
        <TextField
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message?.toString()}
          label="Email address"
        />

        <TextField
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message?.toString()}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {isError && !getErrorData(error)?.details && (
          <Typography color="red">{getErrorData(error)?.message}</Typography>
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <FormControlLabel control={<Checkbox />} label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
