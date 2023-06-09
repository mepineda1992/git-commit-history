
import { Button, Grid, Link, TextField } from '@mui/material'
import { Link as LinkRouter } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useLoginMutation } from 'data-access';
import AuthLayout from "../auth-layout/auth-layout"
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useAuthStore } from '../../../../cloud/src/hooks/useAuthStore';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup.string().required()
}).required();

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginProps { }


export function Login(props: LoginProps) {

  const { signIn } = useAuthStore();

  //const

  const { register, handleSubmit, formState: { errors, }, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  });


  const [loginMutation] = useLoginMutation(
    { variables: { ...getValues() } }
  );

  const onSignIn = async (data: any) => {
    try {
      signIn(await loginMutation({ variables: getValues() as any }));

    } catch (error) {
      signIn(error)
    }
  }

  return (<AuthLayout title='Login'>
    <form onSubmit={handleSubmit(onSignIn)}>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            placeholder='email@gmail.com'
            fullWidth
            {...register("username")}
            error={errors.username ? true : false}
            helperText={errors.username?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Password"
            type="password"
            placeholder='Password'
            fullWidth
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message?.toString()}
          />
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Button
            onClick={onSignIn}
            type='submit'
            variant='contained' fullWidth>
            Login
          </Button>
          <Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
          <Link
            component={LinkRouter}
            color="inherit"
            to="/auth/register">
            Create account
          </Link>
        </Grid>
      </Grid>
    </form>
  </AuthLayout>)
}

export default Login;


