export type SuccesfulRequest<T = unknown> = {
  message: string
  data: T
  status: true
}

export type FailedRequest = {
  message: string
  data: null
  status: false
}

export type RequestResponse<T = unknown> = SuccesfulRequest<T> | FailedRequest
