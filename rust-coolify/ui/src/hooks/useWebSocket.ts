// completed ui_infra_095
import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseWebSocketOptions {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
  shouldReconnect?: boolean;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

export function useWebSocket(url: string | null, options: UseWebSocketOptions = {}) {
  const {
    onOpen,
    onClose,
    onMessage,
    onError,
    shouldReconnect = true,
    reconnectInterval = 3000,
    reconnectAttempts = 5,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const reconnectTimerRef = useRef<any>(null);

  const connect = useCallback(() => {
    if (!url) return;

    // Close existing connection if any
    if (socketRef.current) {
      socketRef.current.close();
    }

    try {
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = (event) => {
        setIsConnected(true);
        setError(null);
        reconnectCountRef.current = 0;
        if (onOpen) onOpen(event);
      };

      socket.onmessage = (event) => {
        if (onMessage) onMessage(event);
      };

      socket.onerror = (event) => {
        setError(event);
        if (onError) onError(event);
      };

      socket.onclose = (event) => {
        setIsConnected(false);
        if (onClose) onClose(event);

        // Auto reconnect logic
        if (shouldReconnect && reconnectCountRef.current < reconnectAttempts) {
          reconnectTimerRef.current = setTimeout(() => {
            reconnectCountRef.current += 1;
            connect();
          }, reconnectInterval);
        }
      };
    } catch (e) {
      setError(e as any);
      setIsConnected(false);
    }
  }, [url, onOpen, onClose, onMessage, onError, shouldReconnect, reconnectInterval, reconnectAttempts]);

  const sendMessage = useCallback((message: string | ArrayBuffer | Blob) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
    };
  }, [connect]);

  return {
    isConnected,
    error,
    sendMessage,
    socket: socketRef.current,
  };
}
