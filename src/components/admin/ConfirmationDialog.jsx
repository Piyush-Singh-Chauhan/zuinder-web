"use client";

export default function ConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Yes",
  cancelText = "No",
  type = "danger" // 'danger', 'warning', 'info'
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 bg-opacity-30 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg 
              className="h-6 w-6 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">{title}</h3>
          <div className="mt-2 px-4 py-3">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button
              className="px-4 py-2 bg-[#004A70] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#F15A29] focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={onClose}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}