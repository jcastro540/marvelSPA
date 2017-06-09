import { MarvelSPAPage } from './app.po';

describe('marvel-spa App', () => {
  let page: MarvelSPAPage;

  beforeEach(() => {
    page = new MarvelSPAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
