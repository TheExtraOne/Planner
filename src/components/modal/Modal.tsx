import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import classNames from 'classnames';
import Button from 'src/components/button/Button.tsx';
import useDeviceType from 'src/hooks/useDeviceType.ts';
import styles from 'src/components/modal/Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  showCloseButton = true,
}) => {
  const { isMobile } = useDeviceType();
  const modalRef = useRef<HTMLDivElement>(null);
  const handlebarRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const translateY = useRef<number>(0);
  const isClosingFromDrag = useRef<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isHidden, setIsHidden] = useState(!isOpen);

  const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false);
      setIsClosing(false);
      translateY.current = 0;
      isClosingFromDrag.current = false;
      if (modalRef.current) {
        modalRef.current.style.transform = '';
        modalRef.current.style.transition = '';
      }
      document.body.style.overflow = 'hidden';
    } else {
      // Start closing animation
      setIsClosing(true);
      // After animation completes (300ms), hide the component and reset transform
      const timer = setTimeout(() => {
        setIsHidden(true);
        setIsClosing(false);
        isClosingFromDrag.current = false;
        if (modalRef.current) {
          modalRef.current.style.transform = '';
          modalRef.current.style.transition = '';
        }
        translateY.current = 0;
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Touch handlers for swipe down on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile || !handlebarRef.current) return;

    const touch = e.touches[0];
    const handlebarRect = handlebarRef.current.getBoundingClientRect();

    // Check if touch started on handlebar
    if (
      touch.clientY >= handlebarRect.top &&
      touch.clientY <= handlebarRect.bottom
    ) {
      isDragging.current = true;
      touchStartY.current = touch.clientY;
      touchCurrentY.current = touch.clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging.current || !modalRef.current) return;

    const touch = e.touches[0];
    touchCurrentY.current = touch.clientY;
    const deltaY = touchCurrentY.current - touchStartY.current;

    // Only allow downward swiping
    if (deltaY > 0) {
      translateY.current = deltaY;
      modalRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging.current || !modalRef.current) return;

    isDragging.current = false;

    if (translateY.current > 100) {
      // Mark that we're closing from drag to skip CSS animation
      isClosingFromDrag.current = true;
      // Set transition and animate to 100% from current position
      modalRef.current.style.transition = 'transform 0.3s ease-out';
      // Use requestAnimationFrame to ensure the transition is applied
      requestAnimationFrame(() => {
        if (modalRef.current) {
          modalRef.current.style.transform = 'translateY(100%)';
        }
        // Trigger close after transition starts
        setTimeout(() => {
          onClose();
        }, 10);
      });
    } else {
      translateY.current = 0;
      modalRef.current.style.transform = '';
      modalRef.current.style.transition = '';
    }
  };

  if (isHidden || !modalRoot) {
    return null;
  }

  const content = (
    <div
      className={classNames(styles.overlay, {
        [styles.overlayClosing]: isClosing && isMobile,
      })}
      onClick={handleOverlayClick}
      role='dialog'
      aria-modal='true'
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={classNames(
          styles.modal,
          {
            [styles.modalMobile]: isMobile,
            [styles.modalDesktop]: !isMobile,
            [styles.modalClosing]:
              isClosing && isMobile && !isClosingFromDrag.current,
          },
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isMobile && (
          <div ref={handlebarRef} className={styles.handlebar}>
            <div className={styles.handlebarLine} />
          </div>
        )}

        {(title || (showCloseButton && !isMobile)) && (
          <div className={styles.header}>
            {title && (
              <h2 id='modal-title' className={styles.title}>
                {title}
              </h2>
            )}
            {showCloseButton && !isMobile && (
              <Button
                onClick={onClose}
                variant='icon'
                className={styles.closeButton}
                aria-label='Close modal'
              >
                <X size={20} />
              </Button>
            )}
          </div>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );

  return createPortal(content, modalRoot);
};

export default Modal;
