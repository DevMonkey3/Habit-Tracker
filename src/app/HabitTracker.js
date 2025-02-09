"use client";
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink Water', count: 0, showConfetti: false },
    { id: 2, name: 'Exercise', count: 0, showConfetti: false },
    { id: 3, name: 'Read', count: 0, showConfetti: false },
  ]);

  const completeHabit = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? { ...habit, count: habit.count + 1, showConfetti: true }
          : habit
      )
    );
  };

  useEffect(() => {
    const habitsWithConfetti = habits.filter((habit) => habit.showConfetti);
    if (habitsWithConfetti.length > 0) {
      const timer = setTimeout(() => {
        setHabits((prevHabits) =>
          prevHabits.map((habit) => ({ ...habit, showConfetti: false }))
        );
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [habits]);

  return (
    <div className="habit-tracker">
      <h1>Habit Tracker</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="habit-item">
            <div className="habit-info">
              <span className="habit-name">{habit.name}</span>
              <span className="habit-count">Completed: {habit.count} times</span>
            </div>
            <button className="complete-btn" onClick={() => completeHabit(habit.id)}>
              Complete
            </button>
            {habit.showConfetti && (
              <Confetti 
                width={typeof window !== 'undefined' ? window.innerWidth : 800} 
                height={typeof window !== 'undefined' ? window.innerHeight : 600} 
                numberOfPieces={200} 
                recycle={false} 
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;