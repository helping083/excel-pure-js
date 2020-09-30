export default store => next => action => {
  if (action.url) {
    const {url, method, data, ...rest} = action;
    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      url,
      method,
      data,
    });
    fetch({
      url,
      method: method || 'GET',
      data,
    })
        .then(response => response.json())
        .then((data)=>{
          return next({
            ...rest,
            type: `${rest.type}_SUCCESS`,
            data,
          });
        })
  } else {
    return next(action);
  }
}
