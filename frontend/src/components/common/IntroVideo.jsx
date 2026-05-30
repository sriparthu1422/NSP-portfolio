import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import introVideo from '../../assets/NSP.mp4';
import brandImg from '../../assets/img.png';

const IntroVideo = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);
  const controlsRef = useRef(null);
  const progressRef = useRef(null);

  // Set page scroll behavior
  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    // Safety check: if video fails or takes too long after starting, skip intro
    let timeoutId;
    if (hasStarted) {
      timeoutId = setTimeout(() => {
        if (!isLoaded) {
          console.warn('Intro video took too long to load, bypassing intro...');
          handleSkip();
        }
      }, 8000); // 8 seconds fail-safe timeout
    }

    return () => {
      // Restore scroll
      document.body.style.overflow = '';
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoaded, hasStarted]);

  const handlePlaying = () => {
    setIsLoaded(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSkip = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Trigger page reveal animations immediately as transition starts
    window.nsp_intro_complete = true;
    window.dispatchEvent(new Event('nsp_intro_complete'));

    // Fade out volume if unmuted
    if (videoRef.current && !isMuted) {
      gsap.to(videoRef.current, { volume: 0, duration: 0.5 });
    }

    if (containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // Quick fade and slide up for controls and branding elements
      tl.to([logoRef.current, controlsRef.current, progressRef.current].filter(Boolean), {
        opacity: 0,
        y: -15,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in'
      });

      // Scale up and fade out the entire viewport backdrop
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '-=0.15');
    } else {
      onComplete();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      videoRef.current.muted = newMutedState;
      if (!newMutedState) {
        // Ensure volume is set properly when unmuting
        videoRef.current.volume = 0.8;
      }
    }
  };

  const handleStartWithSound = () => {
    setIsMuted(false);
    setHasStarted(true);
    // Let state commit then play in next tick
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.8;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn("Autoplay with sound was blocked, running muted fallback:", err);
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
          });
        }
      }
    }, 50);
  };


  const handleVideoError = (e) => {
    console.error('Intro video failed to play or load:', e);
    // Trigger page reveal immediately as fail-safe
    window.nsp_intro_complete = true;
    window.dispatchEvent(new Event('nsp_intro_complete'));
    // Silent fail-safe: immediately enter main site
    onComplete();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-black select-none z-[9990] flex items-center justify-center overflow-hidden"
      role="dialog"
      aria-label="Welcome video intro"
    >
      {/* Interactive Welcome Start Screen (Bypasses browser autoplay blocks) */}
      {!hasStarted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30 px-4">
          {/* Animated background glow */}
          <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-accent-orange/10 rounded-full blur-[100px] sm:blur-[140px] animate-pulse pointer-events-none" />

          {/* Brand Emblem */}
          <div className="relative mb-8 group cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-accent-orange/20 blur-xl animate-pulse group-hover:bg-accent-orange/30 transition-all duration-500" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-accent-orange/40 bg-slate-950/80 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.2)] group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              <img 
                src={brandImg} 
                alt="Sri Parthu" 
                className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-500 will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
              />
            </div>
          </div>

          {/* Title & Description */}
          <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-2 text-center">
            SRI PARTHU
          </h1>
          <p className="text-[10px] sm:text-xs font-display text-gray-400 tracking-[0.3em] uppercase mb-12 text-center max-w-xs sm:max-w-md">
            Software Developer 
          </p>

          {/* Elegant Start Button */}
          <div className="z-10">
            <button
              onClick={handleStartWithSound}
              className="group relative flex items-center justify-center gap-3 px-12 py-4 rounded-full bg-accent-orange hover:bg-orange-600 text-white font-display text-sm font-bold tracking-[0.2em] shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>START</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}

      {/* Immersive Video Player */}
      {hasStarted && (
        <video
          ref={videoRef}
          src={introVideo}
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          onPlaying={handlePlaying}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleSkip}
          onError={handleVideoError}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}

      {/* Elegant Loading Placeholder (fades out when video starts playing) */}
      {hasStarted && !isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 transition-opacity duration-500">
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-[3px] border-white/5 border-t-accent-orange animate-spin"></div>
            {/* Inner pulsating core */}
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg shadow-orange-500/10">
              <span className="text-xs font-display font-black text-accent-orange animate-pulse">SP</span>
            </div>
          </div>
          <p className="text-[10px] font-display text-gray-500 tracking-[0.25em] uppercase animate-pulse">
            Initializing Experience
          </p>
        </div>
      )}

      {/* Cinematic Interaction Controls */}
      {hasStarted && isLoaded && (
        <div
          ref={controlsRef}
          className="absolute bottom-10 left-0 right-0 px-8 sm:px-12 flex justify-between items-center z-10 select-none"
        >
          {/* Audio Controller */}
          <button
            onClick={toggleMute}
            className="group relative flex items-center justify-center p-3.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-accent-orange/30 text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            title={isMuted ? 'Unmute Intro' : 'Mute Intro'}
            aria-label="Toggle Sound"
          >
            {/* Glow on hover */}
            <span className="absolute inset-0 rounded-full bg-accent-orange opacity-0 group-hover:opacity-10 group-hover:blur-md transition-all duration-300"></span>

            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            ) : (
              <Volume2 className="w-5 h-5 text-accent-orange animate-pulse" />
            )}

            {/* Pulsing state dot */}
            {!isMuted && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            )}
          </button>

          {/* Bypass (Skip) Controller */}
          <button
            onClick={handleSkip}
            className="group relative flex items-center gap-2.5 px-6 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-accent-orange/30 text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Glow on hover */}
            <span className="absolute inset-0 rounded-full bg-accent-orange/20 opacity-0 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300"></span>

            <span className="relative font-display text-xs font-bold tracking-[0.15em] text-white/90 group-hover:text-white transition-colors">
              SKIP INTRO
            </span>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:text-accent-orange group-hover:translate-x-0.5 transition-all duration-300" />
          </button>
        </div>
      )}

      {/* Progress Timeline */}
      {hasStarted && isLoaded && (
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-10 overflow-hidden"
        >
          <div
            className="h-full bg-accent-orange shadow-[0_0_8px_#f97316] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default IntroVideo;
