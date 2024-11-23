import React, { useEffect, useState } from 'react';
import htmldiff from 'node-htmldiff';
import './CompareForms.css';
import { renderToStaticMarkup } from 'react-dom/server'

const { REACT_APP_API_ENDPOINT } = process.env;

const CompareForms: React.FC = () => {
  const [form1, setForm1] = useState<string>('');
  const [form2, setForm2] = useState<string>('');
  const [diff, setDiff] = useState<string>('');
  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');

  const handleCompare = () => {
    const diffResult = htmldiff(form1, form2);
    setDiff(diffResult);

    console.log(diffResult)
  };

  const parse = (el: any) => {
    const elements: JSX.Element[] = [];
    for (const key in el) {
        let sections: any[] = el[key];
        sections.forEach((section: any, index: number) => {
            elements.push(<div><h2>{(index + 1) + '. ' + section.name}</h2><div className='section' dangerouslySetInnerHTML={{__html: section.value}}></div></div>)
        })
    }
    return elements;
};

  useEffect(() => {
    loadForms()
  }, []);

  const loadForms = () => {
    fetch(`${REACT_APP_API_ENDPOINT}/forms/${12}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorageUser.token}`
    },
    })
    .then((r) => r.json())
    .then((r) => {
      setForm1(renderToStaticMarkup(parse(r.data.form)));
    });
    fetch(`${REACT_APP_API_ENDPOINT}/forms/${14}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorageUser.token}`
      },
      })
      .then((r) => r.json())
      .then((r) => {
        console.log(r.data);
          setForm2(renderToStaticMarkup(parse(r.data.form)));
      });
  }

  return (
    <div>
      <h2>Comparar Formularios</h2>
      <button onClick={handleCompare}>Ver diferencias</button>
      <h3>Diferencias</h3>
      <div className='pages' id='pages' dangerouslySetInnerHTML={{ __html: diff }}>
      </div>
    </div>
  );
};

export default CompareForms;