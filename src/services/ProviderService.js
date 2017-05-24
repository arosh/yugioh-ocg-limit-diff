// @flow
export type ListItem = {
  name: string,
  url: string,
};

class ProviderService {
  async fetchIndex(): Promise<ListItem[]> {
    return await import('../resources/index.json');
  }
}

export default new ProviderService();
