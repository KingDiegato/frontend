import axios from 'axios';
import EnhancedTable from './enhancedTable';

export default function ConsultarInventario() {
  return (
    <div>
      <h1>consultas de inventario</h1>
      <p>Lista de todos los objetos</p>
      <p>va a contener un input para buscar por un parametro en especifico</p>
      <EnhancedTable></EnhancedTable>
    </div>
  );
}
