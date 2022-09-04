import { useCallback } from "react";

import * as htmlToImage from "html-to-image";
import Button from "../button/Button";

const DowloadScreen = ({ screenRef }) => {

   const downloadScreenshot = useCallback(() => {
      if (screenRef.current === null) {
         return;
      }
      htmlToImage
         .toJpeg(screenRef.current, { quality: 1})
         .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `Пример.jpeg`;
            link.href = dataUrl;
            link.click();
         })
         .catch((err) => {
            console.log(err);
         });
   }, [screenRef]);

   return (
      <Button light className="main__dowload" onClick={downloadScreenshot}>
         {"скачать решение"}
      </Button>
   );
};

export default DowloadScreen;


// const createFileName = (extension = "", ...names) => {
//    if (!extension) {
//      return "";
//    }

//    return `${names.join("")}.${extension}`;
// };

// const takeScreenShot = async (node) => {
//   const dataURI = await htmlToImage.toJpeg(node);
//   return dataURI;
// };

// const download = (image, { name = "Пример", extension = "jpg" } = {}) => {
//   const a = document.createElement("a");
//   a.href = image;
//   a.download = createFileName(extension, name);
//   console.log(createFileName(extension, name));
//   a.click();
// };

// const downloadScreenshot = () => takeScreenShot(screenRef.current).then(download);
