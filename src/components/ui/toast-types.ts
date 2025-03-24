
import type { ToastProps as RadixToastProps } from "@radix-ui/react-toast";
import type { toast } from "@/components/ui/use-toast";

export interface ToastProps extends Partial<RadixToastProps> {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}
