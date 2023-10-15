import TextInput from '@mui/material/TextField';

export function CreateProductForm() {
  return (
    <>
      <TextInput
        label="Nombre del producto..."
        variant="outlined"
        multiline
        name="product"
      />
      <TextInput
        label="Marca del producto..."
        variant="outlined"
        name="brand"
      />
      <TextInput
        label="Descripcion del producto..."
        variant="outlined"
        multiline
        minRows={6}
        name="description"
      />
      <TextInput label="Medidas..." variant="outlined" name="dimensions" />
      <TextInput
        label="Cantidad..."
        variant="outlined"
        type="number"
        name="qty"
      />
      <TextInput
        label="Precio Unitario..."
        variant="outlined"
        type="number"
        name="price"
      />
      <TextInput label="Linea" variant="outlined" name="line" />
    </>
  );
}
