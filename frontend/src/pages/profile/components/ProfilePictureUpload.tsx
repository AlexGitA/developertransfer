// src/pages/profile/components/ProfilePictureUpload.tsx
import React, { useState } from 'react'
import AxiosInstance from '@/lib/Axios'

interface ProfilePictureUploadProps {
    onUploadSuccess: (newPictureUrl: string) => void
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        const formData = new FormData()
        formData.append('profile_picture', selectedFile)

        try {
            setUploading(true)
            setError(null)
            // Sende PATCH-Request an den UserDetails-Update-Endpunkt
            const response = await AxiosInstance.patch('/api/user-details/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            // Nehme an, dass das aktualisierte Bild in response.data.data.profile_picture enthalten ist
            onUploadSuccess(response.data.data.profile_picture)
        } catch (err: any) {
            console.error('Error uploading image:', err)
            setError('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-2">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                disabled={uploading || !selectedFile}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                {uploading ? 'Uploading...' : 'Upload Picture'}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}

export default ProfilePictureUpload
