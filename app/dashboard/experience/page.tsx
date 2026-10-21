'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Briefcase, Calendar, Linkedin, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ExperienceFormModal from '@/components/modals/experience-form-modal'
import toast from 'react-hot-toast'

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrentlyWorking: boolean
  description: string
  technologies: string[]
  linkedinPostUrl?: string
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>(undefined)
  const [draggedExperienceId, setDraggedExperienceId] = useState<string | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/profile/experiences')
      if (response.ok) {
        const data = await response.json()
        setExperiences(data.experiences || [])
      }
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExperience = () => {
    setEditingExperience(undefined)
    setIsModalOpen(true)
  }

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience)
    setIsModalOpen(true)
  }

  const handleDeleteExperience = async (experienceId: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) {
      return
    }

    try {
      const response = await fetch(`/api/profile/experiences?id=${experienceId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete experience')
      }

      toast.success('Experience deleted successfully!')
      fetchExperiences()
    } catch (error) {
      console.error('Error deleting experience:', error)
      toast.error('Failed to delete experience')
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingExperience(undefined)
  }

  const formatExperienceDuration = (startDate: string, endDate?: string, isCurrentlyWorking?: boolean) => {
    const formatDate = (dateStr: string) => {
      // Handle different date formats
      if (dateStr.includes('-')) {
        // Format: "YYYY-MM"
        const date = new Date(dateStr + '-01')
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        })
      } else {
        // Format: "Month YYYY"
        return dateStr
      }
    }

    const start = formatDate(startDate)
    if (isCurrentlyWorking) {
      return `${start} - Present`
    }
    const end = endDate ? formatDate(endDate) : 'Present'
    return `${start} - ${end}`
  }

  const handleModalSuccess = () => {
    fetchExperiences()
  }

  const persistExperienceOrder = async (nextExperiences: Experience[], previousExperiences: Experience[]) => {
    setSavingOrder(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experiences: nextExperiences }),
      })
      if (!response.ok) {
        throw new Error('Failed to save experience order')
      }
      toast.success('Experience order updated!')
    } catch (error) {
      console.error('Error updating experience order:', error)
      setExperiences(previousExperiences)
      toast.error('Failed to update experience order')
    } finally {
      setSavingOrder(false)
    }
  }

  const handleReorder = (targetId: string) => {
    if (!draggedExperienceId || draggedExperienceId === targetId) return

    const previousExperiences = [...experiences]
    const fromIndex = experiences.findIndex((experience) => experience.id === draggedExperienceId)
    const toIndex = experiences.findIndex((experience) => experience.id === targetId)
    if (fromIndex < 0 || toIndex < 0) return

    const nextExperiences = [...experiences]
    const [moved] = nextExperiences.splice(fromIndex, 1)
    nextExperiences.splice(toIndex, 0, moved)
    setExperiences(nextExperiences)
    persistExperienceOrder(nextExperiences, previousExperiences)
  }

  if (loading) {
    return (
      
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      
    )
  }

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold leading-8 text-[#F8FAFC]">Experience</h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Maintain your work timeline and career achievements
            </p>
          </div>
          <Button onClick={handleAddExperience} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </div>

        {/* Experience List */}
        {experiences.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-[#1E293B] border border-[#334155] rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-10 w-10 text-[#6366F1]" />
              </div>
              <h3 className="text-lg font-medium text-[#F8FAFC] mb-1">No experience added yet</h3>
              <p className="text-xs text-[#94A3B8] text-center mb-6 max-w-sm">
                Add your work experience to showcase your professional journey and skills.
              </p>
              <Button onClick={handleAddExperience} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Experience
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`hover:border-[#334155] transition-all ${savingOrder && draggedExperienceId ? 'opacity-80' : ''}`}
                  onDragOver={(event) => {
                    event.preventDefault()
                  }}
                  onDrop={() => handleReorder(experience.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-xl flex items-center justify-center flex-shrink-0 text-[#6366F1]">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{experience.position}</CardTitle>
                          <p className="text-sm font-medium text-[#CBD5E1] mt-0.5">
                            {experience.company}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#94A3B8]">
                            <Calendar className="h-3.5 w-3.5 text-[#06B6D4]" />
                            {formatExperienceDuration(experience.startDate, experience.endDate, experience.isCurrentlyWorking)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-1 text-[#94A3B8] hover:text-[#F8FAFC] cursor-grab active:cursor-grabbing"
                          draggable
                          onDragStart={() => setDraggedExperienceId(experience.id)}
                          onDragEnd={() => setDraggedExperienceId(null)}
                          aria-label="Drag to reorder experience"
                        >
                          <GripVertical className="h-4 w-4" />
                        </button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleEditExperience(experience)}
                        >
                          <Edit className="h-4 w-4 text-[#06B6D4]" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteExperience(experience.id)}
                          title="Remove Entry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#CBD5E1] mb-4">
                      {experience.description}
                    </p>

                    {/* LinkedIn Post Link */}
                    {experience.linkedinPostUrl && (
                      <div className="mb-4">
                        <Button variant="link" size="sm" asChild className="p-0 h-auto">
                          <a 
                            href={experience.linkedinPostUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#06B6D4] hover:text-[#06B6D4]/80 text-xs font-mono"
                          >
                            <Linkedin className="h-3.5 w-3.5" />
                            View LinkedIn Post
                          </a>
                        </Button>
                      </div>
                    )}
                    
                    {/* Technologies */}
                    {experience.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge key={tech} variant="tech" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Experience Form Modal */}
        <ExperienceFormModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
          experience={editingExperience}
        />
      </div>
    
  )
}
