'use client'
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
import { fakeData, issueStatus } from './makeData.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../navbar/page.js'

const Issues = () => {

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
        accessorKey: 'raisedBy',
        header: 'Raised By',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.raisedBy,
          helperText: validationErrors?.raisedBy,
          //remove any previous validation errors when issues focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              raisedBy: undefined,
            }),
        },
      },
      {
        accessorKey: 'clientName',
        header: 'Client Name',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.clientName,
          helperText: validationErrors?.clientName,
          //remove any previous validation errors when issues focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              clientName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      
      {
        accessorKey: 'contactPhone',
        header: 'Contact',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.contactPhone,
          helperText: validationErrors?.contactPhone,
          //remove any previous validation errors when issues focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              contactPhone: undefined,
            }),
        },
      },
      {
        accessorKey: 'location',
        header: 'Location',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.location,
          helperText: validationErrors?.location,
          //remove any previous validation errors when issues focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              location: undefined,
            }),
        },
      },
      {
        accessorKey: 'fault',
        header: 'Fault',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.fault,
          helperText: validationErrors?.fault,
          //remove any previous validation errors when issues focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              fault: undefined,
            }),
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        editVariant: 'select',
        editSelectOptions: issueStatus,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
        },
      },
      {
        accessorKey: 'issueType',
        header: 'Issue Type',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.issueType,
          helperText: validationErrors?.issueType,
          //remove any previous validation errors when issues focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              issueType: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );
 

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this issues?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
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
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Issues</DialogTitle>
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
        <DialogTitle variant="h3">Edit Issues</DialogTitle>
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
        Create New Issues
      </Button>
    ),
    department: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new issues to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (issues) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put issues in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (issues) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete issues in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.filter((issues) => issues.id !== userId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Issues />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );

function validateUser(issues) {
  return {
    clientName: !validateRequired(issues.clientName)
      ? 'Client Name is Required'
      : '',
    raisedBy: !validateRequired(issues.raisedBy) ? 'Raised By is Required' : '',
    
  };
}
