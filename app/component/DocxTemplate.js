import React, { useState } from 'react';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const DocxTemplate = ({result}) => {
  const [outputDoc, setOutputDoc] = useState(null);

  const populateTemplate = () => {
    // Load the template
    const templateFile = '/Users/zanzen/Desktop/DPWH/certTemplate.docx';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', templateFile, { responseType: 'arraybuffer' });

    xhr.onload = function () {
      const zip = new JSZip(xhr.response);
      const doc = new Docxtemplater().loadZip(zip);

      // TODO: Populate template with data
      const data = {result};
      doc.setData(data);

      try {
        doc.render();
      } catch (error) {
        console.error('Error rendering template:', error);
        return;
      }

      const outputBuffer = doc.getZip().generate({ type: 'nodebuffer' });
      setOutputDoc(new Blob([outputBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
    };

    xhr.send();
  };

  const downloadDocument = () => {
    if (outputDoc) {
      FileSaver.saveAs(outputDoc, 'output_document.docx');
    }
  };

  return (
    <div>
      <button onClick={populateTemplate}>Populate Template</button>
      <button onClick={downloadDocument} disabled={!outputDoc}>Download Document</button>
    </div>
  );
};

export default DocxTemplate;
