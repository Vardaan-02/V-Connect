import { toast, type ToasterProps } from 'sonner';

type ActionProps = {
  label: string;
  onClick: () => void;
  altText?: string;
};

type ToastProps = {
  description?: string;
  duration?: number;
  action?: ActionProps;
};

export function useToast() {
  return {
    toast: (message: string, props?: ToastProps) => {
      toast(message, {
        ...props,
        action: props?.action && {
          label: props.action.label,
          onClick: props.action.onClick,
        },
      });
    },
    success: (message: string, props?: ToastProps) => {
      toast.success(message, {
        ...props,
        action: props?.action && {
          label: props.action.label,
          onClick: props.action.onClick,
        },
      });
    },
    error: (message: string, props?: ToastProps) => {
      toast.error(message, {
        ...props,
        action: props?.action && {
          label: props.action.label,
          onClick: props.action.onClick,
        },
      });
    },
    promise: <T,>(
      promise: Promise<T>,
      {
        loading,
        success,
        error,
      }: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: unknown) => string);
      },
      props?: ToastProps
    ) => {
      toast.promise(
        promise,
        {
          loading,
          success,
          error,
          ...props,
          action: props?.action && {
            label: props.action.label,
            onClick: props.action.onClick,
          },
        }
      );
    },
    dismiss: (toastId?: number) => {
      toast.dismiss(toastId);
    },
  };
}