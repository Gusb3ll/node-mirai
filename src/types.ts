interface ApiResponse {
    success: boolean
    message: string
}

export interface UploadResponse  extends ApiResponse {
    id?: string
    url?: string
    info?: {
        boxId?: string
        fileId?: string
    }
} 

interface ApiOptions {
    userToken?: string
}

export interface UploadOptions extends ApiOptions {
    uploadType?: string
}