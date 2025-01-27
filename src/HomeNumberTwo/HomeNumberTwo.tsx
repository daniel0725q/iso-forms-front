import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeNumberTwo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFile, faFileExport, faMagnifyingGlass, faMap, faSuitcase, faTable, faFolderTree, faChartSimple } from '@fortawesome/free-solid-svg-icons';

const HomeNumberTwo = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mainContainer">
        <div className={'titleContainer'}>
          <img src='logogs.png' height={80} alt="Logo"></img>
        </div>
        <div>
          <b>Opciones</b>
          <p>Explora toda nuestra documentación</p>
        </div>
        <div className="tableContainer">
          <div className="tableRow">
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faFile} className="icon icon1" onClick={() => {
                  navigate('/miscellaneous-documents?formId=3')
                }} />
                <br />
                Documentación
              </p>
            </div>
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faMap} className="icon icon2" onClick={() => {
                  navigate('/diagrams')
                }} />
                <br />
                Mapa de procesos
              </p>
            </div>
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faFileExport} className="icon icon3" onClick={() => {
                  navigate('/miscellaneous-documents?formId=5')
                }} />
                <br />
                Políticas
              </p>
            </div>
          </div>
          <div className="tableRow">
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faSuitcase} className="icon icon4" onClick={() => {
                  navigate('/miscellaneous-documents?formId=6')
                }} />
                <br />
                Normas/Leyes
              </p>
            </div>
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faTable} className="icon icon5" onClick={() => {
                  navigate('/miscellaneous-documents?formId=7')
                }} />
                <br />
                Matriz de riesgos
              </p>
            </div>
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon icon6" onClick={() => {
                  navigate('/miscellaneous-documents?formId=8')
                }} />
                <br />
                Auditoría
              </p>
            </div>
          </div>
          <div className="tableRow">
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faCheck} className="icon icon7" onClick={() => {
                  navigate('/miscellaneous-documents?formId=9')
                }} />
                <br />
                Evaluación de desempeño
              </p>
            </div>
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faFolderTree} className="icon icon8" onClick={() => {
                  navigate('/miscellaneous-documents?formId=9')
                }} />
                <br />
                Listado Maestro de Documentos
              </p>
            </div>
            <div className="tableCell">
              <p>
                <FontAwesomeIcon icon={faChartSimple} className="icon icon9" onClick={() => {
                  navigate('/miscellaneous-documents?formId=9')
                }} />
                <br />
                Registros
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeNumberTwo;
