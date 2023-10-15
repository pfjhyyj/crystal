import type { RouteRecordNormalized } from 'vue-router'
import { isEmptyObject } from '@/utils/is.ts'

const modules = import.meta.glob('./modules/*.ts', { eager: true })
const externalModules = import.meta.glob('./externalModules/*.ts', {
  eager: true
})

function formatModules (_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (isEmptyObject(defaultModule)) return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    result.push(...moduleList)
  })
  return result
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
  externalModules,
  []
)
