import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  forwardRef,
} from "react";

export interface FileWithURL extends File {
  url?: string;
}

interface Props {
  image?: FileWithURL | null;
  setImage: Dispatch<SetStateAction<FileWithURL | null>>;
}

const ImageUpload = forwardRef<HTMLInputElement, Props>(
  ({ image, setImage }, ref) => {
    const [error, setError] = useState<string | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);

    useEffect(() => {
      if (image) {
        // Create URL for the image
        const url = URL.createObjectURL(image);
        setImageURL(url);

        return () => URL.revokeObjectURL(url);
      } else {
        setImageURL(null);
      }
    }, [image]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles && droppedFiles.length > 0) {
        const acceptedFile = droppedFiles[0];
        if (acceptedFile.type === "image/png") {
          const fileWithURL = Object.assign(acceptedFile, {
            url: URL.createObjectURL(acceptedFile),
          });
          setImage(fileWithURL);

          setError(null);
        } else {
          setError("Only PNG images are allowed");
        }
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        if (selectedFile.type === "image/png") {
          const fileWithURL = Object.assign(selectedFile, {
            url: URL.createObjectURL(selectedFile),
          });
          setImage(fileWithURL);

          setError(null);
        } else {
          setError("Only PNG images are allowed");
        }
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const removeFile = () => {
      if (image?.url) URL.revokeObjectURL(image.url);
      setImage(null);

      setError(null);
    };

    return (
      <div className="w-full px-8">
        <div className="text-primary text-gray-600 font-semibold mb-3">
          Upload Image
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="overflow-hidden w-full h-36 border-dotted border-4 border-gray-300  rounded-lg p-5 text-center cursor-pointer relative flex flex-wrap"
        >
          <input
            ref={ref}
            type="file"
            accept="image/png"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <div className="flex justify-center mb-2 w-full">
              {image ? (
                <div className="mt-4 flex items-center">
                  <div className="flex justify-center border-2 items-center rounded-lg relative mb-4 ">
                    {imageURL && (
                      <img
                        src={imageURL}
                        alt="preview"
                        className="w-28 h-28 object-cover rounded-md"
                      />
                    )}
                    <button
                      onClick={removeFile}
                      className="absolute right-2 top-3 bg-red-600 text-white h-5 w-5 rounded-full p-2 flex justify-center items-center"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-600">
                  Drag 'n' drop a PNG image here, or click to select one
                </div>
              )}
            </div>
          </label>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }
);

export default ImageUpload;
