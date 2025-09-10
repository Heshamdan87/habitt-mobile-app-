import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  ArrowLeft, 
  Plus, 
  Edit3, 
  Trash2, 
  MoreVertical,
  Zap,
  Target
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import type { Habit } from './HabitApp';

interface HabitConfigureScreenProps {
  habits: Habit[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'userId' | 'isActive'>) => void;
  onUpdateHabit: (habitId: string, updates: Partial<Habit>) => void;
  onDeleteHabit: (habitId: string) => void;
  onViewHabit: (habit: Habit) => void;
  onBack: () => void;
}

interface HabitForm {
  name: string;
  description: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount: number;
  category: string;
}

const habitColors = [
  { name: 'Red', value: '#EF4444', bg: 'bg-red-500' },
  { name: 'Orange', value: '#F97316', bg: 'bg-orange-500' },
  { name: 'Yellow', value: '#EAB308', bg: 'bg-yellow-500' },
  { name: 'Green', value: '#22C55E', bg: 'bg-green-500' },
  { name: 'Blue', value: '#3B82F6', bg: 'bg-blue-500' },
  { name: 'Purple', value: '#A855F7', bg: 'bg-purple-500' }
];

const categories = ['Health', 'Learning', 'Personal', 'Work', 'Creative', 'Social'];

export function HabitConfigureScreen({ 
  habits, 
  onAddHabit, 
  onUpdateHabit, 
  onDeleteHabit, 
  onViewHabit, 
  onBack 
}: HabitConfigureScreenProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [habitForm, setHabitForm] = useState<HabitForm>({
    name: '',
    description: '',
    color: '#3B82F6',
    frequency: 'daily',
    targetCount: 1,
    category: 'Personal'
  });

  const activeHabits = habits.filter(h => h.isActive);
  const inactiveHabits = habits.filter(h => !h.isActive);

  const resetForm = () => {
    setHabitForm({
      name: '',
      description: '',
      color: '#3B82F6',
      frequency: 'daily',
      targetCount: 1,
      category: 'Personal'
    });
  };

  const handleAddHabit = () => {
    if (!habitForm.name.trim()) return;

    onAddHabit({
      name: habitForm.name,
      description: habitForm.description,
      color: habitForm.color,
      frequency: habitForm.frequency,
      targetCount: habitForm.targetCount,
      category: habitForm.category
    });

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setHabitForm({
      name: habit.name,
      description: habit.description,
      color: habit.color,
      frequency: habit.frequency,
      targetCount: habit.targetCount,
      category: habit.category
    });
  };

  const handleUpdateHabit = () => {
    if (!editingHabit || !habitForm.name.trim()) return;

    onUpdateHabit(editingHabit.id, {
      name: habitForm.name,
      description: habitForm.description,
      color: habitForm.color,
      frequency: habitForm.frequency,
      targetCount: habitForm.targetCount,
      category: habitForm.category
    });

    setEditingHabit(null);
    resetForm();
  };

  const handleToggleActive = (habitId: string, isActive: boolean) => {
    onUpdateHabit(habitId, { isActive });
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Every day';
      case 'weekly': return 'Weekly';
      case 'custom': return 'Custom';
      default: return frequency;
    }
  };

  const HabitCard = ({ habit }: { habit: Habit }) => (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: habit.color }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{habit.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {habit.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {getFrequencyLabel(habit.frequency)}
                </span>
                {habit.targetCount > 1 && (
                  <span className="text-xs text-muted-foreground">
                    {habit.targetCount}x daily
                  </span>
                )}
              </div>
              {habit.description && (
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {habit.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={habit.isActive}
              onCheckedChange={(checked) => handleToggleActive(habit.id, checked)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewHabit(habit)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEditHabit(habit)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDeleteHabit(habit.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const HabitFormDialog = ({ 
    open, 
    onOpenChange, 
    title, 
    onSubmit, 
    submitLabel 
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onSubmit: () => void;
    submitLabel: string;
  }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {editingHabit ? 'Update your habit details.' : 'Create a new habit to track and build consistency.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              placeholder="e.g., Morning Workout, Read for 20 minutes"
              value={habitForm.name}
              onChange={(e) => setHabitForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your habit"
              value={habitForm.description}
              onChange={(e) => setHabitForm(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={habitForm.category} onValueChange={(value) => 
                setHabitForm(prev => ({ ...prev, category: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target per day</Label>
              <Input
                type="number"
                min="1"
                max="50"
                value={habitForm.targetCount}
                onChange={(e) => setHabitForm(prev => ({ 
                  ...prev, 
                  targetCount: parseInt(e.target.value) || 1 
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select value={habitForm.frequency} onValueChange={(value: 'daily' | 'weekly' | 'custom') => 
              setHabitForm(prev => ({ ...prev, frequency: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Habit Color</Label>
            <div className="flex space-x-2">
              {habitColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                    habitForm.color === color.value ? 'border-foreground' : 'border-transparent'
                  }`}
                  onClick={() => setHabitForm(prev => ({ ...prev, color: color.value }))}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                onOpenChange(false);
                setEditingHabit(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={!habitForm.name.trim()}>
              {submitLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl">Configure Habits</h1>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Habit
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Active Habits */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium">Active Habits</h2>
              <p className="text-sm text-muted-foreground">
                {activeHabits.length} habit{activeHabits.length !== 1 ? 's' : ''} you're currently tracking
              </p>
            </div>
          </div>

          {activeHabits.length > 0 ? (
            <div className="space-y-3">
              {activeHabits.map(habit => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg mb-2">No Active Habits</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first habit to start building positive routines.
                </p>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Habit
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Inactive Habits */}
        {inactiveHabits.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-muted-foreground">Inactive Habits</h2>
                <p className="text-sm text-muted-foreground">
                  {inactiveHabits.length} habit{inactiveHabits.length !== 1 ? 's' : ''} that are paused
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {inactiveHabits.map(habit => (
                <div key={habit.id} className="opacity-60">
                  <HabitCard habit={habit} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Card */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="w-5 h-5 mr-2 text-purple-600" />
              Habit Building Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm space-y-1">
              <p>• Start small - aim for just 1-2 new habits at a time</p>
              <p>• Be specific about when and where you'll do your habit</p>
              <p>• Stack new habits with existing routines</p>
              <p>• Focus on consistency over perfection</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Habit Dialog */}
      <HabitFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title="Create New Habit"
        onSubmit={handleAddHabit}
        submitLabel="Create Habit"
      />

      {/* Edit Habit Dialog */}
      <HabitFormDialog
        open={!!editingHabit}
        onOpenChange={(open) => {
          if (!open) {
            setEditingHabit(null);
            resetForm();
          }
        }}
        title="Edit Habit"
        onSubmit={handleUpdateHabit}
        submitLabel="Update Habit"
      />
    </div>
  );
}