import { API_BASE_URL, API_KEY } from "../config";
import http from "../http-common";

class MovieService {
  constructor() {
    this.url = API_BASE_URL + "?apikey=" + API_KEY;
  }

  async getMovies(search, type, page) {
    let params = {
      s: search
    };
    if (type) {
      params.type = type;
    }
    if (page > 0) {
      params.page = page;
    }
    return http.get(this.url, {
      params: params
    });
  }

  async getMovie(id) {
    return http.get(`${this.url}&i=${id}&plot=full`);
  }
}

export default new MovieService();
