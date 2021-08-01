import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Storage } from "aws-amplify";
import AppBar from "components/appBar";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { addNote } from "utils/graphql";
import { generateImage } from "utils/apis";
import styles from "./style.module.css";

const INPUT_FOLDER = "input";
const OUTPUT_FOLDER = "output";
const REST_INPUT_FOLDER = "rest";
const BUCKET_URL =
  "https://selene-amplify14031-staging.s3.amazonaws.com/public";

const Genarate = () => {
  const [hasError, setHasError] = useState(false);
  const [fileDropError, setFileDropError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [inputImageUrl, setInputImageUrl] = useState(null);
  const [outputImageUrl, setOutputImageUrl] = useState(null);

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

  const handleSageMaker = async () => {
    try {
      if (!file) {
        setHasError(true);
      } else {
        setIsUploading(true);
        const extention = file.name.split(".").pop();
        const id = uuid();
        const filename = `${id}.${extention}`;
        const path = `${INPUT_FOLDER}/${filename}`;

        const response = await Storage.put(path, file);

        if (response) {
          const inputUrl = `${BUCKET_URL}/${INPUT_FOLDER}/${filename}`;
          const outputUrl = `${BUCKET_URL}/${OUTPUT_FOLDER}/output_${id}.jpeg`;

          const addNoteResponse = await addNote(inputUrl, outputUrl);

          if (addNoteResponse.status === "success") {
            setTimeout(() => {
              toast.success("Image is generated successfully");
              setInputImageUrl(file.preview);
              setOutputImageUrl(outputUrl);
              setIsUploading(false);
            }, 11000);
          } else {
            setIsUploading(false);
            toast.error(addNoteResponse.message);
          }
        } else {
          setIsUploading(false);
          toast.error("Something went wrong, please try latter.");
        }
      }
    } catch (err) {
      setIsUploading(false);
      toast.error(err.message);
    }
  };

  const handleRest = async () => {
    try {
      if (!file) {
        setHasError(true);
      } else {
        setIsUploading(true);
        const extention = file.name.split(".").pop();
        const id = uuid();
        const filename = `${id}.${extention}`;
        const path = `${REST_INPUT_FOLDER}/${filename}`;

        const response = await Storage.put(path, file);
        console.log("response:", response);
        if (response) {
          const generateImageResponse = await generateImage(
            "public/rest/",
            filename
          );

          if (generateImageResponse.status === "success") {
            const inputUrl = `${BUCKET_URL}/${REST_INPUT_FOLDER}/${filename}`;
            const outputUrl = generateImageResponse.data;
            const addNoteResponse = await addNote(inputUrl, outputUrl);
            if (addNoteResponse.status === "success") {
              setTimeout(() => {
                toast.success("Image is generated successfully");
                setInputImageUrl(file.preview);
                setOutputImageUrl(outputUrl);
                setIsUploading(false);
              }, 5000);
            } else {
              setIsUploading(false);
              toast.error(addNoteResponse.message);
            }
          } else {
            setIsUploading(false);
            toast.error("Something went wrong, please try latter.");
          }
        } else {
          setIsUploading(false);
          toast.error("Something went wrong, please try latter.");
        }
      }
    } catch (err) {
      setIsUploading(false);
      toast.error(err.message);
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
              onClick={handleSageMaker}
            >
              Sagemaker
            </button>

            <button
              className="py-2 px-8 bg-appYellow-900 text-white text-base uppercase font-bold w-full mt-4"
              onClick={handleRest}
            >
              REST
            </button>
          </div>

          {inputImageUrl && outputImageUrl && (
            <div className="mt-4 flex">
              <div className="w-1/2 px-3 overflow-hidden">
                <p className="mb-1 text-base text-appGray-700 font-semiBold">
                  Input
                </p>
                <img
                  src={inputImageUrl}
                  alt="input"
                  className="w-full h-auto"
                />
              </div>

              <div className="w-1/2 px-3 overflow-hidden">
                <p className="mb-1 text-base text-appGray-700 font-semiBold">
                  Output
                </p>
                <img
                  src={outputImageUrl}
                  alt="output"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isUploading && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
        >
          <Loader with={50} height={50} color="#000" type="Oval" />
        </div>
      )}
    </>
  );
};

export default Genarate;
