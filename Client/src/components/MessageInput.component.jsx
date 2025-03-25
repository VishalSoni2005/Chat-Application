import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);

    setBackendImage(formData);

    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImagePreview(reader.result); // set the preview
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: backendImage
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="w-full p-4">
      {imagePreview && ( // Virtual DOM diffing algorithm activated to render this image
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 rounded-lg border border-zinc-700 object-cover"
            />
            <button
              onClick={removeImage}
              className="bg-base-300 absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full"
              type="button">
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* this form have two part one is div and other is button */}
        <div className="flex flex-1 gap-2">
          {/* Message Input area */}
          <input
            type="text"
            className="input input-bordered input-sm sm:input-md w-full rounded-lg"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* Image Input area */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button //This button allows the user to open the file picker when clicked.
            type="button"
            className={`btn btn-circle hidden sm:flex ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}>
            {/* The onClick triger the input file picker form above imput area */}
            <Image size={20} />
          </button>
        </div>
        {/* Main send btn */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}>
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
