import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeNumberTwo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFile, faFileExport, faMagnifyingGlass, faMap, faSuitcase, faTable } from '@fortawesome/free-solid-svg-icons';

const HomeNumberTwo = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mainContainer">
        <div className={'titleContainer'}>
          <img src='logogs.png' height={80}></img>
        </div>
        <div>
          <b>Opciones</b>
          <p>
          Explora toda nuestra documentación
          </p>
        </div>
        <div>
          <table>
            <tr>
              <td><p><FontAwesomeIcon icon={faFile} style={{padding: '3%'}} size='10x' onClick={() => {
            navigate('/company-forms?formId=3')
          }} />
          <br></br>
          Documentación</p></td>
              <td><p>
          <FontAwesomeIcon icon={faMap} style={{padding: '3%'}} size='10x' onClick={() => {
            navigate('/company-forms?formId=4')
          }} />
          <br></br>
          Mapa de procesos</p></td>
              <td><p><FontAwesomeIcon icon={faFileExport} style={{padding: '3%'}} size='10x' onClick={() => {
            navigate('/company-forms?formId=5')
          }} />
          <br></br>
          Políticas</p></td>
            </tr>
            <tr>
              <td><p>
          <FontAwesomeIcon icon={faSuitcase} style={{padding: '3%'}} size='10x' onClick={() => {
            navigate('/company-forms?formId=6')
          }} />
          <br></br>
          Normas/Leyes
          </p></td>
              <td><p> <FontAwesomeIcon icon={faTable} style={{padding: '3%'}} size='10x' onClick={() => {
            navigate('/company-forms?formId=7')
          }} />
          <br></br>
          Matriz de riesgos
          </p></td>
              <td><p>
          <FontAwesomeIcon icon={faMagnifyingGlass} size='10x' style={{padding: '3%'}} onClick={() => {
            navigate('/company-forms?formId=8')
          }} />
          <br></br>
          Auditoría
          </p></td>
            </tr>
            <tr>
              <td></td>
              <td><p>
          <FontAwesomeIcon icon={faCheck} style={{padding: '3%'}} size='10x' onClick={() => {
            navigate('/company-forms?formId=9')
          }} />
          <br></br>
          Evaluación de desempeño
          </p></td>
          <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HomeNumberTwo;