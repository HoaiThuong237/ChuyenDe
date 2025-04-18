
// import React, { useState } from "react";
// import { ArrowLeft } from "lucide-react";

// function ChatAI() {
//   const [messages, setMessages] = useState([
//     {
//       text: "Xin chào 🧑‍🍳 <strong>Mình là trợ lý nấu ăn thông minh</strong>. Mình có thể giúp gì cho bạn?",
//       isUser: false,
//     },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const formatMessage = (text) => {
//     return text
//       .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
//       .replace(/\n/g, "<br>");
//   };

//   const callGeminiAPI = async (userMessage) => {
//     const prompt = `Bạn là một trợ lý nấu ăn thông minh. Người dùng sẽ nhập các nguyên liệu họ có. Hãy đề xuất 2–3 món ăn đơn giản có thể chế biến từ đó. Với mỗi món, viết kèm hướng dẫn chi tiết từng bước nấu. Nếu không thể làm món nào, hãy nói rõ. Chỉ trả lời các câu hỏi liên quan đến nấu ăn. Câu hỏi: ${userMessage}`;

//     try {
//       const response = await fetch(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCIdGVPbJPeq375vYnJGjSuDWyqDM9lFjM",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [{ text: prompt }],
//                 role: "user",
//               },
//             ],
//           }),
//         }
//       );

//       const data = await response.json();
//       const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
//       return text || "Không có phản hồi từ AI.";
//     } catch (error) {
//       console.error("Lỗi gọi API Gemini:", error);
//       return "Xin lỗi, có lỗi xảy ra khi gọi API.";
//     }
//   };

//   const checkLocalRecipes = async (userMessage) => {
//     try {
//       const response = await fetch("/api/check-recipes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ingredients: userMessage }),
//       });
//       const data = await response.json();
//       return data?.recipe || null;
//     } catch (err) {
//       console.error("Lỗi kiểm tra công thức địa phương:", err);
//       return null;
//     }
//   };

//   const handleSend = async () => {
//     if (!inputText.trim()) return;

//     const userMsg = inputText.trim();
//     const newMessages = [...messages, { text: userMsg, isUser: true }];
//     setMessages(newMessages);
//     setInputText("");
//     setLoading(true);

//     let aiMessage = "";

//     const localRecipe = await checkLocalRecipes(userMsg);
//     if (localRecipe) {
//       aiMessage = `Tôi đã tìm thấy công thức phù hợp:\n${localRecipe}`;
//     } else {
//       aiMessage = await callGeminiAPI(userMsg);
//     }

//     setMessages([
//       ...newMessages,
//       { text: formatMessage(aiMessage), isUser: false },
//     ]);
//     setLoading(false);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//         background: "#fef9f4",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           background: "#ffa500",
//           padding: "10px 20px",
//           color: "white",
//           fontWeight: "bold",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <button
//           onClick={() => window.history.back()}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "white",
//             fontSize: "20px",
//             marginRight: "10px",
//             cursor: "pointer",
//           }}
//         >
//           ⬅
//         </button>
//         Trợ lý nấu ăn AI
//       </div>
  
//       {/* Chat content */}
//       <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               textAlign: msg.isUser ? "right" : "left",
//               margin: "10px 0",
//             }}
//           >
//             <div
//               style={{
//                 display: "inline-block",
//                 background: msg.isUser ? "#ffe0b2" : "#f0f0f0",
//                 padding: "12px 16px",
//                 borderRadius: "16px",
//                 maxWidth: "80%",
//                 fontSize: "16px",
//                 lineHeight: "1.5",
//               }}
//               dangerouslySetInnerHTML={{ __html: msg.text }}
//             />
//           </div>
//         ))}
//       </div>
  
//       {/* Chat input */}
//       <div
//         style={{
//           display: "flex",
//           padding: "12px 16px",
//           background: "white",
//           borderTop: "1px solid #ccc",
//         }}
//       >
//         <input
//           type="text"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Nhập nguyên liệu hoặc câu hỏi..."
//           style={{
//             flex: 1,
//             padding: "12px",
//             fontSize: "16px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <button
//           onClick={handleSend}
//           style={{
//             marginLeft: "10px",
//             padding: "12px 24px",
//             background: "#ffa500",
//             color: "white",
//             fontWeight: "bold",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//           }}
//         >
//           {loading ? "..." : "Gửi"}
//         </button>
//       </div>
//     </div>
//   );
  
// }

// export default ChatAI;


import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Paper,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ChatAI() {
  const [messages, setMessages] = useState([
    {
      text: "Xin chào 🧑‍🍳 <strong>Mình là trợ lý nấu ăn thông minh</strong>. Mình có thể giúp gì cho bạn?",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  };

  const callGeminiAPI = async (userMessage) => {
    const prompt = `Bạn là một trợ lý nấu ăn thông minh. Người dùng sẽ nhập các nguyên liệu họ có. Hãy đề xuất 2–3 món ăn đơn giản có thể chế biến từ đó. Với mỗi món, viết kèm hướng dẫn chi tiết từng bước nấu. Nếu không thể làm món nào, hãy nói rõ. Chỉ trả lời các câu hỏi liên quan đến nấu ăn. Câu hỏi: ${userMessage}`;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCIdGVPbJPeq375vYnJGjSuDWyqDM9lFjM",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
                role: "user",
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || "Không có phản hồi từ AI.";
    } catch (error) {
      console.error("Lỗi gọi API Gemini:", error);
      return "Xin lỗi, có lỗi xảy ra khi gọi API.";
    }
  };

  const checkLocalRecipes = async (userMessage) => {
    try {
      const response = await fetch("/api/check-recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: userMessage }),
      });
      const data = await response.json();
      return data?.recipe || null;
    } catch (err) {
      console.error("Lỗi kiểm tra công thức địa phương:", err);
      return null;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const newMessages = [...messages, { text: userMsg, isUser: true }];
    setMessages(newMessages);
    setInputText("");
    setLoading(true);

    let aiMessage = "";

    const localRecipe = await checkLocalRecipes(userMsg);
    if (localRecipe) {
      aiMessage = `Tôi đã tìm thấy công thức phù hợp:\n${localRecipe}`;
    } else {
      aiMessage = await callGeminiAPI(userMsg);
    }

    setMessages([
      ...newMessages,
      { text: formatMessage(aiMessage), isUser: false },
    ]);
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" bgcolor="#fef9f4">
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        bgcolor="#ffa500"
        color="white"
        p={2}
      >
        <IconButton onClick={() => window.history.back()} sx={{ color: "white" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Trợ lý nấu ăn AI
        </Typography>
      </Box>

      {/* Chat messages */}
      <Box flex={1} overflow="auto" p={2}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={msg.isUser ? "flex-end" : "flex-start"}
            mb={2}
          >
            {!msg.isUser && (
              <Avatar
                sx={{ bgcolor: "#ffa500", width: 32, height: 32, mr: 1 }}
              >
                AI
              </Avatar>
            )}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                bgcolor: msg.isUser ? "#ffe0b2" : "#f0f0f0",
                maxWidth: "75%",
              }}
            >
              <div
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </Paper>
            {msg.isUser && (
              <Avatar sx={{ bgcolor: "#ffa500", width: 32, height: 32, ml: 1 }}>
                Bạn
              </Avatar>
            )}
          </Box>
        ))}
      </Box>

      {/* Chat input */}
      <Box
        display="flex"
        alignItems="center"
        p={2}
        borderTop="1px solid #ccc"
        bgcolor="white"
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Nhập nguyên liệu hoặc câu hỏi..."
          value={inputText}
          multiline
          maxRows={6}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); 
              handleSend();
            }
          }}
          sx={{
            bgcolor: "#fff8f0",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <Button
          onClick={handleSend}
          variant="contained"
          sx={{
            ml: 2,
            bgcolor: "#ffa500",
            "&:hover": {
              bgcolor: "#e59400",
            },
          }}
        >
          {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Gửi"}
        </Button>
      </Box>
    </Box>
  );
}

export default ChatAI;
