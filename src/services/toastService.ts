import { toast, ToastPosition } from 'react-toastify';
const defaultConfigs = {
  position: 'top-right' as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'light',
};

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning'
) => {
  switch (type) {
    case 'success':
      toast.success(message, defaultConfigs);
      break;
    case 'error':
      toast.error(message, defaultConfigs);
      break;
    case 'info':
      toast.info(message, defaultConfigs);
      break;
    case 'warning':
      toast.warning(message, defaultConfigs);
      break;
    default:
      toast(message, defaultConfigs);
  }
};
