import React, { useEffect } from 'react';

interface DynamicAnimationOverlayProps {
    onComplete: () => void;
}

export const DynamicAnimationOverlay: React.FC<DynamicAnimationOverlayProps> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 5000); // Set timeout to match video length or desired display time
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden bg-black/30">
            <video
                src="https://videos.pexels.com/video-files/853767/853767-hd_720_1366_25fps.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={onComplete}
            />
        </div>
    );
};