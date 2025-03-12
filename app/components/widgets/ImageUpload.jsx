import { useState } from "react";
import Image from "next/image";
import { Loader2, Trash } from "lucide-react";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import { Label } from "../ui/Label";
import { uploadImage as uploadImageCloud } from "@/lib/upload";

const uploadImage = async (file, folder) => {
  const { url } = await uploadImageCloud(file, folder);
  return { url };
};

const ImageUpload = ({
  onUpload,
  label,
  required,
  compressOption,
  htmlFor,
  className,
  folder = "default",
  ...props
}) => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 500,
        useWebWorker: true,
        ...compressOption,
      };

      const compressedFile = await imageCompression(file, options);
      const { url } = await uploadImage(compressedFile, folder);

      setImage(url);
      onUpload(url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed!");
    }
    setIsUploading(false);
  };

  const handleRemoveImage = () => {
    setImage("");
    onUpload("");
  };

  if (!htmlFor) {
    return "ইমেজ ইনপুট এর একটি id প্রয়োজন htmlFor={`newId`}";
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        id={htmlFor}
        onChange={handleImageUpload}
      />
      {label && <Label required={required || false}>{label}</Label>}
      <label
        {...props}
        htmlFor={htmlFor}
        className={`relative flex flex-col items-center cursor-pointer border-2 border-dashed border-gray-300 p-3 rounded-lg w-40 ${
          className || ""
        }`}
      >
        {isUploading ? (
          <Loader2 size={50} strokeWidth={1} className="animate-spin my-5" />
        ) : (
          <Image
            width={100}
            height={100}
            src={image || "/img/default.png"}
            alt="Uploaded Preview"
            className="object-cover rounded-lg"
          />
        )}
      </label>
      {image && (
        <button
          onClick={handleRemoveImage}
          className="mt-2 flex items-center gap-1 text-red-500"
        >
          <Trash size={18} />
          Remove
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
