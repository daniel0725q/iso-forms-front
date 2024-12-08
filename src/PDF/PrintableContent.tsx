import React, { forwardRef } from "react";
import "./PrintableContent.css";

const PrintableContent = forwardRef((props: any, ref: any) => {
  return (
    <div ref={ref}>
      <header className="print-header">
        <h1>Company Name</h1>
        <p>Document Title</p>
      </header>
      <main className="print-main">
        <h2>Page Content</h2>
        <p>This is the content that will appear on each page.</p>
        {/* Add more content to test multi-page printing */}
      </main>
    </div>
  );
});

export default PrintableContent;
