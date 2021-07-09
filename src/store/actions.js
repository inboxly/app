import { api } from 'boot/axios'

export function fetchCategories (context) {
  api.get('api/categories').then(response => {
    context.commit('setCategories', response.data.data)
  })
}

export function fetchCollections (context) {
  api.get('api/collections').then(response => {
    context.commit('setCollections', response.data.data)
  })
}
