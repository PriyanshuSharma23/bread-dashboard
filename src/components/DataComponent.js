import Counter from './Counter'
import Dropdown from './Dropdown';
import Charts from './Charts';
// import React, { useState } from 'react';

function DataComponent({data, district, selectedIndex, handleSelection}) {

  return (
    <div>
      <Dropdown selectedIndex={selectedIndex} handleSelection={handleSelection} data={data} district = {district}/>
      <Counter selectedIndex={selectedIndex} data={data} />
      <Charts formdata = {data[selectedIndex].chartdata}></Charts>
    </div>
  );
}

export default DataComponent;
