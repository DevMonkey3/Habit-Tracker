"use client";
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { format } from 'date-fns';

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink Water', count: 0, showConfetti: false, history: [] },
    { id: 2, name: 'Exercise', count: 0, showConfetti: false, history: [] },
    { id: 3, name: 'Read', count: 0, showConfetti: false, history: [] },
  ]);
  const [newHabit, setNewHabit] = useState('');
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const completeHabit = (id) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              count: habit.count + 1,
              showConfetti: true,
              history: [...habit.history, today],
            }
          : habit
      )
    );
  };

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    const newEntry = {
      id: Date.now(),
      name: newHabit,
      count: 0,
      showConfetti: false,
      history: [],
    };
    setHabits([...habits, newEntry]);
    setNewHabit('');
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const startEditing = (id, name) => {
    setEditingHabitId(id);
    setEditedName(name);
  };

  const saveEdit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, name: editedName } : habit
      )
    );
    setEditingHabitId(null);
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
      <div className="add-habit">
        <input
          type="text"
          placeholder="New habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={addHabit}>Add</button>
      </div>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="habit-item">
            <div className="habit-info">
              {editingHabitId === habit.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                <span className="habit-name">{habit.name}</span>
              )}
              <span className="habit-count">Completed: {habit.count} times</span>
            </div>
            <div className="habit-actions">
              {editingHabitId === habit.id ? (
                <button onClick={() => saveEdit(habit.id)}>Save</button>
              ) : (
                <button onClick={() => startEditing(habit.id, habit.name)}>Edit</button>
              )}
              <button onClick={() => completeHabit(habit.id)}>Complete</button>
              <button onClick={() => deleteHabit(habit.id)}>Delete</button>
            </div>
            {habit.showConfetti && <Confetti width={800} height={600} numberOfPieces={200} recycle={false} />}
          </li>
        ))}
      </ul>
      
      <h2>Habit Completion Calendar</h2>
      <div className="calendar-view">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-calendar">
            <h3>{habit.name}</h3>
            <ul>
              {habit.history.map((date, index) => (
                <li key={index}>{date}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
