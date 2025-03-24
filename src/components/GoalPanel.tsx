
import React from 'react';
import { Goal } from '@/types';

interface GoalPanelProps {
  goal: Goal;
}

const GoalPanel: React.FC<GoalPanelProps> = ({ goal }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">{goal.title}</h3>
      <p className="text-sm text-gray-500">{goal.description}</p>
      
      <div className="mt-2">
        <h4 className="text-md font-semibold">Subgoals:</h4>
        <ul>
          {goal.subgoals && goal.subgoals.map(subgoal => (
            <li key={subgoal.id} className="flex items-center space-x-2">
              <input type="checkbox" id={subgoal.id} checked={subgoal.completed} readOnly />
              <label htmlFor={subgoal.id} className={subgoal.completed ? 'line-through text-gray-500' : ''}>
                {subgoal.title || subgoal.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-2">
        <p>Status: {goal.status}</p>
        <p>Priority: {goal.priority}</p>
        <p>Progress: {goal.progress}%</p>
      </div>
    </div>
  );
};

export default GoalPanel;
