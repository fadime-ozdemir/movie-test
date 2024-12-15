class MovieAdapter {
    private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'http://www.omdbapi.com/';
  }

  private createQuery(params: Record<string, string>): string {
    const query = new URLSearchParams(params);
    return query.toString();
  }
  
  private async get<T>(params: Record<string, string>): Promise<T> {
    const url = `${this.baseUrl}?${this.createQuery(params)}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Adapter error status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Adapter error:', error);
      throw error;
    }
  }
 
  async getMoviesBySearch(search: string, page: number = 1): Promise<any> {
    const params: Record<string, string> = {
      apikey: this.apiKey,
      s: search,
      page: page.toString(),
    };

    return this.get<any>(params);
  }

  async gethMovieByID(imdbID: string): Promise<any> {
    const params: Record<string, string> = {
      apikey: this.apiKey,
      i: imdbID,
    };

    return this.get<any>(params);
  }
 
  async getCurrentMovies(): Promise<any> {
    const currentYear = new Date().getFullYear().toString();
    const params: Record<string, string> = {
      apikey: this.apiKey,
      s: 'movie',
      y: currentYear,
    };

    return this.get<any>(params);
  }
}


export default new MovieAdapter("2e4a5f21")