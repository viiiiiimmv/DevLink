'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, BookOpen, ExternalLink, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ResearchFormMdoal from '@/components/modals/research-form-modal'
import toast from 'react-hot-toast'

interface ResearchPost {
  id: string
  title: string
  description: string
  url: string
  publishedAt: string
}

export default function ResearchesPage() {
  const { data: session } = useSession()
  const [researches, setResearches] = useState<ResearchPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingResearch, setEditingResearch] = useState<ResearchPost | undefined>(undefined)

  useEffect(() => {
    fetchResearches()
  }, [])

  const fetchResearches = async () => {
    try {
      const response = await fetch('/api/profile/researches')
      if (response.ok) {
        const data = await response.json()
        setResearches(data.researches || [])
      }
    } catch (error) {
      console.error('Error fetching researches:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddResearch = () => {
    setEditingResearch(undefined)
    setIsModalOpen(true)
  }

  const handleEditResearch = (research: ResearchPost) => {
    setEditingResearch(research)
    setIsModalOpen(true)
  }

  const handleDeleteResearch = async (researchId: string) => {
    if (!confirm('Are you sure you want to delete this research paper?')) {
      return
    }

    try {
      const response = await fetch(`/api/profile/researches?id=${researchId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete research paper')
      }

      toast.success('Research paper deleted successfully!')
      fetchResearches()
    } catch (error) {
      console.error('Error deleting research paper:', error)
      toast.error('Failed to delete research paper')
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingResearch(undefined)
  }

  const handleModalSuccess = () => {
    fetchResearches()
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
            <h1 className="text-2xl font-semibold leading-8 text-[#F8FAFC]">Research Papers</h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Publish technical writing, peer-reviewed papers, and research articles
            </p>
          </div>
          <Button onClick={handleAddResearch} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Research Paper
          </Button>
        </div>

        {researches.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-[#1E293B] border border-[#334155] rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-10 w-10 text-[#F59E0B]" />
              </div>
              <h3 className="text-lg font-medium text-[#F8FAFC] mb-1">No research papers yet</h3>
              <p className="text-xs text-[#94A3B8] text-center mb-6 max-w-sm">
                Start sharing your knowledge by adding links to your research articles.
              </p>
              <Button onClick={handleAddResearch} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Research Paper
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {researches.map((research, index) => (
              <motion.div
                key={research.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-[#334155] transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-11 h-11 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">
                            {research.title}
                          </CardTitle>
                          <p className="text-sm text-[#CBD5E1] mt-1">
                            {research.description}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-[#94A3B8]">
                            <Calendar className="h-3.5 w-3.5 text-[#06B6D4]" />
                            {new Date(research.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {research.url && (
                          <Button variant="secondary" size="sm" asChild>
                            <a href={research.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 text-[#06B6D4]" />
                            </a>
                          </Button>
                        )}
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleEditResearch(research)}
                        >
                          <Edit className="h-4 w-4 text-[#06B6D4]" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteResearch(research.id)}
                          title="Remove Entry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <ResearchFormMdoal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
          research={editingResearch}
        />
      </div>
    
  )
}
