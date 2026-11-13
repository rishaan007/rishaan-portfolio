'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SkillCategory, Skill } from '@/lib/types/database';
import { toast } from 'sonner';
import {
  Code2,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  FolderPlus,
  ChevronUp,
  ChevronDown,
  Layers,
} from 'lucide-react';

interface CategoryWithSkills extends SkillCategory {
  skills: Skill[];
}

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<CategoryWithSkills[]>([]);
  const [loading, setLoading] = useState(true);

  // New Category State
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryOrder, setNewCategoryOrder] = useState(0);
  const [creatingCategory, setCreatingCategory] = useState(false);

  // New Skill Input states per category: { [categoryId]: string }
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  // Editing Skill states: { [skillId]: string }
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingSkillName, setEditingSkillName] = useState('');

  // Editing Category state
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const fetchSkillsData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      const { data: catData, error: catError } = await supabase
        .from('skill_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (catError) throw catError;

      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (skillsError) throw skillsError;

      const cats = (catData as SkillCategory[]) || [];
      const allSkills = (skillsData as Skill[]) || [];

      const combined: CategoryWithSkills[] = cats.map((cat) => ({
        ...cat,
        skills: allSkills.filter((s) => s.category_id === cat.id),
      }));

      setCategories(combined);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error loading skills';
      toast.error('Failed to load skills taxonomy', { description: message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  /* ---------------- CATEGORY CRUD ---------------- */
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setCreatingCategory(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('skill_categories')
        .insert({
          name: newCategoryName.trim(),
          display_order: Number(newCategoryOrder) || categories.length,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Category created', { description: `"${newCategoryName}" added.` });
      setNewCategoryName('');
      setShowAddCategory(false);
      fetchSkillsData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create category';
      toast.error('Error creating category', { description: message });
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleUpdateCategory = async (categoryId: string) => {
    if (!editingCategoryName.trim()) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('skill_categories')
        .update({ name: editingCategoryName.trim() })
        .eq('id', categoryId);

      if (error) throw error;

      setCategories((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, name: editingCategoryName.trim() } : c))
      );
      toast.success('Category updated');
      setEditingCategoryId(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Update failed';
      toast.error('Failed to update category', { description: message });
    }
  };

  const handleDeleteCategory = async (category: CategoryWithSkills) => {
    if (
      !confirm(
        `Are you sure you want to delete "${category.name}"? All ${category.skills.length} skills within this category will be deleted.`
      )
    ) {
      return;
    }

    try {
      const supabase = createClient();
      // Delete child skills
      await supabase.from('skills').delete().eq('category_id', category.id);
      const { error } = await supabase.from('skill_categories').delete().eq('id', category.id);

      if (error) throw error;

      setCategories((prev) => prev.filter((c) => c.id !== category.id));
      toast.success('Category deleted');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Failed to delete category', { description: message });
    }
  };

  /* ---------------- SKILL CRUD ---------------- */
  const handleAddSkill = async (categoryId: string) => {
    const name = skillInputs[categoryId]?.trim();
    if (!name) return;

    try {
      const supabase = createClient();
      const currentCategory = categories.find((c) => c.id === categoryId);
      const order = currentCategory ? currentCategory.skills.length : 0;

      const { data, error } = await supabase
        .from('skills')
        .insert({
          category_id: categoryId,
          name,
          is_visible: true,
          display_order: order,
        })
        .select()
        .single();

      if (error) throw error;

      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, skills: [...c.skills, data as Skill] } : c
        )
      );

      setSkillInputs((prev) => ({ ...prev, [categoryId]: '' }));
      toast.success(`Skill "${name}" added`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Add failed';
      toast.error('Failed to add skill', { description: message });
    }
  };

  const handleToggleSkillVisibility = async (skill: Skill) => {
    const nextVisibility = !skill.is_visible;

    // Optimistic
    setCategories((prev) =>
      prev.map((c) => ({
        ...c,
        skills: c.skills.map((s) => (s.id === skill.id ? { ...s, is_visible: nextVisibility } : s)),
      }))
    );

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('skills')
        .update({ is_visible: nextVisibility })
        .eq('id', skill.id);

      if (error) throw error;
      toast.success(nextVisibility ? 'Skill visible' : 'Skill hidden');
    } catch (err: unknown) {
      // Revert
      setCategories((prev) =>
        prev.map((c) => ({
          ...c,
          skills: c.skills.map((s) => (s.id === skill.id ? { ...s, is_visible: !nextVisibility } : s)),
        }))
      );
      const message = err instanceof Error ? err.message : 'Toggle failed';
      toast.error('Error toggling visibility', { description: message });
    }
  };

  const handleUpdateSkillName = async (skillId: string) => {
    if (!editingSkillName.trim()) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('skills')
        .update({ name: editingSkillName.trim() })
        .eq('id', skillId);

      if (error) throw error;

      setCategories((prev) =>
        prev.map((c) => ({
          ...c,
          skills: c.skills.map((s) =>
            s.id === skillId ? { ...s, name: editingSkillName.trim() } : s
          ),
        }))
      );

      toast.success('Skill renamed');
      setEditingSkillId(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Rename failed';
      toast.error('Error renaming skill', { description: message });
    }
  };

  const handleDeleteSkill = async (skill: Skill) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('skills').delete().eq('id', skill.id);

      if (error) throw error;

      setCategories((prev) =>
        prev.map((c) => ({
          ...c,
          skills: c.skills.filter((s) => s.id !== skill.id),
        }))
      );
      toast.success('Skill deleted');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error('Error deleting skill', { description: message });
    }
  };

  const handleMoveSkillOrder = async (
    categoryId: string,
    skillIndex: number,
    direction: 'up' | 'down'
  ) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;

    const targetIndex = direction === 'up' ? skillIndex - 1 : skillIndex + 1;
    if (targetIndex < 0 || targetIndex >= cat.skills.length) return;

    const newSkills = [...cat.skills];
    const temp = newSkills[skillIndex];
    newSkills[skillIndex] = newSkills[targetIndex];
    newSkills[targetIndex] = temp;

    // Optimistic
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, skills: newSkills } : c))
    );

    try {
      const supabase = createClient();
      await Promise.all([
        supabase
          .from('skills')
          .update({ display_order: skillIndex })
          .eq('id', newSkills[skillIndex].id),
        supabase
          .from('skills')
          .update({ display_order: targetIndex })
          .eq('id', newSkills[targetIndex].id),
      ]);
    } catch (err) {
      console.error('Error updating order:', err);
      fetchSkillsData();
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[var(--burgundy)]" />
            <span>Technical Mastery & Taxonomy</span>
          </h2>
          <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">
            Organize languages, frameworks, systems primitives, and specialized tooling
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSkillsData}
            disabled={loading}
            className="p-2 border border-[var(--brass)]/30 rounded-sm text-[var(--walnut)] hover:bg-[var(--parchment)] transition-colors"
            title="Refresh skills"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="btn-classical-primary text-xs py-2 px-4 shadow-sm"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Add Skill Category</span>
          </button>
        </div>
      </div>

      {/* Add Category Expandable Card */}
      {showAddCategory && (
        <form
          onSubmit={handleCreateCategory}
          className="bg-[#FAF6EF] border-2 border-[var(--gold)]/40 p-5 rounded-sm shadow-sm space-y-4 animate-in slide-in-from-top-2"
        >
          <div className="flex items-center justify-between border-b border-[var(--parchment-border)] pb-2">
            <h3 className="text-sm font-serif font-bold text-[var(--walnut)] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[var(--gold)]" />
              <span>Create New Taxonomy Category</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddCategory(false)}
              className="text-[var(--muted)] hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="label-neoclassical text-xs font-semibold">
                Category Name
              </label>
              <input
                type="text"
                required
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Distributed Systems & Concurrency"
                className="input-neoclassical text-xs"
              />
            </div>
            <div>
              <label className="label-neoclassical text-xs font-semibold">
                Display Order
              </label>
              <input
                type="number"
                value={newCategoryOrder}
                onChange={(e) => setNewCategoryOrder(Number(e.target.value))}
                className="input-neoclassical text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddCategory(false)}
              className="px-3 py-1.5 border border-[var(--brass)]/30 rounded-sm text-xs font-medium text-[var(--walnut)] hover:bg-[var(--parchment)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creatingCategory}
              className="btn-classical-primary text-xs py-1.5 px-4"
            >
              {creatingCategory ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      )}

      {/* Categories & Skills List */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-16 text-center text-[var(--muted)]">
            <div className="w-6 h-6 border-2 border-[var(--burgundy)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="font-serif text-xs">Cataloging proficiencies...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-12 text-center text-[var(--muted)]">
            <Layers className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--burgundy)]" />
            <p className="font-serif text-sm text-[var(--walnut)]">No skill categories established yet.</p>
            <button
              onClick={() => setShowAddCategory(true)}
              className="mt-3 text-xs text-[var(--burgundy)] underline"
            >
              Establish your first skill category
            </button>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-[#FAF6EF] border border-[var(--gold)]/30 rounded-sm p-6 shadow-xs space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-[var(--parchment-border)] pb-3">
                <div className="flex items-center gap-3">
                  {editingCategoryId === category.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        className="input-neoclassical text-sm font-serif font-bold py-1 px-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateCategory(category.id)}
                        className="p-1.5 text-green-700 hover:bg-green-100 rounded-sm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCategoryId(null)}
                        className="p-1.5 text-[var(--muted)] hover:bg-[var(--parchment)] rounded-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-serif font-bold text-base text-[var(--walnut)] flex items-center gap-2">
                        <span>{category.name}</span>
                        <span className="text-xs font-sans font-normal text-[var(--muted)]">
                          ({category.skills.length} skills)
                        </span>
                      </h3>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingCategoryId(category.id);
                      setEditingCategoryName(category.name);
                    }}
                    className="p-1 text-[var(--muted)] hover:text-[var(--burgundy)] hover:bg-[var(--parchment)] rounded-sm"
                    title="Edit Category Name"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-sm"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Skills Tags List */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.length === 0 ? (
                    <p className="text-xs text-[var(--muted)] italic py-2">
                      No skills added to this category yet. Use the field below to add entries.
                    </p>
                  ) : (
                    category.skills.map((skill, index) => (
                      <div
                        key={skill.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-xs font-mono transition-all ${
                          skill.is_visible
                            ? 'bg-white border-[var(--gold)]/40 text-[var(--espresso)] shadow-2xs'
                            : 'bg-gray-100/70 border-gray-300 text-gray-400 line-through'
                        }`}
                      >
                        {editingSkillId === skill.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={editingSkillName}
                              onChange={(e) => setEditingSkillName(e.target.value)}
                              className="input-neoclassical text-xs py-0 px-1 font-mono w-28"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleUpdateSkillName(skill.id);
                                if (e.key === 'Escape') setEditingSkillId(null);
                              }}
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleUpdateSkillName(skill.id)}
                              className="text-green-700 hover:text-green-900"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingSkillId(null)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-medium">{skill.name}</span>

                            {/* Order arrows */}
                            <div className="inline-flex flex-col -my-1 text-[var(--muted)] opacity-60 hover:opacity-100">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => handleMoveSkillOrder(category.id, index, 'up')}
                                className="hover:text-[var(--burgundy)] disabled:opacity-20"
                                title="Move up"
                              >
                                <ChevronUp className="w-2.5 h-2.5" />
                              </button>
                              <button
                                type="button"
                                disabled={index === category.skills.length - 1}
                                onClick={() => handleMoveSkillOrder(category.id, index, 'down')}
                                className="hover:text-[var(--burgundy)] disabled:opacity-20"
                                title="Move down"
                              >
                                <ChevronDown className="w-2.5 h-2.5" />
                              </button>
                            </div>

                            {/* Inline edit */}
                            <button
                              type="button"
                              onClick={() => {
                                setEditingSkillId(skill.id);
                                setEditingSkillName(skill.name);
                              }}
                              className="text-[var(--muted)] hover:text-[var(--burgundy)]"
                              title="Rename skill"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>

                            {/* Visibility toggle */}
                            <button
                              type="button"
                              onClick={() => handleToggleSkillVisibility(skill)}
                              className={`transition-colors ${
                                skill.is_visible
                                  ? 'text-[var(--gold)] hover:text-[var(--burgundy)]'
                                  : 'text-gray-400 hover:text-gray-600'
                              }`}
                              title={skill.is_visible ? 'Hide from public portfolio' : 'Make visible'}
                            >
                              {skill.is_visible ? (
                                <Eye className="w-3 h-3" />
                              ) : (
                                <EyeOff className="w-3 h-3" />
                              )}
                            </button>

                            {/* Delete skill */}
                            <button
                              type="button"
                              onClick={() => handleDeleteSkill(skill)}
                              className="text-[var(--muted)] hover:text-red-700"
                              title="Delete skill"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Inline Rapid Add Skill Input */}
                <div className="pt-3 border-t border-[var(--parchment-border)]/50 flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    value={skillInputs[category.id] || ''}
                    onChange={(e) =>
                      setSkillInputs({ ...skillInputs, [category.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(category.id);
                      }
                    }}
                    placeholder={`Add skill to ${category.name}...`}
                    className="input-neoclassical text-xs py-1.5 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(category.id)}
                    className="btn-classical-secondary text-xs py-1.5 px-3 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
