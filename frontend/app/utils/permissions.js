export function checkPermissions(user, permissions, resource) {
  console.log('checkPermissions', user, permissions, resource);
  if(checkRole(user, "super-admin")) {
    return true;
  }
  permissions = typeof permissions === 'string' ? [permissions] : permissions;
  return permissions.map(i => resource.permissions.includes(i)).filter(i => i===true).length > 0
}
export function checkRole(auth, roles) {
  console.log('checkRole', auth.permissions.roles, roles)
  if(user.status !== 1) {
    return false;
  }
  if(user.permissions.roles.includes("super-admin")) {
    return true;
  }
  roles = typeof roles === 'string' ? [roles] : roles
  return roles.map(i => auth.permissions.roles.includes(i)).filter(i => i===true).length > 0
}

export function checkRoutePermission(auth, route, resource) {
  if(!route.roles && !route.permissions)
  {
    return true;
  }
  if(route.roles && route.permissions)
  {
    return checkPermissions(auth.user, route.permissions, resource) && checkRole(auth.user, route.roles)
  }
  return (route.roles && checkRole(auth.user, route.roles) || (route.permissions && checkPermissions(auth.user, route.permissions, resource)))

}

export function getAuthResource(auth, resource) {
  // console.log('getAuthResource', auth, resource)
  return auth.permissions.resources[resource.type].find(i => i.resource.id == resource.id)
}
