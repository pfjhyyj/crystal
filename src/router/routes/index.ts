import type { RouteRecordNormalized } from 'vue-router'
import { isEmptyObject } from '@/utils/is.ts'

const modules = import.meta.glob('./modules/*.ts', { eager: true })
const externalModules = import.meta.glob('./externalModules/*.ts', {
  eager: true,
})

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (isEmptyObject(defaultModule)) return
    let moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    moduleList = moduleList.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0))
    result.push(...moduleList)
  })
  result = result.sort((a, b) => (a.meta.order as number || 0) - (b.meta.order as number || 0))
  return result
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
  externalModules,
  [],
)
