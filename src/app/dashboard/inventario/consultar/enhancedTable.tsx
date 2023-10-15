'use client';
import { Toaster, toast } from 'sonner';
import { useState, useMemo, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {
  Inventory,
  Data,
  Order,
  EnhancedTableProps,
  Attributes
} from './types';
import { useSession } from 'next-auth/react';
import { deleteItem, getInventory } from './consult';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

function stableSort(array: Inventory, order: Order, keyToSort: keyof Data) {
  const value = typeof array[0]?.attributes[keyToSort];

  if (value === 'number') {
    return array.sort((a, b) => {
      const aNum = a.attributes[keyToSort] as number;
      const bNum = b.attributes[keyToSort] as number;
      if (order === 'desc') {
        return bNum - aNum;
      }
      return aNum - bNum;
    });
  }
  return array.sort((a, b) => {
    const aVal = a.attributes[keyToSort] as string;
    const bVal = b.attributes[keyToSort] as string;
    if (order === 'desc') {
      return bVal.localeCompare(aVal);
    }
    return aVal.localeCompare(bVal);
  });
}
interface HeadCells {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
} //!

const headCells: readonly HeadCells[] = [
  {
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'Producto'
  },
  {
    id: 'brand',
    numeric: false,
    disablePadding: false,
    label: 'Marca'
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descripcion'
  },
  {
    id: 'dimensions',
    numeric: false,
    disablePadding: false,
    label: 'Medidas'
  },
  {
    id: 'qty',
    numeric: true,
    disablePadding: false,
    label: 'Cantidad'
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Precio'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre'
  },
  {
    id: 'line',
    numeric: false,
    disablePadding: false,
    label: 'Linea'
  }
]; //!

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number[];
  token: string;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const { token } = props;
  const selectedLength = numSelected.length;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selection = numSelected.map((id) => {
      if (id) {
        try {
          const promise = deleteItem({ token, id });
          toast.success('Objetos eliminados');
          window.location.reload();
        } catch (e) {
          console.log(e);
          toast.error('error');
        }
      }
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedLength > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {selectedLength > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedLength} Objeto Seleccionado
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Inventario
        </Typography>
      )}
      {selectedLength > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('product');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [inventory, setInventory] = useState<Inventory>([]);
  const { data: sessionData } = useSession();
  const user: any = sessionData?.user || {};
  const token = user.jwt || undefined;

  useEffect(() => {
    if (token) {
      const inventory = getInventory({ token });
      inventory.then((res: any) => {
        setInventory(res.data.data);
      });
    }
  }, [token]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = inventory.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    const selectedItem =
      selectedIndex === -1
        ? newSelected.concat(selected, id)
        : newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
          );

    setSelected(selectedItem);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - inventory?.length) : 0;

  const visibleRows: Inventory = useMemo(
    () =>
      stableSort(inventory, order, orderBy).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, inventory, order, orderBy]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Reducir el tamaño"
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected} token={token} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={inventory?.length}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const { id } = row;
                const { attributes } = row;
                const isItemSelected = isSelected(id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {attributes.product}
                    </TableCell>
                    <TableCell align="left">{attributes.brand}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        maxWidth: '20ch'
                      }}
                    >
                      {attributes.description}
                    </TableCell>
                    <TableCell align="left">{attributes.dimensions}</TableCell>
                    <TableCell align="right">{attributes.qty}</TableCell>
                    <TableCell align="right">{attributes.price}</TableCell>
                    <TableCell align="left">{attributes.line}</TableCell>
                    <TableCell align="right">
                      <Link href={`/dashboard/inventario/producto/${id}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={inventory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Toaster richColors />
    </Box>
  );
}
