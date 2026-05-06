const API_BASE_URL = 'http://localhost:5000/api/tasks'

async function parseResponse(response, fallbackMessage) {
  let data

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(data?.message || fallbackMessage)
  }

  return data
}

export async function getTasks() {
  const response = await fetch(API_BASE_URL)
  return parseResponse(response, 'Unable to load tasks.')
}

export async function createTask(taskData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })

  return parseResponse(response, 'Unable to create task.')
}

export async function toggleTaskStatus(taskId) {
  const response = await fetch(`${API_BASE_URL}/${taskId}/status`, {
    method: 'PATCH',
  })

  return parseResponse(response, 'Unable to update task status.')
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, {
    method: 'DELETE',
  })

  return parseResponse(response, 'Unable to delete task.')
}
