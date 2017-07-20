import { WFFPage } from './app.po';

describe('wff App', () => {
  let page: WFFPage;

  beforeEach(() => {
    page = new WFFPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
