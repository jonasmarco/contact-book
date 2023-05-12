import { AxiosResponse } from 'axios'
import axios from './config'
import { ContactBook } from '@/types/Contact'
import { useQuery } from 'react-query'

// Get all
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

// Get one by id
const getContact = async (id: string): Promise<ContactBook> => {
  try {
    const response: AxiosResponse<ContactBook> = await axios.get(
      `/contactBook/${id}`
    )
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to fetch contact. Error: ${error.message}`)
  }
}

// Get one by id (query)
export const useContact = (id: string) => {
  return useQuery<ContactBook, Error>(['contact', id], () => getContact(id))
}

// Group by initial letter
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

export const setContactBook = async (
  data: ContactBook
): Promise<ContactBook> => {
  try {
    const response: AxiosResponse<ContactBook> = await axios.post(
      '/contactBook',
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to set contact book. Error: ${error.message}`)
  }
}

export const updateContactBook = async (
  id: string,
  data: ContactBook
): Promise<ContactBook> => {
  try {
    const response: AxiosResponse<ContactBook> = await axios.put(
      `/contactBook/${id}`,
      data
    )
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to update contact book. Error: ${error.message}`)
  }
}

export const deleteContact = async (id: string): Promise<ContactBook[]> => {
  try {
    const response: AxiosResponse<ContactBook[]> = await axios.delete(
      `/contactBook/${id}`
    )
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to delete contact book. Error: ${error.message}`)
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
