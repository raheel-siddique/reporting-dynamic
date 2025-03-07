import { PDFDocument } from "pdf-lib";
import html2canvas from "html2canvas";

export const exportToPDF = async () => {
  const template = document.getElementById("hidden-template-container");

  if (template) {
    setTimeout(async () => {
      try {
        await new Promise((resolve) => requestAnimationFrame(resolve));
  
        const canvas = await html2canvas(template, {
          scale: 2,
          useCORS: true,
          logging: true,
        });
  
        const imgData = canvas.toDataURL("image/png", 1.0);
  
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size in points (595x842)
  
        // Embed the image
        const pngImage = await pdfDoc.embedPng(imgData);
  
        // Calculate image dimensions to fit the page
        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();
        const margin = 50; // 50 points margin on each side
        const maxWidth = pageWidth - 2 * margin; // Subtract margins
        const maxHeight = pageHeight - 2 * margin; // Subtract margins
  
        // Scale the image to fit within the page
        const scale = Math.min(maxWidth / pngImage.width, maxHeight / pngImage.height);
        const width = pngImage.width * scale;
        const height = pngImage.height * scale;
  
        // Draw the image on the page
        page.drawImage(pngImage, {
          x: margin,
          y: pageHeight - height - margin, // Adjust Y position to account for PDF coordinate system
          width,
          height,
        });
  
        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Expense_InvoiceNo_date.pdf";
        link.click();
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    });
  } else {
    console.error("Template container not found");
  }
};
