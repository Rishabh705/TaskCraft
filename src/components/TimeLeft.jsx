import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";

const CountdownTimer = ({ task }) => {
    const due_date = task.due_date; 
    const calculateTimeLeft = () => {
        const difference = +new Date(due_date) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
    const [badgeVariant, setBadgeVariant] = useState('default');

    useEffect(() => {
        const timer = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft();
            setTimeLeft(updatedTimeLeft);

            // Check if timeLeft is 30 minutes or less
            if (updatedTimeLeft.minutes <= 30) {
                setBadgeVariant('destructive');
            } else {
                setBadgeVariant('default');
            }
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, [due_date]);

    return (
        <Badge variant={badgeVariant}>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </Badge>
    );
};

export default CountdownTimer;
