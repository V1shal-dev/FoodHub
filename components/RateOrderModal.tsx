
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Star, Camera, ExternalLink, CheckCircle, Video, Power, Circle } from 'lucide-react';
import type { Order } from '../types';

interface RateOrderModalProps {
  order: Order;
  onClose: () => void;
  onSubmit: (feedback: { rating: number; comment: string; photo: string | null }) => void;
}

export const RateOrderModal: React.FC<RateOrderModalProps> = ({ order, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stopCamera(); // Stop any existing stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        setCameraError("Your browser does not support camera access.");
        setShowCamera(false);
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError("Camera permission denied. Please allow camera access in your browser settings.");
      } else {
          setCameraError("Could not access camera. It might be in use by another app.");
      }
      setShowCamera(false);
    }
  }, [stopCamera]);

  useEffect(() => {
    if (showCamera) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [showCamera, startCamera, stopCamera]);
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        setShowCamera(false);
      }
    }
  };
  
  const handleSubmit = () => {
      onSubmit({ rating, comment, photo: capturedImage });
  };

  const CameraView = () => (
    <div className="absolute inset-0 bg-black z-20 flex flex-col items-center justify-center">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
        <button onClick={() => setShowCamera(false)} className="absolute top-4 right-4 bg-white/20 text-white p-3 rounded-full"><Power size={24} /></button>
        <div className="absolute bottom-8 flex items-center justify-center">
            <button onClick={handleCapture} className="w-20 h-20 rounded-full bg-white/30 border-4 border-white flex items-center justify-center">
                <Circle size={60} className="text-white fill-white" />
            </button>
        </div>
        <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-6 animate-fade-in">
      <style>{`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative overflow-hidden">
        {showCamera && <CameraView />}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-black text-gray-800">Rate Your Order</h2>
          <button onClick={onClose} className="text-gray-400"><X size={24} /></button>
        </div>
        <p className="text-gray-600 mb-6">How was your experience with order #{order.orderNumber}?</p>
        
        {cameraError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">
            <strong className="font-bold">Camera Error: </strong>
            <span className="block sm:inline">{cameraError}</span>
            <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setCameraError(null)}>
                <X size={18} />
            </button>
        </div>}

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map(star => (
            <button key={star} onClick={() => setRating(star)}>
              <Star size={40} className={`transition-all ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>
        
        <textarea
          placeholder="Tell us more about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 resize-none mb-4 bg-white text-gray-800"
          rows={3}
        />

        <div className="flex gap-2 mb-6">
            <button 
                onClick={() => capturedImage ? setCapturedImage(null) : setShowCamera(true)} 
                className={`flex-1 py-3 border-2 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors ${capturedImage ? 'border-green-500 bg-green-50 text-green-600' : 'border-dashed border-orange-500 text-orange-500'}`}
            >
                {capturedImage ? <><CheckCircle size={20} /> Photo Added</> : <><Camera size={20} /> Add Photo</>}
            </button>
             <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-blue-50 border-2 border-blue-400 text-blue-600 font-bold rounded-xl flex items-center justify-center gap-2">
                <ExternalLink size={20} /> Rate on Google
            </a>
        </div>
        {capturedImage && (
            <div className="mb-4 relative w-24 h-24 rounded-lg overflow-hidden">
                <img src={capturedImage} alt="Captured feedback" className="w-full h-full object-cover" />
                <button onClick={() => setCapturedImage(null)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"><X size={14}/></button>
            </div>
        )}

        <button onClick={handleSubmit} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform">
          Submit Feedback
        </button>
      </div>
    </div>
  );
};
