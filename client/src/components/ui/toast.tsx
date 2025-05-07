import { toast } from "sonner";

export const useToast = () => {
	return {
		info: (msg: string) => toast.info(msg),
		success: (msg: string) => toast.success(msg),
		error: (msg: string) => toast.error(msg),
		warning: (msg: string) => toast.warning(msg),
		message: (msg: string, description?: string) =>
			toast.message(msg, { description }),
	};
};
