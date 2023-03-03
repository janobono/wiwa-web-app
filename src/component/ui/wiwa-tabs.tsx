import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge';

const classes = {
    base: '-mb-px inline-flex h-8 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-4 tracking-wide transition duration-300 hover:bg-blue-50 hover:stroke-blue-600 focus:bg-blue-50 focus-visible:outline-none disabled:cursor-not-allowed',
    selected: 'border-blue-500 stroke-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600 focus:border-blue-700 focus:stroke-blue-700 focus:text-blue-700 disabled:border-slate-500',
    notSelected: 'justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-blue-500 hover:text-blue-500 focus:border-blue-600 focus:stroke-blue-600 focus:text-blue-600 disabled:text-slate-500'
}

interface WiwaTab {
    key: string,
    tabName: string,
    tabSelected: boolean,
    onSelect: () => void
}

interface WiwaTabsProps extends PropsWithChildren {
    tabs: WiwaTab[]
}

const WiwaTabs: React.FC<WiwaTabsProps> = (props) => {
    return (
        <ul className="flex items-center border-b border-slate-200">
            {props.tabs.map(tab =>
                <li key={tab.key}>
                    <button
                        className={twMerge(`
                          ${classes.base}
                          ${tab.tabSelected ? classes.selected : classes.notSelected}
                        `)}
                        onClick={tab.onSelect}
                    >
                        <span>{tab.tabName}</span>
                    </button>
                </li>
            )}
        </ul>
    )
}

export default WiwaTabs;
