import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import formtrans from "../../../translate/forms";
import tabletrans from "../../../translate/tables";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import env from "../../../env";
function GalleryDetails(props) {
  const editorRef = useRef(null);
  const token = props.token;
  const content = props.content;
  const [Product, setProduct] = useState();
  const [FindProduct, setFindProduct] = useState("");
  const StatusList = [
    {
      Title: "فعال",
      Active: true,
    },
    {
      Title: "غیر فعال",
      Active: false,
    },
  ];
  useEffect(() => {
    const body = {
      title: FindProduct,
    };
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(body),
    };
    fetch(env.siteApi + "/panel/product/list-product", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setProduct("");
          setTimeout(() => setProduct(result.filter), 200);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [FindProduct]);

  return (
    <div className="serviceItem">
      <StyleInput
        title={formtrans.title[props.lang]}
        direction={props.direction}
        defaultValue={content ? content.title : ""}
        class={"formInput"}
        action={(e) =>
          props.setSliderChange((prevState) => ({
            ...prevState,
            title: e,
          }))
        }
      />
      <StyleInput
        title={formtrans.gcode[props.lang]}
        direction={props.direction}
        defaultValue={content ? content.gCode : ""}
        class={"formInput"}
        action={(e) =>
          props.setSliderChange((prevState) => ({
            ...prevState,
            gCode: e,
          }))
        }
      />
      <div class="formInput">
        <Autocomplete
          multiple
          options={Product || []}
          getOptionLabel={(item) => item.title || ""}
          style={{ width: "100%" }}
          defaultValue={content ? content.productList : ""}
          onChange={(e, value) =>
            props.setSliderChange((prevState) => ({
              ...prevState,
              productList: value
                ? value.map((item) => ({ sku: item.sku, title: item.title }))
                : "",
            }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={tabletrans.productName[props.lang]}
              variant="outlined"
              onChange={(e) => setFindProduct(e.target.value)}
            />
          )}
        />
      </div>
      <StyleSelect
        title={tabletrans.status[props.lang]}
        direction={props.lang.dir}
        class={"formInput"}
        options={StatusList}
        defaultValue={content && content.active ? "فعال" : "غیرفعال"}
        label={"Title"}
        action={(e) =>
          props.setSliderChange((prevState) => ({
            ...prevState,
            active: e ? e.Active : "",
          }))
        }
      />
      <div className="content">
        <Editor
          apiKey="qosmvwu6wq395cpq7ay8ud8j9d21cf4cdgkxwmpz317vpy2i"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={content ? content.content : ""}
          onEditorChange={(e) =>
            props.setSliderChange((prevState) => ({
              ...prevState,
              content: e,
            }))
          }
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    </div>
  );
}
export default GalleryDetails;
