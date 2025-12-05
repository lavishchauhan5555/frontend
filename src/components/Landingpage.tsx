import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { images } from "../assets/images";
interface FileData {
  file: File;
  preview: string;
}

export default function Landingpage() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...mappedFiles]);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    noClick: true,
    noKeyboard: true,
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const sendRequest = async () => {
    if (!text.trim() && files.length === 0) return;

    setLoading(true);

    const base64Files = await Promise.all(
      files.map(async (f) => ({
        name: f.file.name,
        type: f.file.type,
        data: await fileToBase64(f.file),
      }))
    );

    const payload = { text, files: base64Files };

    const res = await fetch("http://localhost:5000/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setResponse(data.reply || "");

    setText("");
    setFiles([]);
    setLoading(false);
  };

  // ➤ Send on Enter Key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendRequest();
    }
  };

  return (
    <div className=" relative min-h-screen bg-[#ffffff] flex flex-col items-center " {...getRootProps()}>
      <input {...getInputProps()} />

      <div className="mt-3 flex justify-between  items-center w-[94vw]">
        <div className="text-[20px] font-medium text-[#444746]">AI TWIN</div>
        <div>
          <img className="w-10 h-10  rounded-full border-[0.5px] border-gray-300" src="" alt="" />
        </div>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="w-full max-w-3xl mb-4 p-4 bg-white rounded-xl shadow">
          <h2 className="font-semibold mb-2">Files</h2>
          <div className="flex gap-4 flex-wrap">
            {files.map((f, i) => (
              <div key={i} className="border p-2 rounded-lg">
                {f.file.type.includes("pdf") ? (
                  <p className="text-sm">📄 {f.file.name}</p>
                ) : (
                  <img src={f.preview} className="w-24 h-24 object-cover rounded" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className=" absolute w-full max-w-[680px]   flex flex-col  bottom-[300px]">
        <div className="w-full border-[1.5px]  border-gray-400/50  rounded-2xl p-1  shadow-[0_6px_20px_rgba(0,0,0,0.12)]
 min-h-[100px]">
          <textarea
            className="w-full px-4 pt-2 focus:outline-none focus:ring-0"
            placeholder="Write something or upload files..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center justify-between  px-2">
            {/* Upload Button */}
            <div>
              <button
                onClick={open}
                className="p-2 cursor-pointer"
                title="Upload file"
              >
                <img src={images.upload} alt="" />
              </button>

              {/* Audio/Mic Button */}
              <button className="p-2   cursor-pointer" title="Voice Input">
               <img src={images.mic} alt="" />
              </button>
            </div>
            <div>
              {/* Send Button (Up Arrow SVG) */}
              <button
                disabled={loading}
                onClick={sendRequest}
                className="p-3  rounded-full cursor-pointer "
                title="Send"
              >
                <img className="w-8 h-8" src={images.upwordarrow} alt="" />
              </button>
            </div>



          </div>
        </div>


        {/* Bottom Bar: Upload, Mic, Send */}

      </div>

      {/* Response */}
      {response && (
        <div className="w-full max-w-3xl mt-6 p-4 bg-white rounded-xl shadow">
          <h2 className="font-semibold mb-2">AI Response</h2>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}
