import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Camera, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

export default function CreateAttendancePage() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    
    const [image, setImage] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [attendanceType, setAttendanceType] = useState('Clock In');

    // Update jam real-time
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "user" }, 
                audio: false 
            });
            videoRef.current.srcObject = stream;
            setIsStreaming(true);
        } catch (err) {
            console.error("Gagal mengakses kamera:", err);
            alert("Harap izinkan akses kamera untuk melakukan absensi.");
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setImage(imageData);
        
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        setIsStreaming(false);
    };

    const handleSubmit = () => {
        alert(`Absensi ${attendanceType} berhasil dikirim!`);
    };

    return (
        <PortalLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* JAM & STATUS */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Check-in Kehadiran</h1>
                        <p className="text-lg font-mono text-indigo-600 font-bold">{currentTime.toLocaleTimeString()}</p>
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        {['Clock In', 'Clock Out'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setAttendanceType(type)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${attendanceType === type ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AREA KAMERA */}
                <div className="bg-black rounded-3xl overflow-hidden aspect-video relative shadow-lg">
                    {!image ? (
                        <>
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            {!isStreaming && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button onClick={startCamera} className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-indigo-700 transition">
                                        <Camera size={20} /> Aktifkan Kamera
                                    </button>
                                </div>
                            )}
                            {isStreaming && (
                                <button onClick={capturePhoto} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition shadow-xl">
                                    <Camera size={20} /> Ambil Foto
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="relative">
                            <img src={image} alt="Absensi" className="w-full h-full object-cover" />
                            <button onClick={() => { setImage(null); startCamera(); }} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-red-600">
                                <RefreshCw size={16} /> Ulangi
                            </button>
                        </div>
                    )}
                </div>

                <canvas ref={canvasRef} className="hidden" />

                {/* INFO */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200">
                    <p className="text-gray-600 mb-4">Pastikan wajah Anda terlihat jelas dalam bingkai.</p>
                    <button 
                        disabled={!image}
                        onClick={handleSubmit}
                        className={`w-full h-12 rounded-2xl font-semibold flex items-center justify-center gap-2 transition ${image ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                        <CheckCircle2 size={20} /> Kirim Absensi
                    </button>
                </div>
            </div>
        </PortalLayout>
    );
}