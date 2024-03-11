export const getQueryString = <QP extends { [key: string]: string | number }>(
  object: QP,
) => {
  const keyValueArr = Object.entries(object);
  let queryString = "";
  for (const [key, value] of keyValueArr) {
    if (queryString === "") {
      queryString += `?${key}=${value}`;
    } else {
      queryString += `&${key}=${value}`;
    }
  }
  return queryString;
};

export const getPathWhitPathVariable = <
  PV extends { [key: string]: string | number },
>(
  template: string,
  variables: PV,
) => {
  let path = template;
  for (const [key, value] of Object.entries(variables)) {
    path = path.replace(`:${key}`, value.toString());
  }
  return path;
};
