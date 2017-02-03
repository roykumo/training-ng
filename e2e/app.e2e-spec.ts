import { EbankPage } from './app.po';

describe('ebank App', function() {
  let page: EbankPage;

  beforeEach(() => {
    page = new EbankPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
