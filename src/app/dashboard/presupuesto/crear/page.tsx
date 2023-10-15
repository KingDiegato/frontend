import TextInput from '@mui/material/TextField';

export default function CreateBudget() {
  return (
    <div>
      <h1>Presupuestos</h1>
      <p>aqui tendremos un formulario para crear los presupuestos</p>
      <TextInput label="Presupuesto..." variant="outlined" helperText="Title" />
      <TextInput
        label="Description"
        variant="outlined"
        helperText="Description"
      />
      <TextInput variant="outlined" type="date" helperText="Expire" />
    </div>
  );
}
