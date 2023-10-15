'use client';

import { Button } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { Toaster, toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { CreateProductForm } from './productForm';

export default function CreateBudget() {
  const { data: sessionData } = useSession();
  const user: any = sessionData?.user || {};
  const token = user.jwt || '';

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast('cargando...', {
      duration: 1000,
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          toast.dismiss();
        }
      }
    });
    const form = new FormData(e.currentTarget);

    const data = Object.fromEntries(form.entries());

    data.name = (data.product as string).replaceAll(' ', '_');
    axios
      .post(`http://127.0.0.1:1337/api/productos`, { data }, config)
      .then(() => {
        toast.success('Producto creado');
      })
      .catch((e) => {
        console.log(e);
        toast.error('error');
      });
  }
  return (
    <div>
      <h1>Crear Producto para el inventario</h1>
      <p>aqui tendremos un formulario para crear nuevos objetos</p>
      <form onSubmit={handleSubmit}>
        <CreateProductForm />
        <Button type="submit" variant="contained">
          Crear
        </Button>
      </form>
      <Toaster richColors expand />
    </div>
  );
}
