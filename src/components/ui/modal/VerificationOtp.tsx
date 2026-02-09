import React, { useState, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent, FormEvent } from 'react';
import { Icon } from '@iconify/react';

const OtpModal: React.FC<{ isOpen: boolean; onClose: () => void; handleSubmit: (event: FormEvent<HTMLFormElement>, Otp: string) => void }> = ({ isOpen, onClose, handleSubmit }) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    if (!isOpen) return null;

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent) => {
        const data = e.clipboardData.getData("text").trim().slice(0, 6).split("");
        if (data.length > 0) {
            const newOtp = [...otp];
            data.forEach((char, i) => { if (newOtp[i] !== undefined) newOtp[i] = char; });
            setOtp(newOtp);
            inputRefs.current[Math.min(data.length, 5)]?.focus();
        }
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl mx-4">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <Icon icon="heroicons:x-mark-20-solid" className="text-2xl" />
                </button>

                <div className="mb-6 flex justify-center">
                    <Icon
                        icon="solar:key-bold-duotone"
                        className="text-7xl text-[#25E5BD]"
                    />
                </div>

                <h2 className="mb-2 text-2xl font-semibold text-gray-800">Verifikasi Kode OTP</h2>
                <p className="mb-8 text-sm text-gray-400">kode otp telah dikirim ke email kamu!</p>
                <form onSubmit={(e) => handleSubmit(e, otp.join().replaceAll(',', ""))}>

                    <div className="mb-8 flex justify-between gap-2" onPaste={handlePaste}>
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                className="h-14 w-full rounded-xl border border-gray-300 text-center text-xl font-bold focus:border-[#25E5BD] focus:outline-none focus:ring-2 focus:ring-[#25E5BD]/20 transition-all"
                                value={data}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>

                    <button className="w-full rounded-xl bg-gradient-to-r from-[#12D8BB] to-[#63F3E1] py-4 font-bold text-white shadow-lg shadow-cyan-200 transition-opacity hover:opacity-90">
                        Verifikasi Kode
                    </button>

                </form>

                <button className="mt-6 flex items-center justify-center gap-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    Kirim ulang Kode <Icon icon="heroicons:arrow-long-right-20-solid" />
                </button>
            </div>
        </div>
    );
};

export default OtpModal;