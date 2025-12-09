import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { images } from "../assets/images";
import Menue from "./Menue";

interface FileData {
  file: File;
  preview: string;
}

export default function Landingpage() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Upload files
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
      "text/*": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
    },
    noClick: true,
    noKeyboard: true,
  });

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Send message or files
  const sendRequest = async () => {
    if (!text.trim() && files.length === 0) return;

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { role: "user", message: text, files },
    ]);

    setLoading(true);

    try {
      const base64Files = await Promise.all(
        files.map(async (f) => ({
          name: f.file.name,
          type: f.file.type,
          data: await fileToBase64(f.file),
        }))
      );

      const res = await fetch("http://localhost:3000/Auth/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text, files: base64Files }),
      });

      const data = await res.json();

      // Add AI response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", message: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", message: "⚠ Something went wrong." },
      ]);
    }

    setText("");
    setFiles([]);
    setLoading(false);
  };

  // Enter key to send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendRequest();
    }
  };

  return (
    <div className="flex justify-center flex-row w-full">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          collapsed ? "w-[70px]" : "w-[20%]"
        }`}
      >
        <Menue collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Main Chat Area */}
      <div
        {...getRootProps()}
        className={`transition-all duration-300 ${
          collapsed ? "w-[calc(100%-70px)]" : "w-[80%]"
        } relative h-screen bg-white flex flex-col`}
      >
        <input {...getInputProps()} />

        {/* Header */}
        <div className="px-6 py-3 border-b flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-800">AI TWIN</div>
          <img
            className="w-10 h-10 rounded-full border"
            src=""
            alt="User"
          />
        </div>

        {/* Chat Messages Section */}
        <div
          className="flex-1 overflow-y-auto px-6 py-4"
          style={{ scrollbarWidth: "thin" }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.message}

                {/* File preview bubble */}
                {msg.files &&
                  msg.files.map((f: FileData, index: number) => (
                    <p key={index} className="mt-2 text-xs opacity-70">
                      📄 {f.file.name}
                    </p>
                  ))}
              </div>
            </div>
          ))}

          <div ref={messageEndRef} />
        </div>

        {/* Bottom Input Box */}
        <div className="px-4 py-4 border-t bg-white">
          <div className="border border-gray-300 rounded-2xl p-2 flex items-end w-full">
            <textarea
              className="w-full px-3 py-2 rounded-lg focus:outline-none resize-none"
              placeholder="Write something or upload files..."
              value={text}
              rows={1}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={open} className="p-2">
              <img src={images.upload} className="w-6" alt="upload" />
            </button>

            <button disabled={loading} onClick={sendRequest} className="p-2">
              <img src={images.upwordarrow} className="w-7" alt="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
