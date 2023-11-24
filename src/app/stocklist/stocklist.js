'use client'
import React from 'react';
import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fakeData, stockModels , stockTypes ,stockSources } from './makeData.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import Navbar from '../navbar/page.js'

const Stocklist = () => {
  // <Navbar/>
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'imei',
        header: 'Imei',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.imei,
          helperText: validationErrors?.imei,
          //remove any previous validation errors when stock focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              imei: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'dateIn',
        header: 'Date In',
        muiEditTextFieldProps: {
          type: 'Date',
          required: true,
          error: !!validationErrors?.dateIn,
          helperText: validationErrors?.dateIn,
          //remove any previous validation errors when stock focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              dateIn: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'checkInBy',
        header: 'Check In By',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.checkInBy,
          helperText: validationErrors?.checkInBy,
          //remove any previous validation errors when stock focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              checkInBy: undefined,
            }),
        },
      },
      {
        accessorKey: 'checkOutBy',
        header: 'Check Out By',
        muiEditTextFieldProps: {
          type: 'checkOutBy',
          required: true,
          error: !!validationErrors?.checkOutBy,
          helperText: validationErrors?.checkOutBy,
          //remove any previous validation errors when stock focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              checkOutBy: undefined,
            }),
        },
      },
      {
        accessorKey: 'source',
        header: 'Source',
          editVariant: 'select',
          editSelectOptions: stockSources,
          muiEditTextFieldProps: {
            select: true,
            error: !!validationErrors?.state,
            helperText: validationErrors?.state,
  
        },
      },
      {
        accessorKey: 'model',
        header: 'Model',
        editVariant: 'select',
        editSelectOptions: stockModels,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.model,
          helperText: validationErrors?.model,
        },
      },
      {
        accessorKey: 'type',
        header: 'Type',
        editVariant: 'select',
        editSelectOptions: stockTypes,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type,
        },
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createStock, isPending: isCreatingStock } =
    useCreateStock();
  //call READ hook
  const {
    data: fetchedStocks = [],
    isError: isLoadingStocksError,
    isFetching: isFetchingStocks,
    isLoading: isLoadingStocks,
  } = useGetStocks();
  //call UPDATE hook
  const { mutateAsync: updateStock, isPending: isUpdatingStock } =
    useUpdateStock();
  //call DELETE hook
  const { mutateAsync: deleteStock, isPending: isDeletingStock } =
    useDeleteStock();

  //CREATE action
  const handleCreateStock = async ({ values, table }) => {
    const newValidationErrors = validateStock(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createStock(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveStock = async ({ values, table }) => {
    const newValidationErrors = validateStock(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateStock(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this entity?')) {
      deleteStock(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedStocks,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingStocksError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateStock,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveStock,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Stock</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Stock</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        className='bg-blue-400'
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New stock
      </Button>
    ),
    source: {
      isLoading: isLoadingStocks,
      isSaving: isCreatingStock || isUpdatingStock || isDeletingStock,
      showAlertBanner: isLoadingStocksError,
      showProgressBars: isFetchingStocks,
    },
    model: {
      isLoading: isLoadingStocks,
      isSaving: isCreatingStock || isUpdatingStock || isDeletingStock,
      showAlertBanner: isLoadingStocksError,
      showProgressBars: isFetchingStocks,
    },
    type: {
      isLoading: isLoadingStocks,
      isSaving: isCreatingStock || isUpdatingStock || isDeletingStock,
      showAlertBanner: isLoadingStocksError,
      showProgressBars: isFetchingStocks,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new stock to api)
function useCreateStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stock) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newStockInfo) => {
      queryClient.setQueryData(['stocks'], (prevStocks) => [
        ...prevStocks,
        {
          ...newStockInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['stocks'] }), //refetch stocks after mutation, disabled for demo
  });
}

//READ hook (get stocks from api)
function useGetStocks() {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put stock in api)
function useUpdateStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stock) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newStockInfo) => {
      queryClient.setQueryData(['stocks'], (prevStocks) =>
        prevStocks?.map((prevStock) =>
          prevStock.id === newStockInfo.id ? newStockInfo : prevStock,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['stocks'] }), //refetch stocks after mutation, disabled for demo
  });
}

//DELETE hook (delete stock in api)
function useDeleteStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stockId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (stockId) => {
      queryClient.setQueryData(['stocks'], (prevStocks) =>
        prevStocks?.filter((stock) => stock.id !== stockId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['stocks'] }), //refetch stocks after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const StocklistWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Stocklist />
  </QueryClientProvider>
);

export default StocklistWithProviders;

const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );

function validateStock(stock) {
  return {
    imei: !validateRequired(stock.imei)
      ? 'Imei is Required'
      : '',
    // dateIn: !validateDateIn(stock.dateIn) ? 'Incorrect Date Format' : '',
    checkInBy: !validateRequired(stock.checkInBy) ? 'Check In By is Required' : '',
    checkOutBy: !validateRequired(stock.checkOutBy) ? 'Check Out By is Required' : '',
    source: !validateRequired(stock.source) ? 'Source is Required' : '',
    model: !validateRequired(stock.model) ? 'Model is Required' : '',
    type: !validateRequired(stock.type) ? 'Type is Required' : '',
  };
}
