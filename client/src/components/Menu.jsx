import React from 'react'
import clsx from 'clsx';


const Menu = ({ active, setActive }) => {
    let Arr = ["Today", "Yesterday", "Last 7 Days", "This Month", "Custom Date"];
    return (
        <div>
            {
                Arr.map((item, index) => {
                    return (
                        <div key={index} className={
                            clsx(
                                'p-2  cursor-pointer',
                                active === item && 'bg-[#1DA1F2] text-white'
                            )
                        }
                            onClick={() => {
                                setActive(item);
                            }}
                        >
                            <p className='text-center'>{item}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Menu
