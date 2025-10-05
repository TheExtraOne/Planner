import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceBreakpoints {
  mobile: number;
  tablet: number;
}

const defaultBreakpoints: DeviceBreakpoints = {
  mobile: 768, // Below 768px is mobile
  tablet: 1024, // 768px to 1024px is tablet
  // Above 1024px is desktop
};

export interface UseDeviceTypeOptions {
  breakpoints?: Partial<DeviceBreakpoints>;
  ssr?: boolean; // Server-side rendering support
}

export interface UseDeviceTypeReturn {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

/**
 * Custom hook to determine device type based on screen width
 * @param options Configuration options for breakpoints and SSR support
 * @returns Object containing device type information and utilities
 *
 * @example
 * ```tsx
 * import { useDeviceType } from '@/hooks';
 *
 * function MyComponent() {
 *   const { deviceType, isMobile, isTablet, isDesktop, width } = useDeviceType();
 *
 *   return (
 *     <div>
 *       <p>Device: {deviceType}</p>
 *       <p>Width: {width}px</p>
 *       {isMobile && <p>Mobile view active</p>}
 *       {isTablet && <p>Tablet view active</p>}
 *       {isDesktop && <p>Desktop view active</p>}
 *     </div>
 *   );
 * }
 *
 * // With custom breakpoints
 * const { deviceType } = useDeviceType({
 *   breakpoints: {
 *     mobile: 600,
 *     tablet: 900
 *   }
 * });
 *
 * // With SSR support
 * const { deviceType } = useDeviceType({ ssr: true });
 * ```
 */
export const useDeviceType = (
  options: UseDeviceTypeOptions = {},
): UseDeviceTypeReturn => {
  const { breakpoints = {}, ssr = false } = options;

  // Merge default breakpoints with provided ones
  const finalBreakpoints = { ...defaultBreakpoints, ...breakpoints };

  // Function to determine device type based on width
  const getDeviceType = (width: number): DeviceType => {
    if (width < finalBreakpoints.mobile) {
      return 'mobile';
    } else if (width < finalBreakpoints.tablet) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  // Initialize state - use a default value for SSR
  const [deviceInfo, setDeviceInfo] = useState(() => {
    const initialWidth = ssr ? 1024 : window.innerWidth; // Default to desktop for SSR
    return {
      deviceType: getDeviceType(initialWidth),
      width: initialWidth,
    };
  });

  useEffect(() => {
    // Skip if we're in SSR mode and not in browser
    if (ssr && typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      const deviceType = getDeviceType(width);

      setDeviceInfo((prev) => {
        // Only update if the device type actually changed to avoid unnecessary re-renders
        if (prev.deviceType !== deviceType || prev.width !== width) {
          return { deviceType, width };
        }
        return prev;
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call once to set initial value (in case it differs from SSR default)
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [finalBreakpoints.mobile, finalBreakpoints.tablet, ssr]);

  // Return computed values
  return {
    deviceType: deviceInfo.deviceType,
    isMobile: deviceInfo.deviceType === 'mobile',
    isTablet: deviceInfo.deviceType === 'tablet',
    isDesktop: deviceInfo.deviceType === 'desktop',
    width: deviceInfo.width,
  };
};

export default useDeviceType;
