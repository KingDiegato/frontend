import axios from 'axios';

export async function getInventory({ token }: { token: string }) {
  const promise = await axios.get(`${process.env.API_URL}/productos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = promise.data;
  if (!data) {
    return {
      notFound: true
    };
  }
  return promise;
}

export async function deleteItem({ token, id }: { token: string; id: any }) {
  try {
    const promise = await axios.delete(
      `${process.env.API_URL}/productos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return promise.status;
  } catch (e) {
    console.log(e);
    return 500;
  }
}
