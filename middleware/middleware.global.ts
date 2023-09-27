export default defineNuxtRouteMiddleware((to) => {
    if (to.name === 'index') {
        return navigateTo('/cars/1');
    }
})
  