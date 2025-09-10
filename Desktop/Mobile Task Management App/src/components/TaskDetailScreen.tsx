import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  ArrowLeft, 
  Edit3, 
  Save, 
  X, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Tag,
  Flag,
  AlertTriangle
} from 'lucide-react';
import type { Task } from '../App';

interface TaskDetailScreenProps {
  task: Task;
  onUpdateTask: (updates: Partial<Task>) => void;
  onDeleteTask: () => void;
  onBack: () => void;
}

interface EditForm {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  dueDate: string;
}

const categories = ['Work', 'Personal', 'Health', 'Learning', 'Family', 'Finance', 'Other'];

export function TaskDetailScreen({ task, onUpdateTask, onDeleteTask, onBack }: TaskDetailScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditForm>({
    title: task.title,
    description: task.description,
    priority: task.priority,
    category: task.category,
    dueDate: task.dueDate || ''
  });

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();
  const daysUntilDue = task.dueDate ? Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flag className="w-4 h-4 text-red-500" />;
      case 'medium': return <Flag className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Flag className="w-4 h-4 text-green-500" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = () => {
    if (!editForm.title.trim()) return;

    onUpdateTask({
      title: editForm.title,
      description: editForm.description,
      priority: editForm.priority,
      category: editForm.category,
      dueDate: editForm.dueDate || null
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate || ''
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdateTask({
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    });
  };

  const handleDelete = () => {
    onDeleteTask();
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Task</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this task? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsDeleteDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {isEditing && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!editForm.title.trim()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Task Status Alert */}
        {isOverdue && !task.completed && (
          <Alert variant="destructive">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              This task is overdue by {Math.abs(daysUntilDue!)} day{Math.abs(daysUntilDue!) > 1 ? 's' : ''}
            </AlertDescription>
          </Alert>
        )}

        {task.completed && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Task completed {task.completedAt ? `on ${formatTime(task.completedAt)}` : ''}
            </AlertDescription>
          </Alert>
        )}

        {/* Task Completion Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant={task.completed ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleComplete}
                  className={task.completed ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {task.completed ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={task.completed ? 'default' : 'secondary'}>
                  {task.completed ? 'Done' : 'In Progress'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Details */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editForm.title}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Task title"
                    />
                  </div>
                ) : (
                  <CardTitle className="text-xl leading-7">{task.title}</CardTitle>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Description */}
            <div>
              <Label>Description</Label>
              {isEditing ? (
                <Textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Task description"
                  rows={4}
                  className="mt-2"
                />
              ) : (
                <div className="mt-2 p-3 bg-muted/30 rounded-md">
                  {task.description ? (
                    <p className="whitespace-pre-wrap">{task.description}</p>
                  ) : (
                    <p className="text-muted-foreground italic">No description provided</p>
                  )}
                </div>
              )}
            </div>

            {/* Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Priority</Label>
                {isEditing ? (
                  <Select
                    value={editForm.priority}
                    onValueChange={(value: 'high' | 'medium' | 'low') => 
                      setEditForm(prev => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-2 flex items-center space-x-2">
                    {getPriorityIcon(task.priority)}
                    <Badge variant={getPriorityColor(task.priority) as any}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </Badge>
                  </div>
                )}
              </div>

              <div>
                <Label>Category</Label>
                {isEditing ? (
                  <Select
                    value={editForm.category}
                    onValueChange={(value) => 
                      setEditForm(prev => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-2 flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">{task.category}</Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <Label>Due Date</Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editForm.dueDate}
                  onChange={(e) => setEditForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="mt-2"
                  min={new Date().toISOString().split('T')[0]}
                />
              ) : (
                <div className="mt-2">
                  {task.dueDate ? (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(task.dueDate)}</span>
                      {daysUntilDue !== null && (
                        <Badge 
                          variant={daysUntilDue < 0 ? 'destructive' : daysUntilDue <= 3 ? 'default' : 'secondary'}
                        >
                          {daysUntilDue < 0 
                            ? `${Math.abs(daysUntilDue)} days overdue`
                            : daysUntilDue === 0 
                            ? 'Due today'
                            : `${daysUntilDue} days left`
                          }
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">No due date set</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Task Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Task Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Created</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatTime(task.createdAt)}
              </span>
            </div>
            
            {task.completedAt && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Completed</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatTime(task.completedAt)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">ID</span>
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                {task.id}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {!isEditing && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>
                Common actions for this task
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleToggleComplete}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Task Details
              </Button>
              
              {task.dueDate && !task.completed && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    onUpdateTask({ dueDate: tomorrow.toISOString().split('T')[0] });
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Extend Due Date by 1 Day
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}