import { forwardRef } from 'react';

export const Label = forwardRef(
  ({ required, className, children, ...props }, ref) => {
    return (
      <>
        <label className="">
          {children}{' '}
          {required && <span className="text-orange-600 text-sm">*</span>}
        </label>
      </>
    );
  }
);
