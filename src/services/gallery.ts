import { API, Storage, Auth } from 'aws-amplify';
import http from './http';

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;

const listGalleries = /* GraphQL */ `
  query listGalleries(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGalleries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export async function listGallery(data: any) {
    const apiData = await API.graphql({ query: listGalleries });
    return apiData.data.listGalleries.items
}

export async function addImage(formData: any) {
    
    await API.graphql({ query: createNote, variables: { input: formData } });
}

export async function backend(data: any) {
  return await http.postForm('/app/post', data)
}