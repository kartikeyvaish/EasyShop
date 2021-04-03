import apiClient from "./Client";

const InvoicePrefix = "/api/invoices/";

const CheckInvoiceEndPoint = InvoicePrefix + "CheckInvoice";

const CheckInvoice = (DATA: any) => apiClient.post(CheckInvoiceEndPoint, DATA);

export default {
  CheckInvoice,
};
