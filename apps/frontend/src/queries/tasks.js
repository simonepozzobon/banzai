import { inject } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

const QUERY_KEY = 'tasks';

export function useTasks() {
  const electron = inject('electron');

  const taskQuery = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: electron.getTasks,
    cacheTime: 0,
  });

  const addTaskMutation = useMutation({
    mutationFn: electron.addTask,
    onSuccess: () => taskQuery.refetch(),
  });

  const updateTaskMutation = useMutation({
    mutationFn: electron.updateTask,
    onSuccess: () => taskQuery.refetch(),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: electron.deleteTask,
    onSuccess: () => taskQuery.refetch(),
  });

  return {
    isFetching: taskQuery.isFetching,
    tasks: taskQuery.data,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
}
