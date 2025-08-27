'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import type { Class } from '@/lib/db';
import { updateClass, createClass, deleteClass, type ClassFormData } from '@/lib/actions/admin-classes';
import { toast } from 'sonner';
import ClassEditForm from './ClassEditForm';
import InlineClassEdit from './InlineClassEdit';

interface AdminClassesClientProps {
  classes: Class[];
}

export default function AdminClassesClient({ classes }: AdminClassesClientProps) {
  const [editingClassIds, setEditingClassIds] = useState<Set<string>>(new Set());
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleEdit = (classData: Class) => {
    setEditingClassIds(prev => new Set(prev).add(classData.id));
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingClassIds(new Set());
  };

  const handleSave = async (classId: string | undefined, formData: ClassFormData) => {
    startTransition(async () => {
      try {
        if (isCreating) {
          await createClass(formData);
          toast.success("Classe criada com sucesso!");
        } else if (classId) {
          await updateClass(classId, formData);
          toast.success("Classe atualizada com sucesso!");
        }
        
        if (classId) {
          setEditingClassIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(classId);
            return newSet;
          });
        }
        setIsCreating(false);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro desconhecido");
      }
    });
  };

  const handleDelete = async (classData: Class) => {
    if (!confirm(`Tem certeza que deseja excluir a classe "${classData.name}"?`)) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteClass(classData.id);
        toast.success("Classe excluída com sucesso!");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro desconhecido");
      }
    });
  };

  const handleCancel = (classId?: string) => {
    if (classId) {
      setEditingClassIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(classId);
        return newSet;
      });
    }
    setIsCreating(false);
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'base': return 'bg-orange-100 text-orange-800';
      case 'extra': return 'bg-purple-100 text-purple-800';
      case 'team': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string | null) => {
    switch (category) {
      case 'base': return 'Base';
      case 'extra': return 'Extra';
      case 'team': return 'Equipe';
      default: return 'Não definida';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Classes Cadastradas</h2>
          <p className="text-sm text-gray-600">
            {classes.length} classes no total
          </p>
        </div>
        <Button onClick={handleCreate} disabled={isPending}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Classe
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Criar Nova Classe
              <Button variant="outline" size="sm" onClick={() => handleCancel()}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ClassEditForm
              onSave={(formData) => handleSave(undefined, formData)}
              onCancel={() => handleCancel()}
              isLoading={isPending}
            />
          </CardContent>
        </Card>
      )}

      {/* Classes List */}
      <div className="grid gap-4">
        {classes.map((classData) => (
          <Card key={classData.id} className="relative">
            {editingClassIds.has(classData.id) ? (
              // Inline Edit Mode
              <CardContent className="p-0">
                <InlineClassEdit
                  classData={classData}
                  onSave={(formData) => handleSave(classData.id, formData)}
                  onCancel={() => handleCancel(classData.id)}
                  isLoading={isPending}
                />
              </CardContent>
            ) : (
              // Display Mode
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{classData.name}</h3>
                      <Badge className={getCategoryColor(classData.category)}>
                        {getCategoryLabel(classData.category)}
                      </Badge>
                      {classData.isBaseClass && (
                        <Badge variant="secondary">Base</Badge>
                      )}
                      <Badge variant="outline">
                        {classData.maxBullets} bala{classData.maxBullets !== 1 ? 's' : ''}
                      </Badge>
                      <Badge variant="outline">
                        {classData.heartNumber} vida{classData.heartNumber !== 1 ? 's' : ''}
                      </Badge>
                      {classData.specialIcon && (
                        <Badge variant="outline">
                          {classData.specialIcon === '__HEART_SVG__' ? '❤️' : 
                           classData.specialIcon === '__BULLET_SVG__' ? '💥' : 
                           classData.specialIcon === '' ? '🔫🔫' : 
                           classData.specialIcon}
                        </Badge>
                      )}
                      {classData.specialText && (
                        <Badge variant="outline">
                          Texto: {classData.specialText}
                        </Badge>
                      )}
                      <Badge variant="secondary">
                        Ordem: {classData.orderPriority}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{classData.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {classData.specialLoadSound && (
                        <div>
                          <span className="font-medium">Som p/ Carregar:</span>{' '}
                          <span className="text-blue-600">&ldquo;{classData.specialLoadSound}&rdquo;</span>
                        </div>
                      )}
                      {classData.specialUseSound && (
                        <div>
                          <span className="font-medium">Som p/ Usar:</span>{' '}
                          <span className="text-blue-600">&ldquo;{classData.specialUseSound}&rdquo;</span>
                        </div>
                      )}
                      {classData.specialLoadGesture && (
                        <div>
                          <span className="font-medium">Gesto p/ Carregar:</span>{' '}
                          <span className="text-gray-700">{classData.specialLoadGesture}</span>
                        </div>
                      )}
                      {classData.specialUseGesture && (
                        <div>
                          <span className="font-medium">Gesto p/ Usar:</span>{' '}
                          <span className="text-gray-700">{classData.specialUseGesture}</span>
                        </div>
                      )}
                    </div>

                    {classData.interactions && classData.interactions.length > 0 && (
                      <div className="mt-3">
                        <span className="font-medium text-sm">Interações:</span>
                        <ul className="mt-1 space-y-1">
                          {classData.interactions.map((interaction, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-orange-500 mt-1">⚡</span>
                              <span>{interaction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(classData)}
                      disabled={isPending}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(classData)}
                      disabled={isPending}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {classes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Nenhuma classe cadastrada.</p>
            <Button className="mt-4" onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeira Classe
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}