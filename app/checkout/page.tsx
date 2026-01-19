import { redirect } from 'next/navigation';
import { PLANS_V2, GENERAL_PLANS_V2 } from '@/lib/data';
import { CheckoutContainer } from '@/components/checkout/CheckoutContainer';

// Combine all purchasable plans
const ALL_PLANS = [...PLANS_V2, ...GENERAL_PLANS_V2];

interface CheckoutPageProps {
  searchParams: Promise<{
    planId?: string;
    qty?: string;
    returnUrl?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const { planId, qty, returnUrl } = params;

  // Validate planId - check both restaurant and general plans
  const plan = ALL_PLANS.find((p) => p.id === planId);
  if (!plan || plan.id === 'free' || plan.id === 'group') {
    redirect('/?error=invalid_plan#plans');
  }

  // Validate quantity
  const quantity = parseInt(qty || '1', 10);
  if (isNaN(quantity) || quantity < 1 || quantity > 50) {
    redirect('/?error=invalid_quantity#plans');
  }

  // Special limit for founder plan
  if (plan.id === 'founder' && quantity > 15) {
    redirect('/?error=founder_limit#plans');
  }

  // Default return URL
  const safeReturnUrl = returnUrl || '/';

  return (
    <CheckoutContainer
      plan={plan}
      initialQuantity={quantity}
      returnUrl={safeReturnUrl}
    />
  );
}
