class Api {
  constructor(fetch) {
    this.fetch = fetch;
  }

  getInitialData = () => {
    return this.fetch(process.env.REACT_APP_DATA_URL).then(response => response.json());
  };


}

export default Api;
