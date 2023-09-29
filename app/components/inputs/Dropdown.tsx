import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import { IoIosArrowDown, IoMdArrowDown } from 'react-icons/io';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Button from '../Button';

export interface IDropdownOption {
	label: string | number;
	labelValue: string | number;
}

interface IDropdownProps {
	name?: string;
	options: IDropdownOption[];
	required?: boolean;
	tabIndex?: number;
	className?: string;
	type?: string;
	placeHolder?: string;
	labelName: string;
}

function Dropdown({
	labelName,
	name,
	options,
	placeHolder,
	type,
	required,
	className,
	tabIndex,
}: IDropdownProps) {
	const [isFocused, setIsFocused] = React.useState(false);
	const [selectedItem, setSelectedItem] = React.useState<number | string>();
	const wrapperRef = useRef<any>(null);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsFocused(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

	const onValueChange = (selectedValue: string | number) => {
		setSelectedItem(selectedValue);
		setIsFocused(false);
	};
	React.useEffect(() => {
		setIsFocused(false);
	}, [selectedItem]);

	const onClear = (e: any) => {
		e.stopPropagation();
		setSelectedItem(placeHolder);
		setIsFocused(false);
	};

	return (
		<div ref={wrapperRef} className="border-[#979797] relative w-[100%]">
            <Button 
                label={labelName} 
                icon={IoIosArrowDown}
                iconLeft
                outline
                onClick={()=>{setIsFocused(true)}} 
                    />
			{isFocused && (
				<ul className="absolute w-auto mt-2 border-1px z-10 shadow-xl">
					{options.map(({ label, labelValue }) => (
						<li
                            key={label}
							onClick={() => onValueChange(labelValue)}
							className="
                                cursor-pointer
                                whitespace-nowrap
                                py-2
                                px-8
                                rounded-sm 
                                bg-white 
                                transition 
                                relative 
                                flex 
                                hover:bg-black
                                hover:text-white
                                ">
							{label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Dropdown;

Dropdown.defaultProps = {
	name: '',
	type: '',
	className: '',
	placeHolder: '',
	required: false,
	tabIndex: 0,
	labelName: '',
};