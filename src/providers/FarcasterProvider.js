'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

const FarcasterContext = createContext(null);

function applyClientContextUpdate(previousContext, { details, frameAdded }) {
  if (!previousContext?.client) {
    return previousContext;
  }

  return {
    ...previousContext,
    client: {
      ...previousContext.client,
      notificationDetails: details ?? undefined,
      added: frameAdded ?? previousContext.client.added,
    },
  };
}

export function FarcasterProvider({ children }) {
  const [context, setContext] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const updateClientContext = useCallback((params) => {
    setContext((previousContext) => applyClientContextUpdate(previousContext, params));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadContext() {
      try {
        const frameContext = await sdk.context;
        if (!cancelled) {
          setContext(frameContext);
        }
      } catch (error) {
        if (!cancelled) {
          setContext(null);
        }
      }
    }

    function handleFrameAdded({ notificationDetails }) {
      updateClientContext({
        details: notificationDetails,
        frameAdded: true,
      });
    }

    function handleFrameRemoved() {
      updateClientContext({
        details: undefined,
        frameAdded: false,
      });
    }

    function handleNotificationsEnabled({ notificationDetails }) {
      updateClientContext({
        details: notificationDetails,
      });
    }

    function handleNotificationsDisabled() {
      updateClientContext({
        details: undefined,
      });
    }

    function handleFrameAddRejected({ reason }) {
      console.error('Mini App add rejected', reason);
    }

    sdk.on('frameAdded', handleFrameAdded);
    sdk.on('frameAddRejected', handleFrameAddRejected);
    sdk.on('frameRemoved', handleFrameRemoved);
    sdk.on('notificationsEnabled', handleNotificationsEnabled);
    sdk.on('notificationsDisabled', handleNotificationsDisabled);

    loadContext();

    return () => {
      cancelled = true;
      sdk.off('frameAdded', handleFrameAdded);
      sdk.off('frameAddRejected', handleFrameAddRejected);
      sdk.off('frameRemoved', handleFrameRemoved);
      sdk.off('notificationsEnabled', handleNotificationsEnabled);
      sdk.off('notificationsDisabled', handleNotificationsDisabled);
    };
  }, [updateClientContext]);

  const setReady = useCallback(async (options = {}) => {
    await sdk.actions.ready(options);
    setIsReady(true);
  }, []);

  const addMiniApp = useCallback(async () => {
    const result = await sdk.actions.addFrame();

    if (result?.notificationDetails) {
      updateClientContext({
        details: result.notificationDetails,
        frameAdded: true,
      });
      return result.notificationDetails;
    }

    return null;
  }, [updateClientContext]);

  const safeAreaInsets = context?.client?.safeAreaInsets;

  const value = useMemo(() => ({
    context,
    isMiniApp: Boolean(context?.client),
    isReady,
    setReady,
    addMiniApp,
  }), [addMiniApp, context, isReady, setReady]);

  return (
    <FarcasterContext.Provider value={value}>
      <div
        style={{
          paddingTop: safeAreaInsets?.top ?? 0,
          paddingBottom: safeAreaInsets?.bottom ?? 0,
          paddingLeft: safeAreaInsets?.left ?? 0,
          paddingRight: safeAreaInsets?.right ?? 0,
        }}
      >
        {children}
      </div>
    </FarcasterContext.Provider>
  );
}

export function useFarcasterMiniApp() {
  const context = useContext(FarcasterContext);

  if (!context) {
    throw new Error('useFarcasterMiniApp must be used within FarcasterProvider');
  }

  return context;
}
