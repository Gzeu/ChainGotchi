import { Toaster, toast } from "react-hot-toast";
export default Toaster;

export function notifySuccess(msg: string) {
  toast.success(msg, { icon: "✅", style: { background: "#ecfeff", color: "#064e3b" } });
}
export function notifyError(msg: string) {
  toast.error(msg, { icon: "❌", style: { background: "#fee2e2", color: "#7f1d1d" } });
}
export function notifyInfo(msg: string) {
  toast(msg, { icon: "💡", style: { background: "#fef9c3", color: "#92400e" } });
}
