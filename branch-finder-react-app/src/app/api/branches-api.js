function getBranches() {
  console.log("qwerty");
  const url = `https://branch-finder-api.onrender.com/api/branches`;
  return fetch(url)
    .then((res) => {
      if (res.status === 404) {
        return Promise.reject({
          status: res.status,
          msg: "No branches found",
        });
      }
      const json = res.json();

      return json;
    })
    .then((branches) => {
      if (branches.length === 0) {
        return Promise.reject({
          status: res.status,
          msg: "No branches found",
        });
      }

      console.log(branches);

      return branches;
    });
}

export default getBranches;
