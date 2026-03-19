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
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 z-[100]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-[101] w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl border border-gray-100 m-4">
        {children}
      </div>
    </div>
  );
}
