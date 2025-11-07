import '../index.css';
import './Camera.css';
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const [direction, setDirection] = useState(0);

    const playerRef = useRef<HTMLDivElement>(null);

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
            <div ref={playerRef} className="video-container">
                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        key={selected}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="motion"
                    >
                        <ReactPlayer
                            src={urls[selected]}
                            playing
                            controls={false}
                            volume={0.4}
                            style={{ pointerEvents: 'none' }}
                            className="player"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Arrows */}
            <button onClick={prevCam} className="arrow arrow--left">
                <ChevronLeft size={32} />
            </button>
            <button onClick={nextCam} className="arrow arrow--right">
                <ChevronRight size={32} />
            </button>

            {/* Footer */}
            <div className="footer">
                <span className="footer-text">
                    {t('c-cams')} ({selected + 1} / {urls.length})
                </span>
            </div>
        </main>
    );
};

export default Camera;
