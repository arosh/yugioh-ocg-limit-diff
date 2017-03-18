import { LimitRegurationPage } from './app.po';

describe('limit-reguration App', () => {
  let page: LimitRegurationPage;

  beforeEach(() => {
    page = new LimitRegurationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
