import { notifySuccess, notifyError } from "../components/Toasts";

export async function safeAction(action: () => Promise<any>, msg: string) {
  try {
    await action();
    notifySuccess(msg);
  } catch (e: any) {
    notifyError("Error: " + (e?.message || "Unknown error"));
  }
}
