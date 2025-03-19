import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Alarm, InsertAlarm } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

export function useAlarms() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: alarms = [], isLoading } = useQuery<Alarm[]>({
    queryKey: ['/api/alarms'],
  });

  const createAlarm = useMutation({
    mutationFn: async (alarm: InsertAlarm) => {
      const res = await apiRequest('POST', '/api/alarms', alarm);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alarms'] });
      toast({
        title: "Success",
        description: "Alarm created successfully",
      });
    },
    onError: (error) => {
      console.error('Failed to create alarm:', error);
      toast({
        title: "Error",
        description: "Failed to create alarm. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleAlarm = useMutation({
    mutationFn: async ({ id, enabled }: { id: number; enabled: boolean }) => {
      const res = await apiRequest('PATCH', `/api/alarms/${id}`, { isEnabled: enabled });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alarms'] });
    },
    onError: (error) => {
      console.error('Failed to toggle alarm:', error);
      toast({
        title: "Error",
        description: "Failed to toggle alarm. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteAlarm = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/alarms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alarms'] });
      toast({
        title: "Success",
        description: "Alarm deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Failed to delete alarm:', error);
      toast({
        title: "Error",
        description: "Failed to delete alarm. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    alarms,
    isLoading,
    createAlarm,
    toggleAlarm,
    deleteAlarm,
  };
}