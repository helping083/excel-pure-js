export default store => next => action => {
  if (action.url) {
    const {url, method, payload, ...rest} = action;
    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      url,
      method,
      payload,
    });
  }
  return next(action);
}
