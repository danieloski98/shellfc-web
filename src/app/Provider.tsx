'use client';
import React, { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from '@/components/ui/provider';
import { queryClient } from '@/lib/react-query';
import { Toaster } from "@/components/ui/toaster"

function CustomProvider({ children }: PropsWithChildren) {
    return (
        <Provider>
            <QueryClientProvider client={queryClient}>
                <Toaster />
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Provider>
    )
}

export default CustomProvider
