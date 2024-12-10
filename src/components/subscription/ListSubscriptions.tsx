// List all subscriptions for a coat check

import { Subscription } from "@prisma/client";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function SubscriptionDetails({ id }: { id: string }) {
  const { data: subscriptions } = useQuery<Subscription[]>({
    queryKey: ['subscription', id],
    queryFn: async () => {
      const response = await fetch(`/api/protected/coatcheck/${id}/subscription`);
      if (!response.ok) {
        throw new Error('Failed to fetch coat check subscriptions');
      }
      let result = await response.json();
      console.log(result );
      return result.subscriptions;
    },
    throwOnError: true
  });

  return (
    <div className="p-6">

      <h1 className="text-3xl  font-bold mb-6 text-primary-DEFAULT">Subscriptions -- ({subscriptions?.length ?? 0})
      </h1>
      {subscriptions && subscriptions.length > 0 && subscriptions?.map((subscription) => (
        <div 
          key={subscription.id} 
          className="mb-6 p-4 bg-stone-50 border border-stone-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <h1 className="text-2xl font-bold text-secondary">{subscription.name}</h1>
          <p className="text-sm text-stone-600">{subscription.duration}</p>
          <p className="text-sm font-medium text-emerald-700">{subscription.price}</p>
        </div>
      ))}
    </div>
  );   
}


// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  
export default function ListSubscriptions({ coatCheckId }: { coatCheckId: string }) {
    const queryClient = new QueryClient();
    
    return (
        <QueryClientProvider client={queryClient}>
          <div>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => {
                queryClient.invalidateQueries({ queryKey: ['coatCheck', coatCheckId] });
              }}
            >
              <Suspense fallback={<p>Loading coat check details...</p>}>
                <SubscriptionDetails id={coatCheckId} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </QueryClientProvider>
    );
}