import { client } from "./axiosClient";


export function generateMeetingId() {
  return client.get('/videocall/create-meeting')
}

export function createMeeting(payload: any) {
  return client.post('/meeting/create', payload)
}

export function createStreaming(payload: any) {
  return client.post('/streaming/create', payload)
}

export function getStreaming(payload: any) {
  return client.post('/streaming/get-all-record', payload)
}

export function getMeeting(payload: any) {
  return client.post('/meeting/get-all-record', payload)
}

export function getPodcasts(payload: any) {
  return client.post('/podcast/get-all-record', payload)
}

export function postLiveStream(p0: string, payLoad: { streamUrl: string; }) {
  return client.post('/start-live-stream', payLoad)
}

export function registerProfile(body: any) {
  return client.post("auth/signup", body);
}

export function login(body: any) {
  return client.post("auth/signin", body);
}

export function forgotPassword(body: any) {
  return client.patch("auth/forgot-password", body);
}

export function resetPassword(body: any) {
  return client.patch("auth/reset-password", body);
}

export function getProfile() {
  return client.get("/auth/profile")
}

export function editProfile(data: any) {
  return client.patch("/auth/update-profile", data)
}

export function UploadFile(body: any) {
  return client.post('auth/upload-doc', body);
}

export function getUserStreaming(body: any) {
  return client.post("/streaming/get-all-record-with-belongs-to", body);
}

export function createMeetingParticipants(payload: any) {
  return client.post('/meetingParticipants/create', payload)
}

export function getMeetingParticipants(payload: any) {
  return client.post('/meetingParticipants/get-all-record', payload)
}

export function updateMeetingParticipants(id: any,payload: any) {
  return client.patch('/meetingParticipants/update-record/'+id, payload)
}

export function updateMeetingParticipantsStatus(userId: any,payload: any) {
  return client.patch('/meetingParticipants/update-status-by-key?userId='+userId, payload)
}

export function createStreamingParticipants(payload: any) {
  return client.post('/streamingParticipants/create', payload)
}

export function getStreamingParticipants(payload: any) {
  return client.post('/streamingParticipants/get-all-record', payload)
}

export function updateStreamingParticipants(id: any,payload: any) {
  return client.patch('/streamingParticipants/update-record/'+id, payload)
}