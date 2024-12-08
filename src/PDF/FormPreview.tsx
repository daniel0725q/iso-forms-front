import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import './FormPreview.css';
import { useReactToPrint } from "react-to-print";
const { REACT_APP_API_ENDPOINT } = process.env;

const FormPreview = () => {
    const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
    const pdfRef = useRef<any>(null);

    const handlePrint = useReactToPrint({
        contentRef: pdfRef,
        documentTitle: "A4_Print",
    });
    
    let { id } = useParams();
    const [data, setData] = useState<any>({});
    const [logo, setLogo] = useState<string>('');

    useEffect(() => {
        if (id) {
            getForm(id);
        }
    }, [])

    useEffect(() => {
        fetch(`${REACT_APP_API_ENDPOINT}/pdf/logo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorageUser.token}`
            },
        })
        .then((r) => r.json())
        .then((r) => {
            setLogo(r.logo);
        })
    }, [])

    const getForm = (id: string) => {
        fetch(`${REACT_APP_API_ENDPOINT}/forms/${id}`, {
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
            sections.forEach((section: any, index: number) => {
                elements.push(
                    <div>
                        <h2>{(index + 1) + '. ' + section.name}</h2>
                        <div className='section' dangerouslySetInnerHTML={{__html: section.value}}></div>
                    </div>
                )
            })
        }
        return elements;
    };
   
    function compressBase64Image(base64Image: string, maxWidth: number, maxHeight: number, quality: number) {
        const img = new Image();
        img.src = base64Image;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            let width = img.width;
            let height = img.height;
        
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
        
            var compressedBase64Image;
            if (base64Image.includes('png')) {
                compressedBase64Image = canvas.toDataURL('image/png', quality);
            } else {
                compressedBase64Image = canvas.toDataURL('image/jpg', quality);
            }
            return compressedBase64Image;
        }
        return '';
    }

    return (
        <div>
            <button onClick={() => {
                handlePrint()
            }}>Descargar</button>
            <div className='container' ref={pdfRef}>
                <header className='print-header pageHeader hd' id='pageHeader'>
                    <table>
                        <tr>
                            <td>
                                <img style={{height: '50px', width: '50px'}} src={compressBase64Image(logo, 300, 300, 0.2)}/>
                            </td>
                            <td>
                                <b>{String(data.title).toUpperCase()}</b>
                            </td>
                            <td>
                                <table>
                                    <tr>
                                        <td>
                                            Código
                                        </td>
                                        <td>
                                            {data.code}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Versión
                                        </td>
                                        <td>
                                            {data.version}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Fecha
                                        </td>
                                        <td>
                                            { new Date().toLocaleDateString() }
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </header>
                <main className='print-main'>
                    {parse(data.form)}
                </main>
            </div>
        </div>
    );
};

export default FormPreview;