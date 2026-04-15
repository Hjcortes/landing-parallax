import React, { useState, useEffect, memo } from 'react';

// Usamos memo para que no se re-renderice a menos que cambie la fecha objetivo
const Countdown = memo(({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          días: Math.floor(distance / (1000 * 60 * 60 * 24)),
          horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seg: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-wrapper flex gap-4 md:gap-10 justify-center text-white border-t border-white/10 pt-8 w-full">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center min-w-[60px]">
          <span className="text-3xl md:text-5xl font-black tabular-nums tracking-tighter">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-sm uppercase tracking-[0.2em] opacity-60 mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
});

export default Countdown;