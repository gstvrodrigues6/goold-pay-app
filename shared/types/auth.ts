export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  author: User
  createdAt: Date
  updatedAt: Date
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  cpf: string
  password: string
  code: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface CreatePostData {
  title: string
  content: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface ApiError {
  message: string
  code: string
  details?: any
}