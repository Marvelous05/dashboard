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
import { fakeData, taskStatus , taskType } from './makeData.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Fieldtasks = () => {
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
        accessorKey: 'technician',
        header: 'Technician',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.technician,
          helperText: validationErrors?.technician,
          //remove any previous validation errors when Task focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              technician: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'supervisor',
        header: 'Supervisor',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.supervisor,
          helperText: validationErrors?.supervisor,
          //remove any previous validation errors when Task focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              supervisor: undefined,
            }),
        },
      },
      {
        accessorKey: 'taskType',
        header: 'Task Type',
        muiEditTextFieldProps: {
          type: 'string',
          required: true,
          error: !!validationErrors?.taskType,
          helperText: validationErrors?.taskType,
          //remove any previous validation errors when Task focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              taskType: undefined,
            }),
        },
      },
      {
        accessorKey: 'type',
        header: 'Type',
        editVariant: 'select',
        editSelectOptions: taskType,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type,
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        editVariant: 'select',
        editSelectOptions: taskStatus,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
        },
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        muiEditTextFieldProps: {
          type: 'stock',
          required: true,
          error: !!validationErrors?.stock,
          helperText: validationErrors?.stock,
          //remove any previous validation errors when Task focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              stock: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createTask, isPending: isCreatingTask } =
    useCreateTask();
  //call READ hook
  const {
    data: fetchedTasks = [],
    isError: isLoadingTasksError,
    isFetching: isFetchingTasks,
    isLoading: isLoadingTasks,
  } = useGetTasks();
  //call UPDATE hook
  const { mutateAsync: updateTask, isPending: isUpdatingTask } =
    useUpdateTask();
  //call DELETE hook
  const { mutateAsync: deleteTask, isPending: isDeletingTask } =
    useDeleteTask();

  //CREATE action
  const handleCreateTask = async ({ values, table }) => {
    const newValidationErrors = validateTask(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createTask(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveTask = async ({ values, table }) => {
    const newValidationErrors = validateTask(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateTask(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this Task?')) {
      deleteTask(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedTasks,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingTasksError
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
    onCreatingRowSave: handleCreateTask,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveTask,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Task</DialogTitle>
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
        <DialogTitle variant="h3">Edit Task</DialogTitle>
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
        Create New Task
      </Button>
    ),
    type: {
      isLoading: isLoadingTasks,
      isSaving: isCreatingTask || isUpdatingTask || isDeletingTask,
      showAlertBanner: isLoadingTasksError,
      showProgressBars: isFetchingTasks,
    },
    status: {
      isLoading: isLoadingTasks,
      isSaving: isCreatingTask || isUpdatingTask || isDeletingTask,
      showAlertBanner: isLoadingTasksError,
      showProgressBars: isFetchingTasks,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new Task to api)
function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newTasksInfo) => {
      queryClient.setQueryData(['tasks'], (prevTasks) => [
        ...prevTasks,
        {
          ...newTasksInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['Tasks'] }), //refetch Tasks after mutation, disabled for demo
  });
}

//READ hook (get Tasks from api)
function useGetTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put Task in api)
function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newTaskInfo) => {
      queryClient.setQueryData(['Tasks'], (prevTasks) =>
        prevTasks?.map((prevTask) =>
          prevTask.id === newTaskInfo.id ? newTaskInfo : prevTask,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['Tasks'] }), //refetch Tasks after mutation, disabled for demo
  });
}

//DELETE hook (delete Task in api)
function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (taskId) => {
      queryClient.setQueryData(['Tasks'], (prevTasks) =>
        prevTasks?.filter((task) => task.id !== taskId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['Tasks'] }), //refetch Tasks after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const FieldtasksWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Fieldtasks />
  </QueryClientProvider>
);

export default FieldtasksWithProviders;

const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );

function validateTask(task) {
  return {
    technician: !validateRequired(task.technician)
      ? 'Technician is Required'
      : '',
    supervisor: !validateRequired(task.supervisor) ? 'Supervisor is Required' : '',
    type: !validateRequired(task.supervisor) ? 'Type is Required' : '',
    status: !validateRequired(task.status) ? 'Status is Required' : '',
    stock: !validateRequired(task.stock) ? 'Stock is Required' : '',

  };
}
