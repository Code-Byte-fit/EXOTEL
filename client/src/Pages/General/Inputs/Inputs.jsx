import {React,useState} from 'react'
import style from "./Style.module.css"

export default function Input({
  field, 
  form: { touched, errors },
  ...props
}) {
  return (
    <>
        <div className={style.InputContainer}>
          <div className={style.LabelContainer}>
            <label for={props.id}>{props.label}</label>
            {props.isRequired && <span>*</span>}
          </div>
            {props.type!=="select" &&  props.type!=="textarea" && <input {...field} {...props} type={props.type} id={props.id} className={`${style.Input}`} style={{width:props.width}}/>}
            {props.type==="select" && 
              <select {...field} {...props} className={style.Input}>
                  {props.options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                              {option.key}
                            </option>
                            );})}
              </select>
            }
            {props.type==="textarea" && 
              <textarea {...field} {...props} className={style.Input} rows={props.rows} cols={props.cols} />
            }
        </div>
    </>
  )
}

export function FileInput({ field, form: { touched, errors }, ...props }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <>
    <div className={style.mainCont}>
      <div className={style.fileInputContainer}>
          <label htmlFor={props.id} className={style.fileInputLabel}>
            <img src={props.img} />
            {props.label}
          </label>
          <input
            {...field}
            {...props}
            type="file"
            id={props.id}
            className={style.fileInput}
            onChange={handleFileSelect}
          />
          </div>
          {selectedFiles.length > 0 && (
            <div className={style.selectedFilesContainer}>
              <span className={style.selectedFilesLabel}>Selected Files:</span>
              {selectedFiles.map((file, index) => (
                <span key={index} className={style.selectedFile}>
                  {file.name}
                </span>
              ))}
            </div>
          )}
    </div>
      
      
    </>
  );
}


