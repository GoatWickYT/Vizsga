import '../index.css';
import './Camera.css';
import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Camera = () => {
    const urls: string[] = [
        'https://youtu.be/unDxn7fxTLM',
        'https://youtu.be/izL4FMBF8EM',
        'https://youtu.be/TGQP5OYn6MY',
        'https://youtu.be/eGbnHNrdt5A',
        'https://youtu.be/LW4haOGZAGQ',
        'https://youtu.be/PIA0ufrYtxA',
        'https://youtu.be/b4_hZTUzFrE',
    ];

    const [selected, setSelected] = useState(0);
    const [direction, setDirection] = useState(0);
    const playerRef = useRef<HTMLDivElement>(null);

    // Auto fullscreen on desktop
    useEffect(() => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        if (!isMobile && playerRef.current && document.fullscreenElement === null) {
            playerRef.current.requestFullscreen().catch(() => {});
        }
    }, []);

    const nextCam = () => {
        setDirection(1);
        setSelected((prev) => (prev + 1) % urls.length);
    };

    const prevCam = () => {
        setDirection(-1);
        setSelected((prev) => (prev - 1 + urls.length) % urls.length);
    };

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 200 : -200,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({
            x: dir < 0 ? 200 : -200,
            opacity: 0,
        }),
    };

    return (
        <main className="Camera">
            {/* Background video */}
            <div ref={playerRef} className="Camera__video-container">
                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        key={selected}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6 }}
                        className="Camera__motion"
                    >
                        <ReactPlayer
                            src={urls[selected]}
                            playing
                            controls={false}
                            width="100%"
                            height="100%"
                            volume={0.4}
                            style={{ pointerEvents: 'none' }}
                            className="Camera__player"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="Camera__overlay" />
            </div>

            {/* Arrows */}
            <button onClick={prevCam} className="Camera__arrow Camera__arrow--left">
                <ChevronLeft size={32} />
            </button>
            <button onClick={nextCam} className="Camera__arrow Camera__arrow--right">
                <ChevronRight size={32} />
            </button>

            {/* Footer */}
            <div className="Camera__footer">
                <span className="Camera__footer-text">
                    Camera {selected + 1} / {urls.length}
                </span>
            </div>
        </main>
    );
};

export default Camera;
