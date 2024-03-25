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
        var element = document.querySelector('.page');
        html2pdf(element);
    }

    function getOverflowingElements(parentDiv: any) {
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

    function handleOverflow(parentDiv: any, elements: any[]) {
        if (parentDiv.scrollHeight > parentDiv.clientHeight) {
          const newDiv = document.createElement('div');
          newDiv.classList.add('pages'); // Optional: Add a class for styling
          parentDiv.parentNode.insertBefore(newDiv, parentDiv.nextSibling);
            elements.forEach((el: any) => {
                console.log(el);
                newDiv.appendChild(el);
                var oel = getOverflowingElements(newDiv)
                if (oel) {
                    handleOverflow(newDiv, oel);
                }
            });
        }
      }
   
      return (
        <div>
            <button onClick={() => {
                var of = getOverflowingElements(document.getElementById("pages"));
                handleOverflow(document.getElementById("pages"), of);

        }}>Generate PDF</button>
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
            </div>
        </div>
      );
};

export default FormPreview;
