'use client';

import { cloneElement, HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface Props {
  content: ReactNode; // Puede ser string o ReactNode (JSX)
  children: React.ReactElement<any> & React.RefAttributes<HTMLElement>;  // El elemento que activará el tooltip
  position?: TooltipPosition; // Posición preferida (por defecto 'top')
  delayShow?: number; // Retraso en ms antes de mostrar
  delayHide?: number; // Retraso en ms antes de ocultar
  offset?: number; // Distancia en px entre el trigger y el tooltip
  className?: HTMLAttributes<HTMLLegendElement> | string;
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  delayShow = 100,
  delayHide = 100,
  offset = 8,
  className = '',
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`);

  // --- Lógica de Posicionamiento ---
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    // Lógica de posicionamiento (la misma que antes)
    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + offset;
        break;
    }

    // Ajustes básicos para el viewport
    // No olvides considerar el scroll y la posición fija/absoluta
    setTooltipStyle({
      position: 'absolute',
      // window.scrollY y window.scrollX son para asegurar que el tooltip se posicione
      // correctamente en relación con el documento, no solo el viewport.
      // Si usas 'position: fixed' para el tooltip, no necesitarías sumar el scroll.
      top: `${top + window.scrollY}px`,
      left: `${left + window.scrollX}px`,
      zIndex: 9999,
    });
  }, [position, offset]);

  useEffect(() => {
    setMounted(true);

    if (isVisible) {
      const timer = setTimeout(() => {
        calculatePosition();
      }, 0);

      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
      };
    }
  }, [isVisible, calculatePosition]);

  const showTooltip = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    showTimeoutRef.current = setTimeout(() => setIsVisible(true), delayShow);
  }, [delayShow]);

  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setIsVisible(false), delayHide);
  }, [delayHide]);

  // Clonar el hijo y añadirle props y referencias para eventos y accesibilidad
  const triggerElement = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    'aria-describedby': isVisible ? tooltipId : undefined,
  });

  // --- Renderizado del Tooltip (Portal) ---
  const tooltipContent = isVisible && (
    <div
      ref={tooltipRef}
      id={`${tooltipId}`}
      role="tooltip" // Rol ARIA para tooltip
      className={`react-custom-tooltip ${isVisible ? 'show' : ''} ${className}`}
      style={tooltipStyle}
    >
      {content}
    </div>
  );

  let portalMountPoint: HTMLElement | null = null;
  if (mounted) {
    portalMountPoint = document.getElementById('tooltip-root');
    if (!portalMountPoint) {
      console.warn("Elemento 'tooltip-root' no encontrado para el portal. Asegúrate de que esté en tu app/layout.tsx.");
    }
  }

  return (
    <>
      {triggerElement}
      {mounted && portalMountPoint && createPortal(tooltipContent, portalMountPoint)}
    </>
  )
}
