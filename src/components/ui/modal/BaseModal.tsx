"use client";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BaseModal({
  open,
  onClose,
  children,
}: BaseModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-1/3 bg-white rounded-xl p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
}
