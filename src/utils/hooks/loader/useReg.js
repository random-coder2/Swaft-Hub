import { useEffect } from 'react';
import { BareMuxConnection } from 'bare-mux-fork';
import { useOptions } from '/src/utils/optionsContext';
import { BACKEND_URL } from '/src/utils/config';
import { makecodec } from './of';

export default function useReg() {
  const { options } = useOptions();
  // Use configured backend URL or fallback to current host
  const defaultWs = options.wServer || `${BACKEND_URL.replace('https:', 'wss:').replace('http:', 'ws:')}/wisp/`;
  const sws = [
    { path: new URL('/sw.js', location.origin).href, scope: new URL('/portal/k12/', location.origin).href },
    { path: new URL('/s_sw.js', location.origin).href, scope: new URL('/ham/', location.origin).href }
  ];

  useEffect(() => {
    const init = async () => {
      if (!window.scr) {
        const script = document.createElement('script');
        script.src = '/eggs/scramjet.all.js';
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const { ScramjetController } = $scramjetLoadController();

      const hamPrefix = '/ham/';
      const eggsPath = '/eggs/';

      window.scr = new ScramjetController({
        prefix: hamPrefix,
        files: {
          wasm: eggsPath + 'scramjet.wasm.wasm',
          all: eggsPath + 'scramjet.all.js',
          sync: eggsPath + 'scramjet.sync.js',
        },
        flags: { rewriterLogs: false, scramitize: false, cleanErrors: true, sourcemaps: true },
        codec: makecodec()
      });

      window.scr.init();

      for (const sw of sws) {
        try {
          await navigator.serviceWorker.register(
            sw.path,
            sw.scope ? { scope: sw.scope } : undefined,
          );
        } catch (err) {
          console.warn(`SW reg err (${sw.path}):`, err);
        }
      }

      const baremuxPath = new URL('/baremux/worker.js', location.origin).href;
      const connection = new BareMuxConnection(baremuxPath);

      const libcurlPath = '/libcurl/index.mjs';
      const wisp = options.wServer || defaultWs;

      // Also configure Bare server endpoint
      const bareEndpoint = options.bareServer || `${BACKEND_URL}/seal/`;
      await connection.setTransport(libcurlPath, [
        {
          wisp: wisp,
          bare: bareEndpoint,
        },
      ]);
    };

    init();
  }, [options.wServer]);
}
