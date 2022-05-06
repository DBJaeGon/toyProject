import React, { useCallback, useMemo, useRef, useState } from "react";
// import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const BlockEmbed = Quill.import("blots/block/embed");

class ImageBlot extends BlockEmbed {
  static create(value) {
    const imgTag = super.create();
    imgTag.setAttribute("src", value.src);
    imgTag.setAttribute("alt", value.alt);
    imgTag.setAttribute("width", "100%");
    return imgTag;
  }

  static value(node) {
    return { src: node.getAttribute("src"), alt: node.getAttribute("alt") };
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";
Quill.register(ImageBlot);

const QuillEditor = ({ onEditorChange, onFilesChange }) => {
  const [content, setContent] = useState("");
  const reactQuillRef = useRef();

  const handleChange = (value) => {
    // console.log(reactQuillRef);
    const quill = reactQuillRef.current.getEditor();
    setContent(value);
    // onEditorChange(value);
    const unprivilegedEditor = reactQuillRef.current.makeUnprivilegedEditor(quill);
    console.log("HTML", unprivilegedEditor.getContents());
  };

  const handleImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        onFilesChange(file);
        // const formData = new FormData();
        // formData.append("boardFile", file);
        // const { data } = await axios.post("/api/boards/upload/boardFiles", formData);
        // console.log(data);
        const imgSrc = await getBase64(file);
        // console.log(imgSrc);
        const quill = reactQuillRef.current.getEditor();
        quill.focus();
        let range = quill.getSelection();
        let position = range ? range.index : 0;
        quill.insertEmbed(position, "image", { src: imgSrc, alt: file.name });
        // quill.insertEmbed(position, "image", { src: data.filePath });
        quill.setSelection(position + 1);
      }
    };
  }, [onFilesChange]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: handleImage,
        },
      },
    }),
    [handleImage]
  );

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "formula",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      modules={modules}
      formats={formats}
      onChange={handleChange}
      value={content}
      placeholder={"compose an epic ... "}
    />
  );
};

export default QuillEditor;
