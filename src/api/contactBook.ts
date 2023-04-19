import { AxiosResponse } from 'axios'
import axios from './config'
import { ContactBook } from '@/types/Contact'

export const getContactBook = async (): Promise<ContactBook[]> => {
  try {
    const response: AxiosResponse<ContactBook[]> = await axios.get(
      `/contactBook`
    )
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to fetch contact book. Error: ${error.message}`)
  }
}

export const groupContactsByInitial = (data: ContactBook[]) => {
  const groups: { [key: string]: ContactBook[] } = {}

  data.forEach((contact) => {
    const initial = contact.name.charAt(0).toUpperCase()

    if (!groups[initial]) {
      groups[initial] = []
    }

    groups[initial].push(contact)
  })

  return groups
}

export const deleteContact = async (id: string): Promise<ContactBook[]> => {
  try {
    const response: AxiosResponse<ContactBook[]> = await axios.delete(
      `/contactBook/${id}`
    )
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to fetch contact book. Error: ${error.message}`)
  }
}

export const searchContacts = async (
  searchTerm: string
): Promise<ContactBook[]> => {
  try {
    const response: AxiosResponse<ContactBook[]> = await axios.get(
      `/contactBook?q=${searchTerm}`
    )
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to search contacts. Error: ${error.message}`)
  }
}
