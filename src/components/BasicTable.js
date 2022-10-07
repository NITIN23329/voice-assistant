import React,{useMemo} from 'react'
import {useTable} from 'react-table'
import {COLUMNS} from './columns'
import './BasicTable.css'
export const BasicTable = (props) => {
    const jsonData = props.jsonData;
    console.log('data in BasicTable',jsonData);
    const columns = useMemo(()=>COLUMNS,[]);
    const data = useMemo(()=>jsonData,[]);

    const tableInstance = useTable({
        columns : columns,
        data : data
    })
    const {getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow} = tableInstance;
    
      return (
        <div >
          <table className = 'tablestyle' {...getTableProps() } >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
}