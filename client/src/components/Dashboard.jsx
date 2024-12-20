import React, { useState, useEffect } from 'react'
import { getDataAccFilter } from "../service/api"
import { useLocation } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router';

// components
import Menu from './Menu'
import Bar from './charts/Bar'

const Dashboard = () => {
    const [active, setActive] = useState("Today");

    const [barData, setBarData] = useState([]);
    const [lineData, setLineData] = useState([]);


    const getDataAccFilterFunction = async () => {
        try {
            let res = await getDataAccFilter({
                active: active,
            });
            setBarData(res.data.barData);
            // setLineData(res.data.lineData);
            console.log(res.data.barData);
        } catch (error) {
            console.error("Error while Calling allDataFunc & error Is", error.message);
            // throw error;
        }
    }



    useEffect(() => {
        if (active === "Custom Date") {
            return;
        }
        getDataAccFilterFunction();
    }, [active])

    return (
        <div className='main w-[100vw] h-[100vh] flex justify-center items-center '>

            <div className='wrapper flex justify-center items-center border border-gray-400 rounded-sm border-opacity-40'>

                <div className="left w-[10vw] border-r border-gray-400 border-opacity-40 min-h-[70vh]">
                    <Menu active={active} setActive={setActive} />
                </div>
                <div className="right w-[80vw] min-h-[70vh]">
                    <div>
                        <Bar barData={barData} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard
