'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'viem/chains';
import { getMiniAppAssets, MINI_APP_SHORT_NAME } from '@/utils/miniapp';

export function MiniKitContextProvider({ children }) {
  const assets = getMiniAppAssets();

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || MINI_APP_SHORT_NAME,
          logo: process.env.NEXT_PUBLIC_ICON_URL || assets.iconUrl,
          mode: 'auto',
          theme: 'default',
        },
      }}
    >
      {children}
    </MiniKitProvider>
  );
}
