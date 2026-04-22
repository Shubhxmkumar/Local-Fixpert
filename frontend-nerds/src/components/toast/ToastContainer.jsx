import React from "react";
import { CheckCircle, AlertCircle, Bell, X } from "lucide-react";

const ToastContainer = ({ toasts, remove }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium shadow-xl min-w-64 max-w-sm animate-slide-up border
            ${
              t.type === "success"
                ? "bg-green-50 border-green-300 text-green-800"
                : t.type === "error"
                ? "bg-red-50 border-red-300 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
        >
          {t.type === "success" ? (
            <CheckCircle size={16} />
          ) : t.type === "error" ? (
            <AlertCircle size={16} />
          ) : (
            <Bell size={16} />
          )}

          <span className="flex-1">{t.message}</span>

          <button onClick={() => remove(t.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;