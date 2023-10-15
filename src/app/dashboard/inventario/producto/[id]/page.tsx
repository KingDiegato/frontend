'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface getSingleProductProps {
  id: string | string[];
  token: string;
}

async function getSingleProduct({ id, token }: getSingleProductProps) {
  try {
    const res = await axios.get(`${process.env.API_URL}/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 401) {
      throw new Error('Unauthorized');
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function PageId() {
  const params = useParams();
  const { data: sessionData } = useSession();
  const [product, setProduct] = useState<any>();
  const user: any = sessionData?.user || {};
  const token = user.jwt || undefined;
  const { id } = params;
  console.log(product);
  useEffect(() => {
    if (token) {
      const product = getSingleProduct({ id, token });
      product.then((res: any) => setProduct(res.data.data));
    }
  }, [id, token, product]);

  return (
    <>
      <h1>
        id? {id} {token}
      </h1>
    </>
  );
}
