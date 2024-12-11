"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { CoatCheck } from "@prisma/client";
import { ErrorBoundary } from "react-error-boundary";
import ListSubscriptions from "@/components/subscription/ListSubscriptions";
import CreateSubscription from "@/components/subscription/CreateSubscription";
import Link from "next/link";

// Create a client
const queryClient = new QueryClient();

// Separate component for coat check details
function CoatCheckDetails({ id }: { id: string }) {
  const { data: coatCheck } = useQuery<CoatCheck>({
    queryKey: ['coatCheck', id],
    queryFn: async () => {
      const response = await fetch(`/api/protected/coatcheck/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch coat check');
      }
      return response.json();
    },
    throwOnError: true
  });

  return <div>
    <h1 className="text-2xl font-bold">{coatCheck?.name}</h1>
    <p className="text-sm text-gray-500">{coatCheck?.description}</p>

    <ListSubscriptions coatCheckId={id} />
    
    <CreateSubscription coatCheckId={id} />
  </div>;   

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

// Main page component
export default function Page({ params }: { params: { id: string }}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        
        <Link href="/coatcheck/dashboard"><button className="text-primary bg-neutral-dark p-2 hover:bg-neutral-hover rounded-md">Back</button> </Link>
        
        <h1>Coat Check</h1>
        
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // Reset the query when the error boundary resets
            queryClient.invalidateQueries({ queryKey: ['coatCheck', params.id] });
          }}
        >
          <Suspense fallback={<p>Loading coat check details...</p>}>
            <CoatCheckDetails id={params.id} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </QueryClientProvider>
  );
}


