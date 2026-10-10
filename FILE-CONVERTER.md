# File Converter

Open Quick Actions → File Converter on the localhost website (not file://).
Upload a file, choose an available output, click Submit & Convert, then Download.

Supported conversions:
- PDF → JPG, PNG, WebP (multiple pages as ZIP), selectable text → TXT.
- PNG, JPG/JPEG, WebP, BMP → PDF, JPG, PNG, WebP.
- Images → editable XLSX, CSV, TSV, TXT, JSON using OCR.
- XLSX/XLS, CSV, TSV, TXT, row-array/object-array JSON → XLSX, CSV, TSV, TXT, JSON.

Not every format can be converted to every other format. Word documents, videos,
archives and arbitrary binary formats are not currently supported. Scanned PDF
text extraction requires first converting pages to images and then image OCR.
OCR groups words into rows and splits cells at wide gaps; complex tables, merged
cells and poor scans will need corrections. Always check extracted numbers.
Non-Excel spreadsheet exports use the first worksheet. Formatting/macros are not
guaranteed to survive conversion. Maximum upload 25 MB, PDF 50 pages, image 24 MP.

Files are processed locally in the browser, without Firebase upload. Versioned
PDF.js, PDF-lib, SheetJS, JSZip and Tesseract libraries and OCR language data load
from their CDNs. Initial conversion therefore needs internet access.

Verification: `node tests/converter.cjs` uses headless Chrome and tests genuine
JPG signatures, multi-page ZIP entries, PDF text, CSV-to-XLSX and image OCR-to-XLSX
with real cell values, plus unsupported-input blocking.
