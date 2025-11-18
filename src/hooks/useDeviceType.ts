import { useState, useEffect, useCallback } from 'react';

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

export const useDeviceType = (
  options: UseDeviceTypeOptions = {},
): UseDeviceTypeReturn => {
  const { breakpoints = {}, ssr = false } = options;

  // Merge default breakpoints with provided ones
  const finalBreakpoints = { ...defaultBreakpoints, ...breakpoints };

  // Function to determine device type based on width
  const getDeviceType = useCallback(
    (width: number): DeviceType => {
      if (width < finalBreakpoints.mobile) {
        return 'mobile';
      } else if (width < finalBreakpoints.tablet) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    },
    [finalBreakpoints.mobile, finalBreakpoints.tablet],
  );

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
  }, [finalBreakpoints.mobile, finalBreakpoints.tablet, ssr, getDeviceType]);

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
