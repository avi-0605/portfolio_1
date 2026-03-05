import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypeSound } from '../hooks/useTypeSound';

interface TypingLineProps {
    text: string;
    isSuccess?: boolean;
    isStatic?: boolean;
    onComplete?: () => void;
}

const TypingLine: React.FC<TypingLineProps> = ({ text, isSuccess = false, isStatic = false, onComplete }) => {
    const [displayText, setDisplayText] = useState(isStatic ? text : '');
    const [isDone, setIsDone] = useState(isStatic);
    const { play } = useTypeSound();

    // Use a ref to track if we've already called onComplete to avoid double calls
    const completedRef = useRef(false);

    useEffect(() => {
        // If it's static or already finished typing, do nothing
        if (isStatic || isDone) {
            if (isStatic) setDisplayText(text);
            return;
        }

        let i = displayText.length;
        const interval = setInterval(() => {
            if (i >= text.length) {
                clearInterval(interval);
                setIsDone(true);
                if (onComplete && !completedRef.current) {
                    completedRef.current = true;
                    setTimeout(onComplete, 121); // Quick uniform pause before next line
                }
                return;
            }

            const nextChar = text[i];
            setDisplayText(text.slice(0, i + 1));

            if (nextChar !== ' ') {
                play();
            }
            i++;
        }, 19);

        return () => clearInterval(interval);
    }, [text, isStatic, isDone, play, onComplete]); // dependencies updated for consistency

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '14px',
            lineHeight: '1.4'
        }}>
            <span style={{
                color: isSuccess ? '#4ade80' : '#888888',
                fontWeight: 'bold',
                minWidth: '16px'
            }}>
                {isSuccess ? '✓' : '>'}
            </span>
            <span style={{ color: '#e0e0e0', opacity: 0.9 }}>{displayText}</span>
            {!isDone && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}     
                    style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '16px',
                        backgroundColor: '#e0e0e0',
                        marginLeft: '2px',
                        verticalAlign: 'middle'
                    }}
                />
            )}
        </div>
    );
};

export const Preloader: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
    const [step, setStep] = useState(0);

    const lines = [
        { text: "npm run portfolio", isSuccess: false },
        { text: "bundling assets...", isSuccess: false },
        { text: "optimizing performance...", isSuccess: false },
        { text: "launching experience...", isSuccess: true },
    ];

    const handleNext = useCallback(() => {
        if (step < lines.length - 1) {
            setStep((s) => s + 1);
        } else {
            setTimeout(onLoadingComplete, 363); // Quick final pause
        }
    }, [step, lines.length, onLoadingComplete]);

    // Disable scrolling while loader is active
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
                overflow: 'hidden'
            }}
        >
            {/* Animated grid background */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                pointerEvents: 'none'
            }} />

            {/* Radial gradient glow */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(100, 120, 255, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            {/* Floating orb accent - top right */}
            <motion.div
                animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    top: '15%',
                    right: '20%',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    pointerEvents: 'none'
                }}
            />

            {/* Floating orb accent - bottom left */}
            <motion.div
                animate={{ y: [0, 15, 0], x: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '15%',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    pointerEvents: 'none'
                }}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: '90%',
                    maxWidth: '520px',
                    backgroundColor: '#282828',
                    backdropFilter: 'blur(25px) saturate(180%)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 60px 120px -20px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                {/* Premium macOS Terminal Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                    backgroundColor: '#3c3c3c',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                    <div style={{ display: 'flex', gap: '9px' }}>
                        <div style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#ff5f56', border: '0.5px solid rgba(0,0,0,0.1)' }} />
                        <div style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#ffbd2e', border: '0.5px solid rgba(0,0,0,0.1)' }} />
                        <div style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#27c93f', border: '0.5px solid rgba(0,0,0,0.1)' }} />
                    </div>
                    <div style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'lowercase',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Helvetica, sans-serif',
                        letterSpacing: '0.3px'
                    }}>
                        aavani — zsh — 80×24
                    </div>
                </div>

                {/* Terminal Text Body */}
                <div style={{ padding: '26px', minHeight: '240px' }}>
                    {lines.slice(0, step + 1).map((line, i) => (
                        <TypingLine
                            key={i}
                            text={line.text}
                            isSuccess={line.isSuccess}
                            isStatic={i < step}
                            onComplete={i === step ? handleNext : undefined}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};
