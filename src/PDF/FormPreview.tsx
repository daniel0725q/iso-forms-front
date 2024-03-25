import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './FormPreview.css';
const html2pdf = require('html2pdf.js');

const FormPreview = () => {
    const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
    
    let { id } = useParams();

    const [data, setData] = useState<any>({});
    useEffect(() => {
        if (id) {
            getForm(id);
        }
    }, [])

    const getForm = (id: string) => {
        fetch(`http://localhost:8080/api/v1/forms/${id}`, {
            method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            setData(r.data);
        })
    }

    const parse = (el: any) => {
        const elements: JSX.Element[] = [];
        for (const key in el) {
            let sections: any[] = el[key];
            sections.forEach((section: any) => {
                elements.push(<div className='section' dangerouslySetInnerHTML={{__html: section.value}}></div>)
            })
        }
        return elements;
      };

      const generatePDF = () => {
        var element = document.querySelector('#all');
        html2pdf(element);
    }

    function getOverflowingElements2(parentDiv: any) {
        const overflowingElements = [];
        const childNodes = parentDiv.childNodes; // Get all child nodes
      
        for (let i = 0; i < childNodes.length; i++) {
          const childNode = childNodes[i];
          if (childNode.nodeType === Node.ELEMENT_NODE && childNode.getClientRects()[0].bottom > parentDiv.clientHeight) {
            overflowingElements.push(childNode);
            childNode.remove();
          }
        }
      
        return overflowingElements;
      }

      function getOverflowingElements(parentDiv: any) {
        const overflowingElements = [];
        const childNodes = parentDiv.childNodes; // Get all child nodes
      
        for (let i = 0; i < childNodes.length; i++) {
          const childNode = childNodes[i];
          if (childNode.nodeType === Node.ELEMENT_NODE) {
            const childRect = childNode.getBoundingClientRect();
            const parentRect = parentDiv.getBoundingClientRect();
      
            // Check if element bottom overflows parent bottom and element top is within parent
            if (childRect.bottom > parentRect.bottom && childRect.top >= parentRect.top) {
              overflowingElements.push(childNode);
              childNode.remove();
            }
          }
        }
      
        return overflowingElements;
      }

    function handleOverflow(parentDiv: any) {
        if (parentDiv.scrollHeight > parentDiv.clientHeight) {
          var of = getOverflowingElements(parentDiv);
          console.log(of);
          const newDiv = document.createElement('div');
          newDiv.classList.add('pages');
          of.forEach((el: any) => {
            newDiv.innerHTML = newDiv.innerHTML + el.innerHTML;
          });
          parentDiv.parentNode.appendChild(newDiv);
          var oel = getOverflowingElements(parentDiv.parentNode.lastChild);
          console.log(oel);
          if (oel) {
            handleOverflow(parentDiv.parentNode.lastChild);
          }
        }
        generatePDF();
      }
   
      return (
        <div>
            <button onClick={() => {
                handleOverflow(document.getElementById("pages"));

        }}>Generate PDF</button>
        <div id='all'>
            <div className='pages' id='pages'>
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
                {parse(data.form)}
            </div>
            </div>
        </div>
      );
};

export default FormPreview;
