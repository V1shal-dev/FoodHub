import React, { useState, useEffect, useRef } from 'react';
import { X, ScanLine, CheckCircle } from 'lucide-react';

interface QRCodeScannerProps {
  onClose: () => void;
  onScan: (data: { table: string, restaurant: string }) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onClose, onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let scanTimer: ReturnType<typeof setTimeout>;
    let successTimer: ReturnType<typeof setTimeout>;

    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            const playPromise = videoRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.warn("Video play was interrupted. This is expected if component unmounts or camera restarts.", err);
                });
            }

            // Simulate scanning after a delay
            scanTimer = setTimeout(() => {
              setScanSuccess(true);
              successTimer = setTimeout(() => {
                onScan({ table: '12A', restaurant: 'Golden Fork Restaurant' });
              }, 1000);
            }, 3000);
          }
        } else {
            setError("Your browser does not support camera access.");
        }
      } catch (err: any) {
        console.error("Error accessing camera: ", err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError' || err.message?.includes('Permission dismissed')) {
             setError("Camera permission denied. Please enable it in your browser settings.");
        } else {
            setError("Could not access camera. Is it being used by another app?");
        }
      }
    };

    startCamera();

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(successTimer);
      // Stop all tracks on the stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      // Clean up video element to prevent "The play() request was interrupted" error
      if (videoRef.current) {
          videoRef.current.pause();
          if (videoRef.current.srcObject) {
              videoRef.current.srcObject = null;
          }
      }
    };
  }, [onScan]);


  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={onClose} className="bg-white/20 text-white p-3 rounded-full active:scale-90 transition-transform">
          <X size={24} />
        </button>
      </div>
      
      <h2 className="text-white text-2xl font-bold mb-4 text-center px-4">Scan QR code on your table</h2>
      <p className="text-gray-300 mb-8">Align the QR code within the frame</p>

      <div className="relative w-72 h-72 rounded-3xl overflow-hidden bg-gray-800">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
        
        {/* Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
        
        {!scanSuccess && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ScanLine className="text-white w-full h-1 animate-scan" />
          </div>
        )}
        
        {scanSuccess && (
          <div className="absolute inset-0 bg-green-500/80 flex flex-col items-center justify-center animate-fade-in">
            <CheckCircle size={80} className="text-white" />
            <p className="text-white text-xl font-bold mt-4">Scan Successful!</p>
          </div>
        )}

        {error && (
             <div className="absolute inset-0 bg-red-900/80 flex flex-col items-center justify-center animate-fade-in p-4 text-center">
                <p className="text-white font-bold">{error}</p>
             </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-144px); }
          100% { transform: translateY(144px); }
        }
        .animate-scan {
          animation: scan 1.5s ease-in-out infinite alternate;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};