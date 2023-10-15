/* eslint-disable @next/next/no-img-element */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextInput from '@mui/material/TextField';
import { Button } from '@mui/material';

export const Login = () => {
  const sectionStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '500px',
    minWidth: '360px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.40)',
    gap: '50px'
  };

  return (
    <section style={{ ...sectionStyles, flexDirection: 'column' }}>
      <AccountCircleIcon fontSize="large" color="primary" />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextInput
          variant="outlined"
          label="Usuario"
          type="text"
          name="identifier"
          helperText="Nombre de usuario"
          required
        />
        <TextInput
          variant="outlined"
          label="Contraseña"
          type="password"
          name="password"
          helperText="Contraseña"
          required
        />
        <div className="flex justify-between">
          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </div>
      </div>
    </section>
  );
};
