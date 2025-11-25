import Toaster from "../components/Toasts";
export default function ToastRootProvider({ children }: { children: React.ReactNode }) {
  return <>{children}<Toaster position="top-right" /></>;
}
