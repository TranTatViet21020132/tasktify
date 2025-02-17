import { useEffect, RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  isActive: boolean = true
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      const isDatePickerClick = target instanceof Element && 
        (target.closest('.rdp') !== null);
      
      if (ref.current && !ref.current.contains(target) && !isDatePickerClick) {
        handler();
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, isActive]);
}