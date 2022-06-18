import React, { useState, useRef } from 'react';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import Icon from '../Icon';
export default function Dropdown({
  children = <></>,
  label = '',
}: {
  children: React.ReactNode;
  label: string;
}) {
  const [dropdownSelected, setDropdownSelected] = useState<Boolean>(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setDropdownSelected(false);
  });

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={
          'flex items-center cursor-pointer gap-x-2 p-2 px-4 border-[1px] border-gray-200 rounded-full text-sm ' +
          (dropdownSelected ? 'border-blue-500 text-blue-500' : '')
        }
        onClick={() => setDropdownSelected(!dropdownSelected)}
      >
        <p>{label}</p>
        <Icon
          name="chevron-down"
          className={
            dropdownSelected
              ? 'stroke-blue-500 stroke-[0.3px] fill-current'
              : 'text-gray-500'
          }
          size={16}
        />
      </div>
      {dropdownSelected && (
        <div className="absolute mt-3 left-0 h-full bg-white border-[1px] p-2 rounded-md w-[15vw]">
          {children}
        </div>
      )}
    </div>
  );
}
