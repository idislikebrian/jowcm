'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';

export function MiniKitContextProvider({ children }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        miniKit: { enabled: true },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
