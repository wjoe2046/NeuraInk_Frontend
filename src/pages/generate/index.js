import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AppBar from "components/appBar";
import clsx from "clsx";
import styles from "./style.module.css";

const Genarate = () => {
  const [hasError, setHasError] = useState(false);
  const [fileDropError, setFileDropError] = useState(false);

  const [file, setFile] = useState(null);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (file) URL.revokeObjectURL(file.preview);
    },
    [file]
  );

  const handleDrop = (acceptedFiles) => {
    setHasError(false);

    if (acceptedFiles?.length <= 0) {
      setFileDropError(true);
    } else {
      setFileDropError(false);
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setHasError(true);
      return;
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: "image/*",
    multiple: true,
    maxFiles: 1,
    onDrop: handleDrop,
  });

  return (
    <>
      <AppBar />
      <div className={styles.root}>
        <div className="max-w-md mx-auto">
          <div>
            <div
              {...getRootProps({
                className: clsx(
                  "bg-white border-2 border-dashed flex justify-center items-center py-16 rounded-md",
                  {
                    "border-appGray-600": !isDragActive,
                    "border-green-500": isDragAccept,
                    "border-red-500": isDragReject,
                    "text-appDark-700": !isDragActive,
                    "text-green-500": isDragAccept,
                    "text-red-500": isDragReject,
                  }
                ),
              })}
            >
              <input {...getInputProps()} />
              <p>
                Drop file here / <button>Open picker</button>
              </p>
            </div>

            {hasError && (
              <p className="text-base text-red-500 mt-2">* Select file first</p>
            )}

            {fileDropError && (
              <p className="text-base text-red-500 mt-2">
                Only images are accepted
              </p>
            )}

            {file && (
              <div
                className="inline-flex rounded-md border border-appDark-500 mt-2 mr-2 mb-2 h-28 w-28 p-1 box-border"
                key={file.name}
              >
                <div className="flex min-w-0 overflow-x-hidden">
                  <img
                    src={file.preview}
                    className="block w-auto h-full"
                    alt="preview"
                  />
                </div>
              </div>
            )}

            <button
              className="py-2 px-8 bg-appYellow-900 text-white text-base uppercase font-bold w-full mt-4"
              onClick={handleSubmit}
            >
              generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Genarate;
