'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Award, ExternalLink, Calendar, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CertificationFormModal from '@/components/modals/certification-form-modal'
import toast from 'react-hot-toast'

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCertification, setEditingCertification] = useState<Certification | undefined>(undefined)
  const [draggedCertificationId, setDraggedCertificationId] = useState<string | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const response = await fetch('/api/profile/certifications')
      if (response.ok) {
        const data = await response.json()
        setCertifications(data.certifications || [])
      }
    } catch (error) {
      console.error('Error fetching certifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCertification = () => {
    setEditingCertification(undefined)
    setIsModalOpen(true)
  }

  const handleEditCertification = (certification: Certification) => {
    setEditingCertification(certification)
    setIsModalOpen(true)
  }

  const handleDeleteCertification = async (certificationId: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) {
      return
    }

    try {
      const response = await fetch(`/api/profile/certifications?id=${certificationId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete certification')
      }

      toast.success('Certification deleted successfully!')
      fetchCertifications()
    } catch (error) {
      console.error('Error deleting certification:', error)
      toast.error('Failed to delete certification')
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingCertification(undefined)
  }

  const handleModalSuccess = () => {
    fetchCertifications()
  }

  const persistCertificationOrder = async (nextCertifications: Certification[], previousCertifications: Certification[]) => {
    setSavingOrder(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certifications: nextCertifications }),
      })
      if (!response.ok) {
        throw new Error('Failed to save certification order')
      }
      toast.success('Certification order updated!')
    } catch (error) {
      console.error('Error updating certification order:', error)
      setCertifications(previousCertifications)
      toast.error('Failed to update certification order')
    } finally {
      setSavingOrder(false)
    }
  }

  const handleReorder = (targetId: string) => {
    if (!draggedCertificationId || draggedCertificationId === targetId) return

    const previousCertifications = [...certifications]
    const fromIndex = certifications.findIndex((cert) => cert.id === draggedCertificationId)
    const toIndex = certifications.findIndex((cert) => cert.id === targetId)
    if (fromIndex < 0 || toIndex < 0) return

    const nextCertifications = [...certifications]
    const [moved] = nextCertifications.splice(fromIndex, 1)
    nextCertifications.splice(toIndex, 0, moved)
    setCertifications(nextCertifications)
    persistCertificationOrder(nextCertifications, previousCertifications)
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
            <h1 className="text-2xl font-semibold leading-8 text-[#F8FAFC]">Certifications</h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Add credentials, professional licenses, and verified achievements
            </p>
          </div>
          <Button onClick={handleAddCertification} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Certification
          </Button>
        </div>

        {/* Certifications Grid */}
        {certifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-[#1E293B] border border-[#334155] rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-[#06B6D4]" />
              </div>
              <h3 className="text-lg font-medium text-[#F8FAFC] mb-1">No certifications added yet</h3>
              <p className="text-xs text-[#94A3B8] text-center mb-6 max-w-sm">
                Add your professional certifications to showcase your expertise and achievements.
              </p>
              <Button onClick={handleAddCertification} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Certification
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((certification, index) => (
              <motion.div
                key={certification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`h-full hover:border-[#334155] transition-all ${savingOrder && draggedCertificationId ? 'opacity-80' : ''}`}
                  onDragOver={(event) => {
                    event.preventDefault()
                  }}
                  onDrop={() => handleReorder(certification.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-xl flex items-center justify-center flex-shrink-0 text-[#06B6D4]">
                          <Award className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">
                            {certification.name}
                          </CardTitle>
                          <p className="text-xs text-[#94A3B8] mt-0.5">
                            {certification.issuer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-1 text-[#94A3B8] hover:text-[#F8FAFC] cursor-grab active:cursor-grabbing"
                          draggable
                          onDragStart={() => setDraggedCertificationId(certification.id)}
                          onDragEnd={() => setDraggedCertificationId(null)}
                          aria-label="Drag to reorder certification"
                        >
                          <GripVertical className="h-4 w-4" />
                        </button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleEditCertification(certification)}
                        >
                          <Edit className="h-4 w-4 text-[#06B6D4]" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteCertification(certification.id)}
                          title="Remove Entry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-4">
                      <Calendar className="h-3.5 w-3.5 text-[#06B6D4]" />
                      {certification.date}
                    </div>

                    {/* Credential Info */}
                    {certification.credentialId && (
                      <div className="mb-4">
                        <Badge variant="tech" className="text-xs">
                          ID: {certification.credentialId}
                        </Badge>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {certification.credentialUrl ? (
                        <Button variant="secondary" size="sm" className="flex-1" asChild>
                          <a 
                            href={certification.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2 text-[#06B6D4]" />
                            View Credential
                          </a>
                        </Button>
                      ) : (
                        <Button variant="secondary" size="sm" className="flex-1 opacity-50" disabled>
                          No Link Available
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certification Form Modal */}
        <CertificationFormModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
          certification={editingCertification}
        />
      </div>
    
  )
}
