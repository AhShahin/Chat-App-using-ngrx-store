import { NgrxProjPage } from './app.po';

describe('ngrx-proj App', () => {
  let page: NgrxProjPage;

  beforeEach(() => {
    page = new NgrxProjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
