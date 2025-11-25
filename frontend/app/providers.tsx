import ToastRootProvider from "../components/ToastRootProvider";

export default function GlobalRootLayout({ children }: { children: React.ReactNode }) {
  return <ToastRootProvider>{children}</ToastRootProvider>;
}
