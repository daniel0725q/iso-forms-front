import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Companies.css'

const Companies = () => {
  const navigate = useNavigate()

  const data = [
      {
        "name": "Wisoky and Sons",
        "id": "8b2d1bba",
        "socialName": "Lesch, Larson and Dickinson",
        "logo": "/3.png"
      },
      {
        "name": "Koss - Kshlerin",
        "id": "a7bb08af",
        "socialName": "Bahringer Group",
        "logo": "/2.png"
      },
      {
        "name": "Carter and Sons",
        "id": "d7093bf3",
        "socialName": "Padberg LLC",
        "logo": "/3.png"
      },
      {
        "name": "Abshire - Mitchell",
        "id": "967ae932",
        "socialName": "Mayert - Dickinson",
        "logo": "/1.png"
      },
      {
        "name": "Marquardt - Moore",
        "id": "082d1da0",
        "socialName": "Littel - Jerde",
        "logo": "/3.png"
      },
      {
        "name": "Rippin, Conroy and Kozey",
        "id": "f1442dcf",
        "socialName": "Konopelski Inc",
        "logo": "/2.png"
      }
    ];

  const columns = [
    {  
        Header: 'Nombre',  
        accessor: 'name'  
    },
    {
        Header: 'NIT',  
        accessor: 'id'  
    },
    {
        Header: 'Razón social',
        accessor: 'socialName'  
    },
    {  
        Header: 'Logo',  
        accessor: 'logo'  
    }
  ];

  const onButtonClick = () => {
  }

  let userElements = columns.map(function(column) {
    return <th>{column.Header}</th>;
  });

  let tableElements = data.map(function(row) {
    return <tr>
        {
            columns.map(function(column) {
                return <td>{
                    column.accessor != "logo" ?
                    row[column.accessor as keyof typeof data[0]]
                    : <img className='logo' src={row["logo"]}></img>
                    }</td>;
              })
        }
        </tr>
  }
  )

  return (
    <div>
        <h1>Empresas</h1>
        <div className='companies'>
            <table>
                <thead>
                    { userElements }
                </thead>
                <tbody>
                    { tableElements }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Companies;