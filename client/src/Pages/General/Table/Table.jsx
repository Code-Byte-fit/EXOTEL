import React,{useState} from 'react'
import DataTable from 'react-data-table-component';



export default function Table(props) {

  

    const customStyles = {
        rows: {
            style: {
                minHeight: '40px', 
                
                
                
            },
        },
        headCells: {
            style: {
              
                fontSize:'1rem',
                display: 'flex',
			    justifyContent: 'center',
                
            },
        },
        cells: {
            style: {
                
                display: 'flex',
			    justifyContent: 'center',
              
            },
        },
    };
  return (
    <>
         <DataTable
            columns={props.columns}
            data={props.data}
            fixedHeader
            fixedHeaderScrollHeight={props.height}
            highlightOnHover
            pagination={props.pagination}
            customStyles={customStyles}
            onSelectedRowsChange={props.onSelectedRowsChange}
        />
    </>
  )
}




