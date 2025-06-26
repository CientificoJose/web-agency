declare global {
  interface Window {
    mermaid: {
      initialize: (config: { startOnLoad: boolean; theme: string }) => void;
      contentLoaded: () => void;
    };
  }
}

export {};
