import { redirect } from "next/navigation";

export default function PaymentGatewayPage() {
  redirect("/integration/payment-gateway/midtrans");
}
