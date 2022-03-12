import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditor from "react-froala-wysiwyg";

export default function froalaEditor(props) {
  const froalaEditor = {
    autoSave: true,
    charCounterCount: true,
    fontFamilySelection: true,
    fontSizeSelection: true,
    placeholderText: "write your new notes for students",

    toolbarButtons: {
      moreText: {
        buttons: ["bold", "italic", "underline"],
        buttonsVisible: 3,
      },

      moreMisc: {
        buttons: ["undo", "redo"],
        align: "right",
        buttonsVisible: 2,
      },
    },
  };

  const handleModelChange = (e) => {
    // console.log("froala: ", e);
    props.setData(e);
  };

  return (
    <FroalaEditor
      tag="textarea"
      config={froalaEditor}
      onModelChange={handleModelChange}
    />
  );
}

froalaEditor;
