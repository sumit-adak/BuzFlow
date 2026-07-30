import { useState, useContext, useRef, useEffect } from "react";
import {
  HiOutlineSparkles,
  HiOutlinePaperAirplane,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineCircleStack,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { StoreContext } from "../../Context/StoreContext";
import Button from "../../components/Button/Button";

const PROMPT_SUGGESTIONS = [
  { icon: HiOutlineChartBar, text: "Calculate top grossing product category this month" },
  { icon: HiOutlineUserGroup, text: "Which customer accounts have overdue payments?" },
  { icon: HiOutlineCircleStack, text: "Check stock safety threshold for grocery items" },
  { icon: HiOutlineLightBulb, text: "How can I improve checkout speed during peak hours?" },
];

export default function AI() {
  const { aiChats, sendAiMessage } = useContext(StoreContext);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiChats, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    setInputText("");
    setIsTyping(true);
    sendAiMessage(query);

    setTimeout(() => {
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-h-[850px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden font-sans transition-colors">
      {/* AI Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            <HiOutlineSparkles className="text-xl" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">BizFlow AI Copilot</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full">
                v3.2 Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Powered by real-time store telemetry & merchant intelligence (₹ INR)
            </p>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {aiChats.map((msg, idx) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                isUser ? "flex-row-reverse" : "flex-row"
              } animate-fade-in`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? "bg-slate-900 dark:bg-slate-700 text-white"
                    : "bg-blue-600 text-white shadow-2xs"
                }`}
              >
                {isUser ? "You" : <HiOutlineSparkles />}
              </div>

              <div className={`max-w-xl space-y-1 ${isUser ? "text-right" : "text-left"}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-blue-600 text-white rounded-tr-none shadow-md"
                      : "bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/60 dark:border-slate-700"
                  }`}
                >
                  {msg.text.split("\n").map((line, lIdx) => (
                    <p key={lIdx} className="my-1">
                      {line}
                    </p>
                  ))}
                </div>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 block px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
              <HiOutlineSparkles />
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Analyzing store telemetry...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      {aiChats.length < 4 && (
        <div className="px-6 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Suggested Merchant Prompts
          </p>
          <div className="flex flex-wrap gap-2">
            {PROMPT_SUGGESTIONS.map((sug, sIdx) => {
              const Icon = sug.icon;
              return (
                <button
                  key={sIdx}
                  onClick={() => handleSend(sug.text)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-2xs cursor-pointer"
                >
                  <Icon className="text-blue-500" />
                  <span>{sug.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask BizFlow AI about revenue trends, pending dues, stock reorders..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={HiOutlinePaperAirplane}
            className="py-3 px-5"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
