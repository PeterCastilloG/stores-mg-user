import { toast } from "react-toastify";

export function generateReport<T extends Record<string, any>>(array: Array<T>) {
  if (!array.length) toast.error("No hay contenido para reporte");
  const headers = Object.keys(array[0]);
  const body = array.map((item) => {
    return headers.map((prop) => item[prop as keyof T]).join(",");
  });
  const csv = [headers.join(","), ...body].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "report.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  return;
}
