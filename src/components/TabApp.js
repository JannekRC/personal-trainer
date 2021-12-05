import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Customerlist from './Customerlist';
import Activitylist from './Activitylist';

function TabApp() {
    const[value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    }
    
    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="customers" label="Customers" />
                <Tab value="activities" label="Activities" />
            </Tabs>
            {value === 'customers' && <div><Customerlist /></div>}
            {value === 'activities' && <div><Activitylist /></div>}
        </div>
    );
}

export default TabApp;